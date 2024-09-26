import { showNotification } from "@mantine/notifications";

import { NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS } from "@/shared/constants/app.constants";
import { useEditClassroomMutation } from "@/shared/redux/rtk-apis/classrooms/classrooms.api";
import { TEditClassroomDto } from "@/shared/redux/rtk-apis/classrooms/classrooms.types";
import { parseApiErrorMessage } from "@/shared/utils/errors";

import { convertTimeToDate } from "../components/EditClassroomModal/EditClassroomModal.helper";
import { TEditClassroomFormData } from "../components/EditClassroomModal/EditClassroomModal.types";

const useEditClassroomForm = (classroomId: number) => {
  const [editClassroom, { isLoading }] = useEditClassroomMutation();

  const onSubmit = async (data: TEditClassroomFormData) => {
    const updatedClassroom: TEditClassroomDto = {
      ...data,
      classTime: convertTimeToDate(data.classTime),
    };

    try {
      await editClassroom({ classroomId, updatedClassroom }).unwrap();

      showNotification({
        title: "Success",
        message: "Classroom Updated Successfully",
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

export default useEditClassroomForm;
