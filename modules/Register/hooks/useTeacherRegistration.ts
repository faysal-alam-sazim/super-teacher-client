import { useRouter } from "next/router";

import { showNotification } from "@mantine/notifications";
import { useDispatch } from "react-redux";

import { NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS } from "@/shared/constants/app.constants";
import { setCounter } from "@/shared/redux/reducers/counter.reducer";
import { useRegisterTeacherMutation } from "@/shared/redux/rtk-apis/users/users.api";
import { ERole, ICreateTeacherDto } from "@/shared/typedefs";
import { getApiErrorAttemptRemaining, parseApiErrorMessage } from "@/shared/utils/errors";

import { TTeacherRegistrationFormData } from "../components/TeacherRegistrationForm/TeacherRegistrationForm.types";

const useTeacherRegistration = () => {
  const [registerTeacher] = useRegisterTeacherMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (data: TTeacherRegistrationFormData) => {
    const newTeacher: ICreateTeacherDto = {
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      role: ERole.TEACHER,
      email: data.email,
      password: data.confirmPassword,
      teacherInput: {
        code: data.uniqueCode,
        majorSubject: data.majorSubject,
        highestEducationLevel: data.highestEducationLevel,
        subjectsToTeach: data.subjectsToTeach,
      },
    };

    try {
      const res = await registerTeacher(newTeacher).unwrap();
      if (res) {
        router.push("/dashboard");
        showNotification({
          title: "Success",
          message: "Registered Successfully",
          autoClose: NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS,
          color: "green",
        });
      }
    } catch (error) {
      const attemptRemaining = getApiErrorAttemptRemaining(error);
      const errorMessage = parseApiErrorMessage(error);
      if (attemptRemaining !== undefined) {
        dispatch(setCounter(attemptRemaining));
      }

      showNotification({
        title: "Error",
        message: errorMessage,
        autoClose: NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS,
        color: "red",
      });
    }
  };

  return { onSubmit };
};

export default useTeacherRegistration;
