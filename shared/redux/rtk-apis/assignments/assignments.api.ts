import { TApiResponse, TDeleteApiResponse } from "@/shared/typedefs";

import projectApi from "../api.config";
import { TAssignment, TAddAssignmentInfoDto, TEditAssignmentInfoDto } from "./assignments.types";

const assignmentsApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    getAssignments: builder.query<TAssignment[], number>({
      query: (id) => `classrooms/${id}/assignments`,
      providesTags: (_result, _error, id) => [{ type: "ClassroomAssignments", id }],
      transformResponse: (response: TApiResponse<TAssignment[]>) => response.data,
    }),

    getAssignmentDownloadUrl: builder.query<string, { classroomId: number; assignmentId: number }>({
      query: ({ classroomId, assignmentId }) =>
        `classrooms/${classroomId}/assignments/${assignmentId}`,
      transformResponse: (response: TApiResponse<string>) => response.data,
    }),

    createAssignment: builder.mutation<
      TAssignment,
      { id: number; newAssignment: TAddAssignmentInfoDto; assignmentFile: File }
    >({
      query: ({ id, newAssignment, assignmentFile }) => {
        const formData = new FormData();
        formData.append("file", assignmentFile);

        Object.entries(newAssignment).forEach(([key, value]) => {
          if (key === "dueDate" && value instanceof Date) {
            formData.append(key, value.toISOString());
          } else {
            formData.append(key, value.toString());
          }
        });

        return {
          url: `classrooms/${id}/assignments`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: "ClassroomAssignments", id }],
      transformResponse: (response: TApiResponse<TAssignment>) => response.data,
    }),

    updateAssignment: builder.mutation<
      TAssignment,
      {
        classroomId: number;
        updatedAssignment: TEditAssignmentInfoDto;
        assignmentFile: File;
        assignmentId: number;
      }
    >({
      query: ({ classroomId, updatedAssignment, assignmentFile, assignmentId }) => {
        const formData = new FormData();
        formData.append("file", assignmentFile);

        Object.entries(updatedAssignment).forEach(([key, value]) => {
          if (key === "dueDate" && value instanceof Date) {
            formData.append(key, value.toISOString());
          } else {
            formData.append(key, value.toString());
          }
        });

        return {
          url: `classrooms/${classroomId}/assignments/${assignmentId}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: (_result, _error, { classroomId }) => [
        { type: "ClassroomAssignments", classroomId },
      ],
      transformResponse: (response: TApiResponse<TAssignment>) => response.data,
    }),

    deleteAssignments: builder.mutation<
      TDeleteApiResponse,
      { classroomId: number; assignmentId: number }
    >({
      query: ({ classroomId, assignmentId }) => ({
        url: `classrooms/${classroomId}/assignments/${assignmentId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { classroomId }) => [
        { type: "ClassroomAssignments", classroomId },
      ],
    }),
  }),
});

export const {
  useGetAssignmentsQuery,
  useCreateAssignmentMutation,
  useUpdateAssignmentMutation,
  useDeleteAssignmentsMutation,
  useGetAssignmentDownloadUrlQuery,
} = assignmentsApi;
