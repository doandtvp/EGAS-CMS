"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Module, MenuItem } from "@/layout/menu-config";
import { ChevronDownIcon, ToggleSidebarIcon } from "@/icons";
import AIAssistantWidget from "../../sidebar/AIAssistantWidget";
import SidebarMenuItem from "./SidebarMenuItem";

interface SidebarVerticalProps {
  modules: Module[];
  activeModuleId: string;
  isMobileOpen: boolean;
  openMenus: string[];
  activeTabId: string | null;
  toggleMenu: (id: string) => void;
  toggleSidebar: () => void;
  onItemClick: (item: MenuItem) => void;
  isItemActive: (item: MenuItem) => boolean;
}

const SidebarVertical: React.FC<SidebarVerticalProps> = ({
  modules,
  activeModuleId,
  isMobileOpen,
  openMenus,
  activeTabId,
  toggleMenu,
  toggleSidebar,
  onItemClick,
  isItemActive,
}) => {
  return (
    <aside
      className={`
        fixed top-0 left-0 z-50 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out flex flex-col
        w-[304px]
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >
      <div className="h-[50px] flex items-center justify-between px-6 dark:border-gray-800">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/logo/egas-logo.svg" alt="Logo" width={24} height={24} />
          <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 tracking-wider">
            EGAS
          </span>
        </Link>
        <button 
          onClick={toggleSidebar}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 transition-colors flex-shrink-0"
          title="Thu nhỏ Sidebar"
        >
          <ToggleSidebarIcon className="w-6 h-6 rotate-180 hover:text-gray-20" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 no-scrollbar space-y-1">
        {modules.map((module) => (
          <div key={module.id} className="space-y-1">
            <button
              onClick={() => toggleMenu(module.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-semibold
                ${activeModuleId === module.id ? "bg-brand-50 text-[#2B82D8] dark:bg-brand-900/20" : "text-gray-800 dark:text-white hover:bg-gray-50"}
              `}
            >
              <span className="flex-shrink-0 text-brand-500">{module.icon}</span>
              <span className="truncate">{module.name}</span>
              <ChevronDownIcon className={`ml-auto w-4 h-4 transition-transform ${openMenus.includes(module.id) ? "rotate-180" : ""}`} />
            </button>

            <div 
              className={`grid transition-all duration-300 ease-in-out ${
                openMenus.includes(module.id) ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0 mt-0"
              }`}
            >
              <div className="overflow-hidden space-y-1">
                {module.sections.map((section) => (
                  section.items.map((item) => (
                    <SidebarMenuItem 
                      key={item.id}
                      item={item}
                      level={1}
                      openMenus={openMenus}
                      activeTabId={activeTabId}
                      onItemClick={onItemClick}
                      isItemActive={isItemActive}
                    />
                  ))
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4">
        <AIAssistantWidget />
      </div>
    </aside>
  );
};

export default SidebarVertical;
