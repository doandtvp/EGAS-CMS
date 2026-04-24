import React from "react";
import { cn } from "@/utils";
import { StatusNewIcon, StatusSuccessIcon, StatusClosedIcon } from "@/icons";

export type StatusType = "new" | "success" | "closed" | "processing" | "draft";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getStatusConfig = (status: StatusType) => {
    switch (status) {
      case "new":
        return {
          label: "Mới tạo",
          styles: "bg-blue-50 text-blue-500 border-none",
          icon: (
            <span className="flex items-center justify-center w-4 h-4 rounded-full border-1.5 border-blue-500 bg-white">
              <StatusNewIcon className="w-3 h-3" />
            </span>
          ),
        };
      case "success":
        return {
          label: "Thành công",
          styles: "bg-emerald-50 text-emerald-600 border-none",
          icon: (
            <span className="flex items-center justify-center w-4 h-4 rounded-full text-white p-0.5">
              <StatusSuccessIcon className="w-full h-full fill-white" />
            </span>
          ),
        };
      case "closed":
        return {
          label: "Đã chốt sau nhập",
          styles: "bg-purple-50 text-purple-600 border-none",
          icon: (
            <span className="flex items-center justify-center w-4 h-4 rounded-full  text-white p-0.5">
              <StatusClosedIcon className="w-full h-full fill-white" />
            </span>
          ),
        };
      case "processing":
        return {
          label: "Đang xử lý",
          styles: "bg-blue-light-50 text-blue-light-500 border-none",
          icon: (
            <span className="flex items-center justify-center w-4 h-4 rounded-full border-1.5 border-blue-light-500 bg-white animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-light-500"></span>
            </span>
          ),
        };
      case "draft":
        return {
          label: "Nháp",
          styles: "bg-gray-100 text-gray-500 border-none",
          icon: (
            <span className="flex items-center justify-center w-4 h-4 rounded-full border-1.5 border-gray-400 bg-white">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
            </span>
          ),
        };
      default:
        return {
          label: status,
          styles: "bg-gray-50 text-gray-400 border-gray-100",
          icon: null,
        };
    }
  };

  const { label, styles, icon } = getStatusConfig(status);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium border transition-all",
        styles,
        className
      )}
    >
      {icon}
      {label}
    </span>
  );
};

export default StatusBadge;
