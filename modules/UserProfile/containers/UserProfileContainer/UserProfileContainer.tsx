import { Box, Button, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FaEdit } from "react-icons/fa";

import NavigationBar from "@/modules/components/Navbar/NavigationBar";
import ClassroomCreatingModal from "@/modules/UserDashboard/components/ClassroomCreatingModal/ClassroomCreatingModal";
import LoadingComponent from "@/shared/components/LoadingComponent";
import { useAppSelector } from "@/shared/redux/hooks";
import { authenticatedUserSelector } from "@/shared/redux/reducers/user.reducer";
import { useGetUserProfileQuery } from "@/shared/redux/rtk-apis/users/users.api";
import { ERole } from "@/shared/typedefs";

import StudentProfileInfo from "../../components/StudentProfileInfo/StudentProfileInfo";
import TeacherProfileInfo from "../../components/TeacherProfileInfo/TeacherProfileInfo";
import { useUserProfileContainerStyles } from "./UserProfileContainer.styles";

const UserProfileContainer = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { classes } = useUserProfileContainerStyles();
  const { claim } = useAppSelector(authenticatedUserSelector);
  const { data, isLoading } = useGetUserProfileQuery();

  return (
    <>
      <NavigationBar open={open} />
      <ClassroomCreatingModal opened={opened} close={close} />

      {isLoading ? (
        <LoadingComponent visible />
      ) : (
        <Box maw={"90%"} m={"auto"}>
          <Title className={classes.title} order={2}>
            Profile
          </Title>
          <Box w={"100%"} mb={16}>
            <Box className={classes.buttonContainer}>
              <Button variant="outline" className={classes.button}>
                Reset Password
              </Button>
              <Button variant="outline" className={classes.button}>
                <FaEdit />
              </Button>
            </Box>
          </Box>
          {claim === ERole.TEACHER ? (
            <TeacherProfileInfo userProfile={data} />
          ) : (
            <StudentProfileInfo userProfile={data} />
          )}
        </Box>
      )}
    </>
  );
};

export default UserProfileContainer;
