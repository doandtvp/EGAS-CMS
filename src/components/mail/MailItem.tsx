import React from "react";
import { ViewedMailIcon, UnreadMailIcon } from "@/icons";
import { cn } from "@/utils";

interface MailItemProps {
  id: string;
  sender: string;
  time: string;
  title: string;
  snippet: string;
  isRead: boolean;
  active?: boolean;
  onClick: (id: string) => void;
}

const MailItem: React.FC<MailItemProps> = ({
  id,
  sender,
  time,
  title,
  snippet,
  isRead,
  active,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        "px-6 py-5 cursor-pointer transition-all border-b border-gray-50 dark:border-gray-800/50 last:border-0 flex items-start gap-4 group relative",
        active ? "bg-gray-50 dark:bg-gray-800/60" : "hover:bg-gray-50 dark:hover:bg-gray-800/40",
        !isRead && !active ? "bg-white" : "",
        isRead && !active ? "bg-[#F0F0F0]/30" : ""
      )}
    >
      {/* Icon Container */}
      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-gray-800 shadow-soft border border-gray-50 dark:border-gray-700 relative">
        {isRead ? (
          <ViewedMailIcon className="w-5 h-5 text-gray-400" />
        ) : (
          <UnreadMailIcon className="w-5 h-5" />
        )}
      </div>

      <div className="flex-grow min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className={cn(
            "text-theme-sm font-semibold tracking-tight line-clamp-1 leading-5 transition-colors",
            isRead ? "text-grayscale-30 dark:text-gray-400" : "text-grayscale-30 dark:text-white"
          )}>
            {title}
          </h4>
          {!isRead && (
            <div className="flex-shrink-0 w-2.5 h-2.5 bg-brand-500 rounded-full mt-1.5" />
          )}
        </div>

        <p className="text-theme-sm font-normal tracking-tight text-grayscale-30/80 dark:text-gray-400 line-clamp-2 leading-5 mt-1">
          {snippet}
        </p>

        <div className="flex items-center gap-1.5 mt-2">
          <span className="text-theme-xs font-normal tracking-tighter text-grayscale-40 dark:text-gray-500 truncate max-w-[150px]">
            {sender}
          </span>
          <span className="w-1 h-1 rounded-full bg-[#E2E5EA] dark:bg-gray-600"></span>
          <span className="text-theme-xs font-normal tracking-tighter text-grayscale-40 dark:text-gray-500">
            {time}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MailItem;
