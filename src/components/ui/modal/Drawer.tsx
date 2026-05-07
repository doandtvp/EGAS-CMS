"use client";
import React, { useEffect } from "react";
import { cn } from "@/utils";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  width?: string;
  top?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  className,
  width = "w-full sm:w-[500px] md:w-[600px] lg:w-[800px] xl:w-[1000px]",
  top = "0px",
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div className={cn("fixed inset-0 z-999 invisible", isOpen && "visible")}>
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity duration-300 opacity-0",
          isOpen && "opacity-100"
        )}
        onClick={onClose}
      />
      
      {/* Content */}
      <div
        className={cn(
          "absolute right-0 bg-white dark:bg-gray-900 shadow-2xl transition-transform duration-300 transform translate-x-full flex flex-col",
          width,
          isOpen && "translate-x-0",
          className
        )}
        style={{ 
          top: top, 
          height: `calc(100vh - ${top})` 
        }}
      >
        {children}
      </div>
    </div>
  );
};
