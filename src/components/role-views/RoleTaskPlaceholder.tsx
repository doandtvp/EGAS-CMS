import React from "react";

interface RoleTaskPlaceholderProps {
  title: string;
  description: string;
}

export default function RoleTaskPlaceholder({ title, description }: RoleTaskPlaceholderProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
      <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        View nay la placeholder de team bo sung giao dien chi tiet theo role.
      </div>
    </div>
  );
}
