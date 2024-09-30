import { TApiResponse } from "@/shared/typedefs";

import projectApi from "../api.config";
import { TSubmission } from "./assignment-submissions.types";

const assignmentSubmissionsApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubmissions: builder.query<TSubmission[], { classroomId: number; assignmentId: number }>({
      query: ({ classroomId, assignmentId }) =>
        `classrooms/${classroomId}/assignments/${assignmentId}/submissions`,
      providesTags: (_result, _error, assignmentId) => [
        { type: "AssignmentSubmissions", assignmentId },
      ],
      transformResponse: (response: TApiResponse<TSubmission[]>) => response.data,
    }),

    addSubmission: builder.mutation<
      TSubmission,
      { classroomId: number; assignmentId: number; submissionFile: File }
    >({
      query: ({ classroomId, assignmentId, submissionFile }) => {
        const formData = new FormData();
        formData.append("file", submissionFile);

        return {
          url: `classrooms/${classroomId}/assignments/${assignmentId}/submissions`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (_result, _error, { assignmentId, classroomId }) => [
        { type: "AssignmentSubmissions", assignmentId },
        { type: "ClassroomAssignments", id: classroomId },
      ],
      transformResponse: (response: TApiResponse<TSubmission>) => response.data,
    }),
  }),
});

export const { useGetSubmissionsQuery, useAddSubmissionMutation } = assignmentSubmissionsApi;
