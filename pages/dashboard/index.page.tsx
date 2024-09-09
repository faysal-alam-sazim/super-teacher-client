import React from "react";

import DashboardContainer from "@/modules/UserDashboard/containers/DashboardContainer";
import AuthGuard from "@/shared/components/wrappers/AuthGuard/AuthGuard";

const Dashboard = () => (
  <AuthGuard>
    <DashboardContainer />
  </AuthGuard>
);

export default Dashboard;
