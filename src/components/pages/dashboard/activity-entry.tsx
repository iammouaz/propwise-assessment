"use client";

import {
  User,
  Briefcase,
  Phone,
  Mail,
  FileText,
  CheckSquare,
  DollarSign,
} from "lucide-react";
import type { ActivityEntry as ActivityEntryType, ActivityIcon } from "@/types/dashboard";
import { cn } from "@/lib/utils";

const iconMap: Record<ActivityIcon, React.ReactNode> = {
  lead: <User className="w-3.5 h-3.5" />,
  deal: <Briefcase className="w-3.5 h-3.5" />,
  call: <Phone className="w-3.5 h-3.5" />,
  email: <Mail className="w-3.5 h-3.5" />,
  note: <FileText className="w-3.5 h-3.5" />,
  task: <CheckSquare className="w-3.5 h-3.5" />,
  commission: <DollarSign className="w-3.5 h-3.5" />,
};

const iconColors: Record<ActivityIcon, string> = {
  lead: "bg-brand-50 text-brand-600",
  deal: "bg-green-50 text-green-700",
  call: "bg-amber-50 text-amber-700",
  email: "bg-blue-50 text-blue-700",
  note: "bg-gray-100 text-gray-600",
  task: "bg-green-50 text-green-700",
  commission: "bg-amber-50 text-amber-700",
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
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <span
          className={cn(
            "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center",
            iconColors[entry.icon]
          )}
        >
          {iconMap[entry.icon]}
        </span>
        {!isLast && <div className="w-px flex-1 bg-gray-100 mt-1" />}
      </div>
      <div className={cn("pb-3 flex-1 min-w-0", isLast && "pb-0")}>
        <p className="text-xs text-gray-600 leading-relaxed">
          {parts.map((part, i) =>
            part.highlight ? (
              <span
                key={i}
                className={cn(
                  "font-semibold",
                  part.highlight.type === "person" && "text-brand-600",
                  part.highlight.type === "deal" && "text-gray-900",
                  part.highlight.type === "stage" && "text-gray-900"
                )}
              >
                {part.text}
              </span>
            ) : (
              <span key={i}>{part.text}</span>
            )
          )}
        </p>
        <p className="text-[11px] text-gray-400 mt-0.5">{entry.relativeTime}</p>
      </div>
    </div>
  );
}
