"use client";

import {
  UserPlus,
  ArrowRightLeft,
  Phone,
  Mail,
  FileText,
  CheckSquare,
  DollarSign,
} from "lucide-react";
import type { ActivityEntry as ActivityEntryType, ActivityIcon } from "@/types/dashboard";
import { cn } from "@/lib/utils";

const iconMap: Record<ActivityIcon, React.ReactNode> = {
  lead: <UserPlus className="w-4 h-4" />,
  deal: <ArrowRightLeft className="w-4 h-4" />,
  call: <Phone className="w-4 h-4" />,
  email: <Mail className="w-4 h-4" />,
  note: <FileText className="w-4 h-4" />,
  task: <CheckSquare className="w-4 h-4" />,
  commission: <DollarSign className="w-4 h-4" />,
};


function parseMessage(
  message: string,
  highlights: ActivityEntryType["highlights"]
) {
  const parts: Array<{ text: string; highlight?: ActivityEntryType["highlights"][0] }> = [];
  let remaining = message;

  for (const highlight of highlights) {
    const placeholder = `{${highlight.text}}`;
    const idx = remaining.indexOf(placeholder);
    if (idx === -1) continue;
    if (idx > 0) {
      parts.push({ text: remaining.slice(0, idx) });
    }
    parts.push({ text: highlight.text, highlight });
    remaining = remaining.slice(idx + placeholder.length);
  }
  if (remaining) parts.push({ text: remaining });
  return parts;
}

interface ActivityEntryProps {
  entry: ActivityEntryType;
  isLast: boolean;
}

export function ActivityEntry({ entry, isLast }: ActivityEntryProps) {
  const parts = parseMessage(entry.message, entry.highlights);

  return (
    <div className="relative flex gap-4 pb-6 last:pb-0">
      {!isLast && (
        <div className="absolute left-4 top-8 bottom-[-8px] w-px bg-gray-200 dark:bg-gray-800 -translate-x-1/2" />
      )}
      <div className="relative z-10">
        <span
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-[#f8f9fb] text-gray-500 dark:bg-gray-800 dark:text-gray-400 border-2 border-white dark:border-gray-900"
        >
          {iconMap[entry.icon]}
        </span>
      </div>
      <div className="flex-1 min-w-0 pt-1">
        <p className="text-[13px] text-gray-900 dark:text-gray-100 leading-relaxed">
          {parts.map((part, i) =>
            part.highlight ? (
              <span
                key={i}
                className="font-medium text-brand-600 dark:text-brand-400"
              >
                {part.text}
              </span>
            ) : (
              <span key={i} className={i === 0 ? "font-semibold" : ""}>{part.text}</span>
            )
          )}
        </p>
        <p className="text-xs text-gray-400 mt-1">{entry.relativeTime}</p>
      </div>
    </div>
  );
}
