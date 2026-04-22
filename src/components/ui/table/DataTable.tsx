import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell } from './index';

export interface ColumnDef<T> {
  key: string;
  header: string | React.ReactNode;
  render?: (row: T, index: number) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  className?: string;
  headerClassName?: string;
  rowClassName?: string;
  emptyMessage?: React.ReactNode;
}

export function DataTable<T>({
  columns,
  data,
  className = "",
  headerClassName = "",
  rowClassName = "",
  emptyMessage = "Không có dữ liệu",
}: DataTableProps<T>) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <Table className="w-full text-left">
        <TableHeader>
          <TableRow className={`border-b border-gray-50 dark:border-gray-700 ${headerClassName}`}>
            {columns.map((col, idx) => (
              <TableCell
                key={col.key || idx}
                isHeader
                className={`pb-4 text-[14px] font-semibold text-[#333333] leading-[20px] ${
                  col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
                } ${col.className || ''}`}
              >
                {col.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-50 dark:divide-gray-700">
          {data.length === 0 ? (
            <TableRow>
              <TableCell isHeader={false} className="py-8 text-center text-gray-500">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className={`hover:bg-gray-50/30 dark:hover:bg-gray-700/30 transition-colors ${rowClassName}`}
              >
                {columns.map((col, colIndex) => (
                  <TableCell
                    key={col.key || colIndex}
                    className={`py-4 text-[16px] font-normal leading-[24px] text-gray-custom dark:text-gray-300 ${
                      col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
                    } ${col.className || ''}`}
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
