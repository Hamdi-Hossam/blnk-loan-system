import React from "react";
import { Link } from "@/i18n/routing";
import {
  Home,
  Upload,
  Database,
  ImageUp,
  BookImage,
  Users,
} from "lucide-react";
import Cookies from "js-cookie";
import { useFont } from "@/hooks/useFont";
import { SidebarMenuProps } from "@/types/SidebarMenuProps";
import { MenuSectionProps } from "@/types/MenuSectionProps";
import { useTranslations } from "next-intl";

export const SidebarMenu: React.FC<SidebarMenuProps> = ({ isCollapsed }) => {
  const user = Cookies.get("user");
  let roleId;

  if (user) {
    try {
      // Decode URI component if the cookie value is URI encoded
      const decodedState = decodeURIComponent(user);
      // Parse the JSON string
      const parsedState = JSON.parse(decodedState);
      // Access the role_id
      roleId = parsedState.role_id;
    } catch (error) {
      console.error("Error parsing user cookie:", error);
    }
  } else {
    console.log("user cookie not found.");
  }

  const font = useFont();
  const translations = {
    loanFunds: useTranslations("Sidebar.loanFunds"),
    requestedLoans: useTranslations("Sidebar.requestedLoans"),
    editedLoans: useTranslations("Sidebar.editedLoans"),
    loanFundsProv: useTranslations("Sidebar.loanFundsProv"),
    images: useTranslations("Sidebar.images"),
    users: useTranslations("Sidebar.users"),
  };

  const menuSections = [
    {
      condition: [1].includes(roleId),
      items: [
        {
          href: "/home/loan-funds/all",
          icon: <Home size={20} />,
          label: translations.loanFundsProv("allLoanFunds"),
        },
      ],
    },
    {
      condition: [2].includes(roleId),
      items: [
        {
          href: "/home/loan-funds/customers",
          icon: <Home size={20} />,
          label: translations.loanFunds("allLoanFunds"),
        },
        {
          href: "/home/loans",
          icon: <Home size={20} />,
          label: translations.loanFunds("loans"),
        },
      ],
    },
    {
      condition: [3].includes(roleId),
      items: [
        {
          href: "/home/loan-funds/create",
          icon: <Database size={20} />,
          label: translations.loanFunds("addLoanFund"),
        },
        {
          href: "/home/loans/requested",
          icon: <Database size={20} />,
          label: translations.requestedLoans("title"),
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-2 mt-4 menu-links">
      {menuSections.map(
        (section, index) =>
          section.condition && (
            <MenuSection
              key={index}
              items={section.items}
              isCollapsed={isCollapsed}
              font={font}
            />
          )
      )}
    </div>
  );
};

const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  isCollapsed,
  font,
}) => (
  <div>
    <nav className="flex flex-col gap-2">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex items-center gap-2 hover:bg-secondary/20 p-[5px] rounded"
        >
          {isCollapsed ? (
            item.icon
          ) : (
            <>
              {item.icon} {item.label}
            </>
          )}
        </Link>
      ))}
    </nav>
  </div>
);
