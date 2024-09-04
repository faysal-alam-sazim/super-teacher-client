import { ICreateStudentDto, ICreateTeacherDto, TApiResponse } from "@/shared/typedefs";

import projectApi from "../api.config";
import { TLoginResponse, TTokenizedUser } from "../auth/auth.types";

const usersApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<TTokenizedUser, void>({
      query: () => "users/me",
      transformResponse: (response: TApiResponse<TTokenizedUser>) => response.data,
    }),

    registerStudent: builder.mutation<TLoginResponse, ICreateStudentDto>({
      query: (newStudent) => ({
        url: "users/signup/student",
        method: "POST",
        body: newStudent,
      }),
      transformResponse: (response: TApiResponse<TLoginResponse>) => response.data,
    }),

    registerTeacher: builder.mutation<TLoginResponse, ICreateTeacherDto>({
      query: (newTeacher) => ({
        url: "users/signup/teacher",
        method: "POST",
        body: newTeacher,
      }),
      transformResponse: (response: TApiResponse<TLoginResponse>) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const {
  useMeQuery,
  useLazyMeQuery,
  useRegisterStudentMutation,
  useRegisterTeacherMutation,
} = usersApi;
