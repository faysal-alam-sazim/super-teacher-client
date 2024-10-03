import { ERenderFieldType } from "../../containers/ForgetPassword/ForgetPassword.enums";

export type TUpdatePasswordFormProps = {
  close: () => void;
  setRenderingType: (value: ERenderFieldType) => void;
  email: string;
  otp: string;
};

export type TUpdatePasswordFormData = {
  newPassword: string;
  confirmPassword: string;
};
