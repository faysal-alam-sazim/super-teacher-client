import { showNotification } from "@mantine/notifications";

import { NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS } from "@/shared/constants/app.constants";
import { useCreateClassroomMutation } from "@/shared/redux/rtk-apis/classrooms/classrooms.api";
import { parseApiErrorMessage } from "@/shared/utils/errors";

import { convertTimeToDate } from "../components/ClassroomCreatingModal/ClassroomCreatingForm.helper";
import {
  TClassroomDetailsDto,
  TCreateClassroomFormData,
} from "../components/ClassroomCreatingModal/ClassroomCreatingModal.types";

const useClassroomCreation = () => {
  const [createClassroom, { isLoading }] = useCreateClassroomMutation();

  const onSubmit = async (data: TCreateClassroomFormData) => {
    const classTimeDate = convertTimeToDate(data.classTime);

    const newClassroom: TClassroomDetailsDto = { ...data, classTime: classTimeDate };

    try {
      const res = await createClassroom(newClassroom).unwrap();

      if (res) {
        showNotification({
          title: "Success",
          message: "Classroom Created Successfully",
          autoClose: NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS,
          color: "green",
        });
      }
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

export default useClassroomCreation;
