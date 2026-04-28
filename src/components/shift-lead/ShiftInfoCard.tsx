"use client";
import React from "react";
import Button from "@/components/common/Button";
import CountdownTimer from "@/components/common/CountdownTimer";
import { ShiftAssignIcon, ShiftEndIcon, ClockIcon, MorningShiftIcon, ShiftCodeIcon } from "@/icons";
import Badge from "@/components/ui/badge/Badge";
import Avatar from "@/components/common/Avatar";
import { useAuthStore } from "@/store/useAuthStore";

interface StaffMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

const ShiftInfoCard: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  const mockStaff: StaffMember[] = [
    { id: "1", name: "Nguyễn Văn A", role: "Nhân viên", avatar: user?.avatarUrl || "" },
    { id: "2", name: "Nguyễn Văn A", role: "Nhân viên", avatar: user?.avatarUrl || "" },
    { id: "3", name: "Nguyễn Văn A", role: "Nhân viên", avatar: user?.avatarUrl || "" },
    { id: "4", name: "Nguyễn Văn A", role: "Nhân viên", avatar: user?.avatarUrl || "" },
    { id: "5", name: "Nguyễn Văn A", role: "Nhân viên", avatar: user?.avatarUrl || "" },
  ];

  return (
    <div className="px-4 bg-white dark:bg-gray-800 rounded-[20px] border border-grayscale-10 dark:border-gray-700/50 shadow-dashboard overflow-hidden">
      {/* Header */}
      <div className="py-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <h3 className="text-[15px] font-semibold text-black-custom dark:text-white shrink-0">
            Thông tin chung
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <ClockIcon className="w-3.5 h-3.5" />
              <CountdownTimer
                initialSeconds={5025}
                className="text-xs text-gray-500 dark:text-gray-400"
              />
            </div>
            <Badge
              color="success"
              size="sm"
              className="bg-[#00B164]/10 text-[#00B164] border-none font-normal px-2 h-7 flex items-center rounded-lg text-xs"
            >
              Đang hoạt động
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <MorningShiftIcon className="w-6 h-6" />
            <span>Ca sáng (06:00-14:00)</span>
          </div>
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <ShiftCodeIcon className="w-6 h-6" />
            <span>Mã ca: 120/2025</span>
          </div>
        </div>
      </div>

      {/* Ca truong info */}
      <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 dark:border-gray-700 gap-4">
        <div className="flex items-center gap-3">
          <Avatar src={user?.avatarUrl} name={user?.displayName || "User"} size={40} />
          <div>
            <p className="text-sm font-semibold text-black-custom dark:text-white leading-tight">
              {user?.displayName || "Tên người dùng"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Ca trưởng</p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full max-w-[400px] xl:w-auto">
          <Button
            variant="gradient-orange"
            size="sm"
            leftIcon={<ShiftAssignIcon className="w-5 h-5" />}
            className="h-10 rounded-lg flex-1 xl:flex-none"
          >
            Giao ca
          </Button>
          <Button
            variant="gradient-orange"
            size="sm"
            leftIcon={<ShiftEndIcon className="w-5 h-5" />}
            className="h-10 rounded-lg flex-1 xl:flex-none"
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
                <Avatar src={staff.avatar} name={staff.name} size={34} />
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
