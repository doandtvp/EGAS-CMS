"use client";
import React from "react";

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
    className={`relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors ${className}`}
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
