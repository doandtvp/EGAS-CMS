import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDownIcon } from "@/icons";
import { cn } from "@/utils";

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownSelectProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  dropdownClassName?: string;
  disabled?: boolean;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Chọn...",
  className,
  buttonClassName,
  dropdownClassName,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Đóng dropdown khi click ra ngoài
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Trigger button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "flex h-9 w-full items-center justify-between rounded-md border border-[#D0D7E2]  px-3 text-sm transition-colors",
          isOpen ? "border-[#2F92E8] ring-1 ring-[#2F92E8]/20" : "hover:border-[#B0B8C5]",
          selectedOption ? "text-[#1F3556]" : "text-[#596A80]",
          disabled && "opacity-50 cursor-not-allowed",
          buttonClassName,
        )}
      >
        <span className="truncate">{displayText}</span>
        <ChevronDownIcon
          className={cn(
            "h-4 w-4 text-[#8A98AC] shrink-0 ml-2 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className={cn(
            "absolute z-50 mt-1 w-full rounded-lg border border-[#D0D7E2] bg-white shadow-lg overflow-hidden",
            "animate-in fade-in-0 zoom-in-95 duration-150",
            dropdownClassName,
          )}
        >
          <ul className="max-h-[240px] overflow-auto py-1">
            {options.length === 0 ? (
              <li className="px-3 py-2 text-sm text-[#8A98AC] text-center">
                Không có dữ liệu
              </li>
            ) : (
              options.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={cn(
                      "flex w-full items-center px-3 py-2 text-sm text-left transition-colors",
                      option.value === value
                        ? "bg-[#EBF5FF] text-[#2F92E8] font-medium"
                        : "text-[#1F3556] hover:bg-[#F6F8FB]",
                    )}
                  >
                    {option.label}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownSelect;
