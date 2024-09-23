import { TApiResponse } from "@/shared/typedefs";

import projectApi from "../api.config";
import { TAssignment, TAddAssignmentInfoDto } from "./assignments.types";

const assignmentsApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    getAssignments: builder.query<TAssignment[], number>({
      query: (id) => `classrooms/${id}/assignments`,
      providesTags: (_result, _error, id) => [{ type: "ClassroomAssignments", id }],
      transformResponse: (response: TApiResponse<TAssignment[]>) => response.data,
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
  }),
});

export const { useGetAssignmentsQuery, useCreateAssignmentMutation } = assignmentsApi;
