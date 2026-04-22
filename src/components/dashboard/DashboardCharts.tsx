"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

import CustomSelect from "./CustomSelect";

const RevenueGrowthChart: React.FC = () => {
    const [selectedRange, setSelectedRange] = useState("Theo tuần");

    const rangeOptions = ["Theo tuần", "Theo tháng", "Theo năm"];

    const options: ApexOptions = {
      chart: { type: "area", height: 300, toolbar: { show: false }, fontFamily: "Inter, sans-serif" },
      stroke: { curve: "smooth", width: 2, colors: ["#3B82F6"] },
      fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.3, opacityTo: 0.05, stops: [0, 90, 100], colorStops: [{ offset: 0, color: "#3B82F6", opacity: 0.3 }, { offset: 100, color: "#3B82F6", opacity: 0 }] } },
      xaxis: { categories: ["06/09", "07/09", "08/09", "09/09", "10/09", "11/09", "12/09"], axisBorder: { show: false }, axisTicks: { show: false }, labels: { style: { colors: "#94A3B8", fontSize: "11px" } } },
      yaxis: { 
          min: 0, max: 1000, tickAmount: 5,
          labels: { style: { colors: "#94A3B8", fontSize: "11px" }, formatter: (v) => `${v}` } 
      },
      grid: { borderColor: "#F1F5F9", strokeDashArray: 4 },
      dataLabels: { enabled: false },
      markers: { size: 0, hover: { size: 5 } },
      tooltip: { x: { show: false } },
    };
    const series = [{ name: "Doanh thu", data: [600, 400, 800, 650, 900, 700, 850] }];
  
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-[24px] border border-gray-100 dark:border-gray-700/50 shadow-sm col-span-12 lg:col-span-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Tăng trưởng doanh thu</h3>
          <CustomSelect 
            options={rangeOptions}
            value={selectedRange}
            onChange={setSelectedRange}
            width="150px"
            buttonClassName="h-8 rounded-lg px-3 bg-white font-normal"
          />
        </div>
        
        <div className="flex items-center gap-3 mb-6">
           <span className="text-theme-2xl font-bold text-blue-custom leading-none">920 triệu VNĐ</span>
           <div className="flex items-center justify-center min-w-[66px] h-[31px] bg-green-custom-100 border border-green-custom-200 px-2 rounded-full">
              <span className="text-[16px] font-semibold text-green-custom-600 leading-[24px]">10%</span>
              <span className="text-[14px] ml-1 font-semibold text-green-custom-600 leading-none mt-0.5">↑</span>
           </div>
           <span className="text-[14px] font-normal text-grayscale-50 leading-[20px]">+ 120 triệu so với tuần trước</span>
        </div>
  
        <div className="h-[250px] relative">
          <div className="absolute top-[-20px] left-[-10px] text-[10px] text-gray-400 font-medium">Triệu vnđ</div>
          <ReactApexChart options={options} series={series} type="area" height="100%" />
        </div>
      </div>
    );
};
  
const SalesStructureChart: React.FC = () => {
    const options: ApexOptions = {
        chart: { type: "donut", height: 350, fontFamily: "Inter, sans-serif", toolbar: { show: false } },
        colors: ["#EF4444", "#10B981", "#3B82F6", "#F97316", "#FBC02D"],
        labels: ["Dầu nhờn", "Dầu DO", "Ron 95", "E5", "E10"],
        legend: { 
            position: "right", 
            fontSize: "13px", 
            markers: { size: 6, offsetX: -4 }, 
            itemMargin: { vertical: 10, horizontal: 10 },
            formatter: (seriesName, opts) => {
                const val = opts.w.globals.series[opts.seriesIndex];
                return `<span class="flex items-center gap-2">
                          <span class="text-gray-900 font-bold w-8">${val}%</span>
                          <span class="text-gray-400 font-medium">${seriesName}</span>
                        </span>`;
            }
        },
        stroke: { show: true, width: 4, colors: ["#fff"] },
        plotOptions: { 
            pie: { 
                donut: { 
                    size: "72%", 
                    labels: { show: false } 
                } 
            } 
        },
        dataLabels: { enabled: false },
        tooltip: {
            enabled: true,
            custom: ({ series, seriesIndex }) => {
                const val = series[seriesIndex];
                return `<div class="p-2.5 flex items-center justify-center font-bold text-gray-900 text-[13px]">
                            ${val.toLocaleString()}
                        </div>`;
            }
        }
    };
    const series = [15, 25, 25, 20, 15];

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-[24px] border border-gray-100 dark:border-gray-700/50 shadow-sm col-span-12 lg:col-span-4 translate-y-0">
             <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-8">Cơ cấu tỷ trọng doanh thu theo mặt hàng</h3>
             <div className="h-[280px] flex items-center justify-center">
                 <ReactApexChart options={options} series={series} type="donut" height="100%" width="120%" />
             </div>
        </div>
    );
};

const RevenueByShiftChart: React.FC = () => {
    const options: ApexOptions = {
        chart: { type: "bar", height: 300, toolbar: { show: false }, fontFamily: "Inter, sans-serif" },
        plotOptions: { 
            bar: { 
                borderRadius: 8, 
                borderRadiusApplication: "end",
                columnWidth: "40%", 
            } 
        },
        colors: ["#3B82F6"],
        xaxis: { categories: ["Ca sáng", "Ca chiều", "Ca tối"], axisBorder: { show: false }, axisTicks: { show: false }, labels: { style: { colors: "#94A3B8", fontSize: "11px" } } },
        yaxis: { 
            min: 0, max: 1000, tickAmount: 5,
            labels: { style: { colors: "#94A3B8", fontSize: "11px" } } 
        },
        grid: { borderColor: "#F1F5F9", strokeDashArray: 4 },
        dataLabels: { enabled: false },
    };
    const series = [{ name: "Doanh thu", data: [650, 890, 730] }];

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-[24px] border border-gray-100 dark:border-gray-700/50 shadow-sm col-span-12 lg:col-span-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Doanh thu theo ca</h3>
          <div className="text-[10px] text-gray-400 font-medium mb-4">Triệu vnđ</div>
          
          <div className="h-[250px] relative">
            <ReactApexChart options={options} series={series} type="bar" height="100%" />
          </div>
        </div>
    );
};


const DashboardCharts: React.FC = () => {
  return (
    <div className="grid grid-cols-12 gap-6 mb-6">
      {/* Global CSS for ApexCharts tooltips to match design directly on the container */}
      <style dangerouslySetInnerHTML={{ __html: `
        .apexcharts-tooltip {
          background: white !important;
          border: 1px solid #f1f5f9 !important;
          border-radius: 12px !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
          color: #1e293b !important;
        }
        .apexcharts-tooltip-series-group {
          background: transparent !important;
          padding: 0 !important;
        }
      `}} />
      <RevenueGrowthChart />
      <SalesStructureChart />
      <RevenueByShiftChart />
    </div>
  );
};

export default DashboardCharts;
