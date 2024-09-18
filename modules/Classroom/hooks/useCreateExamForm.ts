import { showNotification } from "@mantine/notifications";

import { NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS } from "@/shared/constants/app.constants";
import { useCreateExamMutation } from "@/shared/redux/rtk-apis/exams/exams.api";
import { TCreateExamDto } from "@/shared/redux/rtk-apis/exams/exams.types";
import { parseApiErrorMessage } from "@/shared/utils/errors";

import { TCreateExamFormData } from "../components/CreateExamModal/CreateExamModal.types";

const useCreateExamForm = (classroomId: number) => {
  const [createExam, { isLoading }] = useCreateExamMutation();

  const onSubmit = async (data: TCreateExamFormData) => {
    const newExam: TCreateExamDto = {
      title: data.title,
      instruction: data.instruction,
      date: data.dueDate,
    };

    try {
      await createExam({ id: classroomId, newExam }).unwrap();

      showNotification({
        title: "Success",
        message: "Exam Created Successfully!",
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

export default useCreateExamForm;
