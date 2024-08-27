import { ICreateStudentDto, ICreateTeacherDto, TApiResponse } from "@/shared/typedefs";

import projectApi from "../api.config";
import { TTokenizedUser } from "../auth/auth.types";

const usersApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<TTokenizedUser, void>({
      query: () => "users/me",
      transformResponse: (response: TApiResponse<TTokenizedUser>) => response.data,
    }),

    registerStudent: builder.mutation<ICreateStudentDto, ICreateStudentDto>({
      query: (newStudent) => ({
        url: "users/student",
        method: "POST",
        body: newStudent,
      }),
    }),

    registerTeacher: builder.mutation<ICreateTeacherDto, ICreateTeacherDto>({
      query: (newTeacher) => ({
        url: "users/teacher",
        method: "POST",
        body: newTeacher,
      }),
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
