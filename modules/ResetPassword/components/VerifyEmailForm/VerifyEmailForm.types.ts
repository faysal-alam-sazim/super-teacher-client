import { ERenderFieldType } from "../../containers/ForgetPassword/ForgetPassword.enums";

export type TVerifyEmailFormProps = {
  close: () => void;
  setRenderingType: (value: ERenderFieldType) => void;
  setEmail: (value: string) => void;
};

export type TVerifyEmailForm = {
  email: string;
};
