export type TResetPasswordModalProps = {
  opened: boolean;
  close: () => void;
};

export type TResetPasswordFormData = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
