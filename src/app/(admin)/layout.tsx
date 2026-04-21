"use client";

import React, { useEffect, useState, startTransition } from "react";
import { usePathname } from "next/navigation";
import { useLayoutStore } from "@/store/useLayoutStore";
import { modules, MenuItem } from "@/layout/menu-config";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import TabBar from "@/components/layout/TabBar";
import { getComponent } from "@/layout/ComponentRegistry";
import BottomNav from "@/components/layout/BottomNav";
import MobileSidebar from "@/components/layout/MobileSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sidebarMode, isMobileOpen, openTabs, activeTabId, addTab } = useLayoutStore();
  const [isHydrated, setIsHydrated] = useState(false);
  const pathname = usePathname();

  // Handle hydration only once on mount
  useEffect(() => {
    startTransition(() => {
      setIsHydrated(true);
    });
  }, []);

  // Sync initial URL to tab after hydration
  useEffect(() => {
    if (!isHydrated) return;

    const findItemByPath = (items: MenuItem[], path: string): MenuItem | null => {
      for (const item of items) {
        if (item.path === path) return item;
        if (item.subItems) {
          const sub = findItemByPath(item.subItems, path);
          if (sub) return sub;
        }
      }
      return null;
    };

    // Correctly flattened search across modules
    const allItems = modules.flatMap(m => m.sections.flatMap(s => s.items));
    const match = findItemByPath(allItems, pathname);
    if (match) {
      addTab({
        id: match.id,
        title: match.name,
        path: match.path!,
        componentKey: match.componentKey || "Blank",
      });
    }
  }, [pathname, addTab, isHydrated]);

  // Dynamic class for main content margin based on sidebar mode
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : sidebarMode === "mega"
    ? "lg:ml-[304px]"
    : sidebarMode === "slim"
    ? "lg:ml-[64px]"
    : "lg:ml-[304px]";

  // Get current active tab object
  const activeTab = isHydrated ? openTabs.find((t) => t.id === activeTabId) : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-300">
      <div className="min-h-screen relative flex flex-col">
        {/* Sidebar and Backdrop (Desktop) */}
        <div className="hidden lg:block">
          <AppSidebar />
          <Backdrop />
        </div>

        {/* Mobile Specific UI */}
        <MobileSidebar />
        
        {/* Main Content Area */}
        <div
          className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin} pb-[80px] lg:pb-0`}
        >
          {/* Header */}
          <AppHeader />
          
          {/* Tab Bar Container */}
          {isHydrated && openTabs.length > 0 && <TabBar />}

          {/* Page Content area */}
          <main className="p-4 mx-auto max-w-full md:p-6 min-h-[calc(100vh-140px)]">
            <div className="bg-white dark:bg-gray-900 rounded-3xl min-h-[inherit] shadow-theme-xl overflow-hidden animate-in fade-in zoom-in-95 duration-500 p-6">
              {isHydrated && activeTab ? (
                /* Dynamic Tab Content */
                getComponent(activeTab.componentKey)
              ) : (
                /* Initial/SSR children logic */
                <div className="p-6">{children}</div>
              )}
            </div>
          </main>
        </div>

        {/* Bottom Navigation (Mobile Only) */}
        <BottomNav />
      </div>
    </div>
  );
}
