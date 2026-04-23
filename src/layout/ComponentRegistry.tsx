import dynamic from "next/dynamic";
import React from "react";

// Dynamically import page components to keep the bundle size small
const Dashboard = dynamic(() => import("../app/(admin)/page"), { ssr: false });
const Calendar = dynamic(() => import("../app/(admin)/(others-pages)/calendar/page"), { ssr: false });
const Profile = dynamic(() => import("../app/(admin)/(others-pages)/profile/page"), { ssr: false });

// Grouped pages
const FormElements = dynamic(() => import("../app/(admin)/(others-pages)/(forms)/form-elements/page"), { ssr: false });
const BasicTables = dynamic(() => import("../app/(admin)/(others-pages)/(tables)/basic-tables/page"), { ssr: false });

// UI Elements
const Alerts = dynamic(() => import("../app/(admin)/(ui-elements)/alerts/page"), { ssr: false });
const Avatars = dynamic(() => import("../app/(admin)/(ui-elements)/avatars/page"), { ssr: false });
const Badges = dynamic(() => import("../app/(admin)/(ui-elements)/badge/page"), { ssr: false });
const Buttons = dynamic(() => import("../app/(admin)/(ui-elements)/buttons/page"), { ssr: false });

// Charts
const LineChart = dynamic(() => import("../app/(admin)/(others-pages)/(chart)/line-chart/page"), { ssr: false });
const BarChart = dynamic(() => import("../app/(admin)/(others-pages)/(chart)/bar-chart/page"), { ssr: false });

const Blank = dynamic(() => import("../app/(admin)/(others-pages)/blank/page"), { ssr: false });
const GoodsImport = dynamic(() => import("../components/goods/ImportGoodsList"), { ssr: false });
const StaffDashboard = dynamic(() => import("../components/role-views/StaffDashboard"), { ssr: false });
const ShiftLeadDashboard = dynamic(() => import("../components/role-views/ShiftLeadDashboard"), {
  ssr: false,
});
const StaffTasks = dynamic(() => import("../components/role-views/StaffTasks"), { ssr: false });
const ShiftLeadTasks = dynamic(() => import("../components/role-views/ShiftLeadTasks"), {
  ssr: false,
});
const POSSalesShiftReport = dynamic(() => import("../components/pos/POSSalesShiftReport"), { ssr: false });

export const ComponentRegistry: Record<string, React.ComponentType<object>> = {
  Dashboard: Dashboard,
  Calendar: Calendar,
  Profile: Profile,
  FormElements: FormElements,
  BasicTables: BasicTables,
  Alerts: Alerts,
  Avatars: Avatars,
  Badges: Badges,
  Buttons: Buttons,
  LineChart: LineChart,
  BarChart: BarChart,
  Blank: Blank,
  GoodsImport: GoodsImport,
  StaffDashboard: StaffDashboard,
  ShiftLeadDashboard: ShiftLeadDashboard,
  StaffTasks: StaffTasks,
  ShiftLeadTasks: ShiftLeadTasks,
  POSSalesShiftReport: POSSalesShiftReport,
};

export const getComponent = (key: string) => {
  const Component = ComponentRegistry[key] || Blank;
  return <Component />;
};
