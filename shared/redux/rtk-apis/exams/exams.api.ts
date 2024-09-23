import { TApiResponse } from "@/shared/typedefs";

import projectApi from "../api.config";
import { TCreateExamDto, TExam } from "./exams.types";

const examsApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    createExam: builder.mutation<TExam, { id: number; newExam: TCreateExamDto }>({
      query: ({ id, newExam }) => ({
        url: `classrooms/${id}/exams`,
        method: "POST",
        body: newExam,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "ClassroomExams", id: id }],
      transformResponse: (response: TApiResponse<TExam>) => response.data,
    }),
  }),
});

export const { useCreateExamMutation } = examsApi;
