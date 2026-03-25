import type { Period } from "@/types/dashboard";

const PERIOD_VALUES: Period[] = [
  "today",
  "this_week",
  "this_month",
  "this_quarter",
  "this_year",
  "custom",
];

export function isPeriod(value: string | null | undefined): value is Period {
  return value !== undefined && value !== null && PERIOD_VALUES.includes(value as Period);
}

export function parsePeriodParam(
  raw: string | string[] | undefined
): Period {
  const v = Array.isArray(raw) ? raw[0] : raw;
  return isPeriod(v) ? v : "today";
}

export const DATE_FILTER_PERIODS: { value: Period; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "this_week", label: "This Week" },
  { value: "this_month", label: "This Month" },
  { value: "this_quarter", label: "This Quarter" },
  { value: "this_year", label: "This Year" },
  { value: "custom", label: "Custom" },
];
