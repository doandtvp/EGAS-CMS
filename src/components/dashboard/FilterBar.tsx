"use client";
import React, { useState } from "react";
import DatePicker from "@/components/form/date-picker";
import CustomSelect from "./CustomSelect";

const FilterBar: React.FC = () => {
  const [filterValues, setFilterValues] = useState({
    item: "Ron 95",
    shift: "",
    staff: ""
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilterValues(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-[20px] dark:border-gray-800 mb-6">
      <div className="flex flex-wrap items-center justify-end gap-3">
        {/* Custom Select components */}
        <CustomSelect 
          options={["Ron 95", "Ron 92", "Diesel", "Dầu nhờn"]} 
          value={filterValues.item}
          onChange={(val) => handleFilterChange("item", val)}
          placeholder="Chọn mặt hàng"
          width="180px"
        />

        <CustomSelect 
          options={["Ca sáng", "Ca chiều", "Ca tối"]} 
          value={filterValues.shift}
          onChange={(val) => handleFilterChange("shift", val)}
          placeholder="Chọn Ca"
          width="140px"
        />

        <CustomSelect 
          options={["Nguyễn Công Lương", "Phạm Văn Tuấn Anh", "Trần Thị B", "Lê Văn C"]} 
          value={filterValues.staff}
          onChange={(val) => handleFilterChange("staff", val)}
          placeholder="Chọn nhân viên"
          width="200px"
        />

        {/* Date Selector */}
        <div className="min-w-[240px]">
          <DatePicker 
            id="dashboard-range" 
            mode="range" 
            placeholder="01/05/2025 - 07/05/2025"
            onChange={(dates) => console.log("Selected dates:", dates)}
          />
        </div>

        {/* Apply Button */}
        <button className="h-11 bg-gradient-to-r from-[#FF8B1F] to-[#f59e0b] hover:from-[#e07a1b] hover:to-[#d97706] text-white px-6 rounded-xl font-bold text-sm transition-all active:scale-[0.98] shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 5.25H15M3 9H15M3 12.75H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="6" cy="5.25" r="1.5" fill="white" stroke="#FF8B1F" strokeWidth="2"/>
            <circle cx="12" cy="9" r="1.5" fill="white" stroke="#FF8B1F" strokeWidth="2"/>
            <circle cx="7.5" cy="12.75" r="1.5" fill="white" stroke="#FF8B1F" strokeWidth="2"/>
          </svg>
          Áp dụng
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
