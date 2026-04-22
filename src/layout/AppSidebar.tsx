"use client";
import React, { useState } from "react";
import { useLayoutStore } from "../store/useLayoutStore";
import { getModulesByRole, MenuItem } from "./menu-config";
import { useAuthStore } from "@/store/useAuthStore";

// Modular Components
import SidebarSlim from "../components/layout/sidebar/SidebarSlim";
import SidebarVertical from "../components/layout/sidebar/SidebarVertical";
import SidebarMega from "../components/layout/sidebar/SidebarMega";

const AppSidebar: React.FC = () => {
  const {
    sidebarMode,
    isMobileOpen,
    activeTabId,
    addTab,
    activeModuleId,
    setActiveModule,
    toggleSidebar
  } = useLayoutStore();
  const userRole = useAuthStore((state) => state.user?.role);
  const modules = getModulesByRole(userRole);

  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const activeModule = modules.find(m => m.id === activeModuleId) || modules[0];

  React.useEffect(() => {
    if (!modules.some((module) => module.id === activeModuleId) && modules[0]) {
      setActiveModule(modules[0].id);
    }
  }, [activeModuleId, modules, setActiveModule]);

  // Sync activeModuleId with activeTabId
  React.useEffect(() => {
    if (activeTabId) {
      const moduleContainingTab = modules.find(m => 
        m.sections.some(s => 
          s.items.some(i => 
            i.id === activeTabId || (i.subItems && i.subItems.some(sub => sub.id === activeTabId))
          )
        )
      );
      if (moduleContainingTab && moduleContainingTab.id !== activeModuleId) {
        setActiveModule(moduleContainingTab.id);
      }
    }
  }, [activeTabId, activeModuleId, modules, setActiveModule]);

  const toggleMenu = (id: string) => {
    setOpenMenus((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.subItems) {
      toggleMenu(item.id);
    } else if (item.path) {
      addTab({
        id: item.id,
        title: item.name,
        path: item.path,
        componentKey: item.componentKey || "Blank",
      });
    }
  };

  const handleModuleClick = (id: string) => {
    setActiveModule(id);
    
    // Auto-select first item
    const targetModule = modules.find(m => m.id === id);
    if (targetModule) {
      const firstSection = targetModule.sections.find(s => s.items.length > 0);
      if (firstSection) {
        const firstItem = firstSection.items[0];
        const itemToActivate = (firstItem.subItems && firstItem.subItems.length > 0)
          ? firstItem.subItems[0]
          : firstItem;
        
        handleItemClick(itemToActivate);
      }
    }
  };

  const isItemActive = (item: MenuItem): boolean => {
    if (activeTabId === item.id) return true;
    if (item.subItems) {
      return item.subItems.some((sub) => isItemActive(sub));
    }
    return false;
  };

  // Shared props used by mode components
  const commonProps = {
    modules,
    activeModuleId,
    isMobileOpen,
    openMenus,
    activeTabId,
    toggleMenu,
    toggleSidebar,
    onItemClick: handleItemClick,
    isItemActive,
  };

  if (sidebarMode === "slim") {
    return (
      <SidebarSlim 
        modules={modules}
        activeModuleId={activeModuleId}
        setActiveModule={handleModuleClick}
        isMobileOpen={isMobileOpen}
      />
    );
  }
  
  if (sidebarMode === "mega") {
    return (
      <SidebarMega 
        {...commonProps}
        activeModule={activeModule}
        setActiveModule={handleModuleClick}
      />
    );
  }

  // Default: Vertical Mode
  return (
    <SidebarVertical 
      {...commonProps}
    />
  );
};

export default AppSidebar;
