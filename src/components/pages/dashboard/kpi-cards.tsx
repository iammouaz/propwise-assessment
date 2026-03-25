"use client";

import { KpiCard } from "./kpi-card";
import type { DashboardKPI } from "@/types/dashboard";

interface KpiCardsProps {
  kpis: DashboardKPI[];
}

export function KpiCards({ kpis }: KpiCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <KpiCard key={kpi.label} kpi={kpi} />
      ))}
    </div>
  );
}
