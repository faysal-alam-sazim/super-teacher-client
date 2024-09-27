import { useRouter } from "next/router";

import { ActionIcon, Box, Flex, Image, Menu, SimpleGrid, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import dayjs from "dayjs";
import { BsInfoSquare, BsThreeDots } from "react-icons/bs";

import DeleteConfirmationModal from "@/shared/components/DeleteConfirmationModal";
import { NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS } from "@/shared/constants/app.constants";
import { useAppSelector } from "@/shared/redux/hooks";
import { authenticatedUserSelector } from "@/shared/redux/reducers/user.reducer";
import { useDeleteClassroomMutation } from "@/shared/redux/rtk-apis/classrooms/classrooms.api";
import { ERole } from "@/shared/typedefs";
import { parseApiErrorMessage } from "@/shared/utils/errors";

import EditClassroomModal from "../EditClassroomModal/EditClassroomModal";
import { useBannerStyles } from "./ClassroomBanner.styles";
import { TClassroomBannerProps } from "./ClassroomBanner.types";

const ClassroomBanner = ({ classroom }: TClassroomBannerProps) => {
  const { classes } = useBannerStyles();

  const [
    editClassroomModalOpened,
    { open: openEditClassroomModal, close: closeEditClassroomModal },
  ] = useDisclosure(false);

  const [
    deleteClassroomModalOpened,
    { open: openDeleteClassroomModal, close: closeDeleteClassroomModal },
  ] = useDisclosure(false);

  const { claim } = useAppSelector(authenticatedUserSelector);

  const router = useRouter();

  const [deleteClassroom] = useDeleteClassroomMutation();

  const handleDeleteClassroom = async () => {
    try {
      await deleteClassroom(classroom.id).unwrap();

      router.push("/dashboard");

      showNotification({
        title: "Success",
        message: "Classroom Deleted Successfully!",
        autoClose: NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS,
        color: "green",
      });
    } catch (error) {
      const errorMessage = parseApiErrorMessage(error);

      showNotification({
        title: "Error",
        message: errorMessage,
        autoClose: NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS,
        color: "red",
      });
    }
  };

  return (
    <Box className={classes.banner}>
      <Image src="/bg_classroom.png" alt="Classroom" height={260} radius={"md"} />
      <Box className={classes.dropdownButton}>
        {claim === ERole.TEACHER ? (
          <Menu shadow="xl" offset={-1} withArrow arrowPosition="center" position="bottom-end">
            <Menu.Target>
              <ActionIcon variant="transparent">
                <BsThreeDots color="white" />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={openEditClassroomModal}>Edit</Menu.Item>
              <Menu.Item color="red" onClick={openDeleteClassroomModal}>
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : null}
      </Box>

      <Box className={classes.bannerTitle}>
        <Flex justify={"space-between"} align={"center"}>
          <Title>{classroom.title}</Title>
          <Box className={classes.classDetails}>
            <Menu shadow="xl" offset={-1} withArrow arrowPosition="center" position="bottom-end">
              <Menu.Target>
                <ActionIcon variant="transparent">
                  <BsInfoSquare color="white" />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item>
                  <SimpleGrid p={"xs"}>
                    <Text size="sm">Subject: {classroom.subject}</Text>
                    <Text size="sm">
                      Class Time: {dayjs(classroom.classTime).format("hh:mm A")}
                    </Text>
                    <Text size="sm">Days: {classroom.days.join(", ")}</Text>
                  </SimpleGrid>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Box>
        </Flex>
      </Box>
      <EditClassroomModal
        opened={editClassroomModalOpened}
        close={closeEditClassroomModal}
        classroom={classroom}
      />
      <DeleteConfirmationModal
        opened={deleteClassroomModalOpened}
        close={closeDeleteClassroomModal}
        onDeleteAction={handleDeleteClassroom}
      />
    </Box>
  );
};

export default ClassroomBanner;
