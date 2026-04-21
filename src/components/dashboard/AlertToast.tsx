"use client";
import React, { useState } from "react";
import { CloseIcon, GasStationIcon, InfoIcon, AlertIcon } from "@/icons";

const AlertToast: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] max-w-[420px] animate-in fade-in slide-in-from-right-10 duration-500">
      <div className="relative bg-white border border-red-200 rounded-[20px] shadow-[0_10px_50px_-12px_rgba(239,68,68,0.15)] p-5">
        {/* Floating Alert Icon */}
        <div className="absolute -top-3 -left-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border border-red-50 text-[#EF4444]">
           <AlertIcon className="w-5 h-5" />
        </div>

        {/* Close Button */}
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 p-1 text-gray-300 hover:text-gray-500 transition-colors"
        >
          <CloseIcon className="w-3.5 h-3.5" />
        </button>

        <div className="space-y-4 pr-6 pt-1">
          {/* Notification 1 */}
          <div className="flex items-start gap-3">
             <div className="w-6 h-6 rounded-full bg-[#FEF2F2] flex items-center justify-center flex-shrink-0 text-[#EF4444]">
                <GasStationIcon className="w-4 h-4" />
             </div>
             <div className="flex-1 flex items-center justify-between">
                <span className="text-[12px] font-bold text-gray-700 leading-tight">Bồn RON95 còn dưới 10%</span>
                <button className="text-[11px] font-bold text-[#F97316] hover:underline whitespace-nowrap ml-4">Xem chi tiết</button>
             </div>
          </div>

          {/* Notification 2 */}
          <div className="flex items-start gap-3">
             <div className="w-6 h-6 rounded-full bg-[#FFF7ED] flex items-center justify-center flex-shrink-0 text-[#F97316]">
                <InfoIcon className="w-4 h-4" />
             </div>
             <div className="flex-1">
                <div className="flex items-start justify-between">
                  <span className="text-[12px] font-bold text-gray-700 leading-tight">Khách công nợ Công ty TNHH Tuấn Việt sắp đến hạn thu nợ</span>
                  <button className="text-[11px] font-bold text-[#F97316] hover:underline whitespace-nowrap ml-4 mt-2">Thu nợ</button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertToast;
