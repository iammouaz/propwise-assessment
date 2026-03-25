"use client";

import type { ReactNode } from "react";

export function GoBackButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => history.back()}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
    >
      {children}
    </button>
  );
}
