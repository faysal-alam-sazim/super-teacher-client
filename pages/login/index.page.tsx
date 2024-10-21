import React, { useEffect } from "react";

import { useRouter } from "next/router";

import LoginContainer from "@/modules/Login/containers/LoginContainer";
import LoadingComponent from "@/shared/components/LoadingComponent";
import { useSessionContext } from "@/shared/components/wrappers/AppInitializer/AppInitializerContext";

const LoginPage = () => {
  const router = useRouter();
  const { isLoading, user } = useSessionContext();

  useEffect(() => {
    if (isLoading || typeof location === "undefined") return;

    if (user) {
      router.push("/dashboard");
    }
  }, [isLoading, user, router]);

  if (isLoading || user) return <LoadingComponent visible />;
  return <LoginContainer />;
};

export default LoginPage;
