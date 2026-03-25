"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { SparklineChart } from "./sparkline-chart";
import type { DashboardKPI } from "@/types/dashboard";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  kpi: DashboardKPI;
}

export function KpiCard({ kpi }: KpiCardProps) {
  const isUp = kpi.trendDirection === "up";

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_0px_2px_rgba(0,0,0,0.06)] p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-normal leading-none">
            {kpi.label}
          </span>
          <span
            className="text-[28px] font-bold text-gray-900 dark:text-gray-100 leading-none tracking-tight"
            style={{ fontFamily: "var(--font-figtree)" }}
          >
            {kpi.value}
          </span>
        </div>
        <span
          className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold flex-shrink-0",
            isUp
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          )}
        >
          {isUp ? (
            <TrendingUp className="w-2.5 h-2.5" />
          ) : (
            <TrendingDown className="w-2.5 h-2.5" />
          )}
          {isUp ? "+" : ""}{kpi.trend}%
        </span>
      </div>
      <SparklineChart data={kpi.sparklineData} />
    </div>
  );
}
