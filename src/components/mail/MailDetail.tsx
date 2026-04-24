import React from "react";
import { CloseIcon } from "@/icons";
import { cn } from "@/utils";

interface MailDetailProps {
  mail: {
    id: string;
    sender: string;
    time: string;
    title: string;
    content: string;
  } | null;
  onClose: () => void;
  isOpen: boolean;
}

const MailDetail: React.FC<MailDetailProps> = ({ mail, onClose, isOpen }) => {
  if (!mail) return null;

  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-900 w-full h-full flex flex-col transition-all duration-300"
      )}
    >
      {/* Detail Header - Blue from image */}
      <div className="bg-stat-1 p-4 flex items-center justify-between text-white flex-shrink-0">
        <h3 className="text-theme-xl font-bold tracking-tightest leading-7 truncate pr-4">
          {mail.title}
        </h3>
        <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
          <CloseIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-grow overflow-y-auto p-4 md:p-6 scrollbar-thin">
        <div className="mb-6">
          <div className="flex items-center gap-1 text-theme-sm font-normal tracking-tight text-grayscale-30/40 dark:text-gray-400 mb-2">
            <span>{mail.sender}</span>
            <span>•</span>
            <span>{mail.time}</span>
          </div>
          <h2 className="text-theme-base font-bold text-grayscale-30 dark:text-white tracking-normal-plus leading-6">
            {mail.title}
          </h2>
        </div>

        <div className="text-theme-sm font-normal tracking-tight text-grayscale-30 dark:text-gray-300 leading-5 whitespace-pre-wrap">
          {mail.content}
        </div>

        {/* Footer Note */}
        <div className="mt-8 pt-4 border-t border-gray-100 dark:border-gray-800">
          <p className="text-theme-sm font-normal italic text-grayscale-30/40">
            Lưu ý cho cửa hàng: Vui lòng thực hiện theo hướng dẫn trên.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MailDetail;
