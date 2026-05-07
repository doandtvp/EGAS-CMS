import React, { useState } from "react";
import { OrderSidebar } from "./OrderSidebar";
import { ChevronDownIcon } from "@/icons";
import SearchInput from "@/components/common/SearchInput";
import { PetrolPumpIcon, PUMP_DATA } from "./AfterPaymentPanel";

export default function NoLiterPanel() {
  const tabs = ["Giao dịch 1", "Giao dịch 2"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [searchTerm, setSearchTerm] = useState("");

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
            <div className="flex-1 overflow-auto rounded-lg border border-[#D0D7E2] p-2 bg-[#F8FAFC]">
              <div className="grid grid-cols-5 gap-3">
                {PUMP_DATA.map((pump) => (
                  <div
                    key={pump.id}
                    className="flex flex-col items-center rounded-xl border border-transparent bg-white p-2 pb-4 shadow-sm transition-all hover:border-[#2F92E8] hover:shadow-md cursor-pointer group"
                  >
                    <div className="mb-2 flex h-[100px] w-full items-center justify-center rounded-lg bg-[#F1F5F9] group-hover:bg-[#E0F2FE] transition-colors">
                      <div className="scale-50 transform">
                        <PetrolPumpIcon variant={pump.variant as "blue" | "yellow"} />
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-[#1F3556]">{pump.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <OrderSidebar />
      </div>
    </div>
  );
}