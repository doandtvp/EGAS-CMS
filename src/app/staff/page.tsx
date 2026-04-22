"use client";

import React from "react";
import { useRouter } from "next/navigation";
import StaffConsole from "@/components/staff/StaffConsole";
import { useAuthStore } from "@/store/useAuthStore";
import { useLayoutStore } from "@/store/useLayoutStore";

export default function StaffPage() {
  const router = useRouter();
  const { hasHydrated, isAuthenticated, user } = useAuthStore();
  const { isMobileOpen, toggleMobileSidebar } = useLayoutStore();

  React.useEffect(() => {
    if (isMobileOpen) {
      toggleMobileSidebar();
    }
  }, [isMobileOpen, toggleMobileSidebar]);

  React.useEffect(() => {
    if (!hasHydrated) return;

    if (!isAuthenticated) {
      router.replace("/signin");
      return;
    }

    if (user?.role !== "nhan_vien") {
      router.replace("/");
    }
  }, [hasHydrated, isAuthenticated, user?.role, router]);

  if (!hasHydrated || !isAuthenticated || user?.role !== "nhan_vien") {
    return null;
  }

  return <StaffConsole />;
}
