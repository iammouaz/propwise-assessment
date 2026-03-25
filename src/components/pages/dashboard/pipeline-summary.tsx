"use client";

import { motion } from "framer-motion";
import type { PipelineStage } from "@/types/dashboard";
import { useAddToast } from "@/hooks/use-dashboard";

interface PipelineSummaryProps {
  totalDeals: number;
  totalValue: string;
  stages: PipelineStage[];
}

const BAR_COLOR = "#1e3a8a";
const BAR_TEXT_COLOR = "#ffffff";
const PILL_BG = "rgba(255, 255, 255, 0.15)";

function formatValue(value: number | null, currency: string): string {
  if (value === null) return "—";
  if (value >= 1000000) return `${currency} ${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${currency} ${(value / 1000).toFixed(0)}K`;
  return `${currency} ${value}`;
}

export function PipelineSummary({ totalDeals, totalValue, stages }: PipelineSummaryProps) {
  const addToast = useAddToast();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-card p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-base font-semibold text-gray-900 dark:text-gray-100">Pipeline Summary</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {totalDeals} deals across {stages.length} stages · {totalValue} total value
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            addToast({
              variant: "info",
              title: "Pipeline details",
              description: "Navigate to the Deals section to see full pipeline details.",
              duration: 4000,
            })
          }
          className="text-xs text-brand-600 font-medium hover:text-brand-700 dark:text-brand-400 transition-colors shrink-0 mt-1"
        >
          Details ↗
        </button>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        {stages.map((stage, index) => {
          return (
            <div key={stage.stage} className="flex items-center gap-3">
              <span className="text-[13px] font-medium text-gray-700 dark:text-gray-300 w-24 shrink-0">
                {stage.stage}
              </span>
              <div className="flex-1 h-8 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                <motion.div
                  className="h-full rounded-md flex items-center px-1"
                  style={{ backgroundColor: BAR_COLOR, minWidth: "fit-content" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${stage.relativeWidth}%` }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                    ease: "easeOut",
                  }}
                >
                  {stage.count !== null && (
                    <div 
                      className="h-6 px-2.5 rounded-md flex items-center gap-1.5"
                      style={{ backgroundColor: PILL_BG }}
                    >
                      <span
                        className="text-[11px] font-bold leading-none whitespace-nowrap"
                        style={{ color: BAR_TEXT_COLOR }}
                      >
                        {stage.count}
                      </span>
                      {stage.value !== null && (
                        <span
                          className="text-[11px] font-normal leading-none whitespace-nowrap opacity-75"
                          style={{ color: BAR_TEXT_COLOR }}
                        >
                          {formatValue(stage.value, stage.currency)}
                        </span>
                      )}
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
