"use client";
import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { DataTable, ColumnDef } from "@/components/ui/table/DataTable";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

/* ─── 1. Sản lượng bán theo vòi (Bar) ─────────────────────────── */
const SalesByNozzleChart: React.FC = () => {
  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 200,
      toolbar: { show: false },
      fontFamily: "Inter, sans-serif",
      animations: { enabled: true },
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        borderRadiusApplication: "around",
        columnWidth: "12px",
        distributed: true,
        colors: {
          backgroundBarColors: ["#F8FAFC"],
          backgroundBarOpacity: 1,
          backgroundBarRadius: 12,
        },
      },
    },
    colors: ["#CBD5E1", "#CBD5E1", "#CBD5E1", "#CBD5E1", "#3B82F6", "#CBD5E1", "#CBD5E1"],
    dataLabels: { enabled: false },
    states: {
      hover: {
        filter: {
          type: "darken",
          // @ts-expect-error - value exists in runtime but not in ApexCharts types
          value: 0.9,
        },
      },
      active: { filter: { type: "none" } },
    },
    xaxis: {
      categories: ["E1", "E2", "A1", "A2", "D1", "D2", "D3"],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: ["#64748B", "#64748B", "#64748B", "#64748B", "#3B82F6", "#64748B", "#64748B"],
          fontSize: "12px",
          fontWeight: 400,
        },
      },
    },
    yaxis: {
      min: 1,
      max: 6,
      tickAmount: 5,
      labels: {
        style: { colors: "#94A3B8", fontSize: "12px" },
        formatter: (v) => `${Math.floor(v)}`,
      },
    },
    grid: {
      borderColor: "#F1F5F9",
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      padding: { top: 0, right: 0, bottom: 0, left: 10 },
    },
    tooltip: {
      y: {
        formatter: (v) => `${v} Lít`,
      },
    },
    legend: { show: false },
  };

  const series = [
    {
      name: "Sản lượng",
      data: [4, 4.8, 3.9, 4.5, 5.6, 5, 4],
    },
  ];

  return (
    <div className="relative">
      <div className="absolute left-0 top-[-8px] text-[13px] text-gray-400 font-normal">(Lít)</div>
      <div className="absolute right-0 bottom-[18px] text-[13px] text-gray-400 font-normal">
        (Vòi)
      </div>
      <ReactApexChart options={options} series={series} type="bar" height={200} />
    </div>
  );
};

