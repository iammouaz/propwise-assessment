"use client";

import { ActivityEntry } from "./activity-entry";
import { useAddToast } from "@/hooks/use-dashboard";
import type { ActivityGroup } from "@/types/dashboard";

interface ActivityFeedProps {
  groups: ActivityGroup[];
}

export function ActivityFeed({ groups }: ActivityFeedProps) {
  const addToast = useAddToast();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_0px_2px_rgba(0,0,0,0.06)] p-5 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Activity Feed</p>
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
          className="text-xs text-brand-600 font-medium hover:text-brand-700 dark:text-brand-400 transition-colors"
        >
          View all
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {groups.map((group) => (
          <div key={group.label}>
            <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
              {group.label}
            </p>
            <div>
              {group.entries.map((entry, index) => (
                <ActivityEntry
                  key={entry.id}
                  entry={entry}
                  isLast={index === group.entries.length - 1}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
