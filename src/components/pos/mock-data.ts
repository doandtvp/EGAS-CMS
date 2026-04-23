import { ReactNode } from "react";
import { ReportColumn } from "../common/ReportTable";

export interface ReportItem {
  type: "group" | "subgroup" | "leaf";
  id: string;
  name: string;
  code?: string;
  parentId?: string;
  values: string[];
}

export const HEADER_ROWS: ReportColumn<ReportItem>[][] = [
  [
    { header: "Mã hàng hóa", rowSpan: 2, showSort: true, className: "w-[110px]" },
    { header: "Tên hàng hóa", rowSpan: 2, className: "w-[200px]", showSort: true },
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

export const REPORT_DATA: ReportItem[] = [
  {
    type: "group", id: "g1", name: "Xăng dầu sáng",
    values: ["313.420.268", "240.073.121", "1.063.148.394", "2.000", "", "732.558.580", "20.345.200.363", "100.000.000", "35.000.000.000", "3.000.000.000", "3.000.000.000", "65.000.000.000"],
  },
  {
    type: "subgroup", id: "sg1", name: "Nhiên liệu xăng", parentId: "g1",
    values: ["313.420.268", "240.073.121", "1.063.148.394", "2.000", "", "732.558.580", "19.345.200.363", "100.000.000", "35.000.000.000", "3.000.000.000", "3.000.000.000", "65.000.000.000"],
  },
  {
    type: "leaf", id: "l1", code: "0201004", name: "Xăng E5 RON 92 mức 2",
    values: ["13.420.268", "13.420.268", "13.420.268", "", "", "13.420.268", "13.420.268", "13.420.268", "13.420.268", "13.420.268", "13.420.268", "13.420.268"],
  },
  {
    type: "leaf", id: "l2", code: "0201005", name: "Xăng RON 95-III",
    values: ["13.420.268", "13.420.268", "13.420.268", "", "", "13.420.268", "13.420.268", "13.420.268", "13.420.268", "13.420.268", "13.420.268", "13.420.268"],
  },
  {
    type: "subgroup", id: "sg2", name: "Nhiên liệu Diezen", parentId: "g1",
    values: ["313.420.268", "240.073.121", "1.063.148.394", "2.000", "", "732.558.580", "1.345.200.363", "100.000.000", "35.000.000.000", "3.000.000.000", "3.000.000.000", "65.000.000.000"],
  },
  {
    type: "leaf", id: "l3", code: "0202001", name: "DO 0,05S-II",
    values: ["13.420.268", "13.420.268", "13.420.268", "", "", "13.420.268", "13.420.268", "13.420.268", "13.420.268", "13.420.268", "13.420.268", "13.420.268"],
  },
  {
    type: "group", id: "g2", name: "Dầu mỡ nhờn",
    values: ["313.420.268", "240.073.121", "1.063.148.394", "2.000", "", "732.558.580", "20.345.200.363", "100.000.000", "35.000.000.000", "3.000.000.000", "3.000.000.000", "65.000.000.000"],
  },
  {
    type: "subgroup", id: "sg3", name: "Dầu nhờn động cơ", parentId: "g2",
    values: ["313.420.268", "240.073.121", "1.063.148.394", "2.000", "", "732.558.580", "19.345.200.363", "100.000.000", "35.000.000.000", "3.000.000.000", "3.000.000.000", "65.000.000.000"],
  },
  {
    type: "leaf", id: "l4", code: "0301001", name: "Dầu nhờn Petrolimex",
    values: ["13.420.268", "13.420.268", "13.420.268", "", "", "13.420.268", "13.420.268", "13.420.268", "13.420.268", "13.420.268", "13.420.268", "13.420.268"],
  },
  {
    type: "subgroup", id: "sg4", name: "Dầu nhờn truyền động", parentId: "g2",
    values: ["313.420.268", "240.073.121", "1.063.148.394", "2.000", "", "732.558.580", "19.345.200.363", "100.000.000", "35.000.000.000", "3.000.000.000", "3.000.000.000", "65.000.000.000"],
  },
  {
    type: "subgroup", id: "sg5", name: "Dầu phanh", parentId: "g2",
    values: ["313.420.268", "240.073.121", "1.063.148.394", "2.000", "", "732.558.580", "19.345.200.363", "100.000.000", "35.000.000.000", "3.000.000.000", "3.000.000.000", "65.000.000.000"],
  },
];

export const ADVANCED_FILTERS_CONFIG = [
  { id: "category", label: "Ngành hàng", placeholder: "Chọn ngành hàng", options: ["Xăng dầu", "Dầu mỡ nhờn", "Hàng hóa khác"] },
  { id: "productGroup", label: "Nhóm hàng hóa", placeholder: "Chọn nhóm hàng hóa", options: ["Nhiên liệu xăng", "Nhiên liệu Diezen", "Dầu nhờn động cơ"] },
  { id: "product", label: "Hàng hóa", placeholder: "Chọn hàng hóa", options: ["Xăng E5 RON 92", "Xăng RON 95-III", "DO 0,05S-II"] },
  { id: "ioGroup", label: "Nhóm nhập xuất", placeholder: "Chọn nhóm nhập xuất", options: ["Bán lẻ", "Bán buôn", "Nội bộ"] },
  { id: "target", label: "Đối tượng", placeholder: "Chọn đối tượng", options: ["Khách lẻ", "Khách đại lý", "Công nợ"] },
  { id: "docType", label: "Loại chứng từ", placeholder: "Chọn loại chứng từ", options: ["Hóa đơn", "Phiếu xuất kho", "Biên bản"] },
  { id: "priceGroup", label: "Nhóm giá", placeholder: "Chọn nhóm giá", options: ["Giá vùng 1", "Giá vùng 2", "Giá ưu đãi"] },
];

export const FOOTER_TOTALS = [
  "313.420.268", "240.073.121", "1.063.148.394", "2.000", "",
  "732.558.580", "20.345.200.363", "100.000.000", "35.000.000.000",
  "3.000.000.000", "3.000.000.000", "65.000.000.000",
];
