import { useEffect, useCallback, useState } from "react";

import { useRouter } from "next/router";

import { showNotification } from "@mantine/notifications";

import {
  ACCESS_TOKEN_LOCAL_STORAGE_KEY,
  NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS,
} from "../constants/app.constants";
import { useAppDispatch } from "../redux/hooks";
import { clearUser } from "../redux/reducers/user.reducer";
import { getFromLocalStorage } from "../utils/localStorage";

const AUTO_LOGOUT_TIME_IN_MINUTES = 30;
const AUTO_LOGOUT_TIME_IN_MILLISECONDS = AUTO_LOGOUT_TIME_IN_MINUTES * 60 * 1000;

const useAutoLogout = () => {
  const [lastActivityTime, setLastActivityTime] = useState<number>(Date.now());
  const dispatch = useAppDispatch();
  const router = useRouter();

  const resetTimer = useCallback(() => {
    setLastActivityTime(Date.now());
  }, []);

  const handleLogout = useCallback(() => {
    const accessToken = getFromLocalStorage(ACCESS_TOKEN_LOCAL_STORAGE_KEY);

    if (accessToken) {
      localStorage.clear();
      dispatch(clearUser());
      router.reload();

      showNotification({
        title: "Logged Out",
        message: "You are logged out due to inactivity",
        autoClose: NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS,
        color: "yellow",
      });
    }
  }, [router, dispatch]);

  useEffect(() => {
    const activityEvents = ["mousemove", "click", "keypress", "scroll", "touchstart"];

    const updateLastActivity = () => resetTimer();

    activityEvents.forEach((event) => window.addEventListener(event, updateLastActivity));

    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime - lastActivityTime >= AUTO_LOGOUT_TIME_IN_MILLISECONDS) {
        handleLogout();
      }
    }, 1000);

    return () => {
      activityEvents.forEach((event) => window.removeEventListener(event, updateLastActivity));
      clearInterval(intervalId);
    };
  }, [lastActivityTime, handleLogout, resetTimer]);

  return null;
};

export default useAutoLogout;
