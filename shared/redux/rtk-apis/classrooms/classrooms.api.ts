import { TClassroomDetailsDto } from "@/modules/UserDashboard/components/ClassroomCreatingModal/ClassroomCreatingModal.types";

import projectApi from "../api.config";
import { TClassroomApiResponse } from "./classrooms.types";

const classroomsApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    getClassrooms: builder.query<TClassroomApiResponse, void>({
      query: () => "classrooms",
      providesTags: ["Classrooms"],
    }),

    createClassroom: builder.mutation<TClassroomApiResponse, TClassroomDetailsDto>({
      query: (newClassroom) => ({
        url: "classrooms",
        method: "POST",
        body: newClassroom,
      }),
      invalidatesTags: ["Classrooms"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetClassroomsQuery, useCreateClassroomMutation } = classroomsApi;
