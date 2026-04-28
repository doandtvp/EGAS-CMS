import GridShape from "@/components/common/GridShape";
import ThemeTogglerTwo from "@/components/common/ThemeTogglerTwo";

import { ThemeProvider } from "@/context/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <ThemeProvider>
        <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col dark:bg-gray-900 sm:p-0">
          <div className="lg:w-1/2 w-full h-full bg-[#F1F3F7] dark:bg-white/5 lg:grid items-center hidden">
            <div className="relative items-center justify-center flex z-1 p-12">
              <Image
                width={800}
                height={600}
                src="/images/authen/login-bg.png"
                alt="EGAS Login Background"
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center bg-white dark:bg-gray-900 overflow-y-auto">
            {children}
          </div>
          <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
            <ThemeTogglerTwo />
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
