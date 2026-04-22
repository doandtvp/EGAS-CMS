import React, { useState, useRef } from "react";
import Image from "next/image";
import { ChevronDownIcon } from "@/icons";
import UserDropdown from "./UserDropdown";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useAuthStore } from "@/store/useAuthStore";

const UserProfileSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const user = useAuthStore((state) => state.user);

  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <div ref={containerRef} className="relative">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-start gap-3 pl-2 sm:pl-4 group cursor-pointer"
      >
        <div className="relative flex items-center justify-center">
          <div className={`w-8 h-8 rounded-full border shadow-sm overflow-hidden bg-brand-100 transition-all ${
            isOpen ? "border-brand-500 scale-105" : "border-blue-bg dark:border-gray-800"
          }`}>
            <Image 
              src={user?.avatarUrl || "/images/user/user-01.jpg"} 
              alt="Avatar" 
              width={32} 
              height={32} 
              className="object-cover w-full h-full"
              onError={(e) => {
                e.currentTarget.src = "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff";
              }}
            />
          </div>
        </div>
        <div className="hidden sm:flex flex-col items-start justify-center">
          <span className={`text-[14px] font-semibold leading-[20px] transition-colors ${
            isOpen ? "text-brand-500" : "text-grayscale-50 dark:text-white group-hover:text-brand-500"
          }`}>{user?.displayName || "Nguoi dung"}</span>
          <span className="text-[12px] font-normal leading-[16px] text-grayscale-30">
            ID: {user?.employeeCode || "N/A"}
          </span>
        </div>
        
        <ChevronDownIcon className={`w-4 h-4 text-gray-400 transition-transform ${
          isOpen ? "rotate-180 text-brand-500" : "group-hover:translate-y-0.5"
        }`} />
      </div>

      {isOpen && <UserDropdown />}
    </div>
  );
};

export default UserProfileSection;