/* ─── 2. Sản lượng theo mặt hàng (Donut) ──────────────────────── */
const SalesByProductDonut: React.FC = () => {
  const total = 10324345;
  const data = [
    { name: "RON 95", pct: 45, color: "#2388FF" },
    { name: "E5", pct: 35, color: "#69AFFF" },
    { name: "DO 0.05S", pct: 20, color: "#D6E9FF" },
  ];

  const options: ApexOptions = {
    chart: { type: "donut", fontFamily: "var(--font-averta), sans-serif", toolbar: { show: false } },
    colors: data.map((d) => d.color),
    labels: data.map((d) => d.name),
    legend: { show: false },
    stroke: { show: true, width: 4, colors: ["#fff"] },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: "65%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Tổng 123,344 lít",
              fontSize: "12px",
              fontWeight: 400,
              color: "#64748B",
              formatter: () => total.toLocaleString("vi-VN"),
            },
            value: {
              show: true,
              fontSize: "16px",
              fontWeight: 700,
              color: "#1E293B",
              offsetY: 4,
              formatter: (v) => v,
            },
          },
        },
        // @ts-expect-error - borderRadius exists in newer ApexCharts versions but not in current types
        borderRadius: 8,
      },
    },
    grid: { padding: { bottom: -10 } },
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

  return (
    <div className="flex flex-col sm:flex-row items-center gap-8 py-2">
      {/* Chart container */}
      <div className="w-[200px] h-[200px] shrink-0">
        <ReactApexChart
          options={options}
          series={data.map((d) => d.pct)}
          type="donut"
          height={200}
          width={200}
        />
      </div>

      {/* Custom Legend */}
      <div className="flex flex-col gap-4 w-full sm:w-auto">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <div className="flex items-center gap-1.5 text-sm">
              <span className="text-gray-500">{item.name}</span>
              <span className="font-bold text-black-custom dark:text-white">{item.pct}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── 3. Sản lượng theo nhân viên (horizontal bar) ───────────────── */
const staffData = [
  { name: "Nguyễn Văn A", value: 300000000, pct: 100 },
  { name: "Tiến Văn B", value: 280000000, pct: 93 },
  { name: "Bùi Minh C", value: 200000000, pct: 67 },
  { name: "Hoàng Ngọc D", value: 150000000, pct: 50 },
  { name: "Phan Văn E", value: 100000000, pct: 33 },
];

const SalesByStaff: React.FC = () => (
  <div>
    <div className="text-[34px] font-bold text-[#2388FF] mb-4 leading-none">1,456,563,345</div>
    <div className="space-y-4">
      {staffData.map((s) => (
        <div key={s.name} className="flex items-center gap-2 sm:gap-4">
          <div className="w-[80px] sm:w-[100px] shrink-0 text-xs sm:text-sm text-black-custom dark:text-gray-300 truncate">
            {s.name}
          </div>
          <div className="flex-1 h-5 sm:h-6 rounded-full bg-blue-50 dark:bg-gray-700/50 overflow-hidden relative">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#C3DDFF] to-[#8DC1FF] border border-[#8DC1FF]/20"
              style={{ width: `${s.pct}%` }}
            />
          </div>
          <div className="w-[90px] sm:w-[110px] shrink-0 text-xs sm:text-sm font-semibold text-right text-black-custom dark:text-white tabular-nums">
            {s.value.toLocaleString("vi-VN")}
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ─── 4. Bảng giá bán hiện hành ─────────────────────────────────── */
interface PriceRow {
  name: string;
  unit: string;
  price: string;
}

const priceData: PriceRow[] = [
  { name: "Xăng E5 RON 92 Mác 2", unit: "1 Lít", price: "2,000" },
  { name: "Xăng E5 RON 92 Mác 2", unit: "1 Lít", price: "1,000" },
  { name: "Xăng E5 RON 92 Mác 2", unit: "1 Lít", price: "1,000" },
  { name: "Xăng E5 RON 92 Mác 2", unit: "1 Lít", price: "1,000" },
  { name: "Xăng E5 RON 92 Mác 2", unit: "1 Lít", price: "1,000" },
  { name: "Xăng E5 RON 92 Mác 2", unit: "1 Lít", price: "1,000" },
];

const priceColumns: ColumnDef<PriceRow>[] = [
  { key: "name", header: "Tên", align: "left" },
  { key: "unit", header: "Số lượng", align: "center" },
  { key: "price", header: "Đơn giá", align: "right", className: "tabular-nums font-medium" },
];

/* ─── 5. Tổng giao dịch + Line chart ─────────────────────────────── */
const TransactionChart: React.FC = () => {
  const lineOptions: ApexOptions = {
    chart: {
      type: "area",
      height: 100,
      toolbar: { show: false },
      sparkline: { enabled: true },
      fontFamily: "Inter, sans-serif",
    },
    stroke: { curve: "smooth", width: 2.5, colors: ["#2388FF", "#FF5C8E"] },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        inverseColors: false,
        opacityFrom: 0.6,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
    colors: ["#2388FF", "#FF5C8E"],
    tooltip: {
      x: { show: false },
      y: { formatter: (v) => `${v} giao dịch` },
    },
    legend: { show: false },
    dataLabels: { enabled: false },
  };

  const lineSeries = [
    { name: "Hôm nay", data: [120, 180, 90, 220, 160, 250, 200, 280] },
    { name: "Hôm qua", data: [100, 150, 80, 190, 140, 210, 170, 240] },
  ];

  return (
    <div>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-baseline gap-2">
          <div className="text-[34px] font-bold text-[#2388FF] leading-none">50,000</div>
          <div className="text-sm text-gray-500 font-medium">giao dịch hôm nay</div>
        </div>
        <div className="text-right">
          <div className="text-[#10B981] font-bold text-lg leading-tight">+23%</div>
          <div className="text-sm text-gray-400 font-medium">so với hôm qua</div>
        </div>
      </div>

      <div className="mt-4 -mx-1">
        <ReactApexChart options={lineOptions} series={lineSeries} type="area" height={100} />
      </div>

      <div className="flex items-center justify-end gap-4 mt-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2388FF] inline-block"></span>
          <span className="text-xs text-gray-500 font-medium">Hôm nay</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5C8E] inline-block"></span>
          <span className="text-xs text-gray-500 font-medium">Hôm qua</span>
        </div>
      </div>
    </div>
  );
};

/* ─── 6. Hình thức giao dịch ────────────────────────────────────── */
const TransactionMethods: React.FC = () => {
  const methods = [
    { label: "Tiền mặt", value: "30,000" },
    { label: "Chuyển khoản", value: "18,000" },
    { label: "Thẻ", value: "1,000" },
    { label: "Ví", value: "1,000" },
  ];
  return (
    <div className="bg-[#F8FAFF] dark:bg-gray-800/40 rounded-xl p-4 border border-blue-50/50 dark:border-gray-700/50">
      <h5 className="text-sm font-bold text-black-custom dark:text-white mb-4">
        Hình thức giao dịch
      </h5>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {methods.map((m) => (
          <div key={m.label}>
            <p className="text-[13px] text-gray-500 dark:text-gray-400 mb-1">{m.label}</p>
            <p className="text-base font-bold text-black-custom dark:text-white tabular-nums">
              {m.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── Composed: SalesPanel ─────────────────────────────────────── */
const SalesPanel: React.FC = () => {
  return (
    <div className="px-4 bg-white dark:bg-gray-800 rounded-[20px] border border-grayscale-10 dark:border-gray-700/50 shadow-dashboard overflow-hidden">
      <div className="pt-4 pb-3 border-b border-gray-100 dark:border-gray-700">
        <h3 className="text-[15px] font-semibold text-black-custom dark:text-white">Bán hàng</h3>
      </div>

      <div className="py-4 space-y-5">
        {/* Sản lượng bán theo vòi */}
        <section>
          <h4 className="text-sm font-bold text-black-custom dark:text-white mb-4">
            Sản lượng bán theo vòi
          </h4>
          <SalesByNozzleChart />
        </section>

        <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
          {/* Sản lượng theo mặt hàng */}
          <h4 className="text-sm font-bold text-black-custom dark:text-white mb-4">
            Sản lượng theo mặt hàng
          </h4>
          <SalesByProductDonut />
        </div>

        <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
          {/* Sản lượng theo nhân viên */}
          <h4 className="text-sm font-bold text-black-custom dark:text-white mb-4">
            Sản lượng theo nhân viên
          </h4>
          <SalesByStaff />
        </div>

        <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
          {/* Giá bán hiện hành */}
          <h4 className="text-sm font-bold text-black-custom dark:text-white mb-4">
            Giá bán hiện hành
          </h4>
          <div className="overflow-hidden rounded-lg border border-gray-100 dark:border-gray-700">
            <DataTable
              columns={priceColumns}
              data={priceData}
              headerRowClassName="bg-[#E8F1FF] dark:bg-blue-900/20"
              headerCellClassName="py-3 px-4 text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider border-none"
              rowClassName="even:bg-[#F8FAFC] dark:even:bg-gray-800/40 border-b border-gray-50 dark:border-gray-700 last:border-none"
              bodyCellClassName="py-3 px-4 text-sm text-black-custom dark:text-gray-200"
            />
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
          {/* Tổng giao dịch */}
          <h4 className="text-sm font-bold text-black-custom dark:text-white mb-4">
            Tổng số giao dịch trong ca
          </h4>
          <TransactionChart />
        </div>

        <div className="pt-2">
          {/* Hình thức giao dịch */}
          <TransactionMethods />
        </div>
      </div>
    </div>
  );
};

export default SalesPanel;
