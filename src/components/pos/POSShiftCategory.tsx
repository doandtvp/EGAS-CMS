"use client";
import React, { useState } from "react";
import {
  PlusIcon,
  TrashBinIcon,
  HorizontaLDots,
  ChevronDownIcon,
  ChevronRightIcon,
  DownloadIcon,
  CheckLineIcon,
  ChevronUpIcon,
} from "@/icons";
import { DataTable, ColumnDef } from "@/components/ui/table/DataTable";
import { Pagination } from "@/components/ui/Pagination";
import Button from "@/components/common/Button";
import SearchInput from "@/components/common/SearchInput";
import CustomSelect from "@/components/dashboard/CustomSelect";
import { cn } from "@/utils";

interface GoodsGroup {
  id: string;
  name: string;
  code: string;
  parentId?: string;
  level: number;
  childCount?: number;
}

const mockGroups: GoodsGroup[] = [
  { id: "1", name: "Xăng dầu sáng", code: "0101-0701", level: 0, childCount: 6 },
  { id: "1-1", name: "Nhiên liệu bay", code: "0101", parentId: "1", level: 1 },
  { id: "1-2", name: "Nhiên liệu xăng", code: "0201", parentId: "1", level: 1 },
  { id: "1-3", name: "Nhiên liệu pha chế", code: "0301", parentId: "1", level: 1 },
  { id: "1-4", name: "Nhiên liệu hàng hải", code: "0401", parentId: "1", level: 1 },
  { id: "1-5", name: "Nhiên liệu thắp sáng", code: "0501", parentId: "1", level: 1 },
  { id: "1-6", name: "Nhiên liệu Diezen", code: "0601", parentId: "1", level: 1 },
  { id: "1-7", name: "Nhiên liệu đốt lò", code: "0701", parentId: "1", level: 1 },
  { id: "2", name: "Dầu mỡ nhờn", code: "0801-0999", level: 0, childCount: 15 },
  { id: "3", name: "Hàng hóa tổng hợp", code: "1001-1501", level: 0, childCount: 12 },
  { id: "4", name: "Hàng hóa tổng hợp", code: "1601-1699", level: 0, childCount: 7 },
  { id: "5", name: "Hàng hóa tổng hợp", code: "1001-1501", level: 0, childCount: 12 },
  { id: "6", name: "Hàng hóa tổng hợp", code: "1001-1501", level: 0, childCount: 20 },
];

