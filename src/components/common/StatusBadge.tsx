"use client";
import React from "react";

interface StatusBadgeProps {
  status: string;
  color: "red" | "green";
  date?: string;
  showTooltip?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  color,
  date,
  showTooltip = true,
}) => {
  return (
    <div className="relative group/badge cursor-pointer">
      <div
        className={`flex items-center justify-center gap-1 py-0.5 pr-2 rounded-lg text-[12px] font-semibold text-white whitespace-nowrap shadow-sm ${
          color === "red" ? "bg-[#EF4444]" : "bg-[#22C55E]"
        }`}
      >
        <span className="scale-[127%] ml-[-2px]">
          {color === "red" ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10" cy="10" r="10" fill="white" />
              <path
                d="M10 18.9999C14.9706 18.9999 19 14.9705 19 9.99994C19 5.02938 14.9706 0.999939 10 0.999939C5.02944 0.999939 1 5.02938 1 9.99994C1 14.9705 5.02944 18.9999 10 18.9999Z"
                fill="url(#paint0_linear_red_badge)"
              />
              <path
                opacity="0.24"
                d="M11.5806 18.8628C11.0645 18.9516 10.5403 18.9999 10 18.9999C5.03226 18.9999 1 14.9757 1 9.99994C1 5.02413 5.03226 0.999939 10 0.999939C10.5403 0.999939 11.0726 1.04832 11.5806 1.13703C7.3629 1.88703 4.16129 5.56446 4.16129 9.99994C4.16935 14.4354 7.37097 18.1128 11.5806 18.8628Z"
                fill="url(#paint1_linear_red_badge)"
              />
              <path
                d="M13.7098 13.4275L13.4275 13.7098C13.2662 13.871 13.0162 13.871 12.8549 13.7098L6.2904 7.14524C6.12911 6.98395 6.12911 6.73395 6.2904 6.57266L6.57266 6.2904C6.73395 6.12911 6.98395 6.12911 7.14524 6.2904L13.7098 12.8549C13.863 13.0162 13.863 13.2662 13.7098 13.4275Z"
                fill="white"
              />
              <path
                d="M6.57266 13.7098L6.2904 13.4275C6.12911 13.2662 6.12911 13.0162 6.2904 12.8549L12.8549 6.2904C13.0162 6.12911 13.2662 6.12911 13.4275 6.2904L13.7098 6.57266C13.871 6.73395 13.871 6.98395 13.7098 7.14524L7.14524 13.7098C6.99201 13.871 6.73395 13.871 6.57266 13.7098Z"
                fill="white"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_red_badge"
                  x1="1"
                  y1="10.0022"
                  x2="18.998"
                  y2="10.0022"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FF3C00" />
                  <stop offset="1" stopColor="#EB341C" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_red_badge"
                  x1="0.537008"
                  y1="9.44093"
                  x2="16.2014"
                  y2="10.3702"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10" cy="10" r="10" fill="white" />
              <path
                d="M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19Z"
                fill="url(#paint0_linear_green_badge)"
              />
              <path
                d="M5.54834 9.73388C5.54834 9.73388 8.70157 14.0565 9.27415 14.0161C10.3548 13.9516 14.6532 5.25001 14.5967 5.24194C14.5967 5.24194 9.61286 11.121 9.28221 11.1129C8.73382 11.1048 5.54834 9.73388 5.54834 9.73388Z"
                fill="white"
              />
              <path
                opacity="0.22"
                d="M11.5887 18.8629C11.0726 18.9516 10.5484 19 10.0081 19C5.04032 19 1.00806 14.9677 1.00806 10C1.00806 5.03226 5.03225 1 9.99999 1C10.5403 1 11.0726 1.04839 11.5806 1.1371C7.3629 1.8871 4.16128 5.56452 4.16128 10C4.16935 14.4274 7.37096 18.1129 11.5887 18.8629Z"
                fill="url(#paint1_linear_green_badge)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_green_badge"
                  x1="1.00251"
                  y1="9.99935"
                  x2="19.0005"
                  y2="9.99935"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#67DD43" />
                  <stop offset="1" stopColor="#1E9D5E" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_green_badge"
                  x1="0.539508"
                  y1="9.43791"
                  x2="16.2039"
                  y2="10.3672"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          )}
        </span>
        {status}
      </div>
      {showTooltip && date && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 z-10 w-[83px] opacity-0 invisible group-hover/badge:opacity-100 group-hover/badge:visible transition-all duration-200">
          <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-[10px] h-[10px] bg-white dark:bg-gray-800 rotate-45 border-l border-t border-[#EDF1F5] dark:border-gray-700"></div>
          <div className="relative bg-white dark:bg-gray-800 w-full h-[30px] flex items-center justify-center rounded-lg text-[12px] font-normal text-gray-custom dark:text-gray-400 shadow-[0_12px_24px_-4px_rgba(143,155,166,0.15)] border border-[#EDF1F5] dark:border-gray-700">
            {date}
          </div>
        </div>
      )}
    </div>
  );
};

