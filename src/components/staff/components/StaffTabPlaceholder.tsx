import React from "react";

interface StaffTabPlaceholderProps {
  title: string;
}

export default function StaffTabPlaceholder({ title }: StaffTabPlaceholderProps) {
  return (
    <div className="h-full rounded-xl border border-gray-300 bg-white p-6">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">
        Component rieng cho tab nay da duoc tach san. Ban co the thay noi dung nghiep vu chi tiet tai day.
      </p>
    </div>
  );
}
