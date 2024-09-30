import { TApiResponse } from "@/shared/typedefs";

import projectApi from "../api.config";
import { TSubmission } from "./assignment-submissions.types";

const assignmentSubmissionsApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    addSubmission: builder.mutation<TSubmission, { assignmentId: number; submissionFile: File }>({
      query: ({ assignmentId, submissionFile }) => {
        const formData = new FormData();
        formData.append("file", submissionFile);

        return {
          url: `assignments/${assignmentId}/submissions`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (_result, _error, { assignmentId }) => [
        { type: "AssignmentSubmissions", assignmentId },
      ],
      transformResponse: (response: TApiResponse<TSubmission>) => response.data,
    }),
  }),
});

export const { useAddSubmissionMutation } = assignmentSubmissionsApi;
