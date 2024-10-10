import { showNotification } from "@mantine/notifications";

import { NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS } from "@/shared/constants/app.constants";
import { useResetPasswordMutation } from "@/shared/redux/rtk-apis/users/users.api";
import { TResetPasswordDto } from "@/shared/redux/rtk-apis/users/users.types";
import { parseApiErrorMessage } from "@/shared/utils/errors";

import { TResetPasswordFormData } from "./ResetPasswordModal.types";

const useResetPasswordForm = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit = async (data: TResetPasswordFormData) => {
    const resetPasswordDto: TResetPasswordDto = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };

    try {
      await resetPassword(resetPasswordDto).unwrap();

      showNotification({
        title: "Success",
        message: "Reset password is successful",
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

export default useResetPasswordForm;
