"use client";
import React, { useState } from "react";
import { TrashBinIcon, PlusIcon } from "@/icons";
import { DataTable, ColumnDef } from "@/components/ui/table/DataTable";
import { Pagination } from "../ui/Pagination";
import DatePicker from "@/components/form/date-picker";
import Button from "@/components/common/Button";
import SearchInput from "@/components/common/SearchInput";
import { Tabs, Tab, TabList, TabPanel } from "@/components/ui/Tabs";
import StatusBadge from "@/components/ui/badge/StatusBadge";
import { cn } from "@/utils";

interface ImportOrder {
  id: string;
  code: string;
  docDate: string;
  expectedDate: string;
  warehouse: string;
  goods: string;
  volume: string;
  status: "new" | "success" | "closed";
  creator: string;
}

const statusOrder = { new: 0, success: 1, closed: 2 };

const mockData: ImportOrder[] = [
  ...Array(25)
    .fill(null)
    .map((_, i) => ({
      id: `order-${i}`,
      code: `0002003${46 + i}`,
      docDate: "17/12/2025 15:25",
      expectedDate: "17/12/2025 20:30",
      warehouse: "Kho Văn Trúc",
      goods: i % 2 === 0 ? "Dầu Diezen 0.05S mức 2" : "Xăng RON 95-III",
      volume: `${1000 + i}.000`,
      status: (i % 3 === 0 ? "new" : i % 3 === 1 ? "success" : "closed") as ImportOrder["status"],
      creator: i % 2 === 0 ? "Nguyễn Văn Anh" : "Trần Thị Bình",
    })),
].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);

