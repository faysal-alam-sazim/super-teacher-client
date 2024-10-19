import { useRouter } from "next/router";

import { showNotification } from "@mantine/notifications";

import { useSessionContext } from "@/shared/components/wrappers/AppInitializer/AppInitializerContext";
import {
  ACCESS_TOKEN_LOCAL_STORAGE_KEY,
  NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS,
} from "@/shared/constants/app.constants";
import { useAppDispatch } from "@/shared/redux/hooks";
import { setCounter } from "@/shared/redux/reducers/counter.reducer";
import { setUser } from "@/shared/redux/reducers/user.reducer";
import { useRegisterMutation } from "@/shared/redux/rtk-apis/auth/auth.api";
import { ERole, IUserDto } from "@/shared/typedefs";
import { getApiErrorAttemptRemaining, parseApiErrorMessage } from "@/shared/utils/errors";
import { setInLocalStorage } from "@/shared/utils/localStorage";

import { TTeacherRegistrationFormData } from "../components/TeacherRegistrationForm/TeacherRegistrationForm.types";

const useTeacherRegistration = () => {
  const [register] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const { getMe } = useSessionContext();
  const router = useRouter();

  const onSubmit = async (data: TTeacherRegistrationFormData) => {
    const newTeacher: IUserDto = {
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
      const res = await register(newTeacher).unwrap();

      if (res) {
        setInLocalStorage(ACCESS_TOKEN_LOCAL_STORAGE_KEY, res.accessToken);
        dispatch(setUser(res.user));
        await getMe().unwrap();
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
