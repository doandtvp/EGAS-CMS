"use client";
import React from "react";
import Breadcrumbs from "../components/layout/header/Breadcrumbs";
import PosSelector from "../components/layout/header/PosSelector";
import HeaderActions from "../components/layout/header/HeaderActions";
import UserProfileSection from "../components/layout/header/UserProfileSection";

import { useLayoutStore } from "../store/useLayoutStore";
import { MenuIcon, MenuIconMobile } from "@/icons";

const AppHeader: React.FC = () => {
  const { toggleMobileSidebar } = useLayoutStore();

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-bg dark:bg-gray-900 transition-all duration-300">
      <div className="flex h-[54px] items-center justify-between px-4 md:px-6">
        
        {/* LEFT: Breadcrumbs & Mobile Menu */}
        <div className="flex items-center gap-1.5">
          <button 
            onClick={toggleMobileSidebar}
            className="lg:hidden p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <MenuIcon className="w-6 h-6 lg:block hidden" />
            <MenuIconMobile className="w-6 h-6 lg:hidden block" />
          </button>
          <Breadcrumbs />
        </div>

        {/* RIGHT: POS Selector + Tools + User */}
        <div className="flex items-center gap-6">
          <PosSelector />
          <HeaderActions />
          <UserProfileSection />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
