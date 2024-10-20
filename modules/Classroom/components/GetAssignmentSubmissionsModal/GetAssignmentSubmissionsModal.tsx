import { ActionIcon, Badge, Box, Flex, Modal, Text, Title } from "@mantine/core";
import { FaDownload } from "react-icons/fa";

import LoadingComponent from "@/shared/components/LoadingComponent";
import { useAppSelector } from "@/shared/redux/hooks";
import { authenticatedUserSelector } from "@/shared/redux/reducers/user.reducer";
import {
  useGetSubmissionsQuery,
  useLazyGetSubmissionDownloadUrlQuery,
} from "@/shared/redux/rtk-apis/assignment_submissions/assignment-submissions.api";
import { ERole } from "@/shared/typedefs";

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

  const { claim } = useAppSelector(authenticatedUserSelector);

  const { data: fetchedSubmissions, isLoading } = useGetSubmissionsQuery(
    {
      classroomId,
      assignmentId,
    },
    { skip: !classroomId || !assignmentId || claim === ERole.STUDENT },
  );

  const [getDownloadUrl, { isLoading: isDownloadLoading }] = useLazyGetSubmissionDownloadUrlQuery();

  const handleOpenFile = async (submissionId: number) => {
    const downloadUrl = await getDownloadUrl({ classroomId, submissionId }).unwrap();
    if (!isDownloadLoading) {
      window.open(downloadUrl, "_blank");
    }
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
                <ActionIcon onClick={() => handleOpenFile(submission.id)}>
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
