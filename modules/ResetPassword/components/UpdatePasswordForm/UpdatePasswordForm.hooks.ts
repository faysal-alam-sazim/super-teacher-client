import { showNotification } from "@mantine/notifications";

import { NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS } from "@/shared/constants/app.constants";
import { useUpdatePasswordMutation } from "@/shared/redux/rtk-apis/users/users.api";
import { TUpdatePasswordDto } from "@/shared/redux/rtk-apis/users/users.types";
import { parseApiErrorMessage } from "@/shared/utils/errors";

import { TUpdatePasswordFormData } from "./UpdatePasswordForm.types";

const useUpdatePasswordForm = () => {
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const onSubmit = async (data: TUpdatePasswordFormData, email: string, otp: string) => {
    const updatePasswordDto: TUpdatePasswordDto = {
      email: email,
      newPassword: data.newPassword,
      otp,
    };

    try {
      await updatePassword(updatePasswordDto).unwrap();

      showNotification({
        title: "Success",
        message: "Password updated successfully",
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

export default useUpdatePasswordForm;
