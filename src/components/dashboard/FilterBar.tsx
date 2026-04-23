"use client";
import React, { useState } from "react";
import DatePicker from "@/components/form/date-picker";
import CustomSelect from "./CustomSelect";
import { FilterIcon } from "@/icons";
import Button from "@/components/common/Button";

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
          buttonClassName="bg-white font-normal"
        />

        <CustomSelect 
          options={["Ca sáng", "Ca chiều", "Ca tối"]} 
          value={filterValues.shift}
          onChange={(val) => handleFilterChange("shift", val)}
          placeholder="Chọn Ca"
          width="140px"
          buttonClassName="bg-white font-normal"
        />

        <CustomSelect 
          options={["Nguyễn Công Lương", "Phạm Văn Tuấn Anh", "Trần Thị B", "Lê Văn C"]} 
          value={filterValues.staff}
          onChange={(val) => handleFilterChange("staff", val)}
          placeholder="Chọn nhân viên"
          width="200px"
          buttonClassName="bg-white font-normal"
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
        <Button 
          variant="gradient-orange" 
          className="min-w-[120px]"
          leftIcon={<FilterIcon className="w-5 h-5" />}
        >
          Áp dụng
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
