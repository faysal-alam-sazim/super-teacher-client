import { showNotification } from "@mantine/notifications";

import { NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS } from "@/shared/constants/app.constants";
import { useUpdateAssignmentMutation } from "@/shared/redux/rtk-apis/assignments/assignments.api";
import { TEditAssignmentInfoDto } from "@/shared/redux/rtk-apis/assignments/assignments.types";
import { parseApiErrorMessage } from "@/shared/utils/errors";

import { TEditAssignmentFromData } from "../components/EditAssignemntModal/EditAssignmentModal.types";

const useEditAssignmentFrom = (classroomId: number) => {
  const [updateAssignment, { isLoading }] = useUpdateAssignmentMutation();

  const onSubmit = async (data: TEditAssignmentFromData, assignmentId: number) => {
    const updatedAssignment: TEditAssignmentInfoDto = {
      title: data?.title,
      description: data?.description,
      dueDate: data?.dueDate,
    };

    try {
      await updateAssignment({
        classroomId,
        updatedAssignment,
        assignmentFile: data.uploadFile,
        assignmentId,
      }).unwrap();

      showNotification({
        title: "Success",
        message: "Assignment Updated Successfully!",
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

export default useEditAssignmentFrom;
