import { ERenderFieldType } from "../../containers/ForgetPassword/ForgetPassword.enums";

export type TVerifyEmailFormProps = {
  close: () => void;
  setRenderingType: (value: ERenderFieldType) => void;
};

export type TVerifyEmailForm = {
  email: string;
};
