"use client";
import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { DataTable, ColumnDef } from "@/components/ui/table/DataTable";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

/* ─── 1. Sản lượng bán theo vòi (Bar) ─────────────────────────── */
const SalesByNozzleChart: React.FC = () => {
  const options: ApexOptions = {
    chart: { type: "bar", height: 180, toolbar: { show: false }, fontFamily: "Inter, sans-serif" },
    plotOptions: {
      bar: {
        borderRadius: 5,
        borderRadiusApplication: "end",
        columnWidth: "52%",
        colors: {
          ranges: [{ from: 0, to: 10000, color: "#E8F1FF" }],
        },
      },
    },
    colors: ["#3B82F6"],
    states: {
      hover: { filter: { type: "none" } },
      active: { filter: { type: "none" } },
    },
    xaxis: {
      categories: ["F1", "F2", "F3", "F4", "D1", "D2", "D3", "Vắt"],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: "#94A3B8", fontSize: "10px" } },
    },
    yaxis: {
      min: 0,
      max: 9,
      tickAmount: 3,
      labels: {
        style: { colors: "#94A3B8", fontSize: "10px" },
        formatter: (v) => `${v}`,
      },
    },
    grid: { borderColor: "#F1F5F9", strokeDashArray: 4, padding: { left: -4, right: 0 } },
    dataLabels: { enabled: false },
    tooltip: { y: { formatter: (v) => `${v} triệu L` } },
  };

  // D1 highlighted with full blue
  const series = [
    {
      name: "Sản lượng (triệu L)",
      data: [3, 2, 5, 4, 8, 5, 4, 2],
      // no individual colors API needed — will use a custom render below
    },
  ];

  // Manually colour D1 bar (index 4) separately by using fill
  const optionsFinal: ApexOptions = {
    ...options,
    fill: {
      type: "solid",
      colors: ["#E8F1FF"],
    },
  };

  // Workaround: use individual bar color override via distributed + colors array
  const optionsDist: ApexOptions = {
    ...options,
    plotOptions: {
      bar: {
        borderRadius: 5,
        borderRadiusApplication: "end",
        columnWidth: "52%",
        distributed: true,
      },
    },
    colors: ["#E0EAFF", "#E0EAFF", "#E0EAFF", "#E0EAFF", "#3B82F6", "#E0EAFF", "#E0EAFF", "#E0EAFF"],
    legend: { show: false },
    tooltip: { y: { formatter: (v) => `${v} triệu L` } },
  };

  return (
    <div>
      <div className="text-[10px] text-gray-400 font-medium mb-1">(Lít)</div>
      <ReactApexChart options={optionsDist} series={series} type="bar" height={180} />
    </div>
  );
};

