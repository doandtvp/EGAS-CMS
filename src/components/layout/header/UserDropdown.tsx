"use client";
import React from "react";
import Image from "next/image";
import { 
  PencilIcon, 
  InfoIcon, 
  CloseLineIcon,
  LockIcon
} from "@/icons";

const UserDropdown: React.FC = () => {
  return (
    <div className="absolute right-0 mt-2 w-[280px] bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
      {/* User Header */}
      <div className="p-4 flex items-center gap-3 border-b border-gray-100 dark:border-gray-700">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand-100 shadow-sm transition-transform hover:scale-105">
          <Image 
            src="/images/user/user-01.jpg" 
            alt="Avatar" 
            width={48} 
            height={48} 
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-base font-bold text-gray-900 dark:text-white">Nguyễn Văn Anh</span>
          <span className="text-xs text-gray-400 font-medium tracking-tight">ID: 12345678</span>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-2 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-brand-50 dark:hover:bg-gray-700/50 hover:text-brand-500 dark:hover:text-brand-400 rounded-lg transition-all group">
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-700 group-hover:bg-brand-100 dark:group-hover:bg-brand-900/40 text-gray-400 group-hover:text-brand-500 transition-colors">
            <PencilIcon className="w-4 h-4" />
          </div>
          <span>Cài đặt</span>
        </button>

        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-brand-50 dark:hover:bg-gray-700/50 hover:text-brand-500 dark:hover:text-brand-400 rounded-lg transition-all group">
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-700 group-hover:bg-brand-100 dark:group-hover:bg-brand-900/40 text-gray-400 group-hover:text-brand-500 transition-colors">
            <InfoIcon className="w-4 h-4" />
          </div>
          <span>Trợ giúp</span>
        </button>
      </div>

      {/* Logout */}
      <div className="p-2 pt-0">
        <div className="border-t border-gray-100 dark:border-gray-700 my-1 opacity-50"></div>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all group">
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 dark:bg-red-900/30 text-red-400 group-hover:text-red-600 transition-colors">
            <CloseLineIcon className="w-4 h-4" />
          </div>
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  );
};

export default UserDropdown;
