"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutStore } from "@/store/useLayoutStore";
import { getModulesByRole, MenuItem } from "@/layout/menu-config";
import { MenuIcon } from "@/icons";
import { useAuthStore } from "@/store/useAuthStore";

const Breadcrumbs: React.FC = () => {
  const pathname = usePathname();
  const { openTabs, activeTabId, toggleSlimMode } = useLayoutStore();
  const userRole = useAuthStore((state) => state.user?.role);
  const modules = getModulesByRole(userRole);
  const activeTab = openTabs.find(t => t.id === activeTabId);

  // Dynamic breadcrumb generation by tracing hierarchy
  const generateBreadcrumbs = () => {
    const crumbs: { name: string; path: string }[] = [];
    const sourcePath = activeTab?.path || pathname;
    
    const findPathRecursive = (items: MenuItem[], targetPath: string, currentCrumbs: { name: string; path: string }[]): boolean => {
      for (const item of items) {
        const itemCrumbs = [...currentCrumbs, { name: item.name, path: item.path || "#" }];
        if (item.path === targetPath) {
          crumbs.push(...itemCrumbs);
          return true;
        }
        if (item.subItems) {
          if (findPathRecursive(item.subItems, targetPath, itemCrumbs)) return true;
        }
      }
      return false;
    };

    for (const mod of modules) {
      const moduleName = mod.name;
      const moduleCrumb = { name: moduleName, path: "#" };
      for (const section of mod.sections) {
        if (findPathRecursive(section.items, sourcePath, [moduleCrumb])) {
          // Remove duplicate root names if they appear consecutively (e.g. Dashboard / Dashboard)
          if (crumbs.length > 1 && crumbs[0].name === crumbs[1].name) {
            return crumbs.slice(1);
          }
          return crumbs;
        }
      }
    }

    // Fallback if not found in menu (e.g. dynamic segments or 404)
    const paths = sourcePath.split("/").filter(Boolean);
    let currentPath = "";
    paths.forEach((segment) => {
      currentPath += `/${segment}`;
      crumbs.push({ 
        name: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "), 
        path: currentPath 
      });
    });

    return crumbs.length > 0 ? crumbs : [{ name: "Dashboard", path: "/" }];
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav className="hidden lg:flex items-center text-sm font-medium">
      <button 
        onClick={toggleSlimMode}
        className="text-gray-400 mr-2 flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors"
      >
        <MenuIcon className="w-6 h-6" />
      </button>
      {breadcrumbs.map((item, index) => (
        <React.Fragment key={index}>
          <Link 
            href={item.path} 
            className={`transition-colors flex items-center ${index === breadcrumbs.length - 1 ? "text-brand-500 font-bold" : "text-gray-500 hover:text-brand-500"}`}
          >
            {item.name}
          </Link>
          {index < breadcrumbs.length - 1 && (
            <span className="mx-2 text-gray-300 font-normal">/</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
