import { TApiResponse } from "@/shared/typedefs";

import projectApi from "../api.config";
import { TAssignment } from "./assignments.types";

const assignmentsApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    getAssignments: builder.query<TAssignment[], number>({
      query: (id) => `classrooms/${id}/assignments`,
      providesTags: (_result, _error, id) => [{ type: "ClassroomAssignments", id }],
      transformResponse: (response: TApiResponse<TAssignment[]>) => response.data,
    }),
  }),
});

export const { useGetAssignmentsQuery } = assignmentsApi;
