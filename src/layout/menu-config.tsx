import React from "react";
import {
  OilStaffIcon,
  OilCarIcon,
} from "../icons/index";
import { UserRole } from "@/types/auth";

export type MenuItem = {
  id: string;
  name: string;
  icon?: React.ReactNode;
  path?: string;
  componentKey?: string;
  subItems?: MenuItem[];
  pro?: boolean;
  new?: boolean;
};

export type Module = {
  id: string;
  name: string;
  icon: React.ReactNode;
  sections: {
    title: string;
    items: MenuItem[];
  }[];
};

const managerModules: Module[] = [
  {
    id: "module-shift",
    name: "Quản lý ca bể chứa",
    icon: <OilStaffIcon />,
    sections: [
      {
        title: "Nghiệp vụ ca",
        items: [
          {
            id: "shift-measure",
            name: "Số đo bể đầu ca",
            path: "/",
            componentKey: "Dashboard",
            icon: null
          },
          {
            id: "shift-report",
            name: "Danh mục ca bán hàng tại POS",
            path: "/pos-report",
            componentKey: "POSSalesShiftReport",
            icon: null
          },
          {
            id: "shift-receive",
            name: "Nhận hàng vào ca",
            path: "/calendar",
            componentKey: "Calendar",
            icon: null
          },
        ]
      }
    ]
  },
];

const shiftLeadModules: Module[] = [
  {
    id: "module-shift",
    name: "Quản lý ca bể chứa",
    icon: <OilStaffIcon />,
    sections: [
      {
        title: "Nghiệp vụ ca trưởng",
        items: [
          {
            id: "shift-lead-overview",
            name: "Tổng quan ca trực",
            path: "/",
            componentKey: "ShiftLeadDashboard",
            icon: null,
          },
          {
            id: "shift-lead-approve",
            name: "Xác nhận số liệu đầu ca",
            path: "/calendar",
            componentKey: "ShiftLeadTasks",
            icon: null,
          },
          {
            id: "shift-lead-checklist",
            name: "Checklist vận hành ca",
            path: "/basic-tables",
            componentKey: "ShiftLeadTasks",
            icon: null,
          },
        ],
      },
    ],
  },
];

const staffModules: Module[] = [
  {
    id: "module-shift",
    name: "Nghiệp vụ nhân viên",
    icon: <OilStaffIcon />,
    sections: [
      {
        title: "Vận hành ca",
        items: [
          {
            id: "staff-dashboard",
            name: "Màn hình làm việc",
            path: "/",
            componentKey: "StaffDashboard",
            icon: null,
          },
          {
            id: "staff-checklist",
            name: "Checklist đầu ca",
            path: "/calendar",
            componentKey: "StaffTasks",
            icon: null,
          },
          {
            id: "staff-report",
            name: "Nhật ký cuối ca",
            path: "/basic-tables",
            componentKey: "StaffTasks",
            icon: null,
          },
        ],
      },
    ],
  },
  {
    id: "module-goods",
    name: "Hàng hóa tại cột bơm",
    icon: <OilCarIcon />,
    sections: [
      {
        title: "Tác vụ nhanh",
        items: [
          {
            id: "staff-goods-receive",
            name: "Ghi nhận nhập hàng",
            path: "/basic-tables",
            componentKey: "StaffTasks",
            icon: null,
          },
        ],
      },
    ],
  },
];

export const ROLE_MODULES: Record<UserRole, Module[]> = {
  nhan_vien: staffModules,
  ca_truong: shiftLeadModules,
  cua_hang_truong: managerModules,
};

export const getModulesByRole = (role?: UserRole): Module[] => {
  if (!role) return ROLE_MODULES.cua_hang_truong;
  return ROLE_MODULES[role];
};

const findFirstItem = (items: MenuItem[]): MenuItem | null => {
  for (const item of items) {
    if (item.subItems?.length) {
      const nestedFirst = findFirstItem(item.subItems);
      if (nestedFirst) return nestedFirst;
      continue;
    }

    if (item.path) return item;
  }

  return null;
};

export const getDefaultMenuItemByRole = (role?: UserRole): MenuItem => {
  const modules = getModulesByRole(role);

  for (const moduleItem of modules) {
    for (const section of moduleItem.sections) {
      const firstItem = findFirstItem(section.items);
      if (firstItem) return firstItem;
    }
  }

  return {
    id: "fallback-dashboard",
    name: "Dashboard",
    path: "/",
    componentKey: "Dashboard",
  };
};

// Re-export for compatibility
export const modules = managerModules;
export const navItems = managerModules[0].sections[0].items;
export const othersItems = managerModules[0].sections[0].items;
