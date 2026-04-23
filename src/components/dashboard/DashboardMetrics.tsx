"use client";
import React from "react";
import {
  ColorWarning,
  ColorTotalAmount,
  ColorTotalOrder,
  ColorTotalMoney,
  ColorTotalGoods,
} from "@/icons";

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
  title,
  value,
  unit,
  trendValue,
  trendText,
  isUp,
  isNeutral,
  icon,
  themeClass,
  iconBg,
  iconShadow,
}) => (
  <div className={`p-4 rounded-xl border transition-all duration-300 ${themeClass}`}>
    <div className="flex items-center gap-4 mb-4">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${iconBg} ${iconShadow}`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-gray-custom dark:text-gray-400 text-sm font-normal leading-tight mb-1">
          {title}
        </h4>
        <div className="flex items-center gap-1.5">
          <span className="text-xl font-bold text-black-custom dark:text-white leading-none">
            {value}
          </span>
          {unit && (
            <span className="text-sm font-normal text-gray-dark-custom leading-none pt-0.5">
              {unit}
            </span>
          )}
        </div>
      </div>
    </div>

    <div className="flex items-center gap-2">
      <div className="bg-white dark:bg-gray-800 px-2 py-0.5 rounded-full border border-gray-50 dark:border-gray-700 flex items-center">
        {!isNeutral && (
          <span
            className={`text-[12px] font-normal flex items-center ${isUp ? "text-green-500" : "text-red-500"}`}
          >
            {isUp ? (
              <span className="mr-0.5">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 3.5L7 1.5M7 1.5L9 3.5M7 1.5V3.697C7.00004 4.25159 6.86315 4.79761 6.60147 5.28659C6.3398 5.77557 5.96145 6.19237 5.5 6.5C5.03855 6.80763 4.6602 7.22443 4.39853 7.71341C4.13685 8.20239 3.99996 8.74841 4 9.303V10.5"
                    stroke="#06C270"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 3.5L7 1.5M7 1.5L9 3.5M7 1.5V3.697C7.00004 4.25159 6.86315 4.79761 6.60147 5.28659C6.3398 5.77557 5.96145 6.19237 5.5 6.5C5.03855 6.80763 4.6602 7.22443 4.39853 7.71341C4.13685 8.20239 3.99996 8.74841 4 9.303V10.5"
                    stroke="black"
                    strokeOpacity="0.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            ) : (
              <span className="mr-0.5">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 8.5L7 10.5M7 10.5L9 8.5M7 10.5V8.303C7.00004 7.74841 6.86315 7.20239 6.60147 6.71341C6.3398 6.22443 5.96145 5.80763 5.5 5.5C5.03855 5.19237 4.6602 4.77557 4.39853 4.28659C4.13685 3.79761 3.99996 3.25159 4 2.697V1.5"
                    stroke="#FF3B3B"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
            {trendValue}
          </span>
        )}
        {isNeutral && (
          <span className="text-[12px] font-bold text-green-500 flex items-center">
            {trendValue}
          </span>
        )}
      </div>
      <span className="text-[12px] text-grayscale-50 font-normal whitespace-nowrap">
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
        icon={<ColorTotalMoney className="w-6 h-6" />}
        themeClass="border border-[#02B4FA]/30 bg-[#02B4FA]/5"
        iconBg="bg-stat-3"
        iconShadow="shadow-custom-blue"
      />
      <StatCard
        title="Tổng sản lượng bán"
        value="103,250"
        unit="Lít"
        trendValue="0.25%"
        trendText="so với ngày hôm qua"
        isUp={false}
        icon={<ColorTotalGoods className="w-6 h-6" />}
        themeClass="border border-[#FF8110]/30 bg-[#FF8110]/5 dark:bg-orange-900/20 dark:border-orange-800/50"
        iconBg="bg-stat-2"
        iconShadow="shadow-custom-orange"
      />
      <StatCard
        title="Số giao dịch"
        value="1,200"
        unit="lượt"
        trendValue="0.25%"
        trendText="so với ngày hôm qua"
        isUp={true}
        icon={<ColorTotalOrder className="w-6 h-6" />}
        themeClass="border border-[#22B07E]/30 bg-[#22B07E]/5 dark:bg-green-900/20 dark:border-green-800/50"
        iconBg="bg-stat-4"
        iconShadow="shadow-custom-green"
      />
      <StatCard
        title="Tiền mặt đã nộp về công ty"
        value="112.000.000"
        unit="VNĐ"
        trendValue="0.25%"
        trendText="so với ngày hôm qua"
        isUp={false}
        icon={<ColorTotalAmount className="w-6 h-6" />}
        themeClass="border border-[#FDBB1F]/30 bg-[#FDBB1F]/5 dark:bg-yellow-900/20 dark:border-yellow-800/50"
        iconBg="bg-stat-5"
        iconShadow="shadow-custom-yellow"
      />
      <StatCard
        title=" % Hao hụt"
        value="0,5"
        unit="%"
        trendValue="<1%"
        trendText="Trong định mức"
        isUp={false}
        isNeutral={true}
        icon={<ColorWarning className="w-6 h-6" />}
        themeClass="border border-[#FF5B5B]/30 bg-[#FF5B5B]/5 dark:bg-red-900/20 dark:border-red-800/50"
        iconBg="bg-stat-6"
        iconShadow="shadow-custom-red"
      />
    </div>
  );
};

export default DashboardMetrics;
