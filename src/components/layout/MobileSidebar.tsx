"use client";
import React from "react";
import { useLayoutStore } from "@/store/useLayoutStore";
import { getModulesByRole, MenuItem } from "@/layout/menu-config";
import { CloseIcon, ChevronDownIcon } from "@/icons";
import Image from "next/image";
import { useAuthStore } from "@/store/useAuthStore";

const MobileSidebar: React.FC = () => {
  const {
    isMobileOpen,
    toggleMobileSidebar,
    activeModuleId,
    setActiveModule,
    activeTabId,
    addTab,
  } = useLayoutStore();
  const user = useAuthStore((state) => state.user);
  const userRole = user?.role;
  const modules = React.useMemo(() => getModulesByRole(userRole), [userRole]);

  const [expandedMenus, setExpandedMenus] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!modules.some((module) => module.id === activeModuleId) && modules[0]) {
      setActiveModule(modules[0].id);
    }
  }, [activeModuleId, modules, setActiveModule]);

  if (!isMobileOpen) return null;

  const activeModule = modules.find((m) => m.id === activeModuleId) || modules[0];

  const handleItemClick = (item: MenuItem) => {
    if (item.subItems) {
      setExpandedMenus((prev) =>
        prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id]
      );
    } else if (item.path) {
      addTab({
        id: item.id,
        title: item.name,
        path: item.path,
        componentKey: item.componentKey || "Blank",
      });
      toggleMobileSidebar();
    }
  };

  const handleModuleClick = (modId: string) => {
    setActiveModule(modId);
    setExpandedMenus([]);

    // Auto-select first item of the module (same as AppSidebar's handleModuleClick)
    // This keeps activeTabId in sync so AppSidebar's sync effect doesn't fight back
    const targetModule = modules.find((m) => m.id === modId);
    if (targetModule) {
      const firstSection = targetModule.sections.find((s) => s.items.length > 0);
      if (firstSection) {
        const firstItem = firstSection.items[0];
        const itemToActivate =
          firstItem.subItems && firstItem.subItems.length > 0
            ? firstItem.subItems[0]
            : firstItem;

        if (itemToActivate.path) {
          addTab({
            id: itemToActivate.id,
            title: itemToActivate.name,
            path: itemToActivate.path,
            componentKey: itemToActivate.componentKey || "Blank",
          });
        }
      }
    }
  };

  const isExpanded = (id: string) => expandedMenus.includes(id);

  return (
    <div className="lg:hidden">
      {/* Backdrop - Separate fixed element */}
      <div
        className={`fixed inset-0 z-[60] bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300 ${isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={toggleMobileSidebar}
      ></div>

      {/* Drawer Content - Separate fixed element */}
      <div
        className={`fixed top-0 left-0 bottom-0 h-full w-[85%] max-w-[300px] z-[70] bg-white shadow-2xl flex flex-col transition-transform duration-300 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="h-[60px] flex items-center justify-between px-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo/egas-logo.svg"
              alt="EGAS Logo"
              width={110}
              height={32}
              className="h-8 w-auto"
            />
            <span className="text-gray-900 text-base font-bold">EGAS</span>
          </div>
          <button
            onClick={toggleMobileSidebar}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <CloseIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content Area (Two Columns) */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Column: Modules */}
          <div className="w-[72px] bg-gray-50/50 border-r border-gray-100 flex flex-col items-center py-4 gap-4 overflow-y-auto no-scrollbar shrink-0">
            {modules.map((mod) => (
              <button
                key={mod.id}
                type="button"
                onClick={() => handleModuleClick(mod.id)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all shrink-0 cursor-pointer ${
                  activeModuleId === mod.id
                    ? "bg-brand-50 text-brand-500 border border-brand-200"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <span className="w-6 h-6 pointer-events-none">{mod.icon}</span>
              </button>
            ))}
          </div>

          {/* Right Column: Menu Items */}
          <div className="flex-1 bg-white overflow-y-auto no-scrollbar py-4 px-3 flex flex-col gap-6">
            {activeModule.sections.map((section, sIdx) => (
              <div key={sIdx}>
                <h4 className="px-3 mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                  {section.title}
                </h4>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <div key={item.id} className="space-y-0.5">
                      <button
                        onClick={() => handleItemClick(item)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold transition-all ${
                          activeTabId === item.id ||
                          (item.subItems && item.subItems.some((s) => s.id === activeTabId))
                            ? "bg-brand-50 text-brand-500"
                            : "text-gray-600 hover:bg-brand-50 hover:text-brand-500"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          {item.icon && (
                            <span className="w-5 h-5 flex items-center justify-center opacity-80">
                              {item.icon}
                            </span>
                          )}
                          {item.name}
                        </span>
                        {item.subItems && (
                          <ChevronDownIcon
                            className={`w-4 h-4 transition-transform duration-300 ${isExpanded(item.id) ? "rotate-180" : ""}`}
                          />
                        )}
                      </button>

                      {/* Sub-items with Collapse Animation */}
                      {item.subItems && (
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded(item.id) ? "max-h-[500px] opacity-100 mt-1" : "max-h-0 opacity-0"}`}
                        >
                          <div className="ml-5 pl-2 border-l-2 border-gray-100 flex flex-col gap-1 py-1">
                            {item.subItems.map((sub) => (
                              <button
                                key={sub.id}
                                onClick={() => handleItemClick(sub)}
                                className={`w-full text-left px-3 py-2 rounded-md text-[13px] font-medium transition-all ${
                                  activeTabId === sub.id
                                    ? "text-brand-500 bg-brand-50"
                                    : "text-gray-500 hover:text-brand-500"
                                }`}
                              >
                                {sub.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Area (Optional User Info) */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-white shadow-sm overflow-hidden shrink-0 bg-brand-100">
              <Image
                src={user?.avatarUrl || "/images/user/user-01.jpg"}
                alt="U"
                width={40}
                height={40}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-gray-800 leading-none">
                {user?.displayName || "Nguoi dung"}
              </span>
              <span className="text-[10px] text-gray-400 font-medium">
                ID: {user?.employeeCode || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
