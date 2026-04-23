"use client";
import React, { useState } from "react";
import Button from "@/components/common/Button";
import CustomSelect from "@/components/dashboard/CustomSelect";
import DatePicker from "@/components/form/date-picker";
import { FilterIcon, DocsIcon, DownloadIcon, ArrowFill } from "@/icons";
import ReportTable, { ReportColumn } from "../common/ReportTable";
import { TableRow, TableCell } from "@/components/ui/table";

const POSSalesShiftReport: React.FC = () => {
  const [filterValues, setFilterValues] = useState({
    quickSelect: "Chọn nhanh",
    warehouse: "Chọn kho",
  });

  // Định nghĩa Header cho báo cáo POS (2 tầng)
  const headerRows: ReportColumn[][] = [
    [
      {
        header: "Mã hàng hóa",
        rowSpan: 2,
        showSort: true,
        className: "w-[110px]",
      },
      {
        header: "Tên hàng hóa",
        rowSpan: 2,
        className: "w-[200px]",
        showSort: true,
      },
      { header: "Số lượng", colSpan: 7, align: "center" },
      { header: "Giá BQ", rowSpan: 2, showSort: true, className: "w-[100px]" },
      { header: "Tiền hàng", rowSpan: 2, showSort: true, className: "w-[130px]" },
      { header: "Thuế GTGT", rowSpan: 2, showSort: true, className: "w-[110px]" },
      { header: "Thuế MT", rowSpan: 2, showSort: true, className: "w-[110px]" },
      { header: "Tổng cộng", rowSpan: 2, align: "right", showSort: true, className: "w-[150px]" },
    ],
    [
      { header: "Bán tiền ngay CHXD", className: "text-[11px] w-[100px]" },
      { header: "Công nợ tại CHXD", className: "text-[11px] w-[100px]" },
      { header: "Bán khác", className: "text-[11px] w-[90px]", showSort: true },
      { header: "Xuất KM", className: "text-[11px] w-[90px]", showSort: true },
      { header: "CK thương mại", className: "text-[11px] w-[110px]" },
      { header: "Bán lẻ thu lẻ", className: "text-[11px] w-[110px]", showSort: true },
      { header: "Total", className: "text-[11px] w-[100px]", showSort: true },
    ],
  ];

  // Mock data đầy đủ theo thiết kế
  const reportData = [
    // NHÓM: XĂNG DẦU SÁNG
    {
      type: "group",
      id: "g1",
      name: "Xăng dầu sáng",
      values: [
        "313.420.268",
        "240.073.121",
        "1.063.148.394",
        "2.000",
        "",
        "732.558.580",
        "20.345.200.363",
        "100.000.000",
        "35.000.000.000",
        "3.000.000.000",
        "3.000.000.000",
        "65.000.000.000",
      ],
    },
    {
      type: "subgroup",
      id: "sg1",
      name: "Nhiên liệu xăng",
      parentId: "g1",
      values: [
        "313.420.268",
        "240.073.121",
        "1.063.148.394",
        "2.000",
        "",
        "732.558.580",
        "19.345.200.363",
        "100.000.000",
        "35.000.000.000",
        "3.000.000.000",
        "3.000.000.000",
        "65.000.000.000",
      ],
    },
    {
      type: "leaf",
      id: "l1",
      code: "0201004",
      name: "Xăng E5 RON 92 mức 2",
      values: [
        "13.420.268",
        "13.420.268",
        "13.420.268",
        "",
        "",
        "13.420.268",
        "13.420.268",
        "13.420.268",
        "13.420.268",
        "13.420.268",
        "13.420.268",
        "13.420.268",
      ],
    },
    {
      type: "leaf",
      id: "l2",
      code: "0201005",
      name: "Xăng RON 95-III",
      values: [
        "13.420.268",
        "13.420.268",
        "13.420.268",
        "",
        "",
        "13.420.268",
        "13.420.268",
        "13.420.268",
        "13.420.268",
        "13.420.268",
        "13.420.268",
        "13.420.268",
      ],
    },
    {
      type: "subgroup",
      id: "sg2",
      name: "Nhiên liệu Diezen",
      parentId: "g1",
      values: [
        "313.420.268",
        "240.073.121",
        "1.063.148.394",
        "2.000",
        "",
        "732.558.580",
        "1.345.200.363",
        "100.000.000",
        "35.000.000.000",
        "3.000.000.000",
        "3.000.000.000",
        "65.000.000.000",
      ],
    },
    {
      type: "leaf",
      id: "l3",
      code: "0202001",
      name: "DO 0,05S-II",
      values: [
        "13.420.268",
        "13.420.268",
        "13.420.268",
        "",
        "",
        "13.420.268",
        "13.420.268",
        "13.420.268",
        "13.420.268",
        "13.420.268",
        "13.420.268",
        "13.420.268",
      ],
    },

    // NHÓM: DẦU MỠ NHỜN
    {
      type: "group",
      id: "g2",
      name: "Dầu mỡ nhờn",
      values: [
        "313.420.268",
        "240.073.121",
        "1.063.148.394",
        "2.000",
        "",
        "732.558.580",
        "20.345.200.363",
        "100.000.000",
        "35.000.000.000",
        "3.000.000.000",
        "3.000.000.000",
        "65.000.000.000",
      ],
    },
    {
      type: "subgroup",
      id: "sg3",
      name: "Dầu nhờn động cơ",
      parentId: "g2",
      values: [
        "313.420.268",
        "240.073.121",
        "1.063.148.394",
        "2.000",
        "",
        "732.558.580",
        "19.345.200.363",
        "100.000.000",
        "35.000.000.000",
        "3.000.000.000",
        "3.000.000.000",
        "65.000.000.000",
      ],
    },
    {
      type: "leaf",
      id: "l4",
      code: "0301001",
      name: "Dầu nhờn Petrolimex",
      values: [
        "13.420.268",
        "13.420.268",
        "13.420.268",
        "",
        "",
        "13.420.268",
        "13.420.268",
        "13.420.268",
        "13.420.268",
        "13.420.268",
        "13.420.268",
        "13.420.268",
      ],
    },
    {
      type: "subgroup",
      id: "sg4",
      name: "Dầu nhờn truyền động",
      parentId: "g2",
      values: [
        "313.420.268",
        "240.073.121",
        "1.063.148.394",
        "2.000",
        "",
        "732.558.580",
        "19.345.200.363",
        "100.000.000",
        "35.000.000.000",
        "3.000.000.000",
        "3.000.000.000",
        "65.000.000.000",
      ],
    },
    {
      type: "subgroup",
      id: "sg5",
      name: "Dầu phanh",
      parentId: "g2",
      values: [
        "313.420.268",
        "240.073.121",
        "1.063.148.394",
        "2.000",
        "",
        "732.558.580",
        "19.345.200.363",
        "100.000.000",
        "35.000.000.000",
        "3.000.000.000",
        "3.000.000.000",
        "65.000.000.000",
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header & Filter Bar */}
      <div className="bg-white dark:bg-gray-800 p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="shrink-0">
            <h1 className="text-[18px] font-bold text-gray-800 dark:text-white leading-tight">
              Báo cáo xuất bán hàng hóa
            </h1>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 italic">
              Từ ngày 15/11/2025 đến ngày 15/12/2025 23:59
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <CustomSelect
              options={["Hôm nay", "Hôm qua", "Tuần này"]}
              value={filterValues.quickSelect}
              onChange={(val) => setFilterValues({ ...filterValues, quickSelect: val })}
              width="130px"
              buttonClassName="bg-white h-10 font-normal"
            />

            <DatePicker
              id="report-range"
              mode="range"
              placeholder="08/10/2025 → 20/04/2026"
              className="w-[240px]"
            />

            <CustomSelect
              options={["Kho 1", "Kho 2", "Kho 3"]}
              value={filterValues.warehouse}
              onChange={(val) => setFilterValues({ ...filterValues, warehouse: val })}
              width="130px"
              buttonClassName="bg-white h-10 font-normal"
            />

            <div className="relative min-w-[150px]">
              <input
                type="text"
                placeholder="Lọc nâng cao"
                className="h-10 pl-3 pr-8 border border-gray-200 dark:border-gray-700 rounded-xl bg-[#F8F9FB] dark:bg-gray-900 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 w-full"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">★</span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10 p-0 text-gray-400 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
            >
              <span className="text-xl">↺</span>
            </Button>

            <Button
              variant="gradient-orange"
              size="sm"
              className="h-10 px-4 text-[13px]"
              leftIcon={<FilterIcon className="w-5 h-5" />}
            >
              Áp dụng
            </Button>

            <Button
              variant="primary"
              size="sm"
              className="h-10 px-4 text-[13px] bg-[#389EE8] hover:bg-blue-600"
              leftIcon={<DocsIcon className="w-6 h-6" />}
            >
              In ấn
            </Button>

            <Button
              variant="primary"
              size="sm"
              className="h-10 px-4 text-[13px] bg-[#22B07E] hover:bg-green-600"
              leftIcon={<DownloadIcon className="w-6 h-6" />}
            >
              Xuất
            </Button>
          </div>
        </div>
      </div>

      {/* Report Table */}
      <ReportTable
        headerRows={headerRows}
        data={reportData}
        maxHeight="calc(100vh - 280px)"
        renderRow={(item, idx) => {
          if (item.type === "group") {
            return (
              <TableRow key={item.id} className="bg-[#E9F2FB] dark:bg-blue-900/10 font-semibold">
                <TableCell
                  colSpan={2}
                  className="px-2 py-3 border-r border-b border-[#A0B8CE] dark:border-gray-700 font-semibold"
                >
                  <div className="flex items-center gap-2">
                    <ArrowFill className="w-4 h-4" />
                    {item.name}
                  </div>
                </TableCell>
                {item.values.map((v, i) => (
                  <TableCell
                    key={i}
                    className={`px-2 py-3 border-r border-b border-[#A0B8CE] dark:border-gray-700 text-right tabular-nums`}
                  >
                    {v}
                  </TableCell>
                ))}
              </TableRow>
            );
          }
          if (item.type === "subgroup") {
            return (
              <TableRow
                key={item.id}
                className="bg-white dark:bg-gray-800 font-semibold italic text-gray-700 dark:text-gray-300"
              >
                <TableCell
                  colSpan={2}
                  className="px-2 py-3 border-r border-b border-[#A0B8CE] dark:border-gray-700 pl-8"
                >
                  <div className="flex items-center gap-2">
                    <ArrowFill className="w-4 h-4" />
                    {item.name}
                  </div>
                </TableCell>
                {item.values.map((v, i) => (
                  <TableCell
                    key={i}
                    className={`px-2 py-3 border-r border-b border-[#A0B8CE] dark:border-gray-700 text-right tabular-nums`}
                  >
                    {v}
                  </TableCell>
                ))}
              </TableRow>
            );
          }
          return (
            <TableRow
              key={item.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700/30 text-gray-600 dark:text-gray-400"
            >
              <TableCell className="px-2 py-3 border-r border-b border-[#A0B8CE] dark:border-gray-700 pl-12">
                {item.code}
              </TableCell>
              <TableCell className="px-2 py-3 border-r border-b border-[#A0B8CE] dark:border-gray-700">
                {item.name}
              </TableCell>
              {item.values.map((v, i) => (
                <TableCell
                  key={i}
                  className={`px-2 py-3 border-r border-b border-[#A0B8CE] dark:border-gray-700 text-right tabular-nums`}
                >
                  {v}
                </TableCell>
              ))}
            </TableRow>
          );
        }}
        footer={
          <TableRow className="bg-[#389EE8] text-white font-bold">
            <TableCell colSpan={2} className="px-2 py-3 border-r border-white/20 uppercase">
              Tổng cộng
            </TableCell>
            <TableCell className="px-2 py-3 border-r border-white/20 text-right tabular-nums">
              313.420.268
            </TableCell>
            <TableCell className="px-2 py-3 border-r border-white/20 text-right tabular-nums">
              240.073.121
            </TableCell>
            <TableCell className="px-2 py-3 border-r border-white/20 text-right tabular-nums">
              1.063.148.394
            </TableCell>
            <TableCell className="px-2 py-3 border-r border-white/20 text-right tabular-nums">
              2.000
            </TableCell>
            <TableCell className="px-2 py-3 border-r border-white/20 text-right tabular-nums"></TableCell>
            <TableCell className="px-2 py-3 border-r border-white/20 text-right tabular-nums">
              732.558.580
            </TableCell>
            <TableCell className="px-2 py-3 border-r border-white/20 text-right tabular-nums">
              20.345.200.363
            </TableCell>
            <TableCell className="px-2 py-3 border-r border-white/20 text-right tabular-nums">
              100.000.000
            </TableCell>
            <TableCell className="px-2 py-3 border-r border-white/20 text-right tabular-nums">
              35.000.000.000
            </TableCell>
            <TableCell className="px-2 py-3 border-r border-white/20 text-right tabular-nums">
              3.000.000.000
            </TableCell>
            <TableCell className="px-2 py-3 border-r border-white/20 text-right tabular-nums">
              3.000.000.000
            </TableCell>
            <TableCell className="px-2 py-3 text-right tabular-nums">65.000.000.000</TableCell>
          </TableRow>
        }
      />
    </div>
  );
};

export default POSSalesShiftReport;
