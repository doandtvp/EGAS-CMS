"use client";
import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

/* ─── Revenue Summary Block ────────────────────────────────────── */
const RevenueSummary: React.FC = () => (
  <div className="space-y-6 pb-6">
    {/* Tổng doanh thu ca */}
    <div className="pb-5 border-b border-gray-50 dark:border-gray-700/50">
      <p className="text-sm font-bold text-black-custom dark:text-gray-400 mb-2">
        Tổng doanh thu ca
      </p>
      <p className="text-[32px] font-bold text-[#2388FF] leading-none tabular-nums">500,000,000</p>
    </div>

    {/* Số tiền đã thu */}
    <div className="pb-5 border-b border-gray-50 dark:border-gray-700/50">
      <p className="text-sm font-bold text-black-custom dark:text-gray-400 mb-2">Số tiền đã thu</p>
      <div className="flex items-baseline gap-2">
        <p className="text-[32px] font-bold text-[#2388FF] leading-none tabular-nums">
          500,000,000
        </p>
      </div>
      <div className="flex items-center gap-1.5 mt-2 text-[#10B981] font-bold text-sm">
        <span>↑ +31%</span>
        <span className="text-gray-400 font-medium">so với tháng trước</span>
      </div>
    </div>

    {/* Công nợ phát sinh */}
    <div className="pb-2">
      <p className="text-sm font-bold text-black-custom dark:text-gray-400 mb-2">
        Công nợ phát sinh
      </p>
      <p className="text-[32px] font-bold text-[#FF4D4F] leading-none tabular-nums">500,000,000</p>
      <div className="flex items-center gap-2 mt-2">
        <div className="w-5 h-5 rounded-full bg-[#FF4D4F]/10 flex items-center justify-center">
          <span className="text-[#FF4D4F] text-[10px] font-bold">!</span>
        </div>
        <span className="text-sm text-[#FF4D4F] font-bold">Sai lệch tiền/hàng</span>
      </div>
    </div>
  </div>
);

/* ─── Donut: Doanh thu theo hình thức thanh toán ──────────────── */
const RevenueByPaymentDonut: React.FC = () => {
  const options: ApexOptions = {
    chart: { type: "donut", fontFamily: "var(--font-averta), sans-serif", toolbar: { show: false } },
    colors: ["#2388FF", "#69AFFF", "#A7D2FF", "#D6E9FF"],
    labels: ["Tiền mặt", "QR", "Thẻ", "Voucher"],
    legend: { show: false },
    stroke: { show: true, width: 4, colors: ["#fff"] },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: { show: false },
        },
        // @ts-expect-error - ApexCharts supports borderRadius but it's missing in types
        borderRadius: 8,
      },
    },
    dataLabels: { enabled: false },
    states: {
      hover: {
        filter: {
          type: "darken",
          // @ts-expect-error - value exists in runtime
          value: 0.9,
        },
      },
    },
    tooltip: {
      enabled: true,
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        const label = w.globals.labels[seriesIndex];
        const val = series[seriesIndex];
        return `<div class="px-3 py-2 text-sm font-bold text-white bg-[#19213D] rounded-lg shadow-xl border-none">
          ${label}: ${val}%
        </div>`;
      },
    },
  };

  const legendItems = [
    { label: "Tiền mặt", pct: "63%", color: "#2388FF" },
    { label: "Thẻ", pct: "9%", color: "#A7D2FF" },
    { label: "QR", pct: "63%", color: "#69AFFF" },
    { label: "Voucher", pct: "18%", color: "#D6E9FF" },
  ];

  return (
    <div className="py-6 border-t border-gray-100 dark:border-gray-700">
      <h4 className="text-sm font-bold text-black-custom dark:text-white mb-4">
        Doanh thu theo hình thức thanh toán
      </h4>
      <div className="flex flex-col items-center">
        <div className="h-[200px] w-full flex items-center justify-center mb-6">
          <ReactApexChart
            options={options}
            series={[63, 63, 9, 18]}
            type="donut"
            height={200}
            width={200}
          />
        </div>
        <div className="w-full bg-[#F8FAFF] dark:bg-gray-800/40 rounded-xl p-4 border border-blue-50/50 dark:border-gray-700/50">
          <div className="grid grid-cols-2 gap-x-8 gap-y-3">
            {legendItems.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span className="text-[13px] text-gray-500 dark:text-gray-400">
                  <strong className="text-black-custom dark:text-white mr-1">{item.pct}</strong>{" "}
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
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
      height: 280,
      toolbar: { show: false },
      fontFamily: "var(--font-averta), sans-serif",
      animations: { enabled: true },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "42%",
        borderRadius: 8,
        borderRadiusApplication: "end",
        distributed: true,
      },
    },
    colors: ["#2388FF", "#69AFFF", "#A7D2FF", "#D6E9FF", "#E6F1FF", "#E8EAEF"],
    grid: {
      show: true,
      borderColor: "#F1F3F7",
      strokeDashArray: 4,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: false } },
      padding: { left: 0, right: 0, top: 0, bottom: 0 },
    },
    xaxis: {
      categories: staffRevenueData.map((s) => s.name),
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    states: {
      hover: {
        filter: {
          type: "darken",
          // @ts-expect-error - value exists in runtime
          value: 0.9,
        },
      },
    },
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,
      followCursor: true,
      custom: ({ series, seriesIndex, dataPointIndex }) => {
        const val = series[seriesIndex][dataPointIndex];
        return `<div class="px-3 py-2 text-sm font-bold text-white bg-[#19213D] rounded-lg shadow-xl border-none">
          ${val.toLocaleString("vi-VN")}
        </div>`;
      },
    },
  };

  return (
    <div className="pt-6 border-t border-gray-100 dark:border-gray-700 mt-6">
      <h4 className="text-sm font-bold text-black-custom dark:text-white mb-6">
        Doanh thu theo từng người
      </h4>
      <div className="flex gap-0">
        {/* Labels Column */}
        <div className="flex flex-col h-[280px] w-[90px] sm:w-[120px]">
          {staffRevenueData.map((item, idx) => (
            <div
              key={idx}
              className="flex-1 text-[12px] sm:text-[14px] font-normal text-[#19213D] dark:text-gray-400 text-right flex items-center justify-end pr-2 sm:pr-4 whitespace-nowrap"
            >
              {item.name}
            </div>
          ))}
        </div>

        {/* Chart Column */}
        <div className="flex-1 h-[280px] relative">
          <ReactApexChart
            options={options}
            series={[{ name: "Doanh thu", data: staffRevenueData.map((s) => s.value) }]}
            type="bar"
            height={280}
            width="100%"
          />
        </div>
      </div>
    </div>
  );
};

/* ─── Composed: RevenueDebtPanel ───────────────────────────────── */
const RevenueDebtPanel: React.FC = () => {
  return (
    <div className="px-4 bg-white dark:bg-gray-800 rounded-[20px] border border-grayscale-10 dark:border-gray-700/50 shadow-dashboard overflow-hidden">
      <div className="pt-4 pb-3 border-b border-gray-100 dark:border-gray-700">
        <h3 className="text-[15px] font-semibold text-black-custom dark:text-white">
          Doanh thu & công nợ
        </h3>
      </div>

      <div className="py-4">
        <RevenueSummary />
        <RevenueByPaymentDonut />
        <RevenueByPerson />
      </div>
    </div>
  );
};

export default RevenueDebtPanel;
