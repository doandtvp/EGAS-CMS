"use client";

import { ChevronDownIcon, SearchIcon } from "@/icons";
import { useState } from "react";

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
            <div className="flex h-9 items-center rounded-md border border-[#D0D7E2] bg-[#F6F8FB] px-3">
              <input
                className="h-full flex-1 bg-transparent text-sm outline-none placeholder:text-[#76859A]"
                placeholder="Tìm kiếm nhanh"
              />
              <SearchIcon className="h-4 w-4 text-[#8A98AC]" />
            </div>
            <button className="flex h-9 items-center justify-between rounded-md border border-[#D0D7E2] bg-[#F6F8FB] px-3 text-sm text-[#596A80]">
              Chọn vòi bơm
              <ChevronDownIcon className="h-4 w-4 text-[#8A98AC]" />
            </button>
            <button className="flex h-9 items-center justify-between rounded-md border border-[#D0D7E2] bg-[#F6F8FB] px-3 text-sm text-[#596A80]">
              Lọc nâng cao
              <ChevronDownIcon className="h-4 w-4 text-[#8A98AC]" />
            </button>
            <button className="flex h-9 items-center justify-between rounded-md border border-[#D0D7E2] bg-[#F6F8FB] px-3 text-sm text-[#596A80]">
              Thời gian
              <ChevronDownIcon className="h-4 w-4 text-[#8A98AC]" />
            </button>
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

        <aside className="rounded-lg bg-[#DDE3EA] p-2 flex flex-col gap-2">
          <div className="flex items-center justify-between rounded-md bg-[#DDE3EA] px-1.5 pb-1">
            <div className="flex items-end gap-3 text-sm">
              <button className="border-b-2 border-[#2F92E8] pb-1 font-semibold text-[#2F92E8]">
                Hàng hóa
              </button>
              <button className="pb-1 text-[#7A889B]">Chính sách khuyến mại</button>
            </div>
            <span className="rounded bg-[#2F92E8] px-2 py-0.5 text-[11px] font-semibold text-white">
              #ORD123
            </span>
          </div>

          <div className="rounded-2xl bg-[#F2F5F9] p-3">
            <div className="mb-2 border-t border-dashed border-[#CFD6DF]" />
            <div className="text-[22px] font-semibold text-[#1F3556]">Thông tin khách hàng</div>
            <div className="mt-2 flex h-10 items-center rounded-lg border border-[#CFD6DF] bg-white px-3">
              <input
                className="h-full flex-1 bg-transparent text-sm outline-none placeholder:text-[#8896A9]"
                placeholder="Tìm kiếm thông tin khách hàng"
              />
              <SearchIcon className="h-5 w-5 text-[#8E9AAC]" />
            </div>
          </div>

          <div className="rounded-2xl bg-[#F2F5F9] p-3">
            <div className="mb-2 text-[22px] font-semibold text-[#1F3556]">
              Chi tiết đơn hàng (0)
            </div>
            <div className="flex h-[152px] flex-col items-center justify-center rounded-xl border border-dashed border-[#CFD6DF] bg-white text-sm text-[#8E9AAC]">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F1FB]">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect
                    x="6"
                    y="3.5"
                    width="10"
                    height="17"
                    rx="1.5"
                    stroke="#7CB5E7"
                    strokeWidth="1.5"
                  />
                  <rect x="8.5" y="6.5" width="5" height="5" rx="0.75" fill="#B9D8F4" />
                  <path d="M16 8.5H18.5V13.5C18.5 14.3 17.85 15 17.05 15H16V8.5Z" fill="#7CB5E7" />
                  <path d="M9 20.5H13" stroke="#7CB5E7" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="mt-3">Chưa có log bơm nào được chọn</span>
            </div>
          </div>

          <div className="rounded-2xl bg-[#F2F5F9] p-3">
            <div className="text-[22px] font-semibold text-[#1F3556]">Thông tin thanh toán</div>
            <div className="mt-2 text-[22px] font-semibold text-[#1F3556]">
              Phương thức thanh toán
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
              {PAYMENT_METHODS.map((method) => (
                <button
                  key={method.id}
                  className="flex h-8 items-center justify-center gap-1.5 rounded-lg border border-[#CFD6DF] bg-white text-[#5D6A7D]"
                >
                  <span className={`h-2.5 w-2.5 rounded-sm ${method.color}`} />
                  {method.label}
                </button>
              ))}
            </div>
          </div>

          <button className="mt-auto h-9 rounded-md bg-gray-300 text-sm font-semibold text-white">
            Thanh toán ngay
          </button>
        </aside>
      </div>
    </div>
  );
}
