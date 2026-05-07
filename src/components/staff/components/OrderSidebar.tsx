import React from "react";
import { PAYMENT_METHODS } from "./BeforePaymentPanel";
import { SearchIcon } from "@/icons";

export const OrderSidebar = () => {
  return (
    <aside className="rounded-lg bg-[#DDE3EA] p-2 flex flex-col gap-2 overflow-auto">
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

      <div className="mt-auto pt-2">
        <div className="flex items-center gap-2 px-1 mb-2">
          <input
            type="checkbox"
            id="vat-invoice"
            className="h-4 w-4 rounded border-[#CFD6DF] text-[#2F92E8] focus:ring-[#2F92E8]"
          />
          <label htmlFor="vat-invoice" className="text-sm text-[#596A80] cursor-pointer select-none">
            Phát hành hóa đơn VAT
          </label>
        </div>

        <button className="h-9 w-full rounded-md bg-gray-300 text-sm font-semibold text-white shrink-0">
          Thanh toán ngay
        </button>
      </div>
    </aside>
  );
};
