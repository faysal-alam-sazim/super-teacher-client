import { Box, Button, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FaEdit } from "react-icons/fa";
import { LuX } from "react-icons/lu";

import NavigationBar from "@/modules/components/Navbar/NavigationBar";
import ClassroomCreatingModal from "@/modules/UserDashboard/components/ClassroomCreatingModal/ClassroomCreatingModal";
import LoadingComponent from "@/shared/components/LoadingComponent";
import { useAppSelector } from "@/shared/redux/hooks";
import { authenticatedUserSelector } from "@/shared/redux/reducers/user.reducer";
import { useGetUserProfileQuery } from "@/shared/redux/rtk-apis/users/users.api";
import { ERole } from "@/shared/typedefs";

import EditStudentProfie from "../../components/EditStudentProfile/EditStudentProfie";
import EditTeacherProfile from "../../components/EditTeacherProfile/EditTeacherProfile";
import ResetPasswordModal from "../../components/ResetPasswordModal/ResetPasswordModal";
import StudentProfileInfo from "../../components/StudentProfileInfo/StudentProfileInfo";
import TeacherProfileInfo from "../../components/TeacherProfileInfo/TeacherProfileInfo";
import { useUserProfileContainerStyles } from "./UserProfileContainer.styles";

const UserProfileContainer = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { classes } = useUserProfileContainerStyles();
  const { claim } = useAppSelector(authenticatedUserSelector);
  const { data, isLoading } = useGetUserProfileQuery();
  const [editProfileOpened, { toggle: toggleEditProfileOpened }] = useDisclosure(false);
  const [
    resetPasswordModalOpened,
    { open: openResetPasswordModal, close: closeResetPasswordModal },
  ] = useDisclosure(false);

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
              <Button variant="outline" className={classes.button} onClick={openResetPasswordModal}>
                Reset Password
              </Button>
              {editProfileOpened ? (
                <Button
                  variant="outline"
                  className={classes.button}
                  onClick={toggleEditProfileOpened}
                >
                  <LuX />
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className={classes.button}
                  onClick={toggleEditProfileOpened}
                >
                  <FaEdit />
                </Button>
              )}
            </Box>
          </Box>
          {claim === ERole.TEACHER && !editProfileOpened ? (
            <TeacherProfileInfo userProfile={data} />
          ) : null}

          {claim === ERole.STUDENT && !editProfileOpened ? (
            <StudentProfileInfo userProfile={data} />
          ) : null}

          {claim === ERole.TEACHER && editProfileOpened ? (
            <EditTeacherProfile
              userProfile={data}
              toggleEditProfileOpened={toggleEditProfileOpened}
            />
          ) : null}
          {claim === ERole.STUDENT && editProfileOpened ? (
            <EditStudentProfie
              userProfile={data}
              toggleEditProfileOpenend={toggleEditProfileOpened}
            />
          ) : null}
          <ResetPasswordModal opened={resetPasswordModalOpened} close={closeResetPasswordModal} />
        </Box>
      )}
    </>
  );
};

export default UserProfileContainer;
