import { useState } from "react";

import { useRouter } from "next/router";

import { showNotification } from "@mantine/notifications";

import { useSessionContext } from "@/shared/components/wrappers/AppInitializer/AppInitializerContext";
import {
  ACCESS_TOKEN_LOCAL_STORAGE_KEY,
  NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS,
} from "@/shared/constants/app.constants";
import { useAppDispatch } from "@/shared/redux/hooks";
import { setUser } from "@/shared/redux/reducers/user.reducer";
import { useLoginMutation } from "@/shared/redux/rtk-apis/auth/auth.api";
import { parseApiErrorMessage } from "@/shared/utils/errors";
import { setInLocalStorage } from "@/shared/utils/localStorage";

import { TLoginFormData } from "../components/LoginForm.types";

const useLoginFormData = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getMe } = useSessionContext();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const router = useRouter();

  const onSubmit = async (data: TLoginFormData) => {
    setIsSubmitting(true);
    try {
      const res = await login(data).unwrap();
      setInLocalStorage(ACCESS_TOKEN_LOCAL_STORAGE_KEY, res.accessToken);
      dispatch(setUser(res.user));
      await getMe().unwrap();
      router.push("/dashboard");
    } catch (error) {
      showNotification({
        title: "Login Unsuccessfull",
        message: parseApiErrorMessage(error),
        autoClose: NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS,
        color: "red",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { onSubmit, isSubmitting };
};

export default useLoginFormData;
