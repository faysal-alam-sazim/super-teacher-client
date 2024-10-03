import { ERenderFieldType } from "../../containers/ForgetPassword/ForgetPassword.enums";

export type TVerifyOtpFormProps = {
  setRenderingType: (value: ERenderFieldType) => void;
  setOtp: (value: string) => void;
  email: string;
};

export type TVerifyOtpForm = {
  otp: string;
};
