import { DashboardShell } from "@/components/pages/dashboard/dashboard-shell";
import { parsePeriodParam } from "@/lib/period-utils";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  const sp = await searchParams;
  const initialPeriod = parsePeriodParam(sp.period);
  return <DashboardShell initialPeriod={initialPeriod} />;
}
