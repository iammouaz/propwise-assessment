"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAddToast } from "@/hooks/use-dashboard";

export function DashboardHeader() {
  const addToast = useAddToast();

  const handleCreate = () => {
    addToast({ variant: "neutral", title: "Feature coming soon", duration: 3000 });
  };

  return (
    <div className="flex items-start justify-between gap-4 w-full">
      <div>
        <h1
          className="text-xl font-bold text-gray-900 dark:text-gray-100 leading-tight tracking-tight"
          style={{ fontFamily: "var(--font-figtree)" }}
        >
          Dashboard
        </h1>
        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400 leading-normal">
          Here&apos;s your pipeline health and sales activity at a glance.
        </p>
      </div>
      <Button
        onClick={handleCreate}
        className="flex-shrink-0 h-9 px-3.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-lg gap-1.5 transition-colors"
      >
        <Plus className="w-4 h-4" />
        Create
      </Button>
    </div>
  );
}
