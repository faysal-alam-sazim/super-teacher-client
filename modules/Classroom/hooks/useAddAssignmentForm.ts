import { showNotification } from "@mantine/notifications";

import { NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS } from "@/shared/constants/app.constants";
import { useCreateAssignmentMutation } from "@/shared/redux/rtk-apis/assignments/assignments.api";
import { TAddAssignmentInfoDto } from "@/shared/redux/rtk-apis/assignments/assignments.types";
import { parseApiErrorMessage } from "@/shared/utils/errors";

import { TAddAssignmentFromData } from "../components/AddAssignmentModal/AddAssignmentModal.types";

const useAddAssignmentForm = (classroomId: number) => {
  const [createAssignment, { isLoading }] = useCreateAssignmentMutation();

  const onSubmit = async (data: TAddAssignmentFromData) => {
    const newAssignment: TAddAssignmentInfoDto = {
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
    };

    try {
      await createAssignment({
        id: classroomId,
        newAssignment,
        assignmentFile: data.uploadFile,
      }).unwrap();

      showNotification({
        title: "Success",
        message: "Assignment Added Successfully!",
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

export default useAddAssignmentForm;
