"use client";
import React from "react";
import { ArrowUpIcon, ArrowDownIcon, DollarLineIcon, GasStationIcon, GridIcon, LockIcon, AlertIcon } from "@/icons";

interface MetricCardProps {
  title: string;
  value: string;
  unit?: string;
  trendValue: string;
  trendText: string;
  isUp: boolean;
  isNeutral?: boolean;
  icon: React.ReactNode;
  themeClass: string;
  iconBg: string;
  iconShadow: string;
}

const StatCard: React.FC<MetricCardProps> = ({ 
  title, value, unit, trendValue, trendText, isUp, isNeutral, icon, themeClass, iconBg, iconShadow 
}) => (
  <div className={`p-4 rounded-[24px] border transition-all duration-300 hover:shadow-lg ${themeClass}`}>
    <div className="flex items-center gap-4 mb-4">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg ${iconBg} ${iconShadow} ring-4 ring-white/50`}>
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-gray-500 dark:text-gray-400 text-[13px] font-medium leading-tight mb-0.5">
          {title}
        </h4>
        <div className="flex items-center gap-1.5">
          <span className="text-[18px] font-bold text-gray-900 dark:text-white leading-none">
            {value}
          </span>
          {unit && <span className="text-[13px] font-semibold text-gray-500 lowercase leading-none pt-0.5">{unit}</span>}
        </div>
      </div>
    </div>
    
    <div className="flex items-center gap-2">
      <div className="bg-white dark:bg-gray-800 px-2 py-0.5 rounded-full shadow-sm border border-gray-50 dark:border-gray-700 flex items-center">
         {!isNeutral && (
            <span className={`text-[11px] font-bold flex items-center ${isUp ? "text-green-500" : "text-red-500"}`}>
              {isUp ? <span className="mr-0.5">↗</span> : <span className="mr-0.5">↘</span>}
              {trendValue}
            </span>
          )}
          {isNeutral && (
             <span className="text-[11px] font-bold text-green-500 flex items-center">
                {trendValue}
             </span>
          )}
      </div>
      <span className="text-[11px] text-gray-500 font-medium whitespace-nowrap">
        {trendText}
      </span>
    </div>
  </div>
);

const DashboardMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <StatCard
        title="Tổng doanh thu hôm nay"
        value="120.000.000"
        unit="VNĐ"
        trendValue="0.25%"
        trendText="so với ngày hôm qua"
        isUp={true}
        icon={<DollarLineIcon className="w-6 h-6" />}
        themeClass="bg-[#E0F7FA] border-[#B2EBF2] dark:bg-cyan-900/20 dark:border-cyan-800/50"
        iconBg="bg-[#00BCD4]"
        iconShadow="shadow-cyan-200"
      />
      <StatCard
        title="Tổng sản lượng bán"
        value="103,250"
        unit="Lít"
        trendValue="0.25%"
        trendText="so với ngày hôm qua"
        isUp={false}
        icon={<GasStationIcon className="w-6 h-6" />}
        themeClass="bg-[#FFF3E0] border-[#FFE0B2] dark:bg-orange-900/20 dark:border-orange-800/50"
        iconBg="bg-[#F97316]"
        iconShadow="shadow-orange-200"
      />
      <StatCard
        title="Số giao dịch"
        value="1,200"
        unit="lượt"
        trendValue="0.25%"
        trendText="so với ngày hôm qua"
        isUp={true}
        icon={<GridIcon className="w-6 h-6" />}
        themeClass="bg-[#E8F5E9] border-[#C8E6C9] dark:bg-green-900/20 dark:border-green-800/50"
        iconBg="bg-[#4CAF50]"
        iconShadow="shadow-green-200"
      />
      <StatCard
        title="Tiền mặt đã nộp về công ty"
        value="112.000.000"
        unit="VNĐ"
        trendValue="0.25%"
        trendText="so với ngày hôm qua"
        isUp={false}
        icon={<LockIcon className="w-6 h-6" />}
        themeClass="bg-[#FFFDE7] border-[#FFF9C4] dark:bg-yellow-900/20 dark:border-yellow-800/50"
        iconBg="bg-[#FBC02D]"
        iconShadow="shadow-yellow-200"
      />
      <StatCard
        title=" % Hao hụt"
        value="0,5"
        unit="%"
        trendValue="<1%"
        trendText="Trong định mức"
        isUp={false}
        isNeutral={true}
        icon={<AlertIcon className="w-6 h-6" />}
        themeClass="bg-[#FFEBEE] border-[#FFCDD2] dark:bg-red-900/20 dark:border-red-800/50"
        iconBg="bg-[#EF5350]"
        iconShadow="shadow-red-200"
      />
    </div>
  );
};

export default DashboardMetrics;
