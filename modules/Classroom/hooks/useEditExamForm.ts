import { showNotification } from "@mantine/notifications";

import { NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS } from "@/shared/constants/app.constants";
import { useEditExamMutation } from "@/shared/redux/rtk-apis/exams/exams.api";
import { TEditExamDto } from "@/shared/redux/rtk-apis/exams/exams.types";
import { parseApiErrorMessage } from "@/shared/utils/errors";

import { TEditExamFormData } from "../components/EditExamModal/EditExamModal.types";

const useEditExamForm = (classroomId: number) => {
  const [editExam, { isLoading }] = useEditExamMutation();

  const onSubmit = async (data: TEditExamFormData, examId: number) => {
    const updatedExam: TEditExamDto = {
      title: data?.title,
      instruction: data?.instruction,
      date: data?.dueDate,
    };

    try {
      await editExam({
        classroomId,
        updatedExam,
        examId,
      }).unwrap();

      showNotification({
        title: "Success",
        message: "Exam Updated Successfully!",
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

export default useEditExamForm;
