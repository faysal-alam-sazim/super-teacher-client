export type TVerificationResponse = {
  status: number;
  message: string;
  data: string;
};

export type TVerifyEmailDto = {
  email: string;
};

export type TVerifyOtpDto = {
  otp: string;
  email: string;
};