const ImportGoodsList: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const paginatedData = mockData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(mockData.length / pageSize);

  const tabs = [
    { id: "all", label: "Tất cả", count: 25 },
    { id: "processing", label: "Đang xử lý", count: 4 },
    { id: "completed", label: "Hoàn tất", count: 20 },
    { id: "draft", label: "Nháp", count: 1 },
  ];

  const renderHeader = (label: string) => (
    <div className="flex items-center justify-between w-full pr-2 group">
      <span className="text-theme-sm font-bold text-[#1D2939] leading-none">{label}</span>
      <div className="flex flex-col gap-0.5 opacity-40 group-hover:opacity-100 transition-opacity">
        <svg width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 0L6 4H0L3 0Z" fill="currentColor" />
        </svg>
        <svg
          width="6"
          height="4"
          viewBox="0 0 6 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="rotate-180"
        >
          <path d="M3 0L6 4H0L3 0Z" fill="currentColor" />
        </svg>
      </div>
    </div>
  );

  const columns: ColumnDef<ImportOrder>[] = [
    {
      key: "checkbox",
      header: (
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            className="rounded border-[#A0B8CE] text-brand-500 w-4 h-4 cursor-pointer focus:ring-brand-500/20"
          />
        </div>
      ),
      render: () => (
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            className="rounded border-[#A0B8CE] text-brand-500 w-4 h-4 cursor-pointer focus:ring-brand-500/20"
          />
        </div>
      ),
      headerClassName: "px-3 py-3 min-w-[48px] text-center border-r border-[#A0B8CE]",
      className: "px-3 py-3 text-center",
    },
    {
      key: "code",
      header: renderHeader("Số lệnh"),
      render: (row) => (
        <span className="text-[#2B82D8] text-theme-base font-normal active:opacity-70 cursor-pointer">
          {row.code}
        </span>
      ),
      headerClassName: "px-3 py-3 border-r border-[#A0B8CE]",
      className: "px-3 py-3",
    },
    {
      key: "docDate",
      header: renderHeader("Ngày chứng từ"),
      headerClassName: "px-3 py-3 border-r border-[#A0B8CE]",
      className: "px-3 py-3 text-theme-base text-grayscale-30 font-normal",
    },
    {
      key: "expectedDate",
      header: renderHeader("Ngày dự kiến nhập hàng"),
      headerClassName: "px-3 py-3 border-r border-[#A0B8CE]",
      className: "px-3 py-3 text-theme-base text-grayscale-30 font-normal",
    },
    {
      key: "warehouse",
      header: renderHeader("Kho nhập"),
      headerClassName: "px-3 py-3 border-r border-[#A0B8CE]",
      className: "px-3 py-3 text-theme-base text-grayscale-30 font-normal",
    },
    {
      key: "goods",
      header: renderHeader("Hàng hóa"),
      headerClassName: "px-3 py-3 border-r border-[#A0B8CE]",
      className: "px-3 py-3 text-theme-base text-grayscale-30 font-normal max-w-[220px] truncate",
    },
    {
      key: "volume",
      header: renderHeader("LTT"),
      headerClassName: "px-3 py-3 border-r border-[#A0B8CE]",
      className: "px-3 py-3 text-theme-base text-grayscale-30 font-normal tracking-tight",
    },
    {
      key: "status",
      header: renderHeader("Trạng thái"),
      render: (row) => (
        <div className="flex justify-start">
          <StatusBadge status={row.status} />
        </div>
      ),
      headerClassName: "px-3 py-3 border-r border-[#A0B8CE]",
      className: "px-3 py-3",
    },
    {
      key: "creator",
      header: renderHeader("Người tạo"),
      headerClassName: "px-3 py-3",
      className: "px-3 py-3 text-theme-base text-grayscale-30 font-normal",
    },
  ];

  const getTabBadgeColor = (id: string) => {
    switch (id) {
      case "all":
        return cn("bg-[#F4831F]/15 text-[#F4831F]");
      case "processing":
        return cn("bg-[#0E55FF]/15 text-[#0E55FF]");
      case "completed":
        return cn("bg-[#10B981]/15 text-[#10B981]");
      case "draft":
        return cn("bg-[#6B7280]/15 text-[#6B7280]");
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-138px)] overflow-hidden bg-white dark:bg-gray-900">
      {/* Search & Filter Bar - Responsive */}
      <div className="flex-none bg-white dark:bg-gray-800 px-4 sm:px-6 pt-4 pb-2 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <h2 className="text-theme-base font-bold text-blue-dark dark:text-white whitespace-nowrap">
          Danh sách lệnh nhập kho
        </h2>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 flex-1 justify-end w-full">
          {/* Search & Date Picker Group */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto flex-1 xl:flex-none">
            <SearchInput
              iconPosition="left"
              value=""
              onChange={() => {}}
              placeholder="Tìm kiếm"
              className={cn("w-full sm:flex-1 lg:w-[280px]")}
              inputClassName={cn(
                "h-[42px] border-gray-100 dark:border-gray-700 rounded-xl text-theme-sm"
              )}
            />

            <DatePicker
              id="import-range"
              mode="range"
              placeholder="Từ ngày → Đến ngày"
              className={cn("w-full sm:flex-1 lg:w-[260px]")}
              inputClassName={cn("h-[42px] border-gray-100 dark:border-gray-700 rounded-xl")}
            />
          </div>

          {/* Actions Group */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end sm:justify-start">
            <Button
              variant="ghost"
              className={cn(
                "h-[42px] w-[42px] p-0 border bg-white shadow-theme-xs flex-none",
                "border-gray-100 dark:border-gray-700"
              )}
            >
              <span className="text-xl">↺</span>
            </Button>
            <div className="flex items-center gap-2 flex-1 md:flex-none">
              <Button
                variant="primary"
                className={cn(
                  "h-9 px-4 text-theme-sm font-semibold shadow-theme-sm border-0 flex-1 md:flex-none",
                  "bg-stat-6 hover:opacity-90 text-white"
                )}
                leftIcon={<TrashBinIcon className="w-5 h-5" />}
              >
                Xóa
              </Button>
              <Button
                variant="primary"
                className={cn(
                  "h-9 px-5 text-theme-sm font-semibold shadow-theme-sm whitespace-nowrap border-0 flex-1 md:flex-none",
                  "bg-stat-2 hover:opacity-90 text-white"
                )}
                leftIcon={<PlusIcon className="w-4 h-4" />}
              >
                Thêm lệnh nhập
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Section - Scrollable */}
      <div className={cn("flex-1 flex flex-col min-h-0 bg-white dark:bg-gray-800")}>
        <Tabs value={activeTab} onChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
          <div className={cn("flex-none px-6")}>
            <TabList className={cn("gap-1")}>
              {tabs.map((tab) => (
                <Tab
                  key={tab.id}
                  value={tab.id}
                  label={tab.label}
                  count={tab.count}
                  badgeClassName={getTabBadgeColor(tab.id)}
                />
              ))}
            </TabList>
          </div>

          <div className="flex-1 relative min-h-0">
            <TabPanel value={activeTab} className="h-full flex flex-col">
              <DataTable
                columns={columns}
                data={paginatedData}
                className="flex-1 overflow-auto"
                headerRowClassName={cn("border-b border-[#A0B8CE]")}
                headerCellClassName={cn("py-3 px-3 sticky top-0 z-20 bg-[#B5D3F1]")}
                rowClassName={cn(
                  "transition-colors group border-b border-gray-50",
                  "hover:bg-brand-25/50 dark:hover:bg-gray-900/50"
                )}
                bodyClassName={cn("divide-y-0")}
                bodyCellClassName={cn("py-3 px-3")}
              />
            </TabPanel>
          </div>
        </Tabs>
      </div>

      {/* Pagination - Fixed */}
      <div className="flex-none p-6 border-t border-gray-50 dark:border-gray-700 bg-white dark:bg-gray-800">
        <Pagination
          variant="full"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={mockData.length}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
        />
      </div>
    </div>
  );
};

export default ImportGoodsList;
