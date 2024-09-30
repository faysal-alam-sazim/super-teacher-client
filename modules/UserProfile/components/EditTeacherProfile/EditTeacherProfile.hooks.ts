import { showNotification } from "@mantine/notifications";

import { NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS } from "@/shared/constants/app.constants";
import { useAppDispatch } from "@/shared/redux/hooks";
import { setUser } from "@/shared/redux/reducers/user.reducer";
import { useUpdateUserMutation } from "@/shared/redux/rtk-apis/users/users.api";
import { TUpdateUserDto } from "@/shared/redux/rtk-apis/users/users.types";
import { parseApiErrorMessage } from "@/shared/utils/errors";

import { TEditTeacherFormData } from "./EditTeacherProfile.types";

const useUpdateTeacherForm = () => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: TEditTeacherFormData) => {
    const updateUserDto: TUpdateUserDto = {
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      teacherInput: {
        highestEducationLevel: data.highestEducationLevel,
        majorSubject: data.majorSubject,
        subjectsToTeach: data.subjectsToTeach,
      },
    };

    try {
      const res = await updateUser(updateUserDto).unwrap();
      dispatch(setUser(res));

      showNotification({
        title: "Success",
        message: "Updated Successfully",
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

export default useUpdateTeacherForm;