/* ─── 2. Sản lượng theo mặt hàng (Donut) ──────────────────────── */
const SalesByProductDonut: React.FC = () => {
  const total = 10324345;
  const options: ApexOptions = {
    chart: { type: "donut", fontFamily: "Inter, sans-serif", toolbar: { show: false } },
    colors: ["#3B82F6", "#60A5FA", "#BFDBFE"],
    labels: ["RON 95", "E5", "DO 0.05"],
    legend: {
      show: true,
      position: "right",
      fontSize: "11px",
      markers: { size: 6, offsetX: -2 },
      itemMargin: { vertical: 4 },
      formatter: (name, opts) => {
        const pct = [45, 35, 20][opts.seriesIndex];
        return `<span style="color:#374151;font-weight:600">${name}</span> <span style="color:#94A3B8">${pct}%</span>`;
      },
    },
    stroke: { show: true, width: 3, colors: ["#fff"] },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            total: {
              show: true,
              label: `Tổng ${(total / 1000000).toFixed(2)} triệu lít`,
              fontSize: "10px",
              color: "#94A3B8",
              formatter: () => total.toLocaleString("vi-VN"),
            },
            value: { show: false },
          },
        },
      },
    },
    dataLabels: { enabled: false },
    tooltip: { y: { formatter: (v) => `${v}%` } },
  };

  return (
    <div className="h-[160px] flex items-center">
      <ReactApexChart
        options={options}
        series={[45, 35, 20]}
        type="donut"
        height={160}
        width="100%"
      />
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
    <div className="text-[22px] font-bold text-blue-custom dark:text-blue-400 mb-3">
      1,456,563,345
    </div>
    <div className="space-y-2.5">
      {staffData.map((s) => (
        <div key={s.name} className="flex items-center gap-2.5">
          <div className="w-[90px] shrink-0 text-xs text-black-custom dark:text-white truncate">
            {s.name}
          </div>
          <div className="flex-1 h-2 rounded-full bg-blue-50 dark:bg-gray-700 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
              style={{ width: `${s.pct}%` }}
            />
          </div>
          <div className="w-[90px] shrink-0 text-xs text-right text-black-custom dark:text-white tabular-nums">
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
  { key: "name", header: "Tên" },
  { key: "unit", header: "Số lượng", className: "text-center" },
  { key: "price", header: "Đơn giá", className: "text-right tabular-nums" },
];

/* ─── 5. Tổng giao dịch + Line chart ─────────────────────────────── */
const TransactionChart: React.FC = () => {
  const lineOptions: ApexOptions = {
    chart: { type: "line", height: 80, toolbar: { show: false }, sparkline: { enabled: true }, fontFamily: "Inter, sans-serif" },
    stroke: { curve: "smooth", width: [2, 2], colors: ["#3B82F6", "#FDA81F"] },
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
      <div className="flex items-end justify-between mb-1">
        <div>
          <div className="text-[26px] font-bold text-blue-custom dark:text-blue-400 leading-tight">
            50,000
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">giao dịch hôm nay</div>
        </div>
        <div className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 border border-green-200 rounded-full px-2 py-0.5 mb-1">
          <span>+23%</span>
          <span className="text-gray-400 font-normal ml-1">so với hôm qua</span>
        </div>
      </div>

      <div className="mt-2">
        <ReactApexChart options={lineOptions} series={lineSeries} type="line" height={80} />
      </div>

      <div className="flex items-center gap-4 mt-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
          <span className="text-[11px] text-gray-500">Hôm nay</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block"></span>
          <span className="text-[11px] text-gray-500">Hôm qua</span>
        </div>
      </div>
    </div>
  );
};

/* ─── 6. Hình thức giao dịch ────────────────────────────────────── */
const TransactionMethods: React.FC = () => {
  const methods = [
    { label: "Tiền mặt", value: "30,000", color: "text-blue-600" },
    { label: "Chuyển khoản", value: "18,000", color: "text-orange-500" },
    { label: "Thẻ", value: "1,000", color: "text-purple-500" },
    { label: "Ví", value: "1,000", color: "text-green-500" },
  ];
  return (
    <div className="grid grid-cols-4 gap-2 mt-3">
      {methods.map((m) => (
        <div key={m.label} className="text-center">
          <p className={`text-sm font-bold tabular-nums ${m.color}`}>{m.value}</p>
          <p className="text-[10px] text-gray-500 mt-0.5">{m.label}</p>
        </div>
      ))}
    </div>
  );
};

/* ─── Composed: SalesPanel ─────────────────────────────────────── */
const SalesPanel: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-[20px] border border-grayscale-10 dark:border-gray-700/50 shadow-dashboard overflow-hidden">
      <div className="px-5 pt-4 pb-3 border-b border-gray-100 dark:border-gray-700">
        <h3 className="text-[15px] font-semibold text-black-custom dark:text-white">Bán hàng</h3>
      </div>

      <div className="px-5 py-4 space-y-5">
        {/* Sản lượng bán theo vòi */}
        <section>
          <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
            Sản lượng bán theo vòi
          </h4>
          <SalesByNozzleChart />
        </section>

        <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
          {/* Sản lượng theo mặt hàng */}
          <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
            Sản lượng theo mặt hàng
          </h4>
          <SalesByProductDonut />
        </div>

        <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
          {/* Sản lượng theo nhân viên */}
          <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
            Sản lượng theo nhân viên
          </h4>
          <SalesByStaff />
        </div>

        <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
          {/* Giá bán hiện hành */}
          <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
            Giá bán hiện hành
          </h4>
          <div className="overflow-x-auto custom-scrollbar">
            <DataTable columns={priceColumns} data={priceData} />
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
          {/* Tổng giao dịch */}
          <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
            Tổng số giao dịch trong ca
          </h4>
          <TransactionChart />
        </div>

        <div className="border-t border-gray-100 dark:border-gray-700 pt-2">
          {/* Hình thức giao dịch */}
          <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
            Hình thức giao dịch
          </h4>
          <TransactionMethods />
        </div>
      </div>
    </div>
  );
};

export default SalesPanel;
