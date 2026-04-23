"use client";
import React, { useState } from "react";
import CustomSelect from "./CustomSelect";
import { DataTable, ColumnDef } from "@/components/ui/table/DataTable";
import { Pagination } from "@/components/ui/Pagination";

interface RevenueData {
  time: string;
  staff: string;
  shift: string;
  fuel: string;
  volume: string;
  revenue: string;
  total: string;
}

const RevenueTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("Tên nhân viên");

  const sortOptions = ["Mới nhất", "Cũ nhất", "Tên nhân viên", "Doanh thu"];

  const data: RevenueData[] = [
    { time: "10/09/2025", staff: "Nguyễn Công Lương", shift: "Sáng", fuel: "Ron 95", volume: "60.000", revenue: "300.000.000", total: "300.000.000" },
    { time: "10/09/2025", staff: "Phạm Văn Tuấn Anh", shift: "Chiều", fuel: "Diesel", volume: "54.000", revenue: "290.000.000", total: "290.000.000" },
    { time: "10/09/2025", staff: "Phạm Văn Tuấn Anh", shift: "Tối", fuel: "Ron 92", volume: "50.000", revenue: "280.040.000", total: "280.040.000" },
    { time: "10/09/2025", staff: "Phạm Văn Tuấn Anh", shift: "Sáng", fuel: "Diesel", volume: "45.000", revenue: "260.000.000", total: "260.000.000" },
    { time: "10/09/2025", staff: "Phạm Văn Tuấn Anh", shift: "Tối", fuel: "Ron 95", volume: "40.000", revenue: "250.000.000", total: "250.000.000" },
    { time: "10/09/2025", staff: "Phạm Văn Tuấn Anh", shift: "Chiều", fuel: "Diesel", volume: "54.000", revenue: "290.000.000", total: "290.000.000" },
  ];

  const columns: ColumnDef<RevenueData>[] = [
    { key: "time", header: "Thời gian" },
    { key: "staff", header: "Nhân viên" },
    { key: "shift", header: "Ca" },
    { key: "fuel", header: "Loại nhiên liệu" },
    { key: "volume", header: "Sản lượng (L)", className: "tabular-nums" },
    { key: "revenue", header: "Doanh thu (VNĐ)", className: "tabular-nums" },
    { key: "total", header: "Tiền nộp (VNĐ)", className: "tabular-nums" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-[24px] border border-grayscale-10 dark:border-gray-700/50 shadow-dashboard col-span-12 xl:col-span-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h3 className="text-[18px] font-semibold leading-[24px] text-gray-800 dark:text-white">Bảng Báo cáo chi tiết doanh thu theo ngày</h3>
        <div className="w-full sm:w-[160px]">
          <CustomSelect 
            options={sortOptions}
            value={sortOption}
            onChange={setSortOption}
            placeholder="Sắp xếp theo"
            width="100%"
            buttonClassName="bg-white font-normal"
          />
        </div>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <div className="min-w-[800px]">
          <DataTable columns={columns} data={data} />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Pagination 
          currentPage={currentPage}
          totalPages={2}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default RevenueTable;
