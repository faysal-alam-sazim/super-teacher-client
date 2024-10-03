import { showNotification } from "@mantine/notifications";

import { NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS } from "@/shared/constants/app.constants";
import { useVerifyEmailMutation } from "@/shared/redux/rtk-apis/verify-users/verify-users.api";
import { TVerifyEmailDto } from "@/shared/redux/rtk-apis/verify-users/verify-users.types";
import { parseApiErrorMessage } from "@/shared/utils/errors";

import { TVerifyEmailForm } from "./VerifyEmailForm.types";

const useVerifyEmailForm = () => {
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

  const onSubmit = async (data: TVerifyEmailForm) => {
    const verifyEmailDto: TVerifyEmailDto = {
      email: data.email,
    };

    try {
      await verifyEmail(verifyEmailDto).unwrap();

      showNotification({
        title: "Success",
        message: "OTP is sent to this email",
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

export default useVerifyEmailForm;
