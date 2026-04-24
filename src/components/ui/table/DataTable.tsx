import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell } from './index';
import { cn } from "@/utils";

export interface ColumnDef<T> {
  key: string;
  header: string | React.ReactNode;
  render?: (row: T, index: number) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
  headerClassName?: string;
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  className?: string;
  tableClassName?: string;
  headerClassName?: string;
  headerRowClassName?: string;
  rowClassName?: string;
  bodyClassName?: string;
  headerCellClassName?: string;
  bodyCellClassName?: string;
  emptyMessage?: React.ReactNode;
}

export function DataTable<T>({
  columns,
  data,
  className = "",
  tableClassName = "",
  headerClassName = "",
  headerRowClassName = "",
  rowClassName = "",
  bodyClassName = "",
  headerCellClassName = "pb-4 text-[14px] font-semibold text-[#333333] leading-[20px]",
  bodyCellClassName = "py-4 text-[16px] font-normal leading-[24px] text-gray-custom dark:text-gray-300",
  emptyMessage = "Không có dữ liệu",
}: DataTableProps<T>) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <Table className={cn("w-full text-left", tableClassName)}>
        <TableHeader className={headerClassName}>
          <TableRow className={cn("border-b border-gray-50 dark:border-gray-700", headerRowClassName)}>
            {columns.map((col, idx) => (
              <TableCell
                key={col.key || idx}
                isHeader
                className={cn(
                  headerCellClassName,
                  col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left',
                  col.headerClassName
                )}
              >
                {col.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className={cn("divide-y divide-gray-50 dark:divide-gray-700", bodyClassName)}>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="py-8 text-center text-gray-500">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className={cn("hover:bg-gray-50/30 dark:hover:bg-gray-700/30 transition-colors", rowClassName)}
              >
                {columns.map((col, colIndex) => (
                  <TableCell
                    key={col.key || colIndex}
                    className={cn(
                      bodyCellClassName,
                      col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left',
                      col.className
                    )}
                  >
                    {col.render ? col.render(row, rowIndex) : String(row[col.key as keyof T] ?? '')}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
