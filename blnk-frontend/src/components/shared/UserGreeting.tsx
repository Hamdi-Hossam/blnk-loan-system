import React from "react";
import { UserGreetingProps } from "@/types/UserGreetingProps";
import { useTranslations } from "next-intl";

export const UserGreeting: React.FC<UserGreetingProps> = ({
  userName,
  fontClass,
}) => {
  const t = useTranslations("Header");
  return (
    <div className="left">
      <p className={`${fontClass} text-xl md:text-3xl`}>
        {t("userGreetings")} {""}
        <span className="text-secondary">{userName}</span>
      </p>
    </div>
  );
};
