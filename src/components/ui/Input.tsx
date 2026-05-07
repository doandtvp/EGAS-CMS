import React from "react";
import { cn } from "@/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, containerClassName, type = "text", ...props }, ref) => {
    return (
      <div className={cn("w-full space-y-1.5", containerClassName)}>
        {label && (
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-tight">
            {label}
          </label>
        )}
        <div className="relative group">
          <input
            type={type}
            ref={ref}
            className={cn(
              "w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg text-sm transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500",
              "placeholder:text-gray-400 placeholder:font-normal",
              "disabled:bg-gray-50 disabled:cursor-not-allowed",
              error ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : "",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-theme-xs font-normal text-red-500 tracking-tighter mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
