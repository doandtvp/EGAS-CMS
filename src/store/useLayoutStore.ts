import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Tab {
  id: string;
  title: string;
  path: string;
  componentKey: string;
}

interface LayoutState {
  // Sidebar Slice
  sidebarMode: "slim" | "mega" | "vertical";
  isMobileOpen: boolean;
  isHovered: boolean;
  activeModuleId: string;
  prevExpandedMode: "mega" | "vertical";
  
  toggleSidebar: () => void;
  toggleSlimMode: () => void;
  toggleMobileSidebar: () => void;
  setIsHovered: (isHovered: boolean) => void;
  setActiveModule: (id: string) => void;
  setSidebarMode: (mode: "slim" | "mega" | "vertical") => void;

  // Tab Slice
  openTabs: Tab[];
  activeTabId: string | null;
  
  addTab: (tab: Tab) => void;
  removeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  closeOtherTabs: (id: string) => void;
  closeAllTabs: () => void;
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      // Sidebar initial state
      sidebarMode: "mega",
      isMobileOpen: false,
      isHovered: false,
      activeModuleId: "module-shift",
      prevExpandedMode: "mega",

      toggleSidebar: () => set((state) => {
        if (state.sidebarMode === "slim") {
          return { sidebarMode: state.prevExpandedMode };
        }
        const newMode = state.sidebarMode === "mega" ? "vertical" : "mega";
        return { 
          sidebarMode: newMode,
          prevExpandedMode: newMode
        };
      }),
      
      toggleSlimMode: () => set((state) => {
        if (state.sidebarMode === "slim") {
          return { sidebarMode: state.prevExpandedMode };
        } else {
          return { 
            prevExpandedMode: state.sidebarMode,
            sidebarMode: "slim" 
          };
        }
      }),
      
      toggleMobileSidebar: () => set((state) => ({ isMobileOpen: !state.isMobileOpen })),
      setIsHovered: (isHovered) => set({ isHovered }),
      setActiveModule: (id) => set({ activeModuleId: id }),
      setSidebarMode: (mode) => set((state) => ({ 
        sidebarMode: mode,
        prevExpandedMode: mode !== "slim" ? mode : state.prevExpandedMode
      })),

      // Tab initial state
      openTabs: [
        { id: "shift-measure", title: "Số đo bể đầu ca", path: "/", componentKey: "Dashboard" }
      ],
      activeTabId: "shift-measure",

      addTab: (tab) =>
        set((state) => {
          const existsIdx = state.openTabs.findIndex((t) => t.id === tab.id);
          if (existsIdx !== -1) {
            const newTabs = [...state.openTabs];
            // Update existing tab data if it changed
            newTabs[existsIdx] = { ...newTabs[existsIdx], ...tab };
            return { 
              openTabs: newTabs,
              activeTabId: tab.id 
            };
          }
          return {
            openTabs: [...state.openTabs, tab],
            activeTabId: tab.id,
          };
        }),

      removeTab: (id) =>
        set((state) => {
          const newTabs = state.openTabs.filter((t) => t.id !== id);
          let newActiveId = state.activeTabId;
          
          if (state.activeTabId === id) {
            newActiveId = newTabs.length > 0 ? newTabs[newTabs.length - 1].id : null;
          }
          
          return {
            openTabs: newTabs,
            activeTabId: newActiveId,
          };
        }),

      setActiveTab: (id) => set({ activeTabId: id }),

      closeOtherTabs: (id) =>
        set((state) => ({
          openTabs: state.openTabs.filter((t) => t.id === id),
          activeTabId: id,
        })),

      closeAllTabs: () =>
        set({
          openTabs: [],
          activeTabId: null,
        }),
    }),
    {
      name: "layout-storage",
      partialize: (state) => ({
        openTabs: state.openTabs,
        activeTabId: state.activeTabId,
        sidebarMode: state.sidebarMode,
        prevExpandedMode: state.prevExpandedMode,
        activeModuleId: state.activeModuleId,
      }),
    }
  )
);
