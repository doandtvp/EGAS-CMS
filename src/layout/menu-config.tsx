import React from "react";
import {
  OilStaffIcon,
  OilCarIcon,
  CalenderIcon,
  ListIcon,
  TableIcon,
  PieChartIcon,
  BoxCubeIcon,
  PlugInIcon,
} from "../icons/index";

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

export const modules: Module[] = [
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
            path: "/calendar",
            componentKey: "Calendar",
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
  {
    id: "module-goods",
    name: "Quản lý Hàng hóa",
    icon: <OilCarIcon />,
    sections: [
      {
        title: "Nhập xuất kho",
        items: [
          {
            id: "goods-receive-xds",
            name: "Nhập hàng vào bể (XDS)",
            path: "/basic-tables",
            componentKey: "GoodsImport",
            icon: null
          },
          {
            id: "goods-receive-other",
            name: "Nhập hàng hóa khác",
            path: "/blank-3",
            componentKey: "Blank",
            icon: null
          },
          {
            id: "goods-promotion",
            name: "Nhập hàng khuyến mại",
            path: "/blank-4",
            componentKey: "Blank",
            icon: null
          },
        ]
      }
    ]
  },
];

// Re-export for compatibility
export const navItems = modules[0].sections[0].items;
export const othersItems = modules[0].sections[0].items;
