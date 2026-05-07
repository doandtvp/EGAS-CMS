"use client";
import React from "react";
import ShiftLeadFilterBar from "@/components/shift-lead/ShiftLeadFilterBar";
import ShiftInfoCard from "@/components/shift-lead/ShiftInfoCard";
import AlertPanel from "@/components/shift-lead/AlertPanel";
import SalesPanel from "@/components/shift-lead/SalesPanel";
import RevenueDebtPanel from "@/components/shift-lead/RevenueDebtPanel";

export default function ShiftLeadDashboard() {
  return (
    <div className="-mx-4 -mt-4 flex flex-col min-h-screen">
      {/* Filter bar — full-width sticky */}
      <div className="sticky top-0 z-10">
        <ShiftLeadFilterBar />
      </div>

      {/* 3-column grid */}
      <div className="bg-gray-bg flex-1 p-4">
        <div className="grid grid-cols-12 gap-4 items-start">
          {/* Cột trái: Thông tin chung + Cảnh báo */}
          <div className="col-span-12 xl:col-span-4 flex flex-col gap-4">
            <ShiftInfoCard />
            <AlertPanel />
          </div>

          {/* Cột giữa: Bán hàng */}
          <div className="col-span-12 xl:col-span-4 order-last xl:order-none">
            <SalesPanel />
          </div>

          {/* Cột phải: Doanh thu & Công nợ */}
          <div className="col-span-12 xl:col-span-4">
            <RevenueDebtPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
