import { TClassroomDetailsDto } from "@/modules/UserDashboard/components/ClassroomCreatingModal/ClassroomCreatingModal.types";

import projectApi from "../api.config";
import { TClassroomApiResponse } from "./classrooms.types";

const classroomsApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    createClassroom: builder.mutation<TClassroomApiResponse, TClassroomDetailsDto>({
      query: (newClassroom) => ({
        url: "classrooms",
        method: "POST",
        body: newClassroom,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateClassroomMutation } = classroomsApi;
