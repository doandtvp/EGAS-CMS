"use client";

import React from "react";

type PumpOrder = {
  id: number;
  nozzle: string;
  liters: string;
  startAt: string;
  endAt: string;
  product: string;
  unitPrice: string;
  amount: string;
};

const ORDER_TABS = ["Giao dich 1", "Giao dich 2"];

const ORDERS: PumpOrder[] = [
  {
    id: 1,
    nozzle: "Voi 2 - E5",
    liters: "11.200",
    startAt: "17/10/2025 16:00",
    endAt: "17/10/2025 16:01",
    product: "Xang RON 95 muc 3",
    unitPrice: "30 150",
    amount: "335 000",
  },
  {
    id: 2,
    nozzle: "Voi 3 - E5",
    liters: "11.500",
    startAt: "18/10/2025 10:00",
    endAt: "18/10/2025 10:01",
    product: "Xang RON 95 muc 2",
    unitPrice: "25 200",
    amount: "315 000",
  },
  {
    id: 3,
    nozzle: "Voi 4 - E5",
    liters: "12.000",
    startAt: "19/10/2025 09:30",
    endAt: "19/10/2025 09:31",
    product: "Xang RON 95 muc 2",
    unitPrice: "25 200",
    amount: "315 000",
  },
  {
    id: 4,
    nozzle: "Voi 5 - E5",
    liters: "12.500",
    startAt: "20/10/2025 14:00",
    endAt: "20/10/2025 14:01",
    product: "Xang RON 92 muc 3",
    unitPrice: "32 250",
    amount: "350 000",
  },
  {
    id: 5,
    nozzle: "Voi 6 - E5",
    liters: "13.000",
    startAt: "21/10/2025 11:00",
    endAt: "21/10/2025 11:01",
    product: "Xang RON 92 muc 2",
    unitPrice: "29 000",
    amount: "310 000",
  },
];

interface BeforePaymentPanelProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BeforePaymentPanel({ activeTab, onTabChange }: BeforePaymentPanelProps) {
  return (
    <div className="h-full rounded-xl border border-gray-300 bg-[#EFF2F7] overflow-hidden">
      <div className="h-9 bg-[#2F92E8] px-2 flex items-end gap-1.5">
        {ORDER_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`h-8 rounded-t-md px-3 text-sm ${
              activeTab === tab ? "bg-white text-[#2F92E8] font-semibold" : "bg-[#4EA4EC] text-white"
            }`}
          >
            {tab}
          </button>
        ))}
        <button className="h-6 w-6 rounded bg-[#4EA4EC] text-white text-sm mb-1">+</button>
      </div>

      <div className="grid grid-cols-[1fr_300px] gap-2 h-[calc(100%-36px)] p-2">
        <section className="rounded-lg border border-gray-300 bg-white p-2">
          <div className="grid grid-cols-4 gap-2 mb-2">
            <input className="h-9 rounded-md border border-gray-300 px-3 text-sm" placeholder="Tim kiem nhanh" />
            <select className="h-9 rounded-md border border-gray-300 px-3 text-sm">
              <option>Chon voi bom</option>
            </select>
            <select className="h-9 rounded-md border border-gray-300 px-3 text-sm">
              <option>Loc nang cao</option>
            </select>
            <input className="h-9 rounded-md border border-gray-300 px-3 text-sm" placeholder="Thoi gian" />
          </div>

          <div className="overflow-auto h-[calc(100%-44px)]">
            <table className="w-full text-sm">
              <thead className="bg-[#D9E7F6] text-gray-700">
                <tr>
                  <th className="text-left px-2 py-2">STT</th>
                  <th className="text-left px-2 py-2">Voi bom</th>
                  <th className="text-left px-2 py-2">SL log bom</th>
                  <th className="text-left px-2 py-2">Bat dau bom</th>
                  <th className="text-left px-2 py-2">Ket thuc bom</th>
                  <th className="text-left px-2 py-2">Mat hang</th>
                  <th className="text-left px-2 py-2">Don gia</th>
                  <th className="text-left px-2 py-2">Thanh tien</th>
                </tr>
              </thead>
              <tbody>
                {ORDERS.map((row) => (
                  <tr
                    key={row.id}
                    className={`border-b border-gray-100 ${row.id === 3 ? "bg-[#FFF7F0]" : "bg-white"}`}
                  >
                    <td className="px-2 py-2">{row.id}</td>
                    <td className="px-2 py-2 font-medium">{row.nozzle}</td>
                    <td className="px-2 py-2">{row.liters}</td>
                    <td className="px-2 py-2">{row.startAt}</td>
                    <td className="px-2 py-2">{row.endAt}</td>
                    <td className="px-2 py-2">{row.product}</td>
                    <td className="px-2 py-2">{row.unitPrice}</td>
                    <td className="px-2 py-2">{row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="rounded-lg border border-gray-300 bg-white p-2 flex flex-col gap-2">
          <div className="rounded-md border border-gray-200 p-2">
            <div className="text-sm font-semibold text-gray-800 mb-2">Thong tin khach hang</div>
            <input
              className="h-9 w-full rounded-md border border-gray-300 px-3 text-sm"
              placeholder="Tim kiem thong tin khach hang"
            />
          </div>

          <div className="rounded-md border border-gray-200 p-2">
            <div className="text-sm font-semibold text-gray-800 mb-2">Chi tiet don hang</div>
            <div className="h-28 rounded-md border border-dashed border-gray-300 flex items-center justify-center text-sm text-gray-400">
              Chua co bom nao duoc chon
            </div>
          </div>

          <div className="rounded-md border border-gray-200 p-2">
            <div className="text-sm font-semibold text-gray-800 mb-2">Thong tin thanh toan</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button className="h-8 rounded-md border border-gray-300 bg-white">Tien mat</button>
              <button className="h-8 rounded-md border border-gray-300 bg-white">The</button>
              <button className="h-8 rounded-md border border-gray-300 bg-white">Vi dien tu</button>
              <button className="h-8 rounded-md border border-gray-300 bg-white">Cong no</button>
            </div>
          </div>

          <button className="mt-auto h-9 rounded-md bg-gray-300 text-sm font-semibold text-white">
            Thanh toan ngay
          </button>
        </aside>
      </div>
    </div>
  );
}
