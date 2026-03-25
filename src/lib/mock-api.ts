import type { DashboardData, Period } from "@/types/dashboard";
import { getMockDataForPeriod } from "./mock-data";

export async function fetchDashboardData(params: {
  period: Period;
}): Promise<DashboardData> {
  const delay = 300 + Math.random() * 500;
  await new Promise((resolve) => setTimeout(resolve, delay));

  const shouldFail = Math.random() < 0.05;
  if (shouldFail) {
    throw new Error("Failed to load data");
  }

  return getMockDataForPeriod(params.period);
}
