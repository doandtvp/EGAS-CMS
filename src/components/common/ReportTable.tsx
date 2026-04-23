import React, { ReactNode } from "react";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { ArrowFill } from "@/icons";

export interface ReportColumn {
  header: ReactNode;
  className?: string;
  rowSpan?: number;
  colSpan?: number;
  isHeader?: boolean;
  align?: "left" | "center" | "right";
  /** Hiển thị icon sắp xếp (sort) */
  showSort?: boolean;
}

interface ReportTableProps<T> {
  /** Các hàng của header (hỗ trợ nhiều tầng) */
  headerRows: ReportColumn[][];
  /** Mảng dữ liệu */
  data: T[];
  /** Hàm render từng hàng dữ liệu (để linh hoạt gộp nhóm) */
  renderRow: (item: T, index: number) => ReactNode;
  /** Độ rộng tối thiểu của bảng */
  minWidth?: string;
  /** Chiều cao tối đa (để scroll dọc) */
  maxHeight?: string;
  /** ClassName bổ sung cho container */
  className?: string;
  /** Nội dung footer của bảng (nếu có) */
  footer?: ReactNode;
}

export function ReportTable<T>({
  headerRows,
  data,
  renderRow,
  minWidth = "1440px",
  maxHeight,
  className = "",
  footer,
}: ReportTableProps<T>) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 border border-[#A0B8CE] dark:border-gray-700/50 shadow-dashboard overflow-hidden flex flex-col ${className}`}
    >
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }
      `}</style>
      <div
        className="overflow-auto relative custom-scrollbar"
        style={maxHeight ? { maxHeight } : undefined}
      >
        <Table className="w-full text-left border-separate border-spacing-0" style={{ minWidth }}>
          <TableHeader className="relative z-20">
            {headerRows.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className={`hover:bg-transparent bg-[#B5D3F1] dark:bg-gray-800 ${rowIndex === 0 ? "h-[56px]" : "h-[48px]"}`}
              >
                {row.map((col, colIndex) => {
                  const stickyTop = rowIndex === 0 ? "top-0" : "top-[56px]";

                  return (
                    <TableCell
                      key={colIndex}
                      isHeader
                      rowSpan={col.rowSpan}
                      colSpan={col.colSpan}
                      className={`sticky ${stickyTop} z-10 px-2 py-2 border-r border-b border-[#A0B8CE] text-[12px] font-semibold text-[#5D6A7D] dark:text-gray-200 leading-[16px] whitespace-nowrap bg-[#B5D3F1] dark:bg-[#2C3E50] ${
                        col.align === "center"
                          ? "text-center"
                          : col.align === "right"
                            ? "text-right"
                            : "text-left"
                      } ${col.className || ""}`}
                      style={{
                        backgroundClip: "padding-box",
                      }}
                    >
                      <div
                        className={`flex items-center gap-1 w-full ${
                          col.align === "center"
                            ? "justify-center"
                            : col.align === "right"
                              ? "justify-end"
                              : "justify-between"
                        }`}
                      >
                        <span className="truncate">{col.header}</span>
                        {col.showSort && (
                          <div className="flex flex-col gap-1 shrink-0">
                            <ArrowFill />
                            <ArrowFill className="rotate-180" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="text-[13px]">
            {data.map((item, index) => renderRow(item, index))}
          </TableBody>
          {footer && (
            <tfoot className="sticky bottom-0 z-20 bg-[#389EE8] text-white">{footer}</tfoot>
          )}
        </Table>
      </div>
    </div>
  );
}

export default ReportTable;
