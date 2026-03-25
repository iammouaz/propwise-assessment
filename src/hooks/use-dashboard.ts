"use client";

import { useAtom, useSetAtom, useAtomValue } from "jotai";
import { useEffect, useRef, useCallback } from "react";
import {
  activePeriodAtom,
  dashboardDataAtom,
  isLoadingAtom,
  errorAtom,
  tasksAtom,
  toastsAtom,
} from "@/store";
import { fetchDashboardData } from "@/lib/mock-api";
import type { Period, ToastItem } from "@/types/dashboard";

export function useAddToast() {
  const setToasts = useSetAtom(toastsAtom);
  return useCallback(
    (toast: Omit<ToastItem, "id">) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { ...toast, id }].slice(-3));
    },
    [setToasts]
  );
}

export function usePeriod() {
  const [activePeriod, setActivePeriod] = useAtom(activePeriodAtom);
  const addToast = useAddToast();

  const changePeriod = useCallback(
    (period: Period) => {
      setActivePeriod(period);
      const labels: Record<Period, string> = {
        today: "Today",
        this_week: "This Week",
        this_month: "This Month",
        this_quarter: "This Quarter",
        this_year: "This Year",
        custom: "Custom",
      };
      addToast({
        variant: "neutral",
        title: `Dashboard updated to ${labels[period]}`,
        duration: 3000,
      });
    },
    [setActivePeriod, addToast]
  );

  return { activePeriod, changePeriod };
}

export function useTasks() {
  return useAtom(tasksAtom);
}

export function useDashboardData() {
  const dashboardData = useAtomValue(dashboardDataAtom);
  const isLoading = useAtomValue(isLoadingAtom);
  const error = useAtomValue(errorAtom);
  return { dashboardData, isLoading, error };
}

export function useDashboardLoader() {
  const [activePeriod] = useAtom(activePeriodAtom);
  const setDashboardData = useSetAtom(dashboardDataAtom);
  const setIsLoading = useSetAtom(isLoadingAtom);
  const setError = useSetAtom(errorAtom);
  const setTasks = useSetAtom(tasksAtom);
  const addToast = useAddToast();

  const currentPeriod = useRef(activePeriod);
  currentPeriod.current = activePeriod;

  const doFetch = useCallback(async (period: Period) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchDashboardData({ period });
      setDashboardData(data);
      setTasks(data.tasks.items);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load data";
      setError(message);
      addToast({
        variant: "error",
        title: message,
        action: {
          label: "Retry",
          onClick: () => doFetch(currentPeriod.current),
        },
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    doFetch(activePeriod);
  }, [activePeriod, doFetch]);
}
