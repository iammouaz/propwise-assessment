"use client";

import { Checkbox } from "@/components/ui/checkbox";
import type { Task, TaskType, TaskPriority } from "@/types/dashboard";
import { cn } from "@/lib/utils";

const typeBadgeConfig: Record<TaskType, { label: string; className: string }> = {
  task: { label: "Task", className: "bg-gray-100 text-gray-600" },
  email: { label: "Email", className: "bg-blue-50 text-blue-700" },
  meeting: { label: "Meeting", className: "bg-brand-50 text-brand-600" },
  call: { label: "Call", className: "bg-amber-50 text-amber-700" },
};

const priorityBadgeConfig: Record<TaskPriority, { label: string; className: string }> = {
  low: { label: "Low", className: "bg-gray-100 text-gray-500" },
  med: { label: "Med", className: "bg-amber-50 text-amber-700" },
  high: { label: "High", className: "bg-red-50 text-red-700" },
};

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
}

export function TaskItem({ task, onToggle }: TaskItemProps) {
  const typeBadge = typeBadgeConfig[task.type];
  const priorityBadge = priorityBadgeConfig[task.priority];

  return (
    <div
      className={cn(
        "flex items-start gap-3 py-3 border-b border-gray-100 dark:border-gray-800 last:border-0",
        task.completed && "opacity-50"
      )}
    >
      <Checkbox
        id={task.id}
        checked={task.completed}
        onCheckedChange={(checked) => onToggle(task.id, checked === true)}
        className="mt-0.5 flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <label
          htmlFor={task.id}
          className={cn(
            "text-sm text-gray-800 dark:text-gray-200 font-medium leading-snug cursor-pointer block",
            task.completed && "line-through text-gray-400"
          )}
        >
          {task.title}
        </label>
        <p
          className={cn(
            "text-xs mt-0.5",
            task.isOverdue ? "text-red-600 font-medium" : "text-gray-400"
          )}
        >
          {task.dueLabel}
        </p>
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <span
          className={cn(
            "text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
            typeBadge.className
          )}
        >
          {typeBadge.label}
        </span>
        <span
          className={cn(
            "text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
            priorityBadge.className
          )}
        >
          {priorityBadge.label}
        </span>
      </div>
    </div>
  );
}
