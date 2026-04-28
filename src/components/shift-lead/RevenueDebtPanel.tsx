"use client";
import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

/* ─── Revenue Summary Block ────────────────────────────────────── */
const RevenueSummary: React.FC = () => (
  <div className="space-y-4 pb-4 border-b border-gray-100 dark:border-gray-700">
    {/* Tổng doanh thu ca */}
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Tổng doanh thu ca</p>
      <p className="text-[28px] font-bold text-blue-custom dark:text-blue-400 leading-tight tabular-nums">
        500,000,000
      </p>
    </div>

    {/* Số tiền đã thu */}
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Số tiền đã thu</p>
      <p className="text-[28px] font-bold text-blue-custom dark:text-blue-400 leading-tight tabular-nums">
        500,000,000
      </p>
      <div className="flex items-center gap-1.5 mt-1">
        <span className="text-[11px] font-medium text-green-600">▲ +31%</span>
        <span className="text-[11px] text-gray-400">so với tháng trước</span>
      </div>
    </div>

    {/* Công nợ phát sinh */}
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Công nợ phát sinh</p>
      <p className="text-[28px] font-bold text-red-500 leading-tight tabular-nums">
        500,000,000
      </p>
      <div className="flex items-center gap-1.5 mt-1">
        <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
        <span className="text-[11px] text-red-500 font-medium">Sai lệch tiền/hàng</span>
      </div>
    </div>
  </div>
);

/* ─── Donut: Doanh thu theo hình thức thanh toán ──────────────── */
const RevenueByPaymentDonut: React.FC = () => {
  const options: ApexOptions = {
    chart: { type: "donut", fontFamily: "Inter, sans-serif", toolbar: { show: false } },
    colors: ["#3B82F6", "#93C5FD", "#BFDBFE", "#DBEAFE"],
    labels: ["Tiền mặt", "QR", "Thẻ", "Voucher"],
    legend: { show: false },
    stroke: { show: true, width: 3, colors: ["#fff"] },
    plotOptions: {
      pie: {
        donut: {
          size: "68%",
          labels: { show: false },
        },
      },
    },
    dataLabels: { enabled: false },
    tooltip: { y: { formatter: (v) => `${v}%` } },
  };

  const legendItems = [
    { label: "Tiền mặt", pct: "63%", color: "#3B82F6" },
    { label: "QR", pct: "63%", color: "#93C5FD" },
    { label: "Thẻ", pct: "9%", color: "#BFDBFE" },
    { label: "Voucher", pct: "18%", color: "#DBEAFE" },
  ];

  return (
    <div className="py-4 border-b border-gray-100 dark:border-gray-700">
      <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
        Doanh thu theo hình thức thanh toán
      </h4>
      <div className="h-[150px] flex items-center justify-center">
        <ReactApexChart options={options} series={[63, 63, 9, 18]} type="donut" height={150} width="100%" />
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-2">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: item.color }}
            ></span>
            <span className="text-[11px] text-gray-500 dark:text-gray-400">
              <strong className="text-black-custom dark:text-white">{item.pct}</strong> {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── Horizontal Bar: Doanh thu theo từng người ───────────────── */
const staffRevenueData = [
  { name: "Nguyễn Văn A", value: 600000000, pct: 100 },
  { name: "Nguyễn Văn A", value: 500000000, pct: 83 },
  { name: "Nguyễn Văn A", value: 400000000, pct: 67 },
  { name: "Nguyễn Văn A", value: 300000000, pct: 50 },
  { name: "Nguyễn Văn A", value: 200000000, pct: 33 },
  { name: "Nguyễn Văn A", value: 100000000, pct: 17 },
];

const RevenueByPerson: React.FC = () => {
  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 220,
      toolbar: { show: false },
      fontFamily: "Inter, sans-serif",
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "55%",
        borderRadius: 4,
        borderRadiusApplication: "end",
      },
    },
    colors: ["#3B82F6"],
    xaxis: {
      categories: staffRevenueData.map((s) => s.name),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: "#374151", fontSize: "11px" },
      },
    },
    grid: { show: false },
    dataLabels: { enabled: false },
    tooltip: {
      custom: ({ series, seriesIndex, dataPointIndex }) => {
        const val = series[seriesIndex][dataPointIndex];
        return `<div class="px-3 py-1.5 text-xs font-bold text-gray-900" style="background:white;border-radius:8px;border:1px solid #e2e8f0;">${val.toLocaleString("vi-VN")}</div>`;
      },
    },
  };

  return (
    <div className="pt-4">
      <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
        Doanh thu theo từng người
      </h4>
      <ReactApexChart
        options={options}
        series={[{ name: "Doanh thu", data: staffRevenueData.map((s) => s.value) }]}
        type="bar"
        height={220}
      />
    </div>
  );
};

/* ─── Composed: RevenueDebtPanel ───────────────────────────────── */
const RevenueDebtPanel: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-[20px] border border-grayscale-10 dark:border-gray-700/50 shadow-dashboard overflow-hidden">
      <div className="px-5 pt-4 pb-3 border-b border-gray-100 dark:border-gray-700">
        <h3 className="text-[15px] font-semibold text-black-custom dark:text-white">
          Doanh thu & công nợ
        </h3>
      </div>

      <div className="px-5 py-4">
        <RevenueSummary />
        <RevenueByPaymentDonut />
        <RevenueByPerson />
      </div>
    </div>
  );
};

export default RevenueDebtPanel;
