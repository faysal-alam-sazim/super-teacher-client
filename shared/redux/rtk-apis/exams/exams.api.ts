import { TApiResponse, TDeleteApiResponse } from "@/shared/typedefs";

import projectApi from "../api.config";
import { TCreateExamDto, TEditExamDto, TExam } from "./exams.types";

const examsApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    getExams: builder.query<TExam[], number>({
      query: (id) => `classrooms/${id}/exams`,
      providesTags: (_result, _error, id) => [{ type: "ClassroomExams", id }],
      transformResponse: (response: TApiResponse<TExam[]>) => response.data,
    }),

    createExam: builder.mutation<TExam, { id: number; newExam: TCreateExamDto }>({
      query: ({ id, newExam }) => ({
        url: `classrooms/${id}/exams`,
        method: "POST",
        body: newExam,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "ClassroomExams", id: id }],
      transformResponse: (response: TApiResponse<TExam>) => response.data,
    }),

    editExam: builder.mutation<
      TExam,
      { classroomId: number; updatedExam: TEditExamDto; examId: number }
    >({
      query: ({ classroomId, updatedExam, examId }) => ({
        url: `classrooms/${classroomId}/exams/${examId}`,
        method: "PATCH",
        body: updatedExam,
      }),
      invalidatesTags: (_result, _error, { classroomId }) => [
        { type: "ClassroomExams", id: classroomId },
      ],
      transformResponse: (response: TApiResponse<TExam>) => response.data,
    }),

    deleteExam: builder.mutation<TDeleteApiResponse, { classroomId: number; examId: number }>({
      query: ({ classroomId, examId }) => ({
        url: `classrooms/${classroomId}/exams/${examId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { classroomId }) => [
        { type: "ClassroomExams", classroomId },
      ],
    }),
  }),
});

export const {
  useGetExamsQuery,
  useCreateExamMutation,
  useEditExamMutation,
  useDeleteExamMutation,
} = examsApi;
