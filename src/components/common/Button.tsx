import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline-orange" | "gradient-orange" | "ghost" | "secondary";
  size?: "xs" | "sm" | "md" | "lg";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  fullWidth,
  className,
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none font-medium whitespace-nowrap";

  const variants = {
    primary: "bg-brand-500 text-white hover:bg-brand-600 rounded-xl",
    "gradient-orange": "bg-stat-2 text-white shadow-sm rounded-xl",
    "outline-orange":
      "text-[#F4831F] border border-[#F4831F] bg-[#F4831F]/5 hover:bg-[#F4831F]/10 rounded-md font-normal",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 rounded-xl dark:bg-gray-700 dark:text-white",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-600 dark:text-gray-400 rounded-xl",
  };

  const sizes = {
    xs: "h-[30px] px-3 text-[14px]",
    sm: "h-9 px-4 text-sm",
    md: "h-12 px-6 text-sm",
    lg: "h-14 px-8 text-base",
  };

  return (
    <button
      className={twMerge(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth ? "w-full" : "",
        className
      )}
      {...props}
    >
      {leftIcon && <span className="flex items-center shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="flex items-center shrink-0">{rightIcon}</span>}
    </button>
  );
};

export default Button;
