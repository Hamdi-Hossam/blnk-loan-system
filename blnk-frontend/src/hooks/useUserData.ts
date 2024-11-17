import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocale } from "next-intl";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { setUser } from "@/slices/userSlice";
import { UserData } from "@/types/UserData";

export const useUserData = () => {
  const [userData, setUserData] = useState<UserData>({
    username: "",
    first_name: "",
    last_name: "",
  });
  const dispatch = useDispatch();
  const locale = useLocale();

  useEffect(() => {
    const userStateCookie = Cookies.get("userState");
    if (userStateCookie) {
      try {
        const parsedUserState = JSON.parse(userStateCookie);
        setUserData({
          username: parsedUserState.username || "Guest",
          first_name: parsedUserState.first_name || "Unknown",
          last_name: parsedUserState.last_name || "Unknown",
        });
        dispatch(setUser(parsedUserState));
      } catch (error) {
        console.error("Error parsing user state from cookie:", error);
        toast.error("Error parsing user state from cookie");
      }
    }
  }, [dispatch, locale]);

  return userData;
};
