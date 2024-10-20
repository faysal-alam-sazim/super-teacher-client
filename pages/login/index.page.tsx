import React, { useEffect } from "react";

import { useRouter } from "next/router";

import { showNotification } from "@mantine/notifications";

import LoginContainer from "@/modules/Login/containers/LoginContainer";
import LoadingComponent from "@/shared/components/LoadingComponent";
import { useSessionContext } from "@/shared/components/wrappers/AppInitializer/AppInitializerContext";
import { NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS } from "@/shared/constants/app.constants";

const LoginPage = () => {
  const router = useRouter();
  const { isLoading, user } = useSessionContext();

  useEffect(() => {
    if (isLoading || typeof location === "undefined") return;

    if (user) {
      router.push("/dashboard");
      showNotification({
        title: "Error",
        message: "You need to logout first",
        autoClose: NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS,
        color: "yellow",
      });
    }
  }, [isLoading, user, router]);

  if (isLoading || user) return <LoadingComponent visible />;
  return <LoginContainer />;
};

export default LoginPage;
