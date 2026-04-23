"use client";
import React, { useRef, useEffect, useState } from "react";
import { useLayoutStore } from "@/store/useLayoutStore";
import { CloseIcon, MoreTabsIcon } from "@/icons";
import { cn } from "@/utils";

const TabBar: React.FC = () => {
  const { openTabs, activeTabId, setActiveTab, removeTab } = useLayoutStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hiddenTabIds, setHiddenTabIds] = useState<string[]>([]);
  
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Function to check which tabs are overflowing/hidden
  const checkOverflow = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const containerRect = container.getBoundingClientRect();
    const tabElements = container.querySelectorAll("[data-tab-id]");
    
    const hiddenIds: string[] = [];
    
    tabElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const tabId = el.getAttribute("data-tab-id");
      
      // A tab is hidden if its left or right boundary is outside the container view
      const isVisible = 
        rect.left >= containerRect.left - 2 && 
        rect.right <= containerRect.right + 2;
        
      if (!isVisible && tabId) {
        hiddenIds.push(tabId);
      }
    });
    
    setHiddenTabIds(hiddenIds);
  };

  // Handle horizontal scroll with mouse wheel
  const handleWheel = (e: React.WheelEvent) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += e.deltaY;
      checkOverflow();
    }
  };

  // Drag to scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    checkOverflow();
  };

  // Listen for scroll, resize, and tab changes
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const frameId = requestAnimationFrame(() => {
      checkOverflow();
    });

    const handleScroll = () => checkOverflow();
    window.addEventListener("resize", checkOverflow);
    container.addEventListener("scroll", handleScroll);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", checkOverflow);
      container.removeEventListener("scroll", handleScroll);
    };
  }, [openTabs.length]);

  // Scroll to active tab when it changes
  useEffect(() => {
    if (activeTabId && scrollContainerRef.current) {
      const activeTabElement = scrollContainerRef.current.querySelector(
        `[data-tab-id="${activeTabId}"]`
      );
      if (activeTabElement) {
        activeTabElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
        setTimeout(checkOverflow, 400);
      }
    }
  }, [activeTabId]);

  const hiddenTabs = openTabs.filter(tab => hiddenTabIds.includes(tab.id));

  if (openTabs.length === 0) return null;

  return (
    <div className="bg-gray-bg sticky top-[54px] h-9 z-40 w-full border-b border-gray-200 dark:border-gray-800 shadow-sm flex items-center px-4">
      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={cn(
          "flex-1 flex items-center overflow-x-auto no-scrollbar gap-1 min-w-0",
          isDragging ? "cursor-grabbing select-none" : "cursor-grab"
        )}
      >
        {openTabs.map((tab) => (
          <div
            key={tab.id}
            data-tab-id={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "inline-flex items-center group relative h-9 px-4 cursor-pointer transition-all duration-200 whitespace-nowrap text-sm font-medium",
              activeTabId === tab.id
                ? "text-brand-500 dark:text-brand-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            )}
          >
            {tab.title}
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeTab(tab.id);
              }}
              className={cn(
                "ml-2.5 p-0.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-red-500 transition-colors opacity-100 lg:group-hover:opacity-100",
                activeTabId === tab.id
                  ? "text-brand-500 dark:text-brand-400 lg:opacity-100"
                  : "text-gray-400 lg:opacity-0"
              )}
            >
              <CloseIcon className="w-4 h-4" />
            </button>
            
            {/* Active Indicator Underline */}
            {activeTabId === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 animate-in fade-in slide-in-from-bottom-1 duration-300"></div>
            )}
          </div>
        ))}
      </div>

      {/* Overflow / More Dropdown */}
      <div className="relative ml-2 pl-2 dark:border-gray-800 flex items-center h-full flex-shrink-0 cursor-pointer">
        {hiddenTabs.length > 0 && (
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className={cn("cursor-pointer transition-transform duration-200", showDropdown && "rotate-90")}
          >
            <MoreTabsIcon/>
          </button>
        )}

        {showDropdown && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setShowDropdown(false)}
            ></div>
            <div className="absolute right-0 top-full mt-1 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-20 py-2 animate-in fade-in zoom-in-95 duration-200">
              <div className="px-4 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 dark:border-gray-800 mb-1">
                More Tabs ({hiddenTabs.length})
              </div>
              <div className="max-h-80 overflow-y-auto custom-scrollbar">
                {hiddenTabs.map((tab) => (
                  <div
                    key={tab.id}
                    className={cn(
                      "group w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-brand-50 dark:hover:bg-brand-900/20 cursor-pointer transition-colors",
                      activeTabId === tab.id ? "bg-brand-50/50 text-brand-500 font-semibold" : "text-gray-700 dark:text-gray-300"
                    )}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setShowDropdown(false);
                    }}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {activeTabId === tab.id && (
                         <div className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0"></div>
                      )}
                      <span className="truncate">{tab.title}</span>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTab(tab.id);
                        if (hiddenTabs.length <= 1) setShowDropdown(false);
                      }}
                      className="p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-white dark:hover:bg-gray-700 text-gray-400 hover:text-red-500 transition-all"
                    >
                      <CloseIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TabBar;
