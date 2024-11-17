"use client";

import { useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { LanguageOptions } from "./LanguageOptions";
import { useLanguageSwitcher } from "@/hooks/useLanguageSwitcher";
import { LanguageOption } from "@/types/LanguageOption";

const LanguageSwitcher: React.FC = () => {
  const { changeLanguage } = useLanguageSwitcher();

  const languageOptions: LanguageOption[] = useMemo(
    () => [
      { code: "en", label: "en" },
      { code: "ar", label: "ar" },
    ],
    []
  );

  const dropdownContent = useMemo(
    () => (
      <LanguageOptions options={languageOptions} onSelect={changeLanguage} />
    ),
    [languageOptions, changeLanguage]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="w-[1.2rem] h-[1.2rem]" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      {dropdownContent}
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
