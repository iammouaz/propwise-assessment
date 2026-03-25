"use client";

import { useHydrateAtoms } from "jotai/utils";
import { Sidebar } from "@/components/layout/sidebar";
import { Toaster } from "@/components/ui/toast";
import { activePeriodAtom } from "@/store";
import type { Period } from "@/types/dashboard";
import { DashboardLoader } from "./dashboard-loader";
import { DashboardMain } from "./dashboard-main";
import { DashboardPeriodUrl } from "./dashboard-period-url";

export function DashboardShell({ initialPeriod }: { initialPeriod: Period }) {
  useHydrateAtoms([[activePeriodAtom, initialPeriod]]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <DashboardLoader />
      <DashboardPeriodUrl />
      <Sidebar />
      <DashboardMain />
      <Toaster />
    </div>
  );
}
