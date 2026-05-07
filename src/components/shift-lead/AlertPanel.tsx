"use client";
import React from "react";

interface AlertItemData {
  id: string;
  type: "warning" | "system" | "tank" | "transaction" | "staff" | "maintenance";
  title: string;
  description: string;
  icon: React.ReactNode;
}

const alertItems: AlertItemData[] = [
  {
    id: "1",
    type: "warning",
    title: "Thiết bị",
    description: "Mất tín hiệu vòi bơm, lỗi cảm biến",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9 2L16.5 15H1.5L9 2Z" stroke="#F59E0B" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 7V10" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="12.5" r="0.75" fill="#F59E0B" />
      </svg>
    ),
  },
  {
    id: "2",
    type: "system",
    title: "Hệ thống",
    description: "Mất kết nối POS, Server, Kiosk",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="2" y="3" width="14" height="9" rx="1.5" stroke="#F97316" strokeWidth="1.5" />
        <path d="M6 15H12M9 12V15" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
        <path
          d="M5 7L7 9L5 11"
          stroke="#F97316"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "3",
    type: "tank",
    title: "Bể chứa",
    description: "Bể đầy >95%, sai lệch >1%",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="3" y="4" width="12" height="10" rx="2" stroke="#EF4444" strokeWidth="1.5" />
        <path
          d="M7 4V3.5C7 2.67 7.67 2 8.5 2H9.5C10.33 2 11 2.67 11 3.5V4"
          stroke="#EF4444"
          strokeWidth="1.5"
        />
        <path d="M3 9H15" stroke="#EF4444" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
      </svg>
    ),
  },
  {
    id: "4",
    type: "transaction",
    title: "Giao dịch",
    description: "Thanh toán lỗi, mã trùng",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 5.5H16M2 5.5V13.5C2 14.33 2.67 15 3.5 15H14.5C15.33 15 16 14.33 16 13.5V5.5M2 5.5L3.5 3H14.5L16 5.5"
          stroke="#DC2626"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M7 10L9 12L11 10"
          stroke="#DC2626"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "5",
    type: "staff",
    title: "Nhân sự",
    description: "Quên đồng xuất, chưa kết ca",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="9" cy="6" r="3" stroke="#22C55E" strokeWidth="1.5" />
        <path
          d="M3 15C3 12.24 5.69 10 9 10C12.31 10 15 12.24 15 15"
          stroke="#22C55E"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "6",
    type: "maintenance",
    title: "Bảo trì",
    description: "Đến hạn hiệu chuẩn thiết bị",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.5 3L15 4.5L5.5 14L2 15L3 11.5L13.5 3Z"
          stroke="#3B82F6"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M11 5L13 7" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const AlertItem: React.FC<{ item: AlertItemData }> = ({ item }) => (
  <div className="flex items-start gap-3 px-3 py-2.5 border border-gray-100 dark:border-gray-700/50 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors cursor-default mb-2 last:mb-0">
    <div className="shrink-0 w-8 h-8 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg mt-0.5">
      {item.icon}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1.5">
        <p className="text-sm font-medium text-black-custom dark:text-white">{item.title}</p>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">
        {item.description}
      </p>
    </div>
  </div>
);

const AlertPanel: React.FC = () => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-[20px] border border-grayscale-10 dark:border-gray-700/50 shadow-dashboard">
      <div className="pb-4 border-b border-gray-100 dark:border-gray-700">
        <h3 className="text-[15px] font-semibold text-black-custom dark:text-white">Cảnh báo</h3>
      </div>
      <div className="pt-4 space-y-1">
        {alertItems.map((item) => (
          <AlertItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default AlertPanel;
