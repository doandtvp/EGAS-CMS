"use client";
import React, { createContext, useContext } from "react";
import { cn } from "@/utils";
import Button from "@/components/common/Button";
import Badge from "@/components/ui/badge/Badge";

interface TabsContextProps {
  activeTab: string;
  onChange: (id: string) => void;
  variant: "pill" | "underline";
}

const TabsContext = createContext<TabsContextProps | undefined>(undefined);

interface TabsProps {
  value: string;
  onChange: (id: string) => void;
  children: React.ReactNode;
  variant?: "pill" | "underline";
  className?: string;
}

export function Tabs({ value, onChange, children, variant = "pill", className }: TabsProps) {
  return (
    <TabsContext.Provider value={{ activeTab: value, onChange, variant }}>
      <div className={cn(className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-end gap-3 h-12 overflow-x-auto no-scrollbar whitespace-nowrap",
        className
      )}
    >
      {children}
    </div>
  );
}

interface TabProps {
  value: string;
  label: string;
  count?: number;
  className?: string;
  badgeClassName?: string;
}

export function Tab({ value, label, count, className, badgeClassName }: TabProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tab must be used within Tabs");

  const { activeTab, onChange, variant } = context;
  const isActive = activeTab === value;

  return (
    <Button
      onClick={() => onChange(value)}
      variant="ghost"
      className={cn(
        "transition-all flex items-center gap-2 border shadow-none active:scale-100 flex-shrink-0 whitespace-nowrap",
        variant === "pill" && [
          "h-10 px-5 rounded-t-xl rounded-b-none text-theme-sm font-bold border-b-0",
          isActive
            ? "h-12 bg-white border-orange-200 border-b-white text-orange-500 z-10 cursor-default hover:bg-white hover:text-orange-500"
            : "bg-[#F8F9FB] border-gray-200 text-grayscale-40 hover:bg-gray-50 hover:text-grayscale-50 font-normal",
        ],
        variant === "underline" && [
          "h-auto pb-3.5 px-0 rounded-none border-0 text-theme-sm font-bold bg-transparent relative active:scale-100",
          isActive
            ? "text-brand-500 cursor-default hover:bg-transparent hover:text-brand-500"
            : "text-grayscale-40 hover:text-grayscale-50 hover:bg-transparent",
        ],
        className
      )}
    >
      {label}
      {count !== undefined && (
        <Badge
          size="sm"
          className={cn(
            "min-w-[24px] h-[24px] p-0 font-normal",
            badgeClassName ||
              (variant === "pill"
                ? "bg-gray-100 text-grayscale-40"
                : isActive
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-grayscale-40")
          )}
        >
          {count}
        </Badge>
      )}
      {variant === "underline" && isActive && (
        <span className="absolute bottom-0 left-0 right-0 h-1 bg-brand-500 rounded-t-full shadow-custom-blue"></span>
      )}
    </Button>
  );
}

export function TabPanel({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabPanel must be used within Tabs");

  const { activeTab } = context;

  if (activeTab !== value) return null;

  return <div className={cn("animate-in fade-in duration-300", className)}>{children}</div>;
}
