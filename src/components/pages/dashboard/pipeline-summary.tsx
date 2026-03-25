"use client";

import { motion } from "framer-motion";
import type { PipelineStage } from "@/types/dashboard";

interface PipelineSummaryProps {
  totalDeals: number;
  totalValue: string;
  stages: PipelineStage[];
}

const stageColors: Record<string, string> = {
  "New Lead": "#3567FF",
  Contacted: "#5D85FF",
  Qualified: "#86A4FF",
  Proposal: "#AEC2FF",
  Negotiation: "#D7E1FF",
  "Closed Won": "#EBF0FF",
};

function formatValue(value: number | null, currency: string): string {
  if (value === null) return "—";
  if (value >= 1000000) return `${currency} ${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${currency} ${(value / 1000).toFixed(0)}K`;
  return `${currency} ${value}`;
}

export function PipelineSummary({ totalDeals, totalValue, stages }: PipelineSummaryProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_0px_2px_rgba(0,0,0,0.06)] p-5 flex flex-col gap-4">
      <div>
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Deal Pipeline</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {totalDeals} deals · {totalValue} total value
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {stages.map((stage, index) => {
          const color = stageColors[stage.stage] ?? "#3567FF";
          return (
            <div key={stage.stage} className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{stage.stage}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">
                    {stage.count !== null ? stage.count : "—"}
                  </span>
                  <span className="text-xs text-gray-400 w-20 text-right">
                    {formatValue(stage.value, stage.currency)}
                  </span>
                </div>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${stage.relativeWidth}%` }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                    ease: "easeOut",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
