import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useLogoSrc } from "@/hooks/useLogoSrc";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { SidebarHeaderProps } from "@/types/SidebarHeaderProps";

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  isCollapsed,
  onToggle,
}) => {
  const logoSrc = useLogoSrc();
  const locale = useLocale();

  return (
    <div className="flex justify-between items-center gap-6 menu-header">
      <div
        className={`logo ${
          isCollapsed ? "hidden" : "block"
        } transition-opacity duration-300`}
      >
        <div className="relative left w-[150px] h-[50px]">
          <Image
            src={logoSrc}
            alt="Company logo"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            className={`object-contain transition-transform duration-300 ${
              isCollapsed ? "scale-0" : "scale-100"
            }`}
          />
        </div>
      </div>
      <Button onClick={onToggle} className="p-2 collapse-btn">
        {/* {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />} */}
        {isCollapsed ? (
          locale === "ar" ? (
            <ChevronLeft size={20} />
          ) : (
            <ChevronRight size={20} />
          )
        ) : locale === "ar" ? (
          <ChevronRight size={20} />
        ) : (
          <ChevronLeft size={20} />
        )}
      </Button>
    </div>
  );
};
