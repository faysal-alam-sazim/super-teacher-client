import { ERenderFieldType } from "../../containers/ForgetPassword/ForgetPassword.enums";

export type TVerifyOtpFormProps = {
  setRenderingType: (value: ERenderFieldType) => void;
};

export type TVerifyOtpForm = {
  otp: string;
};
