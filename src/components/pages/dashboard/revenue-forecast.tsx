"use client";

import { TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
import { useAddToast } from "@/hooks/use-dashboard";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { RevenueDataPoint } from "@/types/dashboard";

interface RevenueForecastProps {
  total: string;
  trend: number;
  trendDirection: "up" | "down";
  data: RevenueDataPoint[];
}

function formatYAxis(value: number): string {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  return String(value);
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-[0px_2px_6px_-1px_rgba(0,0,0,0.08)]">
      <p className="text-xs font-semibold text-gray-700 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="text-xs text-gray-600">
          <span
            className="inline-block w-2 h-2 rounded-full mr-1.5"
            style={{ backgroundColor: p.color }}
          />
          {p.name}: AED {(p.value / 1000).toFixed(0)}K
        </p>
      ))}
    </div>
  );
}

export function RevenueForecast({ total, trend, trendDirection, data }: RevenueForecastProps) {
  const isUp = trendDirection === "up";
  const addToast = useAddToast();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_0px_2px_rgba(0,0,0,0.06)] p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-normal">Revenue Forecast</p>
          <div className="flex items-center gap-2 mt-1">
            <span
              className="text-[28px] font-bold text-gray-900 dark:text-gray-100 leading-none tracking-tight"
              style={{ fontFamily: "var(--font-figtree)" }}
            >
              {total}
            </span>
            <span
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold ${
                isUp
                  ? "bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-400"
                  : "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400"
              }`}
            >
              {isUp ? (
                <TrendingUp className="w-2.5 h-2.5" />
              ) : (
                <TrendingDown className="w-2.5 h-2.5" />
              )}
              {isUp ? "+" : ""}
              {trend}%
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() =>
            addToast({
              variant: "info",
              title: "Opening report builder",
              description: "This preview links to a coming-soon report view.",
              duration: 4000,
            })
          }
          className="flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 transition-colors flex-shrink-0 mt-1"
          style={{ fontFamily: "var(--font-figtree)" }}
        >
          Report
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>

      <div className="flex items-center gap-4 mb-1">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-500 flex-shrink-0" />
          <span className="text-[11px] text-gray-500" style={{ fontFamily: "var(--font-figtree)" }}>
            This Year
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-gray-300 flex-shrink-0" />
          <span className="text-[11px] text-gray-500" style={{ fontFamily: "var(--font-figtree)" }}>
            Last Year
          </span>
        </div>
      </div>

      <div className="h-[180px] min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gradientThisYear" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3567FF" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#3567FF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradientLastYear" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D1D5DB" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#D1D5DB" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "#9CA3AF" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tickFormatter={formatYAxis}
              tick={{ fontSize: 11, fill: "#9CA3AF" }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="lastYear"
              name="Last Year"
              stroke="#D1D5DB"
              strokeWidth={1.5}
              fill="url(#gradientLastYear)"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="thisYear"
              name="This Year"
              stroke="#3567FF"
              strokeWidth={2}
              fill="url(#gradientThisYear)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
