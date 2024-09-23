import { ActionIcon, Badge, Box, Flex, Modal, Text, Title } from "@mantine/core";
import { FaDownload } from "react-icons/fa";

import LoadingComponent from "@/shared/components/LoadingComponent";
import { useGetSubmissionsQuery } from "@/shared/redux/rtk-apis/assignment_submissions/assignment-submissions.api";

import { isPastDueDate } from "./GetAssignmentSubmissionsModal.helper";
import { useSubmissionsStyle } from "./GetAssignmentSubmissionsModal.styles";
import { TGetAssignmentSubmissionsProps } from "./GetAssignmentSubmissionsModal.types";

const GetAssignmentSubmissionsModal = ({
  opened,
  close,
  assignmentId,
  classroomId,
  assignmentDueDate,
}: TGetAssignmentSubmissionsProps) => {
  const { classes } = useSubmissionsStyle();

  const { data: fetchedSubmissions, isLoading } = useGetSubmissionsQuery(
    {
      classroomId,
      assignmentId,
    },
    { skip: !classroomId || !assignmentId },
  );

  const handleOpenFile = (fileUrl: string) => {
    window.open(fileUrl, "_blank");
  };

  return (
    <Modal opened={opened} onClose={close} centered>
      <Title className={classes.titleText} order={4} mb={12}>
        Submissions
      </Title>
      {isLoading ? (
        <LoadingComponent visible />
      ) : (
        <Box className={classes.submissionsContainer}>
          {fetchedSubmissions?.length === 0 ? (
            <Text size={"sm"} ta={"center"}>
              No Submissions to show!
            </Text>
          ) : null}
          {fetchedSubmissions?.map((submission) => (
            <Box key={submission.id} className={classes.submission}>
              <Text>
                {submission.student.user.firstName + " " + submission.student.user.lastName}
              </Text>
              <Flex align={"center"} gap={12}>
                {isPastDueDate(submission.submittedAt, assignmentDueDate) ? (
                  <Badge size={"sm"} className={classes.badge}>
                    Late
                  </Badge>
                ) : null}
                <ActionIcon onClick={() => handleOpenFile(submission.fileUrl)}>
                  <FaDownload />
                </ActionIcon>
              </Flex>
            </Box>
          ))}
        </Box>
      )}
    </Modal>
  );
};

export default GetAssignmentSubmissionsModal;
