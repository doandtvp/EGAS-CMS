"use client";
import React from "react";
import { GasStationIcon, ChevronDownIcon } from "@/icons";

const PosSelector: React.FC = () => {
  return (
    <div className="hidden xl:flex items-center bg-white">
      <button className="min-w-[200px] flex items-center justify-between gap-2 px-2 py-1 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-brand-300 transition-all group">
        <div className="flex items-center gap-2">
          <GasStationIcon />
          <span className="text-sm font-normal text-gray-700 dark:text-gray-200 uppercase tracking-tight">POS 2</span>
        </div>
        <ChevronDownIcon className="w-4 h-4 text-gray-400" />
      </button>
    </div>
  );
};

export default PosSelector;
