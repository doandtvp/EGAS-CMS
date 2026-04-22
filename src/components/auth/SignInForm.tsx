"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
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
  const { login, isAuthenticated, hasHydrated } = useAuthStore();
  const resetNavigation = useLayoutStore((state) => state.resetNavigation);
  const router = useRouter();

  React.useEffect(() => {
    if (hasHydrated && isAuthenticated) {
      router.replace("/");
    }
  }, [hasHydrated, isAuthenticated, router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const loggedInUser = login({ username, password });

    if (!loggedInUser) {
      setErrorMessage("Sai tài khoản hoặc mật khẩu.");
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
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Back to dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Dang nhap
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Chon tai khoan role can test va dang nhap vao view tuong ung.
            </p>
          </div>
          <div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm dark:border-gray-800 dark:bg-white/5">
              <p className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Tai khoan fake (password chung: 123456)
              </p>
              <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                {MOCK_ACCOUNTS.map((account) => (
                  <li key={account.username}>
                    <span className="font-medium">{account.username}</span> - {account.displayName}
                  </li>
                ))}
              </ul>
            </div>
            <form className="mt-5" onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Username <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                    placeholder="nhan_vien | ca_truong | cua_hang_truong"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    error={Boolean(errorMessage)}
                  />
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                      error={Boolean(errorMessage)}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                  <Link
                    href="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-500 dark:text-brand-400"
                  >
                    Quen mat khau?
                  </Link>
                </div>
                {errorMessage && (
                  <p className="text-sm text-error-500">{errorMessage}</p>
                )}
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-lg bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
                  >
                    Dang nhap
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Chua co tai khoan? {""}
                <Link
                  href="/signup"
                  className="text-brand-500 hover:text-brand-500 dark:text-brand-400"
                >
                  Dang ky
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
