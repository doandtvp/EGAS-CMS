import React, { ReactNode } from "react";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { ArrowFill } from "@/icons";

export interface ReportColumn<T = unknown> {
  header?: ReactNode;
  accessor?: keyof T | ((item: T, index: number) => ReactNode);
  className?: string;
  rowSpan?: number;
  colSpan?: number;
  align?: "left" | "center" | "right";
  showSort?: boolean;
}

interface ReportTableProps<T> {
  headerRows: ReportColumn<T>[][];
  columns?: ReportColumn<T>[];
  data: T[];
  
  // Cấu hình Group Row
  isGroupRow?: (item: T) => boolean;
  getGroupClassName?: (item: T) => string;
  renderGroupHeader?: (item: T) => ReactNode;
  groupColSpan?: number;

  // Cấu hình Footer
  footerData?: ReactNode[];
  footerLabel?: string;
  footerSpan?: number;

  minWidth?: string;
  maxHeight?: string;
  className?: string;
  /** Cho phép nhấn giữ để kéo scroll */
  canDragTable?: boolean;
  /** Để dự phòng nếu vẫn muốn truyền footer tùy biến hoàn toàn */
  footer?: ReactNode;
  /** Để dự phòng nếu vẫn muốn renderRow tùy biến hoàn toàn */
  renderRow?: (item: T, index: number) => ReactNode;
}

export function ReportTable<T>({
  headerRows,
  columns,
  data,
  isGroupRow,
  getGroupClassName,
  renderGroupHeader,
  groupColSpan = 2,
  footerData,
  footerLabel = "Tổng cộng",
  footerSpan = 2,
  minWidth = "1440px",
  maxHeight,
  className = "",
  canDragTable = true,
  footer,
  renderRow,
}: ReportTableProps<T>) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);
  
  // Refs cho momentum scroll
  const velocity = React.useRef(0);
  const lastX = React.useRef(0);
  const animationRef = React.useRef<number | null>(null);

  const startMomentum = () => {
    if (!scrollRef.current || Math.abs(velocity.current) < 1) return;
    
    const step = () => {
      if (Math.abs(velocity.current) < 0.5 || isDragging) {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        return;
      }
      
      if (scrollRef.current) {
        scrollRef.current.scrollLeft -= velocity.current;
        velocity.current *= 0.95; // Độ ma sát (decay factor)
        animationRef.current = requestAnimationFrame(step);
      }
    };
    animationRef.current = requestAnimationFrame(step);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!canDragTable || !scrollRef.current) return;
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    lastX.current = e.pageX;
    velocity.current = 0;
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      startMomentum();
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      startMomentum();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walkX = (x - startX) * 1.5;

    // Tính toán vận tốc dựa trên khoảng cách di chuyển cuối cùng
    velocity.current = e.pageX - lastX.current;
    lastX.current = e.pageX;

    if (Math.abs(x - startX) > 5) {
      e.preventDefault();
      scrollRef.current.scrollLeft = scrollLeft - walkX;
    }
  };
  
  const defaultRenderRow = (item: T, index: number) => {
    if (renderRow) return renderRow(item, index);

    // Xử lý Group Row tự động
    if (isGroupRow?.(item) && renderGroupHeader) {
      const isSpecial = isGroupRow(item);
      if (isSpecial) {
        return (
          <TableRow key={index} className={getGroupClassName?.(item)}>
            <TableCell
              colSpan={groupColSpan}
              className="px-2 py-3 border-r border-b border-[#A0B8CE] dark:border-gray-700 font-semibold"
            >
              {renderGroupHeader(item)}
            </TableCell>
            {/* Tự động render các cell giá trị còn lại nếu có columns */}
            {columns?.slice(groupColSpan).map((col, colIdx) => {
              let content: ReactNode = "";
              if (typeof col.accessor === "function") {
                content = col.accessor(item, index);
              } else if (col.accessor) {
                content = item[col.accessor as keyof T] as ReactNode;
              }
              return (
                <TableCell
                  key={colIdx}
                  className={`px-2 py-3 border-r border-b border-[#A0B8CE] dark:border-gray-700 text-right tabular-nums ${col.className || ""}`}
                >
                  {content}
                </TableCell>
              );
            })}
          </TableRow>
        );
      }
    }

    // Render hàng dữ liệu chuẩn
    if (columns) {
      return (
        <TableRow key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 text-gray-600 dark:text-gray-400">
          {columns.map((col, colIdx) => {
            let content: ReactNode = "";
            if (typeof col.accessor === "function") {
              content = col.accessor(item, index);
            } else if (col.accessor) {
              content = item[col.accessor as keyof T] as ReactNode;
            }

            return (
              <TableCell
                key={colIdx}
                className={`px-2 py-3 border-r border-b border-[#A0B8CE] dark:border-gray-700 ${
                  col.align === "right" ? "text-right tabular-nums" : col.align === "center" ? "text-center" : "text-left"
                } ${col.className || ""}`}
              >
                {content}
              </TableCell>
            );
          })}
        </TableRow>
      );
    }

    return null;
  };

  return (
    <div className={`bg-white dark:bg-gray-800 shadow-dashboard overflow-hidden flex flex-col ${className}`}>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #cbd5e1 transparent; }
      `}</style>
      
      <div 
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`overflow-auto relative custom-scrollbar ${canDragTable ? (isDragging ? "cursor-grabbing select-none" : "cursor-grab") : ""}`} 
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
                        col.align === "center" ? "text-center" : col.align === "right" ? "text-right" : "text-left"
                      } ${col.className || ""}`}
                      style={{ backgroundClip: "padding-box" }}
                    >
                      <div className={`flex items-center gap-1 w-full ${
                        col.align === "center" ? "justify-center" : col.align === "right" ? "justify-end" : "justify-between"
                      }`}>
                        <span className="truncate">{col.header}</span>
                        {col.showSort && (
                          <div className="flex flex-col gap-1 shrink-0">
                            <ArrowFill /><ArrowFill className="rotate-180" />
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
            {data.map((item, index) => defaultRenderRow(item, index))}
          </TableBody>
          {(footerData || footer) && (
            <tfoot className="sticky bottom-0 z-20 bg-[#389EE8] text-white">
              {footer || (
                <TableRow className="font-bold">
                  <TableCell colSpan={footerSpan} className="px-2 py-3 border-r border-white/20 uppercase">
                    {footerLabel}
                  </TableCell>
                  {footerData?.map((v, i) => (
                    <TableCell
                      key={i}
                      className="px-2 py-3 border-r border-white/20 text-right tabular-nums"
                    >
                      {v}
                    </TableCell>
                  ))}
                </TableRow>
              )}
            </tfoot>
          )}
        </Table>
      </div>
    </div>
  );
}

export default ReportTable;
