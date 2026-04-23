"use client";
import React from "react";
import { MoreDotIcon, AlertIcon, GasStationIcon, DollarLineIcon } from "@/icons";

const NotificationDropdown: React.FC = () => {
  const notifications = [
    {
      id: 1,
      title: "Cột bơm mất kết nối",
      desc: "Cột bơm 01 vừa mất kết nối. Vui lòng kiểm tra thiết bị hoặc đường truyền",
      time: "Hôm nay - 9:42",
      icon: <AlertIcon className="w-6 h-6 min-w-[24px] text-red-500" />,
      iconBg: "bg-red-50 dark:bg-red-900/20",
      unread: true
    },
    {
      id: 2,
      title: "Tồn kho dưới mức cảnh báo",
      desc: "Tồn kho mặt hàng RON95 đã xuống dưới ngưỡng tối thiểu.",
      time: "Hôm nay - 9:42",
      icon: <GasStationIcon className="w-6 h-6 min-w-[24px] text-orange-500" />, 
      iconBg: "bg-orange-50 dark:bg-orange-900/20",
      unread: true
    },
    {
      id: 3,
      title: "Hạn mức công nợ",
      desc: "Khách hàng “Minh Phát” đã sử dụng 95% hạn mức công nợ.",
      time: "Hôm nay - 9:42",
      icon: <DollarLineIcon className="w-6 h-6 min-w-[24px] text-purple-500" />,
      iconBg: "bg-purple-50 dark:bg-purple-900/20",
      unread: false
    }
  ];

  return (
    <div className="absolute top-full right-0 md:left-1/2 md:-translate-x-1/2 mt-2 w-[380px] max-w-[90vw] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-gray-50 dark:border-gray-700">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
          Thông báo
          <span className="px-2 py-0.5 bg-orange-500 text-white text-[10px] rounded-full">9</span>
        </h3>
        <button className="flex-shrink-0 p-1 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors">
          <MoreDotIcon className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Notifications List */}
      <div className="max-h-[380px] overflow-y-auto scrollbar-thin">
        {notifications.map((noti) => (
          <div key={noti.id} className="px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/40 cursor-pointer transition-colors flex gap-4 border-b border-gray-50 dark:border-gray-700/50 last:border-0 relative">
            <div className={`flex-shrink-0 min-w-[40px] w-10 h-10 rounded-full ${noti.iconBg} flex items-center justify-center`}>
              {noti.icon}
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex items-start justify-between mb-0.5 mt-0.5 gap-2">
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200 pr-4 break-words">{noti.title}</p>
                {noti.unread && <div className="flex-shrink-0 right-5 top-8 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)] mt-1.5"></div>}
              </div>
              <p className="text-[13px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-2">
                {noti.desc}
              </p>
              <span className="text-[11px] text-gray-400 font-medium">{noti.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <button className="w-full py-3 text-[13px] font-bold text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all border-t border-gray-50 dark:border-gray-700">
        Xem tất cả thông báo
      </button>
    </div>
  );
};

export default NotificationDropdown;
