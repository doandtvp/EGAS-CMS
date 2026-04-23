"use client";
import React, { useState } from "react";
import Button from "@/components/common/Button";
import CustomSelect from "@/components/dashboard/CustomSelect";
import DatePicker from "@/components/form/date-picker";
import { FilterIcon, DocsIcon, DownloadIcon } from "@/icons";
import ReportTable, { ReportColumn } from "../common/ReportTable";

import {
  ReportItem,
  HEADER_ROWS,
  REPORT_DATA,
  ADVANCED_FILTERS_CONFIG,
  FOOTER_TOTALS,
} from "./mock-data";

const POSSalesShiftReport: React.FC = () => {
  interface FilterValues {
    quickSelect: string;
    warehouse: string;
    category: string;
    productGroup: string;
    product: string;
    ioGroup: string;
    target: string;
    docType: string;
    priceGroup: string;
  }

  const [filterValues, setFilterValues] = useState<FilterValues>({
    quickSelect: "",
    warehouse: "",
    category: "",
    productGroup: "",
    product: "",
    ioGroup: "",
    target: "",
    docType: "",
    priceGroup: "",
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  // Helper render tiêu đề nhóm
  const renderGroupHeader = (item: ReportItem) => (
    <div className={`flex items-center gap-2 ${item.type === "subgroup" ? "pl-6" : ""}`}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10.2628 12.8843L14.9274 7.49531C15.1006 7.29436 14.9444 7 14.6646 7L5.33542 7C5.0556 7 4.89936 7.29436 5.07264 7.49531L9.73723 12.8843C9.87074 13.0386 10.1293 13.0386 10.2628 12.8843Z"
          fill="#5D6A7D"
          fillOpacity="0.5"
        />
      </svg>
      {item.name}
    </div>
  );

  // Định nghĩa các cột dữ liệu cho hàng tiêu chuẩn (leaf rows)
  const bodyColumns: ReportColumn<ReportItem>[] = [
    { accessor: "code", className: "pl-12" },
    { accessor: "name" },
    ...Array.from({ length: 12 }).map((_, i) => ({
      accessor: (item: ReportItem) => item.values[i],
      align: "right" as const,
    })),
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Header & Filter Bar */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl dark:border-gray-700">
        <div className="flex items-center justify-between gap-4">
          <div className="shrink-0">
            <h1 className="text-[18px] font-bold text-gray-800 dark:text-white leading-tight">
              Báo cáo xuất bán hàng hóa
            </h1>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 italic">
              Từ ngày 15/11/2025 đến ngày 15/12/2025 23:59
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <CustomSelect
              options={["Hôm nay", "Hôm qua", "Tuần này"]}
              value={filterValues.quickSelect}
              onChange={(val) => setFilterValues({ ...filterValues, quickSelect: val })}
              width="170px"
              buttonClassName="bg-white h-10 font-normal"
              placeholder="Chọn nhanh"
            />

            <DatePicker
              id="report-range"
              mode="range"
              placeholder="08/10/2025 → 20/04/2026"
              className="w-[240px]"
            />

            <CustomSelect
              options={["Kho 1", "Kho 2", "Kho 3"]}
              value={filterValues.warehouse}
              onChange={(val) => setFilterValues({ ...filterValues, warehouse: val })}
              placeholder="Chọn kho"
              width="130px"
              buttonClassName="bg-white h-10 font-normal"
            />

            <Button
              variant="secondary"
              className={`h-10 min-w-[150px] border border-gray-200 dark:border-gray-700 rounded-xl text-[13px] font-normal justify-between px-3 bg-[#F8F9FB] dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all ${
                showAdvanced
                  ? "text-gray-900 dark:text-gray-100 ring-2 ring-brand-500/20"
                  : "text-gray-400"
              }`}
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <span>{showAdvanced ? "Đang lọc..." : "Lọc nâng cao"}</span>
              <span
                className={`text-[14px] transition-colors ${showAdvanced ? "text-yellow-500" : "text-gray-400"}`}
              >
                ★
              </span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10 p-0 text-gray-400 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
              onClick={() =>
                setFilterValues({
                  quickSelect: "",
                  warehouse: "",
                  category: "",
                  productGroup: "",
                  product: "",
                  ioGroup: "",
                  target: "",
                  docType: "",
                  priceGroup: "",
                })
              }
            >
              <span className="text-xl">↺</span>
            </Button>

            <Button
              variant="gradient-orange"
              size="sm"
              className="h-10 px-4 text-[13px]"
              leftIcon={<FilterIcon className="w-5 h-5" />}
            >
              Áp dụng
            </Button>

            <Button
              variant="primary"
              size="sm"
              className="h-10 px-4 text-[13px] bg-[#389EE8] hover:bg-blue-600"
              leftIcon={<DocsIcon className="w-6 h-6" />}
            >
              In ấn
            </Button>

            <Button
              variant="primary"
              size="sm"
              className="h-10 px-4 text-[13px] bg-[#22B07E] hover:bg-green-600"
              leftIcon={<DownloadIcon className="w-6 h-6" />}
            >
              Xuất
            </Button>
          </div>
        </div>

        {/* Advanced Filter Bar */}
        {showAdvanced && (
          <div className="bg-[#E9EDF2] dark:bg-gray-700/30 p-4 mt-4 rounded-xl flex items-end gap-4 relative animate-in fade-in slide-in-from-top-2">
            <div className="grid grid-cols-7 gap-4 flex-1">
              {ADVANCED_FILTERS_CONFIG.map((item) => (
                <div key={item.id} className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-semibold text-[#5D6A7D] dark:text-gray-300">
                    {item.label}
                  </label>
                  <CustomSelect
                    options={item.options}
                    value={filterValues[item.id as keyof FilterValues]}
                    onChange={(val) => setFilterValues({ ...filterValues, [item.id]: val })}
                    width="100%"
                    buttonClassName="bg-white h-10 font-normal border-none shadow-sm rounded-lg"
                    placeholder={item.placeholder}
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowAdvanced(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors border border-gray-100 dark:border-gray-700"
            >
              <span className="text-[20px]">✕</span>
            </button>
          </div>
        )}
      </div>

      {/* Report Table */}
      <ReportTable
        headerRows={HEADER_ROWS}
        columns={bodyColumns}
        data={REPORT_DATA}
        maxHeight={showAdvanced ? "calc(100vh - 385px)" : "calc(100vh - 280px)"}
        isGroupRow={(item) => item.type !== "leaf"}
        getGroupClassName={(item) =>
          item.type === "group"
            ? "bg-[#E9F2FB] dark:bg-blue-900/10 font-semibold"
            : "bg-white dark:bg-gray-800 font-semibold italic text-gray-700 dark:text-gray-300"
        }
        renderGroupHeader={renderGroupHeader}
        footerData={FOOTER_TOTALS}
      />
    </div>
  );
};

export default POSSalesShiftReport;
