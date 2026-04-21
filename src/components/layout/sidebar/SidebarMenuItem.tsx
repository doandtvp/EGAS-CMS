"use client";
import React from "react";
import { MenuItem } from "@/layout/menu-config";
import { ChevronDownIcon } from "@/icons";

interface SidebarMenuItemProps {
  item: MenuItem;
  level?: number;
  openMenus: string[];
  activeTabId: string | null;
  onItemClick: (item: MenuItem) => void;
  isItemActive: (item: MenuItem) => boolean;
}

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  item,
  level = 0,
  openMenus,
  activeTabId,
  onItemClick,
  isItemActive,
}) => {
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const isOpen = openMenus.includes(item.id);
  const isActive = isItemActive(item);
  const isActuallySelected = activeTabId === item.id;

  // --- Dynamic Styles ---
  
  // Level-specific base styles
  const basePadding = "px-4 py-2.5";
  const fontSize = level === 0 ? "text-sm" : "text-[13px]";
  const fontWeight = level === 0 ? "font-bold" : "font-medium";
  
  // Active Styles
  const selectedStyle = "bg-brand-500 text-white shadow-lg shadow-brand-500/20";
  const parentActiveStyle = "bg-brand-500 text-white dark:bg-brand-900/10 dark:text-brand-400";
  const inactiveStyle = "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200";

  const currentStyle = isActuallySelected 
    ? selectedStyle 
    : isActive 
      ? parentActiveStyle 
      : inactiveStyle;

  const isWhite = isActuallySelected || isActive;

  return (
    <div key={item.id} className="w-full relative">
      <button
        onClick={() => onItemClick(item)}
        className={`
          w-full flex items-center gap-3 rounded-xl transition-all duration-200 group
          ${basePadding}
          ${fontSize}
          ${fontWeight}
          ${currentStyle}
          ${level > 0 ? "mt-0.5" : "mt-1"}
        `}
      >
        <div 
          className="flex items-center gap-3 flex-1 overflow-hidden"
          style={{ paddingLeft: level > 0 ? `${level * 12}px` : '0px' }}
        >
          {/* Icon - Only for Level 0 or if explicitly provided */}
          {item.icon && (
            <span className={`flex-shrink-0 transition-colors ${isWhite ? "text-white" : isActive ? "text-brand-500" : "text-gray-400 group-hover:text-brand-500"}`}>
              {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6" })}
            </span>
          )}
          
          <span className="truncate text-left">
            {item.name}
          </span>
        </div>

        {hasSubItems && (
          <ChevronDownIcon
            className={`flex-shrink-0 w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""} ${isWhite ? "text-white" : "text-gray-400"}`}
          />
        )}
      </button>

      {hasSubItems && (
        <div 
          className={`grid transition-all duration-300 ease-in-out ${
            isOpen ? "grid-rows-[1fr] opacity-100 mt-0.5" : "grid-rows-[0fr] opacity-0 mt-0"
          }`}
        >
          <div className="overflow-hidden">
            {item.subItems?.map((sub) => (
              <SidebarMenuItem 
                key={sub.id}
                item={sub}
                level={level + 1}
                openMenus={openMenus}
                activeTabId={activeTabId}
                onItemClick={onItemClick}
                isItemActive={isItemActive}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarMenuItem;
