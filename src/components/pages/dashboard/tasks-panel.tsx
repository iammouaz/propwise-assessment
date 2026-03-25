"use client";

import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress";
import { TaskItem } from "./task-item";
import { useAddToast, useTasks } from "@/hooks/use-dashboard";
import type { Task } from "@/types/dashboard";

export function TasksPanel() {
  const [tasks, setTasks] = useTasks();
  const addToast = useAddToast();

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const handleToggle = (id: string, completed: boolean) => {
    const previousTasks = tasks.map((t: Task) => ({ ...t }));

    setTasks(tasks.map((t: Task) => (t.id === id ? { ...t, completed } : t)));

    if (completed) {
      addToast({
        variant: "success",
        title: "Task completed",
        duration: 4000,
        action: {
          label: "Undo",
          onClick: () => {
            setTasks(previousTasks);
          },
        },
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_0px_2px_rgba(0,0,0,0.06)] p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Tasks & Reminders</p>
        <button
          type="button"
          onClick={() =>
            addToast({
              variant: "info",
              title: "All tasks",
              description: "Opens the full task list in the product workspace.",
              duration: 4000,
            })
          }
          className="text-xs text-brand-600 font-medium hover:text-brand-700 dark:text-brand-400 transition-colors"
        >
          View all
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {completedCount}/{totalCount} completed
          </span>
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} className="gap-0">
          <ProgressTrack className="h-1.5 bg-gray-100 dark:bg-gray-800">
            <ProgressIndicator className="bg-brand-500" />
          </ProgressTrack>
        </Progress>
      </div>

      <div>
        {tasks.map((task: Task) => (
          <TaskItem key={task.id} task={task} onToggle={handleToggle} />
        ))}
      </div>
    </div>
  );
}
