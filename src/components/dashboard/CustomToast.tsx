"use client";
import React, { useState } from "react";
import { CloseIcon, GasStationIcon, InfoIcon, AlertIcon, CheckCircleIcon } from "@/icons";

export type ToastVariant = "success" | "warning" | "error" | "info";

interface ToastItem {
  icon: React.ReactNode;
  title: string;
  actionText?: string;
  onAction?: () => void;
}

interface ToastProps {
  variant?: ToastVariant;
  items?: ToastItem[];
  isVisible?: boolean;
  onClose?: () => void;
}

const variantStyles = {
  success: {
    border: "border-[#22B07E]",
    bg: "bg-[#F0FDF4]",
    iconColor: "text-[#22B07E]",
    iconBg: "bg-[#DCFCE7]",
    shadow: "shadow-[0_10px_50px_-12px_rgba(34,176,126,0.15)]",
    mainIcon: <CheckCircleIcon className="w-6 h-6" />,
  },
  warning: {
    border: "border-[#F97316]",
    bg: "bg-[#FFF7ED]",
    iconColor: "text-[#F97316]",
    iconBg: "bg-[#FFEDD5]",
    shadow: "shadow-[0_10px_50px_-12px_rgba(249,115,22,0.15)]",
    mainIcon: <InfoIcon className="w-6 h-6" />,
  },
  error: {
    border: "border-[#FF3B3B]",
    bg: "bg-[#FEF2F2]",
    iconColor: "text-[#FF3B3B]",
    iconBg: "bg-[#FEE2E2]",
    shadow: "shadow-[0_10px_50px_-12px_rgba(255,59,59,0.15)]",
    mainIcon: <AlertIcon className="w-6 h-6" />,
  },
  info: {
    border: "border-[#389EE8]",
    bg: "bg-[#F0F9FF]",
    iconColor: "text-[#389EE8]",
    iconBg: "bg-[#E0F2FE]",
    shadow: "shadow-[0_10px_50px_-12px_rgba(56,158,232,0.15)]",
    mainIcon: <InfoIcon className="w-6 h-6" />,
  },
};

const CustomToast: React.FC<ToastProps> = ({
  variant = "error",
  items = [],
  isVisible: externalVisible,
  onClose,
}) => {
  const [internalVisible, setInternalVisible] = useState(true);
  const isVisible = externalVisible !== undefined ? externalVisible : internalVisible;

  if (!isVisible) return null;

  const styles = variantStyles[variant];

  const handleClose = () => {
    setInternalVisible(false);
    if (onClose) onClose();
  };

  // Default items if none provided (matching previous design for demonstration)
  const displayItems: ToastItem[] =
    items.length > 0
      ? items
      : ([
          {
            icon: <GasStationIcon className="w-6 h-6" />,
            title: "Bồn RON95 còn dưới 10%",
            actionText: "Xem chi tiết",
          },
          {
            icon: <InfoIcon className="w-6 h-6" />,
            title: "Khách công nợ Công ty TNHH Tuấn Việt sắp đến hạn thu nợ",
            actionText: "Thu nợ",
          },
        ] as ToastItem[]);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] w-[calc(100vw-32px)] sm:max-w-[420px] animate-in fade-in slide-in-from-right-10 duration-500">
      <div
        className={`relative bg-white border-2 ${styles.border} rounded-xl ${styles.shadow} p-4 sm:p-5`}
      >
        {/* Floating Variant Icon */}
        <div
          className={`absolute -top-3 -left-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border ${styles.border} ${styles.iconColor}`}
        >
          {styles.mainIcon}
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-1 right-1 p-1 text-gray-300 hover:text-gray-500 transition-colors"
        >
          <CloseIcon className="w-4 h-4" />
        </button>

        <div className="space-y-5 pt-1">
          {displayItems.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div
                className={`w-[32px] h-[32px] rounded-full ${styles.iconBg} flex items-center justify-center flex-shrink-0 ${styles.iconColor}`}
              >
                {item.icon}
              </div>
              <div className="flex-1 flex items-end justify-between gap-3">
                <span className="text-sm font-semibold text-gray-700 leading-[1.5]">
                  {item.title}
                </span>
                {item.actionText && (
                  <button
                    onClick={item.onAction}
                    className={`text-sm font-normal text-[#F4831F] hover:underline whitespace-nowrap mb-[2px] transition-all`}
                  >
                    {item.actionText}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomToast;
