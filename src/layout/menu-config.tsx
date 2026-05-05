import React from "react";
import {
  OilStaffIcon,
  OilCarIcon,
  ShiftLeadIcon,
  CategoryIcon,
  PieChartIcon,
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

//Nhân viên
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

//Cửa hàng trưởng
const managerModules: Module[] = [
  {
    id: "module-dashboard",
    name: "Quản lý ca bể chứa",
    icon: <OilStaffIcon />,
    sections: [
      {
        title: "Tổng quan",
        items: [
          {
            id: "shift-measure",
            name: "Số đo bể đầu ca",
            path: "/shift-measure",
            componentKey: "Dashboard",
            icon: null,
          },
        ],
      },
    ],
  },
  {
    id: "module-category",
    name: "Danh mục",
    icon: <CategoryIcon />,
    sections: [
      {
        title: "Quản lý danh mục",
        items: [
          {
            id: "shift-category",
            name: "Nhóm hàng hóa",
            path: "/pos-shift-category",
            componentKey: "POSShiftCategory",
            icon: null,
          },
          {
            id: "goods-industry",
            name: "Hàng hoá - toàn ngành",
            path: "/goods-industry",
            componentKey: "GoodsIndustry",
            icon: null,
          },
        ],
      },
    ],
  },
  {
    id: "module-goods-import",
    name: "Hàng hoá",
    icon: <OilCarIcon />,
    sections: [
      {
        title: "Nhập hàng",
        items: [
          {
            id: "goods-receive",
            name: "Nhập hàng vào bể (XDS)",
            path: "/goods-receive",
            componentKey: "GoodsImport",
            icon: null,
          },
        ],
      },
    ],
  },
  {
    id: "module-reports",
    name: "Báo cáo",
    icon: <PieChartIcon />,
    sections: [
      {
        title: "Thống kê",
        items: [
          {
            id: "shift-report",
            name: "Báo cáo nhanh",
            path: "/pos-report",
            componentKey: "POSSalesShiftReport",
            icon: null,
          },
        ],
      },
    ],
  },
];

//Ca trưởng
const shiftLeadModules: Module[] = [
  {
    id: "module-shift",
    name: "Ca trưởng",
    icon: <ShiftLeadIcon />,
    sections: [
      {
        title: "Nghiệp vụ ca trưởng",
        items: [
          {
            id: "shift-lead-overview",
            name: "Tổng quan báo cáo",
            path: "/",
            componentKey: "ShiftLeadDashboard",
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
