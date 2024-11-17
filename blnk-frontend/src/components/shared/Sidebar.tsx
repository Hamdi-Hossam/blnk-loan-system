"use client";

import { useState, useCallback } from "react";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarMenu } from "./SidebarMenu";
import { UserInfo } from "./UserInfo";
import { LogoutButton } from "../auth/logout/LogoutButton";

const Sidebar = ({ initialCollapsed = false }) => {
  // State to manage sidebar collapse
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);

  // Memoized toggle function to prevent unnecessary re-renders
  const toggleSidebar = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  return (
    <aside
      className={`md:flex flex-col justify-between bg-slate-100 dark:bg-[#1b1e46] p-4 h-screen shadow-lg transition-all duration-300   ${
        isCollapsed ? " w-16" : " w-64"
      } hidden`}
    >
      {/* Top section of the sidebar */}
      <div className="top">
        <SidebarHeader isCollapsed={isCollapsed} onToggle={toggleSidebar} />
      </div>
      <div className="top overflow-y-auto ">
        <SidebarMenu isCollapsed={isCollapsed} />
      </div>

      {/* Bottom section of the sidebar */}
      <div className="bottom mt-auto">
        <UserInfo isCollapsed={isCollapsed} />
        <LogoutButton isCollapsed={isCollapsed} />
      </div>
    </aside>
  );
};

export default Sidebar;
