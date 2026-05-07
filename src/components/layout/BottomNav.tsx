"use client";
import React, { useState } from "react";
import { GasStationIcon, PageIcon, AlertIcon, BoxIcon, UserIcon } from "@/icons";

const BottomNav: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const navItems = [
    { label: "Bơm trước", icon: GasStationIcon },
    { label: "TT trước", icon: PageIcon },
    { label: "Không log", icon: AlertIcon },
    { label: "H.Hóa khác", icon: BoxIcon },
    { label: "Dịch vụ", icon: UserIcon },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex items-center justify-around px-2 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      {navItems.map((item, index) => {
        const isActive = activeIndex === index;
        const Icon = item.icon;

        return (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`flex flex-col items-center justify-center gap-1 transition-all flex-1 ${
              isActive
                ? "text-brand-500"
                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            }`}
          >
            <div className={`transition-all duration-300 ${isActive ? "scale-110" : "scale-100"}`}>
              <Icon className="w-6 h-6" />
            </div>
            <span
              className={`text-[10px] font-bold whitespace-nowrap transition-colors ${
                isActive ? "text-brand-500" : "text-gray-400"
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
