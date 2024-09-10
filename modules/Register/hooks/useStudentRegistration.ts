import { useRouter } from "next/router";

import { showNotification } from "@mantine/notifications";

import { useSessionContext } from "@/shared/components/wrappers/AppInitializer/AppInitializerContext";
import {
  ACCESS_TOKEN_LOCAL_STORAGE_KEY,
  NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS,
} from "@/shared/constants/app.constants";
import { useAppDispatch } from "@/shared/redux/hooks";
import { setUser } from "@/shared/redux/reducers/user.reducer";
import { useRegisterStudentMutation } from "@/shared/redux/rtk-apis/users/users.api";
import { ERole, ICreateStudentDto } from "@/shared/typedefs";
import { parseApiErrorMessage } from "@/shared/utils/errors";
import { setInLocalStorage } from "@/shared/utils/localStorage";

import { TStudentRegistrationFormData } from "../components/StudentRegistrationForm/StudentRegistrationForm.types";

const useStudentRegistration = () => {
  const [registerStudent] = useRegisterStudentMutation();
  const dispatch = useAppDispatch();
  const { getMe } = useSessionContext();
  const router = useRouter();

  const onSubmit = async (data: TStudentRegistrationFormData) => {
    const newStudent: ICreateStudentDto = {
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      role: ERole.STUDENT,
      email: data.email,
      password: data.confirmPassword,
      studentInput: {
        phoneNumber: data.phoneNumber,
        address: data.address,
        educationLevel: data.educationLevel,
        medium: data.medium,
        class: data.class,
        degree: data.degree,
        degreeName: data.degreeName,
        semesterYear: data.semesterYear,
      },
    };

    try {
      const res = await registerStudent(newStudent).unwrap();
      if (res) {
        setInLocalStorage(ACCESS_TOKEN_LOCAL_STORAGE_KEY, res.accessToken);
        dispatch(setUser(res.user));
        await getMe().unwrap();
        router.push("/dashboard");
        showNotification({
          title: "Success",
          message: "Created Successfully",
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

  return { onSubmit };
};

export default useStudentRegistration;
