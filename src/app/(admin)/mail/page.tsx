import React from "react";
import MailInbox from "@/components/mail/MailInbox";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hộp thư | EGAS CMS",
  description: "Quản lý hộp thư và thông báo hệ thống",
};

export default function MailPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hộp thư</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Xem và quản lý các thông báo từ hệ thống</p>
      </div>
      <MailInbox />
    </div>
  );
}
