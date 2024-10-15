import { TApiResponse } from "@/shared/typedefs";

import projectApi from "../api.config";
import { TTokenizedUser } from "../auth/auth.types";
import {
  TResetPasswordDto,
  TUpdateUserDto,
  TUpdatePasswordApiResponse,
  TUpdatePasswordDto,
  TUser,
} from "./users.types";

const usersApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<TTokenizedUser, void>({
      query: () => "users/me",
      transformResponse: (response: TApiResponse<TTokenizedUser>) => response.data,
    }),

    getStudents: builder.query<TUser[], void>({
      query: () => "users/students",
      transformResponse: (response: TApiResponse<TUser[]>) => response.data,
    }),

    getUserProfile: builder.query<TUser, void>({
      query: () => "users/profile",
      providesTags: ["UsersProfile"],
      transformResponse: (response: TApiResponse<TUser>) => response.data,
    }),

    updateUser: builder.mutation<TTokenizedUser, TUpdateUserDto>({
      query: (updatedUser) => ({
        url: "users/profile",
        method: "PATCH",
        body: updatedUser,
      }),
      invalidatesTags: ["UsersProfile"],
      transformResponse: (response: TApiResponse<TTokenizedUser>) => response.data,
    }),

    updatePassword: builder.mutation<TUpdatePasswordApiResponse, TUpdatePasswordDto>({
      query: (updatePasswordDto) => ({
        url: "users/update-password",
        method: "PATCH",
        body: updatePasswordDto,
      }),
    }),

    resetPassword: builder.mutation<TUser, TResetPasswordDto>({
      query: (resetPasswordDto) => ({
        url: "users/reset-password",
        method: "PATCH",
        body: resetPasswordDto,
      }),
      transformResponse: (response: TApiResponse<TUser>) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const {
  useMeQuery,
  useLazyMeQuery,
  useGetStudentsQuery,
  useGetUserProfileQuery,
  useUpdateUserMutation,
  useUpdatePasswordMutation,
  useResetPasswordMutation,
} = usersApi;
