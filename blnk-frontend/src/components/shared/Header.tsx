"use client";

import { useUserData } from "@/hooks/useUserData";
import { useFont } from "@/hooks/useFont";
import LanguageSwitcher from "./LanguageSwitcher";
import { ModeToggle } from "./ModeToggle";
import { DrawerComponent } from "./DrawerComponent";
import { UserGreeting } from "./UserGreeting";
import { memo } from "react";

const Header = memo(() => {
  const { first_name = "Guest" } = useUserData(); // Default value for userName
  const font = useFont();

  return (
    <header className="flex justify-between items-center">
      <UserGreeting userName={first_name} fontClass={font.className} />
      <nav className="right flex gap-2" role="navigation">
        <LanguageSwitcher />
        <ModeToggle />
        <DrawerComponent />
      </nav>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
