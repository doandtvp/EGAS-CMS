"use client";
import React, { useState } from "react";
import Button from "@/components/common/Button";
import CustomSelect from "@/components/dashboard/CustomSelect";
import DatePicker from "@/components/form/date-picker";
import { FilterIcon, DocsIcon, DownloadIcon } from "@/icons";
import ReportTable, { ReportColumn } from "../common/ReportTable";
import { cn } from "@/utils";

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
    <div className={cn("flex items-center gap-2", item.type === "subgroup" && "pl-6")}>
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
        <div className="flex flex-col 2xl:flex-row 2xl:items-center justify-between gap-6">
          <div className="shrink-0 text-center 2xl:text-left">
            <h1 className="text-[18px] lg:text-[20px] font-bold text-gray-800 dark:text-white leading-tight">
              Báo cáo xuất bán hàng hóa
            </h1>
            <p className="text-[11px] lg:text-[12px] text-gray-500 dark:text-gray-400 italic mt-1">
              Từ ngày 15/11/2025 đến ngày 15/12/2025 23:59
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:flex 2xl:items-center gap-3 w-full 2xl:w-auto">
            <div className="w-full 2xl:w-[150px]">
              <CustomSelect
                options={["Hôm nay", "Hôm qua", "Tuần này"]}
                value={filterValues.quickSelect}
                onChange={(val) => setFilterValues({ ...filterValues, quickSelect: val })}
                width="100%"
                buttonClassName="bg-white h-10 font-normal"
                placeholder="Chọn nhanh"
              />
            </div>

            <div className="w-full sm:col-span-2 lg:col-span-1 2xl:w-[220px]">
              <DatePicker
                id="report-range"
                mode="range"
                placeholder="08/10/2025 → 20/04/2026"
                className="w-full"
              />
            </div>

            <div className="w-full 2xl:w-[120px]">
              <CustomSelect
                options={["Kho 1", "Kho 2", "Kho 3"]}
                value={filterValues.warehouse}
                onChange={(val) => setFilterValues({ ...filterValues, warehouse: val })}
                placeholder="Chọn kho"
                width="100%"
                buttonClassName="bg-white h-10 font-normal"
              />
            </div>

            <Button
              variant="secondary"
              className={cn(
                "h-10 w-full 2xl:w-[140px] border border-gray-200 dark:border-gray-700 rounded-xl text-[13px] font-normal justify-between px-3 bg-[#F8F9FB] dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all",
                showAdvanced
                  ? "text-gray-900 dark:text-gray-100 ring-2 ring-brand-500/20"
                  : "text-gray-400"
              )}
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <span>{showAdvanced ? "Đang lọc..." : "Lọc nâng cao"}</span>
              <span
                className={cn(
                  "text-[14px] transition-colors",
                  showAdvanced ? "text-yellow-500" : "text-gray-400"
                )}
              >
                ★
              </span>
            </Button>

            <div className="flex items-center gap-2 w-full 2xl:w-auto">
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 2xl:w-auto 2xl:px-4 p-0 text-gray-400 bg-gray-50 dark:bg-gray-700/50 rounded-xl flex items-center justify-center shrink-0"
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
                title=""
              >
                <span className="text-xl">↺</span>
              </Button>

              <Button
                variant="gradient-orange"
                size="sm"
                className="h-10 flex-1 2xl:w-[120px] 2xl:px-4 text-[13px] whitespace-nowrap"
                leftIcon={<FilterIcon className="w-5 h-5" />}
              >
                Áp dụng
              </Button>

              <Button
                variant="primary"
                size="sm"
                className="h-10 w-10 2xl:w-auto 2xl:px-4 p-0 bg-[#389EE8] hover:bg-blue-600 rounded-xl flex items-center justify-center shrink-0"
                title="In ấn"
              >
                <DocsIcon className="w-6 h-6" />
                <span className="hidden 2xl:inline ml-1 text-[13px] font-medium text-white">
                  In ấn
                </span>
              </Button>

              <Button
                variant="primary"
                size="sm"
                className="h-10 w-10 2xl:w-auto 2xl:px-4 p-0 bg-[#22B07E] hover:bg-green-600 rounded-xl flex items-center justify-center shrink-0"
                title="Xuất"
              >
                <DownloadIcon className="w-6 h-6" />
                <span className="hidden 2xl:inline ml-1 text-[13px] font-medium text-white">
                  Xuất
                </span>
              </Button>
            </div>
          </div>
        </div>

        {/* Advanced Filter Bar */}
        {showAdvanced && (
          <div className="bg-[#E9EDF2] dark:bg-gray-700/30 p-4 mt-6 rounded-xl relative animate-in fade-in slide-in-from-top-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
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
              className="absolute -top-3 -right-3 w-8 h-8 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors border border-gray-100 dark:border-gray-700 z-10"
            >
              <span className="text-[24px] leading-none">&times;</span>
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
