import { useEffect } from "react";

import { useRouter } from "next/router";

import HomeContainer from "@/modules/HomePage/containers/HomeContainer";
import LoadingComponent from "@/shared/components/LoadingComponent";
import NextHead from "@/shared/components/NextHead";
import { useSessionContext } from "@/shared/components/wrappers/AppInitializer/AppInitializerContext";

export default function Home() {
  const router = useRouter();
  const { isLoading, user } = useSessionContext();

  useEffect(() => {
    if (isLoading || typeof location === "undefined") return;

    if (user) {
      router.push("/dashboard");
    }
  }, [isLoading, user, router]);

  if (isLoading || user) return <LoadingComponent visible />;
  return (
    <>
      <NextHead title="Super Teacher" />
      <HomeContainer />
    </>
  );
}
