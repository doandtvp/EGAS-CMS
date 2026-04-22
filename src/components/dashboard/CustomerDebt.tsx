"use client";
import React, { useState } from "react";
import { Pagination } from "@/components/ui/Pagination";

const CustomerDebt: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const items = [
    { company: "Công ty TNHH Tuấn Việt", debt: "500.000.000", status: "Sắp quá hạn", color: "red", date: "18/11/2025" },
    { company: "Công ty TNHH Tuấn Việt", debt: "500.000.000", status: "Trong hạn mức", color: "green" },
    { company: "Công ty TNHH Tuấn Việt", debt: "500.000.000", status: "Trong hạn mức", color: "green" },
    { company: "Công ty TNHH Tuấn Việt", debt: "500.000.000", status: "Trong hạn mức", color: "green" },
    { company: "Công ty TNHH Tuấn Việt", debt: "500.000.000", status: "Trong hạn mức", color: "green" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-[24px] border border-[#EDF1F5] dark:border-gray-700/50 shadow-sm col-span-12 lg:col-span-4 flex flex-col h-full">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#EDF1F5] dark:border-gray-700">
        <h3 className="text-[18px] font-semibold leading-[24px] text-[#5D6A7D] dark:text-white">Công nợ khách hàng</h3>
        <button className="flex items-center justify-center w-[95px] h-[30px] text-[14px] font-normal leading-[20px] text-[#F4831F] border border-[#F4831F] rounded-md bg-[#F4831F]/5 hover:bg-[#F4831F]/10 transition-all active:scale-95">
          Xem tất cả
        </button>
      </div>

      <div className="flex-1 space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between p-3 border border-dashed border-[#EDF1F5] dark:border-gray-700 rounded-[4px] group hover:border-gray-200 transition-all">
            <div className="flex-1 text-left">
              <h4 className="text-[14px] font-semibold leading-[20px] text-gray-custom dark:text-white group-hover:text-blue-custom transition-colors line-clamp-1">{item.company}</h4>
              <p className="text-[12px] font-normal leading-[16px] text-[#8492B5] mt-1">Công nợ: {item.debt}</p>
            </div>
            <div className="flex flex-col items-end ml-4">
              <div className="relative group/badge cursor-pointer">
                <div className={`flex items-center justify-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-medium text-white whitespace-nowrap shadow-sm ${
                  item.color === 'red' ? "bg-[#EF4444]" : "bg-[#22C55E]"
                }`}>
                  {item.color === 'red' ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M4.5 4.5L9.5 9.5M9.5 4.5L4.5 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M4 7.5L6 9.5L10 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  {item.status}
                </div>
                {item.date && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 z-10 w-[83px] opacity-0 invisible group-hover/badge:opacity-100 group-hover/badge:visible transition-all duration-200">
                    <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-[10px] h-[10px] bg-white rotate-45 border-l border-t border-[#EDF1F5]"></div>
                    <div className="relative bg-white w-full h-[30px] flex items-center justify-center rounded-lg text-[12px] font-normal text-gray-custom shadow-[0_12px_24px_-4px_rgba(143,155,166,0.15)] border border-[#EDF1F5]">
                      {item.date}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Footer */}
      <div className="mt-6">
        <Pagination 
          currentPage={currentPage}
          totalPages={2}
          onPageChange={setCurrentPage}
          className="justify-center"
        />
      </div>
    </div>
  );
};

export default CustomerDebt;
