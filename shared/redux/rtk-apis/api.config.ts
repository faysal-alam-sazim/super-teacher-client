import { createApi } from "@reduxjs/toolkit/query/react";

import baseQuery from "@/shared/redux/rtk-apis/baseQuery";

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery,
  tagTypes: [
    "Classrooms",
    "Students",
    "EnrolledStudents",
    "ClassroomMessages",
    "ClassroomExams",
    "ClassroomResources",
    "ClassroomAssignments",
    "AssignmentSubmissions",
  ],
  endpoints: () => ({}),
});

export default projectApi;
