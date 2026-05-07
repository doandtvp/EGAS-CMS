"use client";

import SearchInput from "@/components/common/SearchInput";
import DropdownSelect from "@/components/common/DropdownSelect";
import { ChevronDownIcon } from "@/icons";
import { useState } from "react";
import { OrderSidebar } from "./OrderSidebar";

type PumpOrder = {
  id: number;
  nozzle: string;
  liters: string;
  startAt: string;
  endAt: string;
  product: string;
  quantity: string;
  unitPrice: string;
  amount: string;
  logType: string;
};



const ORDERS: PumpOrder[] = [
  {
    id: 1,
    nozzle: "Vòi 2 - E5",
    liters: "11.200",
    startAt: "17/10/2025 16:00",
    endAt: "17/10/2025 16:01",
    product: "Xăng RON 95 mức 3",
    quantity: "11.200",
    unitPrice: "30 150",
    amount: "335 000",
    logType: "Xuất bán",
  },
  {
    id: 2,
    nozzle: "Vòi 3 - E5",
    liters: "11.500",
    startAt: "18/10/2025 10:00",
    endAt: "18/10/2025 10:01",
    product: "Xăng RON 95 mức 2",
    quantity: "11.500",
    unitPrice: "25 200",
    amount: "315 000",
    logType: "Xuất bán",
  },
  {
    id: 3,
    nozzle: "Vòi 4 - E5",
    liters: "12.000",
    startAt: "19/10/2025 09:30",
    endAt: "19/10/2025 09:31",
    product: "Xăng RON 95 mức 2",
    quantity: "12.000",
    unitPrice: "25 200",
    amount: "315 000",
    logType: "Xuất bán",
  },
  {
    id: 4,
    nozzle: "Vòi 5 - E5",
    liters: "12.500",
    startAt: "20/10/2025 14:00",
    endAt: "20/10/2025 14:01",
    product: "Xăng RON 92 mức 3",
    quantity: "12.500",
    unitPrice: "32 250",
    amount: "350 000",
    logType: "Xuất bán",
  },
  {
    id: 5,
    nozzle: "Vòi 6 - E5",
    liters: "13.000",
    startAt: "21/10/2025 11:00",
    endAt: "21/10/2025 11:01",
    product: "Xăng RON 92 mức 2",
    quantity: "13.000",
    unitPrice: "29 000",
    amount: "310 000",
    logType: "Xuất bán",
  },
];

export const PAYMENT_METHODS = [
  { id: "cash", label: "Tiền mặt", color: "bg-[#4BB35A]" },
  { id: "card", label: "Thẻ", color: "bg-[#2F92E8]" },
  { id: "bank", label: "Chuyển khoản", color: "bg-[#2F92E8]" },
  { id: "wallet", label: "Ví điện tử", color: "bg-[#8B5CF6]" },
  { id: "debt", label: "Công nợ", color: "bg-[#F59E0B]" },
];

