"use client";

import { useEffect, useRef, useState } from "react";
import { ActivityEntry } from "./activity-entry";
import { useAddToast } from "@/hooks/use-dashboard";
import type { ActivityEntry as ActivityEntryType, ActivityGroup } from "@/types/dashboard";
import { getNextLiveActivity } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

const REFRESH_INTERVAL_MS = 15_000;

interface ActivityFeedProps {
  groups: ActivityGroup[];
}

export function ActivityFeed({ groups: initialGroups }: ActivityFeedProps) {
  const addToast = useAddToast();
  const [groups, setGroups] = useState<ActivityGroup[]>(initialGroups);
  const [newEntryId, setNewEntryId] = useState<string | null>(null);
  const newEntryTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setGroups(initialGroups);
  }, [initialGroups]);

  useEffect(() => {
    const interval = setInterval(() => {
      const entry: ActivityEntryType = getNextLiveActivity();
      setGroups((prev) => {
        const updated = [...prev];
        const justNowIdx = updated.findIndex((g) => g.label === "Just now");
        if (justNowIdx !== -1) {
          updated[justNowIdx] = {
            ...updated[justNowIdx],
            entries: [entry, ...updated[justNowIdx].entries].slice(0, 4),
          };
        } else {
          updated.unshift({ label: "Just now", entries: [entry] });
        }
        return updated;
      });

      setNewEntryId(entry.id);
      if (newEntryTimer.current) clearTimeout(newEntryTimer.current);
      newEntryTimer.current = setTimeout(() => setNewEntryId(null), 2000);
    }, REFRESH_INTERVAL_MS);

    return () => {
      clearInterval(interval);
      if (newEntryTimer.current) clearTimeout(newEntryTimer.current);
    };
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-card flex flex-col">
      <div className="p-5 border-b border-gray-50 dark:border-gray-800">
        <p className="text-base font-semibold text-gray-900 dark:text-gray-100">Activity Feed</p>
      </div>

      <div className="flex flex-col">
        {groups.map((group) => (
          <div key={group.label}>
            <div className="bg-[#f8f9fb] dark:bg-gray-800/50 px-5 py-2.5">
              <p className="text-[11px] font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-widest">
                {group.label}
              </p>
            </div>
            <div className="px-5 py-5">
              {group.entries.map((entry, index) => (
                <div
                  key={entry.id}
                  className={cn(
                    "transition-all duration-500",
                    newEntryId === entry.id && "animate-in fade-in slide-in-from-top-2"
                  )}
                >
                  <ActivityEntry
                    entry={entry}
                    isLast={index === group.entries.length - 1}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-50 dark:border-gray-800 flex justify-center mt-auto">
        <button
          type="button"
          onClick={() =>
            addToast({
              variant: "info",
              title: "Full activity history",
              description: "Use this link in the product to open the complete feed.",
              duration: 4000,
            })
          }
          className="flex items-center gap-1.5 text-[13px] text-brand-600 font-medium hover:text-brand-700 dark:text-brand-400 transition-colors"
        >
          View full activity log
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
