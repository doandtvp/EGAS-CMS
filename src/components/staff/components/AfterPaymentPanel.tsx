import { OrderSidebar } from "./OrderSidebar";
import { useState } from "react";
import SearchInput from "@/components/common/SearchInput";
import DropdownSelect from "@/components/common/DropdownSelect";



export const PUMP_DATA = [
  { id: 1, name: "Trụ 1", type: "Xăng RON95", variant: "blue" },
  { id: 2, name: "Trụ 2", type: "Dầu Diesel - III", variant: "yellow" },
  { id: 3, name: "Trụ 3", type: "Dầu Diesel - V", variant: "yellow" },
  { id: 4, name: "Trụ 4", type: "Xăng RON92", variant: "blue" },
  { id: 5, name: "Trụ 5", type: "Xăng RON95", variant: "blue" },
  { id: 6, name: "Trụ 6", type: "Xăng RON95", variant: "blue" },
  { id: 7, name: "Trụ 7", type: "Xăng RON92", variant: "blue" },
  { id: 8, name: "Trụ 8", type: "Xăng RON95", variant: "blue" },
  { id: 9, name: "Trụ 9", type: "Dầu Diesel - III", variant: "yellow" },
  { id: 10, name: "Trụ 10", type: "Dầu Diesel - V", variant: "yellow" },
  { id: 11, name: "Trụ 11", type: "Xăng RON95", variant: "blue" },
  { id: 12, name: "Trụ 12", type: "Xăng RON95", variant: "blue" },
  { id: 13, name: "Trụ 13", type: "Xăng RON95", variant: "blue" },
  { id: 14, name: "Trụ 14", type: "Xăng RON95", variant: "blue" },
  { id: 15, name: "Trụ 15", type: "Xăng RON95", variant: "blue" },
];

export default function AfterPaymentPanel() {

  const tabs = ["Giao dịch 1", "Giao dịch 2"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categoryOptions = [
    { value: "all", label: "Tất cả loại hàng" },
    { value: "xang", label: "Xăng" },
    { value: "dau", label: "Dầu Diesel" },
    { value: "gas", label: "Gas" },
    { value: "nhot", label: "Dầu nhớt" },
    { value: "phu-kien", label: "Phụ kiện" },
  ];

  return (
    <div className="h-auto lg:h-full rounded-xl border border-gray-300 bg-[#EFF2F7] overflow-visible lg:overflow-hidden">
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

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_486px] gap-2 h-auto lg:h-[calc(100%-36px)] p-2">
        <section className="rounded-lg border border-gray-300 bg-white p-2 flex flex-col overflow-hidden">
          <div className="mb-2 grid grid-cols-2 md:grid-cols-4 gap-2 shrink-0">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Tìm kiếm nhanh"
            />
            <DropdownSelect
              options={categoryOptions}
              value={selectedCategory}
              onChange={setSelectedCategory}
              placeholder="Chọn loại hàng"
            />
          </div>

          <div className="flex-1 overflow-auto rounded-lg border border-[#D0D7E2] p-2 bg-[#F8FAFC]">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
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
                    <div className="text-sm font-bold text-[#1F3556]">{pump.name}</div>
                    <div className="text-[11px] text-[#596A80]">{pump.type}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <OrderSidebar />
      </div>
    </div>
  );
}