export default function BeforePaymentPanel() {
  const tabs = ["Giao dịch 1", "Giao dịch 2"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPump, setSelectedPump] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const pumpOptions = [
    { value: "all", label: "Tất cả vòi bơm" },
    { value: "voi-1", label: "Vòi 1 - E5" },
    { value: "voi-2", label: "Vòi 2 - E5" },
    { value: "voi-3", label: "Vòi 3 - E5" },
    { value: "voi-4", label: "Vòi 4 - E5" },
    { value: "voi-5", label: "Vòi 5 - E5" },
    { value: "voi-6", label: "Vòi 6 - E5" },
  ];

  const filterOptions = [
    { value: "all", label: "Tất cả" },
    { value: "xuat-ban", label: "Xuất bán" },
    { value: "xuat-noi-bo", label: "Xuất nội bộ" },
    { value: "xuat-tra", label: "Xuất trả" },
  ];

  const timeOptions = [
    { value: "today", label: "Hôm nay" },
    { value: "yesterday", label: "Hôm qua" },
    { value: "this-week", label: "Tuần này" },
    { value: "this-month", label: "Tháng này" },
    { value: "last-month", label: "Tháng trước" },
  ];

  return (
    <div className="h-full rounded-xl border border-gray-300 bg-[#EFF2F7] overflow-hidden">
      <div className="h-9 bg-[#2F92E8] px-2 flex items-end gap-1.5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`h-8 rounded-t-md px-3 text-sm ${activeTab === tab
              ? "bg-white text-[#2F92E8] font-semibold"
              : "bg-[#4EA4EC] text-white"
              }`}
          >
            {tab}
          </button>
        ))}
        <button className="h-6 w-6 rounded bg-[#4EA4EC] text-white text-sm mb-1">+</button>
      </div>

      <div className="grid grid-cols-[1fr_486px] gap-2 h-[calc(100%-36px)] p-2">
        <section className="rounded-lg border border-gray-300 bg-white p-2">
          <div className="mb-2 grid grid-cols-4 gap-2">

            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Tìm kiếm nhanh"
            />
            <DropdownSelect
              options={pumpOptions}
              value={selectedPump}
              onChange={setSelectedPump}
              placeholder="Chọn vòi bơm"
            />
            <DropdownSelect
              options={filterOptions}
              value={selectedFilter}
              onChange={setSelectedFilter}
              placeholder="Lọc nâng cao"
            />
            <DropdownSelect
              options={timeOptions}
              value={selectedTime}
              onChange={setSelectedTime}
              placeholder="Thời gian"
            />
          </div>

          <div className="h-[calc(100%-44px)] overflow-auto rounded-lg border border-[#D0D7E2]">
            <table className="w-full text-sm">
              <thead className="bg-[#BFD7ED] text-[#334155]">
                <tr>
                  <th className="px-2 py-2 text-left text-xs font-semibold">STT</th>
                  <th className="px-2 py-2 text-left text-xs font-semibold">Vòi bơm</th>
                  <th className="px-2 py-2 text-left text-xs font-semibold">SL log bơm</th>
                  <th className="px-2 py-2 text-left text-xs font-semibold">Bắt đầu bơm</th>
                  <th className="px-2 py-2 text-left text-xs font-semibold">Kết thúc bơm</th>
                  <th className="px-2 py-2 text-left text-xs font-semibold">Mặt hàng</th>
                  <th className="px-2 py-2 text-left text-xs font-semibold">Số lượng</th>
                  <th className="px-2 py-2 text-left text-xs font-semibold">Đơn giá</th>
                  <th className="px-2 py-2 text-left text-xs font-semibold">Thành tiền</th>
                  <th className="px-2 py-2 text-left text-xs font-semibold">Loại log</th>
                  <th className="w-9 px-2 py-2 text-center text-xs font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {ORDERS.map((row) => (
                  <tr
                    key={row.id}
                    className={`border-b border-[#E7ECF2] text-[#4B5563] ${row.id === 3 ? "bg-[#FFF7F0]" : "bg-white"
                      }`}
                  >
                    <td className="px-2 py-2 text-xs">{row.id}</td>
                    <td className="px-2 py-2 text-xs font-semibold">{row.nozzle}</td>
                    <td className="px-2 py-2 text-xs">{row.liters}</td>
                    <td className="px-2 py-2 text-xs">{row.startAt}</td>
                    <td className="px-2 py-2 text-xs">{row.endAt}</td>
                    <td className="px-2 py-2 text-xs">{row.product}</td>
                    <td className="px-2 py-2 text-xs">{row.quantity}</td>
                    <td className="px-2 py-2 text-xs">{row.unitPrice}</td>
                    <td className="px-2 py-2 text-xs">{row.amount}</td>
                    <td className="px-2 py-2">
                      <button className="inline-flex h-7 min-w-[86px] items-center justify-between rounded-md border border-[#D0D7E2] bg-[#F9FBFD] pl-2 pr-1.5 text-xs leading-none text-[#5D6A7D]">
                        <span className="truncate">{row.logType}</span>
                        <ChevronDownIcon />
                      </button>
                    </td>
                    <td className="px-2 py-2">
                      <button className="flex h-5 w-5 items-center justify-center rounded-full border border-[#C6D0DD] text-[11px] text-[#73839A]">
                        i
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <OrderSidebar />
      </div>
    </div>
  );
}
