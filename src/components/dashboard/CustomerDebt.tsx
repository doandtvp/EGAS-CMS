"use client";
import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/icons";

const CustomerDebt: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const items = [
    { company: "Công ty TNHH Tuấn Việt", debt: "500.000.000", status: "Sắp quá hạn", color: "red", date: "18/11/2025" },
    { company: "Công ty TNHH Tuấn Việt", debt: "500.000.000", status: "Trong hạn mức", color: "green" },
    { company: "Công ty TNHH Tuấn Việt", debt: "500.000.000", status: "Trong hạn mức", color: "green" },
    { company: "Công ty TNHH Tuấn Việt", debt: "500.000.000", status: "Trong hạn mức", color: "green" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-[24px] border border-gray-100 dark:border-gray-700/50 shadow-sm col-span-12 lg:col-span-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[16px] font-bold text-gray-800 dark:text-white">Công nợ khách hàng</h3>
        <button className="text-[11px] font-bold text-[#F97316] px-3 py-1.5 border border-[#F97316] rounded-full hover:bg-orange-50 transition-all active:scale-95">
          Xem tất cả
        </button>
      </div>

      <div className="space-y-4 flex-1">
        {items.map((item, i) => (
          <div key={i} className="flex items-start justify-between p-4 bg-white dark:bg-gray-800/50 rounded-[20px] border border-gray-50 dark:border-gray-700/50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-md transition-all group">
            <div className="flex-1 text-left">
              <h4 className="text-[14px] font-bold text-gray-800 dark:text-white group-hover:text-[#005CAB] transition-colors line-clamp-1">{item.company}</h4>
              <p className="text-[12px] text-gray-400 mt-1 font-medium">Công nợ: <span className="text-gray-500">{item.debt}</span></p>
            </div>
            <div className="flex flex-col items-end gap-1.5 ml-4">
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold whitespace-nowrap ${
                item.color === 'red' 
                  ? "text-[#EF4444] bg-[#FEF2F2]" 
                  : "text-[#10B981] bg-[#ECFDF5]"
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${item.color === 'red' ? "bg-[#EF4444]" : "bg-[#10B981]"}`}></span>
                {item.status}
              </div>
              {item.date && (
                <span className="text-[10px] text-gray-400 font-bold tracking-tight">{item.date}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Footer */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <button 
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          className="w-8 h-8 flex items-center justify-center border border-gray-100 rounded-lg text-gray-400 hover:bg-gray-50 active:scale-90 transition-all shadow-xs"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        {[1, 2].map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            className={`w-8 h-8 text-[12px] font-bold rounded-lg transition-all active:scale-90 shadow-xs ${
              currentPage === num 
                ? "bg-[#005CAB] text-white" 
                : "text-gray-500 border border-transparent hover:border-gray-100 hover:bg-gray-50"
            }`}
          >
            {num}
          </button>
        ))}
        <button 
          onClick={() => setCurrentPage(Math.min(2, currentPage + 1))}
          className="w-8 h-8 flex items-center justify-center border border-gray-100 rounded-lg text-gray-400 hover:bg-gray-50 active:scale-90 transition-all shadow-xs"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CustomerDebt;