export const PetrolPumpIcon = ({ variant = "blue" }: { variant?: "blue" | "yellow" }) => {
  const colors = variant === "blue" ? {
    c1: "#62A7E3", c2: "#72B5EE", c3: "#79BBF1", c4: "#8BC7F5",
    c5: "#D5F1F9", c6: "#C2E5FB", c7: "#92CEFA", c8: "#DEEBF9",
    c9: "#EEFAFE", c10: "#67AAE2", c11: "#508FC9", c12: "#6EB4EC",
    c13: "#78BAEF"
  } : {
    c1: "#EAB308", c2: "#FACC15", c3: "#FDE047", c4: "#FEF08A",
    c5: "#FEF9C3", c6: "#FFF7ED", c7: "#FDE68A", c8: "#FFFBEB",
    c9: "#FFFFFF", c10: "#CA8A04", c11: "#A16207", c12: "#FBBF24",
    c13: "#FCD34D"
  };

  return (
    <svg width="137" height="140" viewBox="0 0 137 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M113.255 139.62H22.2429C19.8125 139.62 17.8448 137.841 17.8448 135.645V126.122C17.8448 122.951 20.6889 120.381 24.1976 120.381H110.61C114.06 120.381 116.855 122.907 116.855 126.024V136.364C116.855 138.162 115.246 139.62 113.255 139.62Z" fill={colors.c1} />
      <path d="M99.0104 124.355V139.62H4.39815C1.96776 139.62 0 137.838 0 135.645V126.122C0 125.774 0.0325781 125.433 0.100994 125.103C0.632029 122.418 3.22856 120.381 6.35288 120.381H94.6122C97.0426 120.381 99.0104 122.159 99.0104 124.355Z" fill={colors.c2} />
      <path d="M99.0065 124.355V125.103H0.0971375C0.628173 122.418 3.22471 120.381 6.34902 120.381H94.6084C97.0388 120.381 99.0065 122.159 99.0065 124.355Z" fill={colors.c3} />
      <path d="M108.702 120.669H22.2698V11.4814C22.2698 5.14012 27.958 0 34.9755 0H95.9958C103.013 0 108.702 5.14012 108.702 11.4814V120.669Z" fill={colors.c4} />
      <path d="M95.9543 120.669H9.52255V11.4814C9.52255 5.14012 15.2108 0 22.2283 0H83.2485C90.266 0 95.9543 5.14012 95.9543 11.4814V120.669Z" fill={colors.c5} />
      <path d="M92.7761 120.669H12.4986V11.7722C12.4986 7.00893 16.7729 3.14648 22.0442 3.14648H83.237C88.5083 3.14648 92.7826 7.00893 92.7826 11.7722V120.669H92.7761Z" fill={colors.c6} />
      <path d="M79.0559 49.5351H26.9167C23.1506 49.5351 20.098 46.7766 20.098 43.3734V19.4097C20.098 16.0065 23.1506 13.248 26.9167 13.248H79.0559C82.822 13.248 85.8747 16.0065 85.8747 19.4097V43.3704C85.8779 46.7766 82.8253 49.5351 79.0559 49.5351Z" fill={colors.c7} />
      <path d="M82.7484 19.7804V42.7696C82.7484 44.7892 80.9402 46.423 78.7053 46.423H27.2763C26.9701 46.423 26.6736 46.3936 26.3902 46.3347C24.5821 45.9697 23.2333 44.5124 23.2333 42.7696V19.7804C23.2333 17.7638 25.0414 16.127 27.2763 16.127H78.7053C80.621 16.127 82.2238 17.331 82.6409 18.9443C82.7125 19.2122 82.7484 19.4919 82.7484 19.7804Z" fill={colors.c8} />
      <path d="M82.7423 19.7804V42.7696C82.7423 44.7892 80.9342 46.4231 78.6993 46.4231H27.2703C26.9641 46.4231 26.6676 46.3936 26.3842 46.3347V21.0846C26.3842 19.9011 27.4463 18.9443 28.7559 18.9443H82.6348C82.7065 19.2122 82.7423 19.4919 82.7423 19.7804Z" fill={colors.c9} />
      <path d="M67.8271 31.7474C67.8271 27.8849 69.86 25.2295 73.2515 25.2295C76.4377 25.2295 78.6759 27.5876 78.6759 31.7474C78.6759 35.5892 76.6625 38.2653 73.2515 38.2653C70.0685 38.2653 67.8271 35.8895 67.8271 31.7474ZM76.252 31.7474C76.252 28.8888 75.102 27.2167 73.2515 27.2167C71.401 27.2167 70.251 28.8888 70.251 31.7474C70.251 34.5706 71.4434 36.2575 73.2515 36.2575C75.1411 36.2604 76.252 34.5883 76.252 31.7474Z" fill={colors.c10} />
      <path d="M115.098 112.726H108.703V108.605H115.098C121.138 108.605 126.055 104.162 126.055 98.7041V79.9453H130.616V98.7041C130.616 106.438 123.657 112.726 115.098 112.726Z" fill={colors.c11} />
      <path d="M132.492 60.3336V78.5271C132.492 79.3102 131.789 79.9461 130.922 79.9461H122.92C117.863 79.9461 113.762 76.2426 113.762 71.6707V61.0519C113.762 59.3797 114.133 57.7282 114.853 56.1885L117.502 50.5332L123.102 53.745L120.721 57.8253C120.098 58.8852 119.776 60.0686 119.776 61.2698V70.814C119.776 72.863 121.613 74.5263 123.884 74.5263H123.774C124.458 74.5263 125.015 74.0258 125.015 73.4076V56.0443L132.492 60.3336Z" fill={colors.c11} />
      <path d="M122.082 39.0777C122.082 39.0777 117.778 28.5766 107.148 23.8869C105.434 23.1303 103.316 23.6514 102.333 25.1263C102.287 25.197 102.241 25.2676 102.196 25.3442C100.762 27.7641 102.802 29.2596 102.802 29.2596C102.802 29.2596 110.969 32.3478 116.716 43.5701C116.716 43.5701 122.76 44.2855 122.082 39.0777Z" fill={colors.c11} />
      <path d="M136.953 56.6031C136.757 58.0486 135.992 59.6854 133.871 60.8807C132.235 61.8051 130.763 62.2143 129.486 62.3261C127.906 62.4645 126.348 62.0847 125.039 61.3222C124.404 60.9543 123.827 60.495 123.335 59.9621L115.689 51.6779C113.613 49.4287 113.809 46.1168 116.135 44.0766L121.188 39.6519C121.494 39.384 121.836 39.175 122.198 39.0219C123.798 38.3448 125.795 38.7805 126.844 40.1936L135.725 52.1666C136.692 53.4708 137.161 55.0428 136.953 56.6031Z" fill={colors.c12} />
      <path d="M132.441 55.6047C132.245 57.0531 131.48 58.687 129.362 59.8852C127.753 60.7919 126.3 61.2011 125.039 61.3218C124.404 60.9538 123.827 60.4946 123.335 59.9617L115.689 51.6775C113.613 49.4283 113.809 46.1164 116.135 44.0762L121.188 39.6515C121.494 39.3836 121.836 39.1746 122.198 39.0215C122.244 39.0774 122.289 39.1363 122.335 39.1952L131.212 51.1682C132.18 52.4753 132.649 54.0474 132.441 55.6047Z" fill={colors.c13} />
    </svg>
  );
}