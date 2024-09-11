import { IUserDto, TApiResponse } from "@/shared/typedefs";

import projectApi from "../api.config";
import { TLoginResponse, TTokenizedUser } from "../auth/auth.types";
import { TUser } from "./users.types";

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
  }),
  overrideExisting: false,
});

export const { useMeQuery, useLazyMeQuery, useRegisterMutation, useGetStudentsQuery } = usersApi;
