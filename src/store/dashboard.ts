import { atom } from "jotai";
import type { DashboardData, Period, Task, ToastItem } from "@/types/dashboard";

export const activePeriodAtom = atom<Period>("today");

export const dashboardDataAtom = atom<DashboardData | null>(null);

export const isLoadingAtom = atom<boolean>(false);

export const errorAtom = atom<string | null>(null);

export const toastsAtom = atom<ToastItem[]>([]);

export const tasksAtom = atom<Task[]>([]);
