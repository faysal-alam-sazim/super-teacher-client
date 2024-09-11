import { TClassroomDetailsDto } from "@/modules/UserDashboard/components/ClassroomCreatingModal/ClassroomCreatingModal.types";
import { TApiResponse } from "@/shared/typedefs";

import projectApi from "../api.config";
import { TStudent } from "../users/users.types";
import { TClassroom, TEnrollInfo, TEnrollMentInfo } from "./classrooms.types";

const classroomsApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    getClassroomById: builder.query<TClassroom, string>({
      query: (id) => `classrooms/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Classrooms", id }],
      transformResponse: (response: TApiResponse<TClassroom>) => response.data,
    }),

    getEnrolledStudents: builder.query<TStudent[], string>({
      query: (id) => `classrooms/${id}/students`,
      providesTags: ["EnrolledStudents"],
      transformResponse: (response: TApiResponse<TStudent[]>) => response.data,
    }),

    getClassrooms: builder.query<TClassroom[], void>({
      query: () => "classrooms",
      providesTags: ["Classrooms"],
      transformResponse: (response: TApiResponse<TClassroom[]>) => response.data,
    }),

    createClassroom: builder.mutation<TClassroom, TClassroomDetailsDto>({
      query: (newClassroom) => ({
        url: "classrooms",
        method: "POST",
        body: newClassroom,
      }),
      transformResponse: (response: TApiResponse<TClassroom>) => response.data,
      invalidatesTags: ["Classrooms"],
    }),

    enrollStudent: builder.mutation<TEnrollMentInfo, { id: number; enrollmentInfo: TEnrollInfo }>({
      query: ({ id, ...rest }) => ({
        url: `classrooms/${id}/students`,
        method: "POST",
        body: rest.enrollmentInfo,
      }),
      invalidatesTags: ["EnrolledStudents"],
      transformResponse: (response: TApiResponse<TEnrollMentInfo>) => response.data,
    }),

    removeStudent: builder.mutation<
      TEnrollMentInfo,
      { id: number; removeEnrollmentInfo: TEnrollInfo }
    >({
      query: ({ id, ...rest }) => ({
        url: `classrooms/${id}/students`,
        method: "DELETE",
        body: rest.removeEnrollmentInfo,
      }),
      invalidatesTags: ["EnrolledStudents"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetClassroomsQuery,
  useCreateClassroomMutation,
  useGetClassroomByIdQuery,
  useGetEnrolledStudentsQuery,
  useEnrollStudentMutation,
  useRemoveStudentMutation,
} = classroomsApi;
