"use client";
import React from "react";
import Button from "@/components/common/Button";
import CountdownTimer from "@/components/common/CountdownTimer";
import { ShiftAssignIcon, ShiftEndIcon } from "@/icons";

interface StaffMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

const mockStaff: StaffMember[] = [
  { id: "1", name: "Nguyễn Văn A", role: "Nhân viên", avatar: "" },
  { id: "2", name: "Nguyễn Văn A", role: "Nhân viên", avatar: "" },
  { id: "3", name: "Nguyễn Văn A", role: "Nhân viên", avatar: "" },
  { id: "4", name: "Nguyễn Văn A", role: "Nhân viên", avatar: "" },
  { id: "5", name: "Nguyễn Văn A", role: "Nhân viên", avatar: "" },
];

const AvatarPlaceholder: React.FC<{ name: string; size?: number }> = ({ name, size = 36 }) => {
  const initials = name
    .split(" ")
    .slice(-2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <div
      className="rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-semibold shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.35 }}
    >
      {initials}
    </div>
  );
};

const ShiftInfoCard: React.FC = () => {
  return (
    <div className="px-4 bg-white dark:bg-gray-800 rounded-[20px] border border-grayscale-10 dark:border-gray-700/50 shadow-dashboard overflow-hidden">
      {/* Header */}
      <div className="py-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[15px] font-semibold text-black-custom dark:text-white">
            Thông tin chung
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="7" cy="7" r="6" stroke="#94A3B8" strokeWidth="1.3" />
                <path
                  d="M7 4V7.5L9 9"
                  stroke="#94A3B8"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <CountdownTimer
                initialSeconds={5025}
                className="text-xs text-gray-500 dark:text-gray-400"
              />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
              Đang hoạt động
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block"></span>
            <span>Ca sáng (06:00-14:00)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="1" y="2" width="10" height="9" rx="1.5" stroke="#94A3B8" strokeWidth="1.2" />
              <path
                d="M4 1V3M8 1V3M1 5H11"
                stroke="#94A3B8"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
            <span>Mã ca: 120/2025</span>
          </div>
        </div>
      </div>

      {/* Ca truong info */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <AvatarPlaceholder name="Nguyễn Văn A" size={40} />
          <div>
            <p className="text-sm font-semibold text-black-custom dark:text-white leading-tight">
              Nguyễn Văn A
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Ca trưởng</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="gradient-orange"
            size="sm"
            leftIcon={<ShiftAssignIcon className="w-5 h-5" />}
            className="h-10 rounded-lg"
          >
            Giao ca
          </Button>
          <Button
            variant="gradient-orange"
            size="sm"
            leftIcon={<ShiftEndIcon className="w-5 h-5" />}
            className="h-10 rounded-lg"
          >
            Kết ca
          </Button>
        </div>
      </div>

      {/* Staff list */}
      <div className="py-4">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
          Danh sách nhân viên
        </p>
        <div>
          {mockStaff.map((staff) => (
            <button
              key={staff.id}
              className="border border-gray-100 px-2 my-2 w-full flex items-center justify-between py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700/40 rounded-lg group"
            >
              <div className="flex items-center gap-2.5">
                <AvatarPlaceholder name={staff.name} size={34} />
                <div className="text-left">
                  <p className="text-sm font-medium text-black-custom dark:text-white leading-tight">
                    {staff.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{staff.role}</p>
                </div>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-400 group-hover:text-gray-600 transition-colors"
              >
                <path
                  d="M6 4L10 8L6 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShiftInfoCard;
