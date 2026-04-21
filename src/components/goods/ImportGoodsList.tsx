"use client";
import React, { useState } from "react";
import { 
  SearchIcon, 
  CalenderIcon, 
  TrashBinIcon, 
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MenuIcon,
  ChevronDownIcon
} from "@/icons";

interface ImportOrder {
  id: string;
  code: string;
  docDate: string;
  expectedDate: string;
  warehouse: string;
  goods: string;
  volume: string;
  status: "new" | "success" | "closed";
  creator: string;
}

const mockData: ImportOrder[] = [
  ...Array(12).fill(null).map((_, i) => ({
    id: `order-${i}`,
    code: "000200346",
    docDate: "17/12/2025 15:25",
    expectedDate: "17/12/2025 20:30",
    warehouse: "Kho Văn Trúc",
    goods: "Dầu Diezen 0.05S mức 2",
    volume: "1.000",
    status: (i < 6 ? "new" : i < 10 ? "success" : "closed") as ImportOrder["status"],
    creator: "Nguyễn Văn Anh"
  }))
];

const ImportGoodsList: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "Tất cả", count: 25 },
    { id: "processing", label: "Đang xử lý", count: 4 },
    { id: "completed", label: "Hoàn tất", count: 20 },
    { id: "draft", label: "Nháp", count: 1 },
  ];

  const getStatusBadge = (status: ImportOrder["status"]) => {
    switch (status) {
      case "new":
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50/50 text-blue-500 text-[11px] font-bold ring-1 ring-blue-100">
            <span className="flex items-center justify-center w-4 h-4 rounded-full border-[1.5px] border-blue-500 bg-white">
               <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.5)]"></span>
            </span>
            Mới tạo
          </span>
        );
      case "success":
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50/50 text-green-500 text-[11px] font-bold ring-1 ring-green-100">
            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-green-500 text-white shadow-sm shadow-green-200">
               <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
            </span>
            Thành công
          </span>
        );
      case "closed":
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50/50 text-purple-500 text-[11px] font-bold ring-1 ring-purple-100">
            <span className="flex items-center justify-center w-4 h-4 rounded-full border-[1.5px] border-purple-500 bg-white">
               <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_5px_rgba(168,85,247,0.5)]"></span>
            </span>
            Đã chốt sau nhập
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col gap-0 animate-in fade-in duration-500 -m-6 bg-[#F8FAFC] dark:bg-gray-900 min-h-screen">
      <div className="p-4 flex flex-col gap-4">
        {/* 2. Compact Search & Filter Bar */}
        <div className="bg-white dark:bg-gray-900 px-5 py-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <h2 className="text-[17px] font-bold text-gray-800 dark:text-white whitespace-nowrap">Danh sách lệnh nhập kho</h2>
          
          <div className="flex flex-wrap items-center gap-2 lg:gap-3 flex-1 justify-end">
            {/* Search Input - Matches design's width and icon position */}
            <div className="relative w-full lg:w-[280px]">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              <input 
                type="text" 
                placeholder="Tìm kiếm" 
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-sm focus:ring-1 focus:ring-brand-500 outline-none transition-all placeholder:text-gray-300"
              />
            </div>

            {/* Date Range Block - Exactly as seen in Image 2 */}
            <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl h-[42px] overflow-hidden">
               <div className="px-4 text-[13px] text-gray-300 hover:text-gray-500 cursor-pointer transition-colors">Từ ngày</div>
               <div className="w-px h-5 bg-gray-100 dark:bg-gray-700"></div>
               <div className="pl-4 pr-3 flex items-center gap-6 cursor-pointer group">
                 <span className="text-[13px] text-gray-300 group-hover:text-gray-500 transition-colors">Đến ngày</span>
                 <CalenderIcon className="w-4 h-4 text-gray-400" />
               </div>
            </div>

            {/* Actions Section */}
            <div className="flex items-center gap-2">
              <button className="h-[42px] w-[42px] flex items-center justify-center text-gray-400 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
                <svg className="w-5 h-5 rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor font-bold"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              </button>
              <button className="flex items-center gap-2 px-5 h-[42px] bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-pink-500/10">
                <TrashBinIcon className="w-4 h-4" />
                Xóa
              </button>
              <button className="flex items-center gap-2 px-5 h-[42px] bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-orange-500/10 whitespace-nowrap">
                <PlusIcon className="w-4 h-4" />
                Thêm lệnh nhập
              </button>
            </div>
          </div>
        </div>

        {/* 3. Status Tabs (With badges) */}
        <div className="flex items-center gap-7 px-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative pb-3.5 text-[14px] font-bold transition-all flex items-center gap-2.5 ${
                activeTab === tab.id 
                  ? "text-brand-500" 
                  : "text-gray-400 hover:text-gray-500"
              }`}
            >
              {tab.label}
              <span className={`min-w-[18px] px-1.5 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                activeTab === tab.id 
                  ? "bg-brand-500 text-white" 
                  : "bg-gray-100 text-gray-400"
              }`}>
                {tab.count}
              </span>
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-brand-500 rounded-t-full shadow-[0_-2px_10px_rgba(0,92,171,0.2)]"></span>
              )}
            </button>
          ))}
        </div>

        {/* 4. Main Table Container */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#E9F2FE] dark:bg-gray-800/50 border-b border-white">
                  <th className="px-6 py-4 min-w-[56px] text-center">
                    <div className="flex items-center justify-center">
                      <input type="checkbox" className="rounded-md border-gray-200 text-brand-500 w-5 h-5 cursor-pointer focus:ring-brand-500/20" />
                    </div>
                  </th>
                  {[
                    "Số lệnh", "Ngày chứng từ", "Ngày dự kiến nhập hàng", "Kho nhập", 
                    "Hàng hóa", "LTT", "Trạng thái", "Người tạo"
                  ].map((header, i) => (
                    <th key={i} className="px-5 py-4 border-l border-white dark:border-gray-700/30">
                      <div className="flex items-center gap-2 cursor-pointer group">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none">{header}</span>
                        <svg className="w-2.5 h-2.5 text-gray-300 group-hover:text-brand-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {mockData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/30 dark:hover:bg-gray-800/50 transition-colors group">
                    <td className="px-6 py-5 text-center">
                      <input type="checkbox" className="rounded-md border-gray-200 text-brand-500 w-5 h-5 cursor-pointer focus:ring-brand-500/20" />
                    </td>
                    <td className="px-5 py-5">
                      <span className="text-blue-500 text-sm font-bold active:opacity-70 cursor-pointer">{row.code}</span>
                    </td>
                    <td className="px-5 py-5 text-sm text-gray-500 dark:text-gray-400 font-medium">{row.docDate}</td>
                    <td className="px-5 py-5 text-sm text-gray-500 dark:text-gray-400 font-medium">{row.expectedDate}</td>
                    <td className="px-5 py-5 text-sm text-gray-800 dark:text-gray-200 font-bold">{row.warehouse}</td>
                    <td className="px-5 py-5 text-sm text-gray-800 dark:text-gray-200 font-bold max-w-[220px] truncate">{row.goods}</td>
                    <td className="px-5 py-5 text-sm text-gray-900 dark:text-gray-100 font-black tracking-tight">{row.volume}</td>
                    <td className="px-5 py-5 text-center">
                      <div className="flex justify-center">
                        {getStatusBadge(row.status)}
                      </div>
                    </td>
                    <td className="px-5 py-5 text-sm text-gray-500 dark:text-gray-400 font-medium">{row.creator}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 5. Pagination Bar (Matches design spacing) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 border-t border-gray-50 dark:border-gray-800 bg-white">
            <div className="flex items-center gap-4">
               <span className="text-[13px] text-gray-400 font-medium">Số lượng bản ghi hiển thị</span>
               <div className="relative">
                 <select className="appearance-none bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl pl-4 pr-10 py-2 text-[13px] font-bold text-gray-600 outline-none focus:ring-1 focus:ring-brand-500 cursor-pointer shadow-sm">
                   <option>10</option>
                   <option>20</option>
                   <option>50</option>
                 </select>
                 <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none" />
               </div>
            </div>

            <div className="flex items-center gap-10">
              <span className="text-[13px] text-gray-400 font-medium tracking-tight">Bản ghi 1 - 12 trong tổng số 350</span>
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-brand-500 active:scale-95 transition-all"><ChevronLeftIcon className="w-6 h-6 rotate-180" /></button>
                <div className="flex items-center gap-1.5">
                  <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-500 text-white text-[13px] font-bold shadow-lg shadow-blue-500/20">1</button>
                  {[2, 3].map(n => (
                    <button key={n} className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-50 text-[13px] font-bold transition-all">{n}</button>
                  ))}
                  <span className="text-gray-300 px-1 text-sm font-medium">...</span>
                  <button className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-50 text-[13px] font-bold transition-all">50</button>
                </div>
                <button className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-brand-500 active:scale-95 transition-all"><ChevronRightIcon className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportGoodsList;
