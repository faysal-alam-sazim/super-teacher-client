import { ActionIcon, Box, Button, Flex, Menu, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import dayjs from "dayjs";
import { BsThreeDots } from "react-icons/bs";
import { FaFilePdf } from "react-icons/fa";
import { LuFileEdit } from "react-icons/lu";

import DeleteConfirmationModal from "@/shared/components/DeleteConfirmationModal";
import { NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS } from "@/shared/constants/app.constants";
import { useAppSelector } from "@/shared/redux/hooks";
import { authenticatedUserSelector } from "@/shared/redux/reducers/user.reducer";
import {
  useDeleteAssignmentsMutation,
  useGetAssignmentDownloadUrlQuery,
} from "@/shared/redux/rtk-apis/assignments/assignments.api";
import { EDateFormat, ERole } from "@/shared/typedefs";
import { parseApiErrorMessage } from "@/shared/utils/errors";

import AddAssignmentSubmissionModal from "../AddAssignmentSubmissionModal/AddAssignmentSubmissionModal";
import EditAssignmnetModal from "../EditAssignemntModal/EditAssignmentModal";
import GetAssignmentSubmissionsModal from "../GetAssignmentSubmissionsModal/GetAssignmentSubmissionsModal";
import { getSubmissionButton } from "./AssignmentCard.helper";
import { useAssignmentCardStyles } from "./AssignmentCard.styles";
import { TAssignmentCardProps } from "./AssignmentCard.types";

const AssignmentCard = ({ assignment, classroomId }: TAssignmentCardProps) => {
  const [editOpened, { open: openEdit, close: closeEditModal }] = useDisclosure(false);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);

  const [submitModalOpened, { open: openSubmitModal, close: closeSubmitModal }] =
    useDisclosure(false);

  const [submissionsModalOpened, { open: openSubmissionsModal, close: closeSubmissionsModal }] =
    useDisclosure(false);

  const [deleteAssignment] = useDeleteAssignmentsMutation();

  const { classes } = useAssignmentCardStyles(assignment.dueDate);
  const { userId, claim } = useAppSelector(authenticatedUserSelector);

  const { data: downloadUrl, isLoading: isDownloadLoading } = useGetAssignmentDownloadUrlQuery({
    classroomId,
    assignmentId: assignment.id,
  });

  const handleOpenFile = () => {
    if (!isDownloadLoading) {
      window.open(downloadUrl, "_blank");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAssignment({ classroomId, assignmentId: assignment.id }).unwrap();
      closeDeleteModal();
      showNotification({
        title: "Success",
        message: "Resource Deleted Successfully!",
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
    <Box className={classes.card}>
      <Flex justify={"space-between"}>
        <Flex align={"center"} gap={8}>
          <Box className={classes.icon}>{<LuFileEdit />}</Box>
          <Title order={5}>{assignment.title}</Title>
        </Flex>
        {claim === ERole.TEACHER ? (
          <Menu shadow="xl" offset={-1} withArrow arrowPosition="center" position="bottom-end">
            <Menu.Target>
              <ActionIcon variant="transparent">
                <BsThreeDots color="black" />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={openEdit}>Edit</Menu.Item>
              <Menu.Item onClick={openDeleteModal} color="red">
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : null}
      </Flex>
      <Text size={"sm"}>{assignment.description}</Text>
      <Box className={classes.cardEnd}>
        <Button
          className={classes.downloadButton}
          rightIcon={<FaFilePdf />}
          onClick={handleOpenFile}
        >
          Download
        </Button>
        <Flex align={"center"} gap={12} mt={12}>
          <Text className={classes.dateText}>
            <strong> Due Date:</strong> {dayjs(assignment.dueDate).format(EDateFormat.SHORT)}
          </Text>
          {claim === ERole.STUDENT ? (
            getSubmissionButton(assignment, userId || -1, openSubmitModal)
          ) : (
            <Button variant="outline" color="dark" onClick={openSubmissionsModal}>
              Submissions
            </Button>
          )}
        </Flex>
      </Box>
      <EditAssignmnetModal
        opened={editOpened}
        close={closeEditModal}
        classroomId={classroomId}
        assignment={assignment}
      />
      <DeleteConfirmationModal
        opened={deleteModalOpened}
        close={closeDeleteModal}
        onDeleteAction={handleDelete}
      />
      <AddAssignmentSubmissionModal
        opened={submitModalOpened}
        close={closeSubmitModal}
        classroomId={classroomId}
        assignmentId={assignment.id}
      />
      <GetAssignmentSubmissionsModal
        opened={submissionsModalOpened}
        close={closeSubmissionsModal}
        classroomId={classroomId}
        assignmentId={assignment.id}
        assignmentDueDate={assignment.dueDate}
      />
    </Box>
  );
};

export default AssignmentCard;
