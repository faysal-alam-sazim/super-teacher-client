import { ActionIcon, Box, Flex, Menu, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import dayjs from "dayjs";
import { BsThreeDots } from "react-icons/bs";
import { LuClipboard } from "react-icons/lu";

import DeleteConfirmationModal from "@/shared/components/DeleteConfirmationModal";
import { NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS } from "@/shared/constants/app.constants";
import { useAppSelector } from "@/shared/redux/hooks";
import { authenticatedUserSelector } from "@/shared/redux/reducers/user.reducer";
import { useDeleteExamMutation } from "@/shared/redux/rtk-apis/exams/exams.api";
import { EDateFormat, ERole } from "@/shared/typedefs";
import { parseApiErrorMessage } from "@/shared/utils/errors";

import EditExamModal from "../EditExamModal/EditExamModal";
import { useExamCardStyles } from "./ExamCard.styles";
import { TExamCardProps } from "./ExamCard.types";

const ExamCard = ({ exam, classroomId }: TExamCardProps) => {
  const { classes } = useExamCardStyles(exam.date);

  const { claim } = useAppSelector(authenticatedUserSelector);

  const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);

  const [deleteExam] = useDeleteExamMutation();

  const dueDateObject = dayjs(exam.date);
  const isPastDueDate = dueDateObject.isBefore(dayjs());

  const handleDelete = async () => {
    try {
      await deleteExam({ classroomId, examId: exam.id }).unwrap();
      closeDeleteModal();
      showNotification({
        title: "Success",
        message: "Exam Deleted Successfully!",
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
          <Box className={classes.icon}>{<LuClipboard />}</Box>
          <Title order={5}>
            {exam.title} {isPastDueDate ? "(ended)" : null}
          </Title>
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
      <Text size={"sm"}>{exam.instruction}</Text>
      <Box className={classes.cardEnd}>
        <Text>
          <strong>{isPastDueDate ? "Finished on:" : "Scheduled for:"}</strong>{" "}
          {dayjs(exam.date).format(EDateFormat.SHORT)}
        </Text>
      </Box>
      <EditExamModal opened={editOpened} close={closeEdit} classroomId={classroomId} exam={exam} />
      <DeleteConfirmationModal
        opened={deleteModalOpened}
        close={closeDeleteModal}
        onDeleteAction={handleDelete}
      />
    </Box>
  );
};

export default ExamCard;
