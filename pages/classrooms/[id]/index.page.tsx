import React from "react";

import ClassroomDetailsContainer from "@/modules/Classroom/containers/ClassroomDetailsContainer/ClassroomDetailsContainer";
import AuthGuard from "@/shared/components/wrappers/AuthGuard/AuthGuard";

const ClassroomPage = () => (
  <AuthGuard>
    <ClassroomDetailsContainer />
  </AuthGuard>
);

export default ClassroomPage;
