import { showNotification } from "@mantine/notifications";

import { NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS } from "@/shared/constants/app.constants";
import { useAddSubmissionMutation } from "@/shared/redux/rtk-apis/assignment_submissions/assignment-submissions.api";
import { parseApiErrorMessage } from "@/shared/utils/errors";

import { TAssignmentSubmissionFormData } from "../components/AddAssignmentSubmissionModal/AddAssignmentSubmissionModal.types";

const useAddAssignmentSubmissionForm = (classroomId: number) => {
  const [addSubmission, { isLoading }] = useAddSubmissionMutation();

  const onSubmit = async (
    data: TAssignmentSubmissionFormData,
    assignmentId: number,
    userId: number,
  ) => {
    try {
      await addSubmission({
        classroomId,
        assignmentId,
        submissionFile: data.uploadFile,
        userId,
      }).unwrap();

      showNotification({
        title: "Success",
        message: "Assignment Submitted Successfully!",
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

  return { onSubmit, isLoading };
};

export default useAddAssignmentSubmissionForm;
