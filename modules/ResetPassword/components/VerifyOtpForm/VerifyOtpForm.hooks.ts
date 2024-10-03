import { showNotification } from "@mantine/notifications";

import { NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS } from "@/shared/constants/app.constants";
import { useVerifyOtpMutation } from "@/shared/redux/rtk-apis/verify-users/verify-users.api";
import { TVerifyOtpDto } from "@/shared/redux/rtk-apis/verify-users/verify-users.types";
import { parseApiErrorMessage } from "@/shared/utils/errors";

import { TVerifyOtpForm } from "./VerifyOtpForm.types";

const useVerifyOtpForm = () => {
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const onSubmit = async (data: TVerifyOtpForm, email: string) => {
    const verifyOtpDto: TVerifyOtpDto = {
      otp: data.otp,
      email,
    };

    try {
      await verifyOtp(verifyOtpDto).unwrap();

      showNotification({
        title: "Success",
        message: "OTP is verified successfully",
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

export default useVerifyOtpForm;
