"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import { MOCK_ACCOUNTS } from "@/mock/auth.mock";
import { getDefaultMenuItemByRole, getModulesByRole } from "@/layout/menu-config";
import { useAuthStore } from "@/store/useAuthStore";
import { useLayoutStore } from "@/store/useLayoutStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login, isAuthenticated, hasHydrated, user } = useAuthStore();
  const resetNavigation = useLayoutStore((state) => state.resetNavigation);
  const router = useRouter();

  React.useEffect(() => {
    if (hasHydrated && isAuthenticated) {
      router.replace(user?.role === "nhan_vien" ? "/staff" : "/");
    }
  }, [hasHydrated, isAuthenticated, router, user?.role]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const loggedInUser = login({ username, password });

    if (!loggedInUser) {
      setErrorMessage("Sai tài khoản hoặc mật khẩu.");
      return;
    }

    if (loggedInUser.role === "nhan_vien") {
      router.replace("/staff");
      return;
    }

    const roleModules = getModulesByRole(loggedInUser.role);
    const defaultItem = getDefaultMenuItemByRole(loggedInUser.role);

    resetNavigation(
      {
        id: defaultItem.id,
        title: defaultItem.name,
        path: defaultItem.path || "/",
        componentKey: defaultItem.componentKey || "Dashboard",
      },
      roleModules[0]?.id || "module-shift"
    );

    router.replace(defaultItem.path || "/");
  };

  return (
    <div className="w-full max-w-[420px] px-6 py-10 sm:px-0">
      <div className="mb-10 text-center">
        <h1 className="text-[32px] font-bold text-[#2388FF] mb-2 font-averta">EGAS</h1>
        <p className="text-sm text-[#64748B]">Đăng nhập tài khoản của bạn</p>
      </div>

      <div className="mb-6">
        <div className="rounded-xl border border-gray-100 bg-[#F8FAFC] p-4 text-[13px] dark:border-gray-800 dark:bg-white/5">
          <p className="font-bold text-[#1E293B] dark:text-gray-200 mb-2">
            Tài khoản dùng thử (mật khẩu: 123456)
          </p>
          <div className="grid grid-cols-1 gap-1.5 text-[#64748B] dark:text-gray-300">
            {MOCK_ACCOUNTS.map((account) => (
              <div key={account.username} className="flex justify-between">
                <span>{account.displayName}</span>
                <span className="font-bold text-[#1E293B]">{account.username}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <div className="relative">
            <Input
              placeholder="EGAS ID"
              className="pl-4 h-12 bg-white border-gray-200 rounded-xl focus:border-[#2388FF] focus:ring-[#2388FF]/10 transition-all"
              onChange={(e) => setUsername(e.target.value)}
              error={Boolean(errorMessage)}
            />
          </div>
        </div>

        <div>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu"
              className="pl-4 pr-12 h-12 bg-white border-gray-200 rounded-xl focus:border-[#2388FF] focus:ring-[#2388FF]/10 transition-all"
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(errorMessage)}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? (
                <EyeIcon className="w-5 h-5" />
              ) : (
                <EyeCloseIcon className="w-5 h-5" />
              )}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox checked={isChecked} onChange={setIsChecked} />
            <span className="text-sm text-[#64748B]">Nhớ tài khoản</span>
          </div>
          <Link
            href="/reset-password"
            className="text-sm text-[#2388FF] hover:underline font-medium"
          >
            Quên mật khẩu?
          </Link>
        </div>

        {errorMessage && <p className="text-sm text-error-500 font-medium">{errorMessage}</p>}

        <button
          type="submit"
          className="w-full h-12 bg-gradient-to-r from-[#FF9933] to-[#FFB84D] text-white font-bold rounded-xl shadow-lg shadow-orange-200 hover:shadow-orange-300 transform active:scale-[0.98] transition-all"
        >
          Đăng nhập
        </button>

        <div className="relative flex items-center justify-center py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <span className="relative px-3 bg-white text-xs text-gray-400">Hoặc</span>
        </div>

        <button
          type="button"
          className="w-full h-12 bg-[#555E8D] text-white font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-[#4a537d] transition-all"
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.1562 0H0V10.1562H10.1562V0Z" fill="#F25022" />
              <path d="M21 0H10.8438V10.1562H21V0Z" fill="#7FBA00" />
              <path d="M10.1562 10.8438H0V21H10.1562V10.8438Z" fill="#00A4EF" />
              <path d="M21 10.8438H10.8438V21H21V10.8438Z" fill="#FFB900" />
            </svg>
          </div>
          Đăng nhập qua AD
        </button>
      </form>
    </div>
  );
}
