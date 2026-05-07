import dynamic from "next/dynamic";
import React from "react";

// Dynamically import page components to keep the bundle size small
const Dashboard = dynamic(() => import("../app/(admin)/page"), { ssr: false });

const Blank = dynamic(() => import("../app/(admin)/(others-pages)/blank/page"), { ssr: false });
const GoodsImport = dynamic(() => import("../components/goods/ImportGoodsList"), { ssr: false });
const StaffDashboard = dynamic(() => import("../components/role-views/StaffDashboard"), {
  ssr: false,
});
const ShiftLeadDashboard = dynamic(() => import("../components/role-views/ShiftLeadDashboard"), {
  ssr: false,
});
const StaffTasks = dynamic(() => import("../components/role-views/StaffTasks"), { ssr: false });
const ShiftLeadTasks = dynamic(() => import("../components/role-views/ShiftLeadTasks"), {
  ssr: false,
});
const POSSalesShiftReport = dynamic(() => import("../components/pos/POSSalesShiftReport"), {
  ssr: false,
});
const MailInbox = dynamic(() => import("../components/mail/MailInbox"), { ssr: false });
const POSShiftCategory = dynamic(() => import("../components/pos/POSShiftCategory"), {
  ssr: false,
});
const GoodsIndustry = dynamic(() => import("../components/goods/GoodsIndustry"), { ssr: false });

export const ComponentRegistry: Record<string, React.ComponentType<object>> = {
  Dashboard: Dashboard,
  Blank: Blank,
  GoodsImport: GoodsImport,
  StaffDashboard: StaffDashboard,
  ShiftLeadDashboard: ShiftLeadDashboard,
  StaffTasks: StaffTasks,
  ShiftLeadTasks: ShiftLeadTasks,
  POSSalesShiftReport: POSSalesShiftReport,
  MailInbox: MailInbox,
  POSShiftCategory: POSShiftCategory,
  GoodsIndustry: GoodsIndustry,
};

export const getComponent = (key: string) => {
  const Component = ComponentRegistry[key] || Blank;
  return <Component />;
};
