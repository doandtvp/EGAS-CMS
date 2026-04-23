"use client";
import React, { useState } from "react";
import { StatusBadge } from "@/components/common/StatusBadge";
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
    <div className="bg-white dark:bg-gray-800 rounded-[24px] border border-[#EDF1F5] dark:border-gray-700/50 shadow-sm col-span-12 lg:col-span-4 flex flex-col h-full">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#EDF1F5] dark:border-gray-700 p-6">
        <h3 className="text-[18px] font-semibold leading-[24px] text-[#5D6A7D] dark:text-white">Công nợ khách hàng</h3>
        <button className="flex items-center justify-center w-[95px] h-[30px] text-[14px] font-normal leading-[20px] text-[#F4831F] border border-[#F4831F] rounded-md bg-[#F4831F]/5 hover:bg-[#F4831F]/10 transition-all active:scale-95">
          Xem tất cả
        </button>
      </div>

      <div className="flex-1 space-y-3 px-6">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between p-3 border border-dashed border-[#EDF1F5] dark:border-gray-700 rounded-[4px] group hover:border-gray-200 transition-all">
            <div className="flex-1 text-left">
              <h4 className="text-[14px] font-semibold leading-[20px] text-gray-custom dark:text-white group-hover:text-blue-custom transition-colors line-clamp-1">{item.company}</h4>
              <p className="text-[12px] font-normal leading-[16px] text-[#8492B5] mt-1">Công nợ: {item.debt}</p>
            </div>
            <div className="flex flex-col items-end ml-4">
              <StatusBadge 
                status={item.status} 
                color={item.color as "red" | "green"} 
                date={item.date} 
              />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Footer */}
      <div className="my-6">
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
