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
        className="flex items-center gap-3 pl-2 sm:pl-4 group cursor-pointer"
      >
        <div className="relative">
          <div className={`w-11 h-11 rounded-full border-2 shadow-sm overflow-hidden bg-brand-100 transition-all ${
            isOpen ? "border-brand-500 scale-105" : "border-white dark:border-gray-800"
          }`}>
            <Image 
              src={user?.avatarUrl || "/images/user/user-01.jpg"} 
              alt="Avatar" 
              width={44} 
              height={44} 
              className="object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff";
              }}
            />
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
        </div>
        <div className="hidden sm:flex flex-col items-end">
          <span className={`text-sm font-bold transition-colors ${
            isOpen ? "text-brand-500" : "text-gray-900 dark:text-white group-hover:text-brand-500"
          }`}>{user?.displayName || "Nguoi dung"}</span>
          <span className="text-[10px] text-gray-400 font-medium">
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
