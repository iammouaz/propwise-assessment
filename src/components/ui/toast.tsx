"use client";

import { X, CheckCircle, AlertCircle, Info, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { toastsAtom } from "@/store";
import type { ToastItem, ToastVariant } from "@/types/dashboard";
import { cn } from "@/lib/utils";

const variantConfig: Record<
  ToastVariant,
  {
    icon: React.ReactNode;
    containerClass: string;
    iconClass: string;
    titleClass: string;
    actionClass: string;
  }
> = {
  neutral: {
    icon: <Bell className="w-4 h-4" />,
    containerClass:
      "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700",
    iconClass: "text-gray-500 bg-gray-100 dark:bg-gray-800 dark:text-gray-400",
    titleClass: "text-gray-900 dark:text-gray-100",
    actionClass: "text-brand-600 hover:text-brand-700 dark:text-brand-400",
  },
  success: {
    icon: <CheckCircle className="w-4 h-4" />,
    containerClass:
      "bg-white dark:bg-gray-900 border border-green-200 dark:border-green-900/50",
    iconClass:
      "text-green-700 bg-green-50 dark:bg-green-950/50 dark:text-green-400",
    titleClass: "text-gray-900 dark:text-gray-100",
    actionClass: "text-green-700 hover:text-green-800 dark:text-green-400",
  },
  error: {
    icon: <AlertCircle className="w-4 h-4" />,
    containerClass:
      "bg-white dark:bg-gray-900 border border-red-200 dark:border-red-900/50",
    iconClass: "text-red-700 bg-red-50 dark:bg-red-950/50 dark:text-red-400",
    titleClass: "text-gray-900 dark:text-gray-100",
    actionClass: "text-red-700 hover:text-red-800 dark:text-red-400",
  },
  info: {
    icon: <Info className="w-4 h-4" />,
    containerClass:
      "bg-white dark:bg-gray-900 border border-blue-200 dark:border-blue-900/50",
    iconClass: "text-blue-700 bg-blue-50 dark:bg-blue-950/50 dark:text-blue-400",
    titleClass: "text-gray-900 dark:text-gray-100",
    actionClass: "text-brand-600 hover:text-brand-700 dark:text-brand-400",
  },
};

function ToastCard({
  toast,
  onRemove,
}: {
  toast: ToastItem;
  onRemove: (id: string) => void;
}) {
  const config = variantConfig[toast.variant];
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const duration = toast.duration ?? 4000;
    timerRef.current = setTimeout(() => {
      onRemove(toast.id);
    }, duration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [toast.id, toast.duration, onRemove]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 60, y: 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: 60 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={cn(
        "flex items-start gap-3 rounded-xl p-3.5 min-w-[320px] max-w-[400px]",
        "shadow-[0px_4px_16px_rgba(0,0,0,0.12)]",
        config.containerClass
      )}
    >
      <span
        className={cn(
          "flex-shrink-0 rounded-full p-1.5",
          config.iconClass
        )}
      >
        {config.icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className={cn("text-sm font-medium leading-snug", config.titleClass)}>
          {toast.title}
        </p>
        {toast.description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {toast.description}
          </p>
        )}
        {toast.action && (
          <button
            onClick={() => {
              toast.action!.onClick();
              onRemove(toast.id);
            }}
            className={cn(
              "text-xs font-semibold mt-1.5 underline-offset-2 hover:underline",
              config.actionClass
            )}
          >
            {toast.action.label}
          </button>
        )}
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors mt-0.5"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

export function Toaster() {
  const [toasts, setToasts] = useAtom(toastsAtom);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col-reverse gap-2 items-end pointer-events-none"
      aria-live="polite"
      aria-label="Notifications"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastCard toast={toast} onRemove={removeToast} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
