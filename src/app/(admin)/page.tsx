"use client";
import FilterBar from "@/components/dashboard/FilterBar";
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import DashboardCharts from "@/components/dashboard/DashboardCharts";
import RevenueTable from "@/components/dashboard/RevenueTable";
import CustomerDebt from "@/components/dashboard/CustomerDebt";
import CustomToast from "@/components/dashboard/CustomToast";

export default function GasDashboard() {
  return (
    <div className="flex flex-col space-y-2 p-6">
      <FilterBar />
      <DashboardMetrics />
      <DashboardCharts />
      <div className="grid grid-cols-12 gap-6 pb-12">
        <RevenueTable />
        <CustomerDebt />
      </div>
      <CustomToast />
    </div>
  );
}
