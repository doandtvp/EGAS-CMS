"use client";
import React, { useState } from "react";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "@/icons";

import CustomSelect from "./CustomSelect";

const RevenueTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("Tên nhân viên");

  const sortOptions = ["Mới nhất", "Cũ nhất", "Tên nhân viên", "Doanh thu"];

  const data = [
    { time: "10/09/2025", staff: "Nguyễn Công Lương", shift: "Sáng", fuel: "Ron 95", volume: "60.000", revenue: "300.000.000", total: "300.000.000" },
    { time: "10/09/2025", staff: "Phạm Văn Tuấn Anh", shift: "Chiều", fuel: "Diesel", volume: "54.000", revenue: "290.000.000", total: "290.000.000" },
    { time: "10/09/2025", staff: "Phạm Văn Tuấn Anh", shift: "Tối", fuel: "Ron 92", volume: "50.000", revenue: "280.040.000", total: "280.040.000" },
    { time: "10/09/2025", staff: "Phạm Văn Tuấn Anh", shift: "Sáng", fuel: "Diesel", volume: "45.000", revenue: "260.000.000", total: "260.000.000" },
    { time: "10/09/2025", staff: "Phạm Văn Tuấn Anh", shift: "Tối", fuel: "Ron 95", volume: "40.000", revenue: "250.000.000", total: "250.000.000" },
    { time: "10/09/2025", staff: "Phạm Văn Tuấn Anh", shift: "Chiều", fuel: "Diesel", volume: "54.000", revenue: "290.000.000", total: "290.000.000" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-[24px] border border-gray-100 dark:border-gray-700/50 shadow-sm col-span-12 lg:col-span-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[16px] font-bold text-gray-800 dark:text-white">Bảng Báo cáo chi tiết doanh thu theo ngày</h3>
        <CustomSelect 
          options={sortOptions}
          value={sortOption}
          onChange={setSortOption}
          placeholder="Sắp xếp theo"
          width="160px"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-50 dark:border-gray-700">
              <th className="pb-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Thời gian</th>
              <th className="pb-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Nhân viên</th>
              <th className="pb-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Ca</th>
              <th className="pb-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Loại nhiên liệu</th>
              <th className="pb-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Sản lượng (L)</th>
              <th className="pb-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Doanh thu (VNĐ)</th>
              <th className="pb-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Tiền nộp (VNĐ)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-divide-gray-700">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50/30 dark:hover:bg-gray-700/30 transition-colors">
                <td className="py-4 text-[13px] text-gray-600 dark:text-gray-300">{row.time}</td>
                <td className="py-4 text-[13px] font-bold text-gray-800 dark:text-white">{row.staff}</td>
                <td className="py-4 text-[13px] text-gray-600 dark:text-gray-300">{row.shift}</td>
                <td className="py-4 text-[13px] text-gray-600 dark:text-gray-300">{row.fuel}</td>
                <td className="py-4 text-[13px] font-bold text-gray-800 dark:text-white tabular-nums">{row.volume}</td>
                <td className="py-4 text-[13px] font-bold text-gray-800 dark:text-white tabular-nums">{row.revenue}</td>
                <td className="py-4 text-[13px] font-bold text-gray-800 dark:text-white tabular-nums">{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-end gap-2">
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

export default RevenueTable;
