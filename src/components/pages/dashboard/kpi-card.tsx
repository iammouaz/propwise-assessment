"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { SparklineChart } from "./sparkline-chart";
import type { DashboardKPI } from "@/types/dashboard";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

function parseNumeric(value: string): { prefix: string; number: number; suffix: string } {
  const match = value.match(/^([^\d]*)(\d[\d.,]*)(.*)$/);
  if (!match) return { prefix: "", number: 0, suffix: value };
  return {
    prefix: match[1],
    number: parseFloat(match[2].replace(/,/g, "")),
    suffix: match[3],
  };
}

function formatNumeric(original: string, animatedNum: number): string {
  const { prefix, number, suffix } = parseNumeric(original);
  if (original.includes("M")) {
    return `${prefix}${animatedNum.toFixed(2)}M${suffix.replace("M", "")}`;
  }
  if (String(number).includes(".")) {
    return `${prefix}${animatedNum.toFixed(1)}${suffix}`;
  }
  return `${prefix}${Math.round(animatedNum)}${suffix}`;
}

function useAnimatedValue(value: string, duration = 600) {
  const { number: target } = parseNumeric(value);
  const prevRef = useRef(target);
  const [displayed, setDisplayed] = useState(value);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const from = prevRef.current;
    prevRef.current = target;

    if (from === target) return;

    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = from + (target - from) * eased;
      setDisplayed(formatNumeric(value, current));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayed(value);
      }
    };

    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [value, target, duration]);

  return displayed;
}

interface KpiCardProps {
  kpi: DashboardKPI;
}

export function KpiCard({ kpi }: KpiCardProps) {
  const isUp = kpi.trendDirection === "up";
  const animatedValue = useAnimatedValue(kpi.value);
  const sparkColor = isUp ? "#22c55e" : "#ef4444";

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-card p-4 flex items-center justify-between">
      <div className="flex flex-col gap-2">
        <span className="text-[13px] text-gray-500 dark:text-gray-400 font-medium leading-none">
          {kpi.label}
        </span>
        <span
          className="text-2xl font-bold text-gray-900 dark:text-gray-100 leading-none tracking-tight tabular-nums mt-0.5"
          style={{ fontFamily: "var(--font-figtree)" }}
        >
          {animatedValue}
        </span>
      </div>

      <div className="flex flex-col items-end gap-2 w-20">
        <div className="w-full">
          <SparklineChart data={kpi.sparklineData} color={sparkColor} height={24} />
        </div>
        <span
          className={cn(
            "flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[11px] font-semibold shrink-0",
            isUp
              ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
              : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
          )}
        >
          {isUp ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {isUp ? "+" : ""}{kpi.trend}%
        </span>
      </div>
    </div>
  );
}
