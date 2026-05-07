import React from "react";

export default function StaffDashboard() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard nhan vien</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Day la view mo phong danh cho role nhan vien. Ban co the thay bang danh sach nghiep vu
        thuc te sau.
      </p>
      <div className="rounded-xl border border-dashed border-brand-300 bg-brand-50/50 p-4 text-sm text-brand-600">
        Placeholder: checklist dau ca, nhiem vu tai cot bom, nhat ky ket ca.
      </div>
    </div>
  );
}
