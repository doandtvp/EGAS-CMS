"use client";
import React from "react";
import { cn } from "@/utils";

// Sub-component for individual Action Icons with Badges
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ActionIconProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  badgeCount?: number;
  badgeColor?: string;
  onClick?: () => void;
  className?: string;
}

const ActionIcon: React.FC<ActionIconProps> = ({ 
  icon: Icon, 
  badgeCount, 
  badgeColor = "bg-brand-500",
  onClick,
  className = ""
}) => (
  <button 
    onClick={onClick}
    className={cn(
      "relative w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-brand-500 hover:text-brand-500 hover:shadow-custom-blue text-gray-500 dark:text-gray-400 transition-all duration-300",
      className
    )}
  >
    <Icon className="w-6 h-6" />
    {badgeCount && (
      <span className={`absolute top-1 right-1 w-4 h-4 ${badgeColor} text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-white dark:border-gray-900`}>
        {badgeCount}
      </span>
    )}
  </button>
);

export default ActionIcon;
