import React from "react";

import { ActionIcon, Anchor, Box, Button, Flex, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { TbEditCircle } from "react-icons/tb";

import DeleteConfirmationModal from "@/shared/components/DeleteConfirmationModal";
import { NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS } from "@/shared/constants/app.constants";
import { useAppSelector } from "@/shared/redux/hooks";
import { authenticatedUserSelector } from "@/shared/redux/reducers/user.reducer";
import { useEditClassroomMutation } from "@/shared/redux/rtk-apis/classrooms/classrooms.api";
import { TEditClassroomDto } from "@/shared/redux/rtk-apis/classrooms/classrooms.types";
import { ERole } from "@/shared/typedefs";
import { parseApiErrorMessage } from "@/shared/utils/errors";

import AddOrEditMeetlinkModal from "../AddOrEditMeetlinkModal/AddOrEditMeetlinkModal";
import { useMeetlinkStyles } from "./ClassroomMeetlink.styles";
import { TClassroomMeetlinkProps } from "./ClassroomMeetlink.types";

const ClassroomMeetlink = ({ meetlink, classroomId }: TClassroomMeetlinkProps) => {
  const { claim } = useAppSelector(authenticatedUserSelector);
  const { classes } = useMeetlinkStyles();

  const [addMeetlinkModalOpened, { open: openAddMeetlinkModal, close: closeAddMeetlinkModal }] =
    useDisclosure(false);

  const [editMeetlinkModalOpened, { open: openEditMeetlinkModal, close: closeEditMeetlinkModal }] =
    useDisclosure(false);

  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);

  const [editClassroom] = useEditClassroomMutation();

  const handleDeleteMeetLink = async () => {
    const updatedClassroom: TEditClassroomDto = {
      meetLink: "",
    };

    try {
      await editClassroom({ classroomId, updatedClassroom }).unwrap();

      closeDeleteModal();

      showNotification({
        title: "Success",
        message: "Meet Link Removed Successfully!",
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

  if (meetlink) {
    return (
      <Box className={classes.boxDetails}>
        <Title order={4}>Meet Link</Title>
        <Flex justify={"center"} align={"center"} gap={12} mt={6}>
          <Anchor href={meetlink} size="sm">
            {meetlink.split("//")[1]}
          </Anchor>
          {claim === ERole.TEACHER ? (
            <>
              <ActionIcon onClick={openEditMeetlinkModal}>
                <TbEditCircle />
              </ActionIcon>
              <ActionIcon onClick={openDeleteModal}>
                <FaTrashAlt className={classes.icon} />
              </ActionIcon>
            </>
          ) : null}
        </Flex>
        <AddOrEditMeetlinkModal
          opened={editMeetlinkModalOpened}
          close={closeEditMeetlinkModal}
          meetlink={meetlink}
          classroomId={classroomId}
        />
        <DeleteConfirmationModal
          opened={deleteModalOpened}
          close={closeDeleteModal}
          onDeleteAction={handleDeleteMeetLink}
        />
      </Box>
    );
  }
  if (claim === ERole.TEACHER) {
    return (
      <>
        <Button
          w={"100%"}
          variant="outline"
          mb={10}
          c={"green"}
          color="green"
          leftIcon={<FaPlus />}
          onClick={openAddMeetlinkModal}
        >
          Add meet link
        </Button>
        <AddOrEditMeetlinkModal
          opened={addMeetlinkModalOpened}
          close={closeAddMeetlinkModal}
          classroomId={classroomId}
        />
      </>
    );
  }

  return null;
};

export default ClassroomMeetlink;
