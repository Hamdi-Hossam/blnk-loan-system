import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useLogout } from "@/hooks/useLogout";
import { LogoutButtonProps } from "@/types/LogoutButtonProps";
import { useTranslations } from "next-intl";

export const LogoutButton: React.FC<LogoutButtonProps> = ({ isCollapsed }) => {
  const { logout } = useLogout();
  const t = useTranslations("Logout");

  return (
    <Button
      onClick={logout}
      className="flex items-center gap-2 mt-4 p-2 w-full "
    >
      <LogOut size={20} /> {isCollapsed ? "" : t("logoutBtn")}
    </Button>
  );
};
