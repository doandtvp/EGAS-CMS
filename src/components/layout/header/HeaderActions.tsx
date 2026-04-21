import React, { useState, useRef } from "react";
import { 
  MailIcon, 
  BellIcon, 
  SearchIcon,
  CategoryIcon,
  QrIcon
} from "@/icons";
import ActionIcon from "./ActionIcon";
import MailDropdown from "./MailDropdown";
import NotificationDropdown from "./NotificationDropdown";
import AppsDropdown from "./AppsDropdown";
import { useClickOutside } from "@/hooks/useClickOutside";

const HeaderActions: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => setOpenDropdown(null));

  const toggleDropdown = (id: string) => {
    setOpenDropdown(prev => prev === id ? null : id);
  };

  return (
    <div ref={containerRef} className="flex items-center gap-0.5 md:gap-1 relative">
      <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400">
        <SearchIcon />
      </button>

      <div className="relative">
        <ActionIcon 
          icon={CategoryIcon} 
          onClick={() => toggleDropdown('apps')}
          className={openDropdown === 'apps' ? 'bg-gray-100 dark:bg-gray-800 text-brand-500' : ''}
        />
        {openDropdown === 'apps' && <AppsDropdown />}
      </div>

      <button className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400">
        <QrIcon />
      </button>

      <div className="relative">
        <ActionIcon 
          icon={MailIcon} 
          badgeCount={2} 
          badgeColor="bg-brand-500" 
          onClick={() => toggleDropdown('mail')}
          className={openDropdown === 'mail' ? 'bg-gray-100 dark:bg-gray-800 text-brand-500' : ''}
        />
        {openDropdown === 'mail' && <MailDropdown />}
      </div>

      <div className="relative">
        <ActionIcon 
          icon={BellIcon} 
          badgeCount={2} 
          badgeColor="bg-orange-500" 
          onClick={() => toggleDropdown('notifications')}
          className={openDropdown === 'notifications' ? 'bg-gray-100 dark:bg-gray-800 text-brand-500' : ''}
        />
        {openDropdown === 'notifications' && <NotificationDropdown />}
      </div>
    </div>
  );
};

export default HeaderActions;
