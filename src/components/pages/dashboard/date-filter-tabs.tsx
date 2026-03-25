"use client";

import { useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePeriod } from "@/hooks/use-dashboard";
import { DATE_FILTER_PERIODS } from "@/lib/period-utils";
export function DateFilterTabs() {
  const { activePeriod, changePeriod } = usePeriod();
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = useCallback((index: number) => {
    const el = tabsRef.current[index];
    el?.focus();
  }, []);

  const selectIndex = useCallback(
    (index: number) => {
      const bounded =
        ((index % DATE_FILTER_PERIODS.length) + DATE_FILTER_PERIODS.length) %
        DATE_FILTER_PERIODS.length;
      const next = DATE_FILTER_PERIODS[bounded].value;
      if (next !== activePeriod) changePeriod(next);
      focusTab(bounded);
    },
    [activePeriod, changePeriod, focusTab]
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const i = DATE_FILTER_PERIODS.findIndex((p) => p.value === activePeriod);
    const current = i === -1 ? 0 : i;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      selectIndex(current + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      selectIndex(current - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      selectIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      selectIndex(DATE_FILTER_PERIODS.length - 1);
    }
  };

  return (
    <div
      className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-[10px] p-1 gap-0.5"
      role="tablist"
      aria-label="Date filter"
      onKeyDown={onKeyDown}
    >
      {DATE_FILTER_PERIODS.map((period, index) => {
        const isActive = activePeriod === period.value;
        return (
          <button
            key={period.value}
            ref={(el) => {
              tabsRef.current[index] = el;
            }}
            role="tab"
            type="button"
            tabIndex={isActive ? 0 : -1}
            aria-selected={isActive}
            onClick={() => {
              if (!isActive) changePeriod(period.value);
            }}
            className={cn(
              "relative px-3 py-1.5 text-[13px] rounded-md transition-colors whitespace-nowrap",
              isActive
                ? "text-gray-800 dark:text-gray-100 font-medium"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 font-normal"
            )}
          >
            {isActive && (
              <motion.span
                layoutId="tab-indicator"
                className="absolute inset-0 bg-white dark:bg-gray-700 rounded-md shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_0px_2px_rgba(0,0,0,0.06)]"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10">{period.label}</span>
          </button>
        );
      })}
    </div>
  );
}
