import React from "react";
import { useUserData } from "@/hooks/useUserData";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserInfoProps } from "@/types/UserInfoProps";

export const UserInfo: React.FC<UserInfoProps> = ({ isCollapsed }) => {
  const { username, first_name, last_name } = useUserData();
  const avatarFallback =
    first_name.slice(0, 1).toUpperCase() + last_name.slice(0, 1).toUpperCase();

  return (
    <div className="flex flex-col justify-center items-center gap-2 p-2 user-info">
      <Avatar>
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      <div
        className={`flex flex-col ${
          isCollapsed ? "hidden" : "block"
        } text-center`}
      >
        <span className="font-semibold">{username}</span>
        <span className="text-gray-600 text-sm dark:text-gray-400">
          {first_name + " " + last_name}
        </span>
      </div>
    </div>
  );
};