const POSShiftCategory: React.FC = () => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(["1"]));
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(["1-1", "1-2"]));
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filterValue, setFilterValue] = useState("all");

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const visibleData = mockGroups.filter((group) => {
    if (group.level === 0) return true;
    if (group.parentId && expandedIds.has(group.parentId)) return true;
    return false;
  });

  const columns: ColumnDef<GoodsGroup>[] = [
    {
      key: "name",
      header: (
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center min-w-[20px]">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-brand-500 w-4 h-4 cursor-pointer focus:ring-brand-500/20"
            />
          </div>
          <div className="flex items-center justify-between flex-1 pr-2">
            <span className="text-theme-sm font-bold text-gray-800">Tên nhóm</span>
            <div className="flex flex-col gap-0.5 opacity-40">
              <ChevronUpIcon className="w-2 h-2" />
              <ChevronDownIcon className="w-2 h-2" />
            </div>
          </div>
        </div>
      ),
      render: (row) => (
        <div
          className="flex items-center gap-3"
          style={{ paddingLeft: `${row.level === 0 ? 0 : 32}px` }}
        >
          <div className="flex items-center gap-2 min-w-[48px]">
            {row.level === 0 ? (
              <button
                onClick={() => toggleExpand(row.id)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                {expandedIds.has(row.id) ? (
                  <ChevronDownIcon className="w-5 h-5 text-gray-800" />
                ) : (
                  <ChevronRightIcon className="w-5 h-5 text-gray-800" />
                )}
              </button>
            ) : (
              <div className="w-6" />
            )}
            <input
              type="checkbox"
              checked={selectedIds.has(row.id)}
              onChange={() => toggleSelect(row.id)}
              className={cn(
                "rounded border-gray-300 w-4 h-4 cursor-pointer",
                row.level === 0
                  ? "text-brand-500 focus:ring-brand-500/20"
                  : "text-orange-500 focus:ring-orange-500/20"
              )}
            />
          </div>
          <span
            className={cn(
              "text-theme-base font-normal truncate",
              row.level === 0 ? "text-gray-800 font-bold" : "text-gray-600"
            )}
          >
            {row.name}{" "}
            {row.childCount && (
              <span className="text-gray-400 font-normal">({row.childCount})</span>
            )}
          </span>
        </div>
      ),
      headerClassName: "px-4 py-3 border-r border-[#A0B8CE] min-w-[400px]",
      className: "px-4 py-3",
    },
    {
      key: "code",
      header: (
        <div className="flex items-center justify-between w-full pr-2">
          <span className="text-theme-sm font-bold text-gray-800">Mã nhóm</span>
          <div className="flex flex-col gap-0.5 opacity-40">
            <ChevronUpIcon className="w-2 h-2" />
            <ChevronDownIcon className="w-2 h-2" />
          </div>
        </div>
      ),
      render: (row) => (
        <span
          className={cn(
            "text-theme-base font-normal",
            row.level === 0 ? "text-gray-800" : "text-blue-custom cursor-pointer"
          )}
        >
          {row.code}
        </span>
      ),
      headerClassName: "px-4 py-3 border-r border-[#A0B8CE]",
      className: "px-4 py-3",
    },
    {
      key: "actions",
      header: (
        <div className="flex items-center justify-between w-full pr-2">
          <span className="text-theme-sm font-bold text-gray-800">Hành động</span>
        </div>
      ),
      render: () => (
        <div className="flex justify-center">
          <button className="p-1.5 text-gray-400 hover:text-gray-600 bg-gray-100/50 rounded-lg">
            <HorizontaLDots className="w-6 h-6" />
          </button>
        </div>
      ),
      headerClassName: "px-4 py-3 text-center",
      className: "px-4 py-3 text-center",
    },
  ];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Header Bar */}
      <div className="flex-none bg-white dark:bg-gray-800 px-4 sm:px-6 py-4 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <h2 className="text-theme-xl font-bold text-gray-900 dark:text-white">Nhóm hàng hóa</h2>

        <div className="flex flex-col md:flex-row items-center gap-3 flex-1 justify-end w-full">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto">
            <SearchInput
              value=""
              onChange={() => {}}
              placeholder="Tìm kiếm nhanh"
              className="w-full sm:w-[240px]"
              inputClassName="h-[42px] border-gray-200 rounded-xl"
            />
            <div className="w-full sm:w-[220px]">
              <CustomSelect
                options={[
                  { value: "all", label: "Lọc theo nhóm cha" },
                  { value: "1", label: "Lọc theo nhóm con" },
                ]}
                value={filterValue}
                onChange={setFilterValue}
                placeholder="Lọc theo nhóm"
                width="100%"
                buttonClassName="bg-white font-bold h-[42px] rounded-xl border-gray-200"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Button
              variant="ghost"
              className="h-[42px] w-[42px] p-0 border border-gray-200 bg-white shadow-sm flex-none rounded-xl"
            >
              <span className="text-xl text-gray-400">↺</span>
            </Button>

            <div className="flex items-center gap-2 flex-1 md:flex-none overflow-x-auto no-scrollbar">
              <Button
                variant="primary"
                className="h-10 px-4 bg-success-600 hover:bg-success-700 text-white border-0 text-sm font-semibold rounded-xl"
                leftIcon={<DownloadIcon className="w-5 h-5" />}
              >
                Import/Export
              </Button>
              <Button
                variant="primary"
                className="h-10 px-4 bg-error-600 hover:bg-error-700 text-white border-0 text-sm font-semibold rounded-xl"
                leftIcon={<TrashBinIcon className="w-5 h-5" />}
              >
                Xóa
              </Button>
              <Button
                variant="primary"
                className="h-10 px-4 bg-brand-500 hover:bg-brand-600 text-white border-0 text-sm font-semibold rounded-xl"
                leftIcon={<CheckLineIcon className="w-5 h-5" />}
              >
                Lưu
              </Button>
              <Button
                variant="primary"
                className="h-10 px-4 bg-orange-500 hover:bg-orange-600 text-white border-0 text-sm font-semibold rounded-xl"
                leftIcon={<PlusIcon className="w-5 h-5" />}
              >
                Thêm mới
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 min-h-0">
        <DataTable
          columns={columns}
          data={visibleData}
          className="h-full overflow-auto"
          headerCellClassName="py-3 px-3 sticky top-0 z-20 bg-[#B5D3F1] text-gray-800 font-bold border-r border-[#A0B8CE] last:border-r-0"
          rowClassName={(row) =>
            cn(
              "border-b border-gray-100 transition-colors",
              row.level === 0 ? "bg-[#EBF3FB]/50" : "bg-white"
            )
          }
          bodyCellClassName="py-2 px-3"
        />
      </div>

      {/* Pagination */}
      <div className="flex-none p-4 border-t border-gray-100">
        <Pagination
          variant="full"
          currentPage={currentPage}
          totalPages={5}
          onPageChange={setCurrentPage}
          totalItems={350}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
        />
      </div>
    </div>
  );
};

export default POSShiftCategory;
