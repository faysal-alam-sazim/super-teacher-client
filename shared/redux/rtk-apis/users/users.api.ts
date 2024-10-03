import { IUserDto, TApiResponse } from "@/shared/typedefs";

import projectApi from "../api.config";
import { TLoginResponse, TTokenizedUser } from "../auth/auth.types";
import {
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

    register: builder.mutation<TLoginResponse, IUserDto>({
      query: (newUser) => ({
        url: "users/signup",
        method: "POST",
        body: newUser,
      }),
      transformResponse: (response: TApiResponse<TLoginResponse>) => response.data,
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
  }),
  overrideExisting: false,
});

export const {
  useMeQuery,
  useLazyMeQuery,
  useRegisterMutation,
  useGetStudentsQuery,
  useGetUserProfileQuery,
  useUpdateUserMutation,
  useUpdatePasswordMutation,
} = usersApi;
