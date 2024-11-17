"use client";

import Image from "next/image";
import { ModeToggle } from "./ModeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLogoSrc } from "@/hooks/useLogoSrc";

const AuthHeader: React.FC = () => {
  const logoSrc = useLogoSrc();

  return (
    <header className="p-4 auth-header" role="banner">
      <div className="flex justify-between items-center auth-content">
        <div className="relative left w-[150px] h-[50px]">
          <Image
            src={logoSrc}
            alt="Company logo"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            className="object-contain"
          />
        </div>
        <nav className="right flex gap-2" role="navigation">
          <LanguageSwitcher />
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
};

export default AuthHeader;
