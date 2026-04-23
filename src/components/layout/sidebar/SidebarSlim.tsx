"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Module } from "@/layout/menu-config";
import SidebarTooltip from "./SidebarTooltip";
import { cn } from "@/utils";

interface SidebarSlimProps {
  modules: Module[];
  activeModuleId: string;
  setActiveModule: (id: string) => void;
  isMobileOpen: boolean;
}

const SidebarSlim: React.FC<SidebarSlimProps> = ({
  modules,
  activeModuleId,
  setActiveModule,
  isMobileOpen,
}) => {
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-50 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex transition-all duration-300 ease-in-out w-[64px]",
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <div className="w-full flex flex-col items-center py-4 gap-4">
        <Link href="/" className="mb-4">
          <Image src="/images/logo/egas-logo.svg" alt="Logo" width={24} height={24} />
        </Link>

        <div className="flex flex-col gap-4">
          {modules.map((module) => (
            <SidebarTooltip key={module.id} text={module.name}>
              <button
                onClick={() => setActiveModule(module.id)}
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group relative",
                  activeModuleId === module.id
                    ? "bg-brand-50 text-brand-500 dark:bg-brand-900/20 dark:text-brand-400 shadow-sm opacity-100"
                    : "text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-600 opacity-40 hover:opacity-100"
                )}
              >
                <div
                  className={cn(
                    activeModuleId === module.id
                      ? "scale-110 text-brand-500 fill-brand-500"
                      : "group-hover:scale-110 transition-transform"
                  )}
                >
                  {module.icon}
                </div>
              </button>
            </SidebarTooltip>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SidebarSlim;
