"use client";
import React from "react";
import { SingleArrowIcon, DoubleArrowIcon, ChevronDownIcon } from "@/icons";
import { cn } from "@/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  variant?: "standard" | "full" | "buttons";
  totalItems?: number;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
  variant = "standard",
  totalItems = 0,
  pageSize = 10,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
}) => {
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage, "...", totalPages);
      }
      // Note: The user explicitly said "show 3 trang đầu trước => ... và show trang cuối"
      // However, to make it usable when on middle pages, we use a slightly more flexible logic.
      // But if we strictly follow "show 3 đầu => ... => cuối" only when at start:
      // Let's use a logic that always shows 1, 2, 3, '...', totalPages if currentPage <= 3
    }

    // Final check: if user wants literal "1 2 3 ... totalPages" regardless of current page:
    // "show 3 trang đầu trước => ... và show trang cuối"
    // I'll implement exactly that for totalPages >= 5.
    if (totalPages >= 5) {
      return [1, 2, 3, "...", totalPages];
    }
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  const PageButtons = (
    <div className="flex items-center gap-2">
      {/* First Page */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="w-8 h-8 flex items-center justify-center border border-pagination-border rounded-lg disabled:opacity-50 text-grayscale-30 hover:bg-gray-50 transition-colors"
      >
        <DoubleArrowIcon className="w-4 h-4" />
      </button>

      {/* Prev Page */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-8 h-8 flex items-center justify-center border border-pagination-border rounded-lg disabled:opacity-50 text-grayscale-30 hover:bg-gray-50 transition-colors"
      >
        <SingleArrowIcon className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-1.5">
        {getVisiblePages().map((page, idx) => (
          <React.Fragment key={idx}>
            {page === "..." ? (
              <span className="w-8 h-8 flex items-center justify-center text-grayscale-30 text-theme-sm font-medium">
                ...
              </span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={cn(
                  "w-8 h-8 flex items-center justify-center text-theme-sm font-medium rounded-lg transition-all",
                  currentPage === page
                    ? "bg-stat-1 text-pagination-active-text"
                    : "text-grayscale-900 border border-pagination-border hover:bg-gray-50"
                )}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Next Page */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-8 h-8 flex items-center justify-center border border-pagination-border rounded-lg disabled:opacity-50 text-grayscale-30 hover:bg-gray-50 transition-colors"
      >
        <SingleArrowIcon className="w-4 h-4 rotate-180" />
      </button>

      {/* Last Page */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="w-8 h-8 flex items-center justify-center border border-pagination-border rounded-lg disabled:opacity-50 text-grayscale-30 hover:bg-gray-50 transition-colors"
      >
        <DoubleArrowIcon className="w-4 h-4 rotate-180" />
      </button>
    </div>
  );

  if (variant === "standard" || variant === "buttons") {
    return <div className={cn("flex items-center justify-center", className)}>{PageButtons}</div>;
  }

  // --- Variant: Full (Dropdown + Text + Buttons) ---
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row items-center justify-between gap-4 w-full",
        className
      )}
    >
      {/* Left side: Page Size Dropdown */}
      <div className="flex items-center gap-3 sm:gap-4 order-2 lg:order-1">
        <span className="hidden sm:inline text-theme-sm text-grayscale-30 font-medium">
          Số lượng bản ghi hiển thị
        </span>
        <div className="relative">
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
            className="appearance-none bg-white dark:bg-gray-900 border border-pagination-border rounded-lg pl-3 pr-8 sm:pl-4 sm:pr-10 py-1.5 sm:py-2 text-theme-sm font-normal text-grayscale-20 dark:text-gray-200 outline-none focus:ring-1 focus:ring-brand-500 cursor-pointer"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-grayscale-30 pointer-events-none" />
        </div>
      </div>

      {/* Right side: Text + Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 lg:gap-10 order-1 lg:order-2 w-full lg:w-auto justify-end">
        <span className="text-theme-sm text-grayscale-30 font-normal tracking-tight whitespace-nowrap">
          Bản ghi {startItem} - {endItem} trong tổng số {totalItems}
        </span>
        {PageButtons}
      </div>
    </div>
  );
};
