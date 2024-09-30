import { showNotification } from "@mantine/notifications";

import { NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS } from "@/shared/constants/app.constants";
import { useAppDispatch } from "@/shared/redux/hooks";
import { setUser } from "@/shared/redux/reducers/user.reducer";
import { useUpdateUserMutation } from "@/shared/redux/rtk-apis/users/users.api";
import { TUpdateUserDto } from "@/shared/redux/rtk-apis/users/users.types";
import { parseApiErrorMessage } from "@/shared/utils/errors";

import { TEditStudentProfileFormData } from "./EditStudentProfile.types";

const useUpdateStudentForm = () => {
  const dispatch = useAppDispatch();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const onSubmit = async (data: TEditStudentProfileFormData) => {
    const updatedUser: TUpdateUserDto = {
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      studentInput: {
        address: data.address,
        phoneNumber: data.phoneNumber,
        educationLevel: data.educationLevel,
        medium: data.medium || undefined,
        degree: data.degree || undefined,
        class: data.class || undefined,
        degreeName: data.degreeName || undefined,
        semesterYear: data.semesterYear || undefined,
      },
    };

    try {
      const res = await updateUser(updatedUser).unwrap();
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

export default useUpdateStudentForm;
