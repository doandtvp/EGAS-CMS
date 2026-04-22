import React from 'react';
import { ChevronLeftIcon } from "@/icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  // Simple array of pages for now (e.g. 1, 2, ... totalPages)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-8 h-8 flex items-center justify-center border-[1.5px] border-[#E5E5E5] rounded disabled:opacity-50 text-gray-500 hover:bg-gray-50 transition-colors"
      >
        <ChevronLeftIcon className="w-4 h-4" />
      </button>
      
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 flex items-center justify-center text-[14px] font-normal leading-[24px] rounded transition-colors ${
            currentPage === page
              ? "bg-blue-custom text-white"
              : "text-[#1B1B1F] border-[1.5px] border-[#E5E5E5] hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-8 h-8 flex items-center justify-center border-[1.5px] border-[#E5E5E5] rounded disabled:opacity-50 text-gray-500 hover:bg-gray-50 transition-colors"
      >
        <ChevronLeftIcon className="w-4 h-4 rotate-180" />
      </button>
    </div>
  );
};
