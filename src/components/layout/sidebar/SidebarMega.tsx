"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Module, MenuItem } from "@/layout/menu-config";
import { ToggleSidebarIcon } from "@/icons";
import AIAssistantWidget from "../../sidebar/AIAssistantWidget";
import SidebarMenuItem from "./SidebarMenuItem";
import SidebarTooltip from "./SidebarTooltip";

interface SidebarMegaProps {
  modules: Module[];
  activeModule: Module;
  activeModuleId: string;
  isMobileOpen: boolean;
  openMenus: string[];
  activeTabId: string | null;
  setActiveModule: (id: string) => void;
  toggleSidebar: () => void;
  onItemClick: (item: MenuItem) => void;
  isItemActive: (item: MenuItem) => boolean;
}

const SidebarMega: React.FC<SidebarMegaProps> = ({
  modules,
  activeModule,
  activeModuleId,
  isMobileOpen,
  openMenus,
  activeTabId,
  setActiveModule,
  toggleSidebar,
  onItemClick,
  isItemActive,
}) => {
  return (
    <aside
      className={`
        fixed top-0 left-0 z-50 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex transition-all duration-300 ease-in-out
        w-[304px]
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >
      {/* Pane 1: Slim Bar (Modules) */}
      <div className="w-[64px] flex-shrink-0 border-r border-gray-100 dark:border-gray-800 flex flex-col items-center py-6 gap-6">
        <Link href="/" className="mb-4">
          <Image src="/images/logo/egas-logo.svg" alt="Logo" width={24} height={24} />
        </Link>

        <div className="flex flex-col gap-4">
          {modules.map((module) => (
            <SidebarTooltip key={module.id} text={module.name}>
              <button
                onClick={() => setActiveModule(module.id)}
                className={`
                  w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group relative
                  ${activeModuleId === module.id 
                    ? "bg-brand-50 text-brand-500 dark:bg-brand-900/20 dark:text-brand-400 shadow-sm opacity-100" 
                    : "text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-600 opacity-40 hover:opacity-100"}
                `}
              >
                <div className={`${activeModuleId === module.id ? "scale-110 text-brand-500 fill-brand-500" : "group-hover:scale-110 transition-transform"}`}>
                  {module.icon}
                </div>
              </button>
            </SidebarTooltip>
          ))}
        </div>
      </div>

      {/* Pane 2: Content Panel */}
      <div className="flex-1 flex flex-col min-w-0 animate-in fade-in slide-in-from-left-4 duration-300 w-[240px]">
        <div className="h-20 flex items-center justify-between px-6 dark:border-gray-800">
          <div className="flex items-center gap-3 overflow-hidden">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white truncate">
              {activeModule.name}
            </h2>
            <button 
              onClick={toggleSidebar}
              className="absolute left-[17%] w-6 h-6 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors flex-shrink-0"
              title="Mở toàn bộ Sidebar"
            >
              <ToggleSidebarIcon className="w-6 h-6 hover:text-gray-20" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 no-scrollbar space-y-1">
          {activeModule.sections.map((section, idx) => (
            <React.Fragment key={idx}>
              {section.items.map((item) => (
                <SidebarMenuItem 
                  key={item.id}
                  item={item}
                  level={0}
                  openMenus={openMenus}
                  activeTabId={activeTabId}
                  onItemClick={onItemClick}
                  isItemActive={isItemActive}
                />
              ))}
            </React.Fragment>
          ))}
        </div>

        <div className="p-4 bg-gray-50/50 dark:bg-gray-800/30">
          <AIAssistantWidget />
        </div>
      </div>
    </aside>
  );
};

export default SidebarMega;
