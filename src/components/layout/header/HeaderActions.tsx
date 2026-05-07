"use client";
import React, { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { MailIcon, BellIcon, SearchIcon, CategoryIcon, QrIcon } from "@/icons";
import ActionIcon from "./ActionIcon";
import MailDropdown from "./MailDropdown";
import NotificationDropdown from "./NotificationDropdown";
import AppsDropdown from "./AppsDropdown";
import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/utils";
import { useLayoutStore } from "@/store/useLayoutStore";

const HeaderActions: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { activeTabId } = useLayoutStore();

  useClickOutside(containerRef, () => setOpenDropdown(null));

  const isMailPageActive = pathname === "/mail" || activeTabId === "mail-inbox";

  const toggleDropdown = (id: string) => {
    // If we are on the mail page, clicking the mail icon does nothing
    if (id === "mail" && isMailPageActive) return;
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  return (
    <div ref={containerRef} className="flex items-center gap-0.5 md:gap-1 relative">
      <button className="w-9 h-9 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-brand-500 hover:text-brand-500 hover:shadow-custom-blue flex items-center justify-center rounded-full text-gray-500 dark:text-gray-400 transition-all duration-300">
        <SearchIcon />
      </button>

      <div className="relative">
        <ActionIcon
          icon={CategoryIcon}
          onClick={() => toggleDropdown("apps")}
          className={cn(openDropdown === "apps" && "border-brand-500 shadow-custom-blue text-brand-500")}
        />
        {openDropdown === "apps" && <AppsDropdown />}
      </div>

      <button className="hidden sm:flex w-9 h-9 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-brand-500 hover:text-brand-500 hover:shadow-custom-blue items-center justify-center rounded-full text-gray-500 dark:text-gray-400 transition-all duration-300">
        <QrIcon />
      </button>

      <div className="relative">
        <ActionIcon
          icon={MailIcon}
          badgeCount={2}
          badgeColor="bg-brand-500"
          onClick={() => toggleDropdown("mail")}
          className={cn(
            (openDropdown === "mail" || isMailPageActive) &&
              "border-brand-500 shadow-custom-blue text-brand-500"
          )}
        />
        {openDropdown === "mail" && !isMailPageActive && <MailDropdown />}
      </div>

      <div className="relative">
        <ActionIcon
          icon={BellIcon}
          badgeCount={2}
          badgeColor="bg-orange-500"
          onClick={() => toggleDropdown("notifications")}
          className={cn(
            openDropdown === "notifications" && "border-brand-500 shadow-custom-blue text-brand-500"
          )}
        />
        {openDropdown === "notifications" && <NotificationDropdown />}
      </div>
    </div>
  );
};

export default HeaderActions;
