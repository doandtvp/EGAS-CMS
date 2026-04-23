"use client";
import React, { useState } from "react";
import { MoreDotIcon, MailIcon } from "@/icons";

const MailDropdown: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "Tất cả", count: 35 },
    { id: "unread", label: "Chưa đọc", count: 9 },
    { id: "read", label: "Đã đọc", count: 0 },
  ];

  return (
    <div className="absolute top-full right-0 md:left-1/2 md:-translate-x-1/2 mt-2 w-[380px] max-w-[90vw] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-gray-50 dark:border-gray-700">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
          Hop thư
        </h3>
        <button className="flex-shrink-0 p-1 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors">
          <MoreDotIcon className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Tabs */}
      <div className="px-5 pt-2 flex items-center gap-6 border-b border-gray-50 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-2.5 text-sm font-bold transition-all relative ${
              activeTab === tab.id
                ? "text-brand-500 dark:text-brand-400"
                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${
                activeTab === tab.id ? "bg-brand-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-500"
              }`}>
                {tab.count}
              </span>
            )}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-500 rounded-full animate-in fade-in duration-300"></span>
            )}
          </button>
        ))}
      </div>

      {/* Messages List */}
      <div className="max-h-[380px] overflow-y-auto scrollbar-thin">
        {[1, 2, 3].map((item) => (
          <div key={item} className="px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/40 cursor-pointer transition-colors flex gap-4 border-b border-gray-50 dark:border-gray-700/50 last:border-0 relative">
            <div className="flex-shrink-0 min-w-[40px] w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
              <MailIcon className="w-6 h-6 min-w-[24px] text-blue-500" />
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex items-start justify-between mb-0.5 mt-0.5 gap-2">
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200 pr-4 break-words">Bảo trì hệ thống CHXD ngày 15/12</p>
                {item === 1 && <div className="flex-shrink-0 right-5 top-8 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)] mt-1.5"></div>}
              </div>
              <p className="text-[13px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-2">
                Hệ thống sẽ bảo trì lúc 02:00–03:00 để nâng cấp bảo mật API.
              </p>
              <span className="text-[11px] text-gray-400 font-medium">Hôm nay - 9:42</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <button className="w-full py-3 text-[13px] font-bold text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all border-t border-gray-50 dark:border-gray-700">
        Xem tất cả hộp thư
      </button>
    </div>
  );
};

export default MailDropdown;
