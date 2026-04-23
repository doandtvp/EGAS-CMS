"use client";

import React from "react";
import Image from "next/image";
import HeaderActions from "@/components/layout/header/HeaderActions";
import UserProfileSection from "@/components/layout/header/UserProfileSection";
import { BoxIconLine, DocsIcon, PlugInIcon, BeforePaymentIcon, AfterPaymentIcon } from "@/icons";
import BeforePaymentPanel from "./components/BeforePaymentPanel";
import AfterPaymentPanel from "./components/AfterPaymentPanel";
import NoLiterPanel from "./components/NoLiterPanel";
import OtherGoodsPanel from "./components/OtherGoodsPanel";
import ServicePanel from "./components/ServicePanel";

type StaffNavItem = {
  id: string;
  label: string;
  subLabel: string;
  icon: React.ReactNode;
};

const STAFF_NAV_ITEMS: StaffNavItem[] = [
  {
    id: "before-payment",
    label: "Bơm trước",
    subLabel: "thanh toán sau",
    icon: <BeforePaymentIcon />,
  },
  {
    id: "after-payment",
    label: "Thanh toán",
    subLabel: "trước bơm sau",
    icon: <AfterPaymentIcon />,
  },
  {
    id: "noliter",
    label: "Bán hàng",
    subLabel: "không log bơm",
    icon: <BoxIconLine />,
  },
  {
    id: "other",
    label: "Bán hàng",
    subLabel: "hóa khác",
    icon: <DocsIcon />,
  },
  {
    id: "service",
    label: "Bán dịch vụ",
    subLabel: "",
    icon: <PlugInIcon />,
  }, 
];

const tabs = ["Giao dich 1", "Giao dich 2"];

export default function StaffConsole() {
  const [activeNav, setActiveNav] = React.useState(STAFF_NAV_ITEMS[0].id);
  const [activeTab, setActiveTab] = React.useState(tabs[0]);

  const renderActivePanel = () => {
    switch (activeNav) {
      case "before-payment":
        return <BeforePaymentPanel activeTab={activeTab} onTabChange={setActiveTab} />;
      case "after-payment":
        return <AfterPaymentPanel />;
      case "noliter":
        return <NoLiterPanel />;
      case "other":
        return <OtherGoodsPanel />;
      case "service":
        return <ServicePanel />;
      default:
        return <BeforePaymentPanel activeTab={activeTab} onTabChange={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#ECEEF2]">
      <header className="h-16 border-b border-gray-300 bg-white px-3 flex items-center justify-between">
        <div className="flex items-center gap-5 text-[12px] text-gray-600">
          <div className="flex items-center gap-2">
            <Image src="/images/logo/egas-logo.svg" alt="EGAS" width={18} height={18} />
            <span className="text-[30px] font-bold text-[#1E7FD8] leading-none tracking-tight">EGAS</span>
          </div>
          <span>Cua hang: 211001</span>
          <span>Diem ban: so 1</span>
          <span>Ca: 25090403</span>
        </div>
        <div className="flex items-center gap-1">
          <HeaderActions />
          <UserProfileSection />
        </div>
      </header>

      <div className="flex h-[calc(100vh-40px)]">
        <aside className="w-[126px] border-r border-gray-300 bg-[#F5F6F8] p-2">
          <div className="space-y-2">
            {STAFF_NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full rounded-xl px-1 py-3 text-center text-[11px] leading-4 transition ${
                  activeNav === item.id
                    ? "bg-[#2F92E8] text-white shadow-sm"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-[#2F92E8]/50"
                }`}
              >
                <div className="mb-1 flex justify-center">
                  <span
                    className={`flex h-5 w-5 items-center justify-center ${
                      activeNav === item.id ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {item.icon}
                  </span>
                </div>
                <div className="font-semibold">{item.label}</div>
                {item.subLabel && <div>{item.subLabel}</div>}
              </button>
            ))}
          </div>
        </aside>

        <main className="flex-1 p-2">
          {renderActivePanel()}
        </main>
      </div>
    </div>
  );
}
