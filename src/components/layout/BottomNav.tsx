"use client";
import React from "react";
import { 
  GasStationIcon, 
  PageIcon, 
  AlertIcon, 
  BoxIcon, 
  UserIcon 
} from "@/icons";

const BottomNav: React.FC = () => {
  const navItems = [
    { label: "Bơm trước", icon: <GasStationIcon className="w-6 h-6" />, active: true },
    { label: "TT trước", icon: <PageIcon className="w-6 h-6" /> },
    { label: "Không log", icon: <AlertIcon className="w-6 h-6" /> },
    { label: "H.Hóa khác", icon: <BoxIcon className="w-6 h-6" /> },
    { label: "Dịch vụ", icon: <UserIcon className="w-6 h-6" /> },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex items-center justify-around px-2 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      {navItems.map((item, index) => (
        <button 
          key={index}
          className={`flex flex-col items-center justify-center gap-1 transition-all ${
            item.active ? "text-brand-500 scale-110" : "text-gray-400"
          }`}
        >
          <div className={`${item.active ? "text-brand-500" : "text-gray-400"}`}>
            {item.icon}
          </div>
          <span className="text-[10px] font-bold whitespace-nowrap">{item.label}</span>
        </button>
      ))}
      {/* iOS Home Indicator Space */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-200 dark:bg-gray-700 rounded-full opacity-50 pointer-events-none"></div>
    </div>
  );
};

export default BottomNav;
