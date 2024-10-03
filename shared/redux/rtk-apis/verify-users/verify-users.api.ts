import projectApi from "../api.config";
import { TVerificationResponse, TVerifyEmailDto, TVerifyOtpDto } from "./verify-users.types";

const verifyUsersApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    verifyEmail: builder.mutation<TVerificationResponse, TVerifyEmailDto>({
      query: (verifyEmailDto) => ({
        url: "verify-users/email",
        method: "POST",
        body: verifyEmailDto,
      }),
    }),
    verifyOtp: builder.mutation<TVerificationResponse, TVerifyOtpDto>({
      query: (verifyOtpDto) => ({
        url: "verify-users/otp",
        method: "POST",
        body: verifyOtpDto,
      }),
    }),
  }),
});

export const { useVerifyEmailMutation, useVerifyOtpMutation } = verifyUsersApi;
