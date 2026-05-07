"use client";
import React from "react";

interface SidebarTooltipProps {
  text: string;
  children: React.ReactNode;
}

const SidebarTooltip: React.FC<SidebarTooltipProps> = ({ text, children }) => (
  <div className="relative group/tooltip">
    {children}
    <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity z-9999 whitespace-nowrap hidden lg:block">
      {text}
      <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 border-8 border-transparent border-r-gray-900" />
    </div>
  </div>
);

export default SidebarTooltip;
