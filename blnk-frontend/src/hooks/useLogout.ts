import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearUser } from "@/slices/userSlice";
import { useCallback } from "react";
import { toast } from "sonner";
import { logoutAction } from "@/actions/auth";
import { useLocale } from "next-intl";

export const useLogout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const locale = useLocale();

  // Memoized logout function
  const logout = useCallback(async () => {
    try {
      const result = await logoutAction();

      if (result.success) {
        // Dispatch clearUser to reset Redux state
        dispatch(clearUser());

        // Show success message
        toast.success("Logout successful");

        // Redirect to login page
        router.push(`/${locale}/auth/login`);
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch {
      toast.error("An unexpected error occurred during logout.");
    }
  }, [dispatch, router, locale]);

  return { logout };
};
