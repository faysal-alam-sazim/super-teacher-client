import { ICreateStudentDto, TApiResponse } from "@/shared/typedefs";

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
  }),
  overrideExisting: false,
});

export const { useMeQuery, useLazyMeQuery, useRegisterStudentMutation } = usersApi;
