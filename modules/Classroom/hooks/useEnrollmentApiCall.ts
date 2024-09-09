import { showNotification } from "@mantine/notifications";

import { NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS } from "@/shared/constants/app.constants";
import {
  useEnrollStudentMutation,
  useRemoveStudentMutation,
} from "@/shared/redux/rtk-apis/classrooms/classrooms.api";
import { parseApiErrorMessage } from "@/shared/utils/errors";

const useEnrollmentApiCall = () => {
  const [enrollStudent] = useEnrollStudentMutation();
  const [deleteStudent] = useRemoveStudentMutation();

  const addStudent = async (classroomId: number, studentId: number) => {
    try {
      await enrollStudent({ classroomId, studentId }).unwrap();
      showNotification({
        title: "Success",
        message: "Student Enrolled Successfully",
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

  const removeStudent = async (classroomId: number, studentId: number) => {
    try {
      await deleteStudent({ classroomId, studentId }).unwrap();
      showNotification({
        title: "Success",
        message: "Student Removed Successfully",
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
  return { addStudent, removeStudent };
};

export default useEnrollmentApiCall;
