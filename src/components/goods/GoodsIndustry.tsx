"use client";
import React, { useState } from "react";
import Image from "next/image";
import { PlusIcon, TrashBinIcon, HorizontaLDots, DownloadIcon, CheckLineIcon } from "@/icons";
import { Pagination } from "@/components/ui/Pagination";
import Button from "@/components/common/Button";
import SearchInput from "@/components/common/SearchInput";
import CustomSelect from "@/components/dashboard/CustomSelect";

interface Product {
  id: string;
  name: string;
  code: string;
  group: string;
  unit: string;
  baseUnit: string;
  image: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Xăng máy bay",
    code: "0101001",
    group: "Nhiên liệu bay",
    unit: "L - Lít",
    baseUnit: "L - Lít",
    image: "/images/fuel-nozzle-v2.png",
  },
  {
    id: "2",
    name: "Jet A1",
    code: "0101002",
    group: "Nhiên liệu bay",
    unit: "L - Lít",
    baseUnit: "L - Lít",
    image: "/images/fuel-nozzle-v2.png",
  },
  {
    id: "3",
    name: "TC-1",
    code: "0101003",
    group: "Nhiên liệu bay",
    unit: "L - Lít",
    baseUnit: "L - Lít",
    image: "/images/fuel-nozzle-v2.png",
  },
  {
    id: "4",
    name: "Xăng RON 95 - IV",
    code: "0101004",
    group: "Nhiên liệu bay",
    unit: "L - Lít",
    baseUnit: "L - Lít",
    image: "/images/fuel-nozzle-v2.png",
  },
  {
    id: "5",
    name: "Xăng RON Mức 2",
    code: "0101001",
    group: "Nhiên liệu xăng",
    unit: "L - Lít",
    baseUnit: "L - Lít",
    image: "/images/fuel-nozzle-v2.png",
  },
  {
    id: "6",
    name: "XăngRON95-II",
    code: "0101001",
    group: "Nhiên liệu bay",
    unit: "L - Lít",
    baseUnit: "L - Lít",
    image: "/images/fuel-nozzle-v2.png",
  },
  {
    id: "7",
    name: "Xăng RON97",
    code: "0101002",
    group: "Nhiên liệu bay",
    unit: "L - Lít",
    baseUnit: "L - Lít",
    image: "/images/fuel-nozzle-v2.png",
  },
  {
    id: "8",
    name: "Xăng E5 RON 92 mức 2",
    code: "0101003",
    group: "Nhiên liệu bay",
    unit: "L - Lít",
    baseUnit: "L - Lít",
    image: "/images/fuel-nozzle-v2.png",
  },
  {
    id: "9",
    name: "Xăng E10 RON 95 Mức 3",
    code: "0101004",
    group: "Nhiên liệu bay",
    unit: "L - Lít",
    baseUnit: "L - Lít",
    image: "/images/fuel-nozzle-v2.png",
  },
  {
    id: "10",
    name: "Xăng RON 92 - IV",
    code: "0101001",
    group: "Nhiên liệu xăng",
    unit: "L - Lít",
    baseUnit: "L - Lít",
    image: "/images/fuel-nozzle-v2.png",
  },
];

const ProductCard: React.FC<{
  product: Product;
  selected: boolean;
  onToggle: () => void;
}> = ({ product, selected, onToggle }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
      {/* Image Section */}
      <div className="p-3">
        <div className="relative aspect-square bg-[#F9FAFB] dark:bg-gray-900/50 rounded-xl flex items-center justify-center overflow-hidden p-4">
          <Image
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
            className="object-contain transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="px-5 pb-5 pt-1 space-y-4">
        <h3 className="text-theme-base font-bold text-gray-800 dark:text-white line-clamp-1">
          {product.name}
        </h3>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-theme-xs">
            <span className="text-gray-400 font-medium">Mã hàng hóa</span>
            <span className="text-gray-700 dark:text-gray-300 font-semibold">{product.code}</span>
          </div>
          <div className="flex justify-between items-center text-theme-xs">
            <span className="text-gray-400 font-medium">Nhóm hàng hóa</span>
            <span className="text-gray-700 dark:text-gray-300 font-semibold">{product.group}</span>
          </div>
          <div className="flex justify-between items-center text-theme-xs">
            <span className="text-gray-400 font-medium">Đơn vị tính</span>
            <span className="text-gray-700 dark:text-gray-300 font-semibold">{product.unit}</span>
          </div>
          <div className="flex justify-between items-center text-theme-xs">
            <span className="text-gray-400 font-medium">Đvt cơ bản</span>
            <span className="text-gray-700 dark:text-gray-300 font-semibold">
              {product.baseUnit}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-50 dark:border-gray-700">
          <input
            type="checkbox"
            checked={selected}
            onChange={onToggle}
            className="rounded border-gray-300 text-orange-500 w-4 h-4 cursor-pointer focus:ring-orange-500/20"
          />
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <HorizontaLDots className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const GoodsIndustry: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(["1", "2"]));
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filterValue, setFilterValue] = useState("bay");

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Header Bar */}
      <div className="flex-none bg-white dark:bg-gray-800 px-4 sm:px-6 py-4 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <h2 className="text-theme-xl font-bold text-gray-900 dark:text-white">
          Hàng hóa - toàn ngành
        </h2>

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
                  { value: "bay", label: "Nhiên liệu bay" },
                  { value: "xang", label: "Nhiên liệu xăng" },
                ]}
                value={filterValue}
                onChange={setFilterValue}
                placeholder="Chọn nhóm hàng hóa"
                width="100%"
                buttonClassName="bg-white font-bold h-[42px] rounded-xl border-gray-200"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative group">
              <Button
                variant="ghost"
                className="h-[42px] w-[42px] p-0 border border-gray-100 bg-white shadow-theme-xs flex-none rounded-xl"
              >
                <span className="text-xl text-gray-400">↺</span>
              </Button>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Reset bộ lọc
              </div>
            </div>

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

      {/* Grid Section */}
      <div className="flex-1 overflow-auto p-4 sm:p-6 bg-gray-50/30">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {mockProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              selected={selectedIds.has(product.id)}
              onToggle={() => toggleSelect(product.id)}
            />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex-none p-4 border-t border-gray-100 bg-white">
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

export default GoodsIndustry;
