import React from "react";
import { SearchIcon } from "@/icons";
import { cn } from "@/utils";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  iconPosition?: "left" | "right";
  inputClassName?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Tìm kiếm thông báo",
  className,
  iconPosition = "right",
  inputClassName,
}) => {
  return (
    <div className={cn("relative group", className)}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full py-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-gray-400",
          iconPosition === "left" ? "pl-11 pr-4" : "pl-4 pr-11",
          inputClassName
        )}
      />
      <div
        className={cn(
          "absolute top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-500 transition-colors",
          iconPosition === "left" ? "left-3" : "right-3"
        )}
      >
        <SearchIcon className="w-6 h-6" />
      </div>
    </div>
  );
};

export default SearchInput;
