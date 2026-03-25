"use client";

import { ActivityFeed } from "./activity-feed";
import { DashboardHeader } from "./dashboard-header";
import { DashboardSkeleton } from "./dashboard-skeleton";
import { DateFilterTabs } from "./date-filter-tabs";
import { KpiCards } from "./kpi-cards";
import { PipelineSummary } from "./pipeline-summary";
import { RevenueForecast } from "./revenue-forecast";
import { TasksPanel } from "./tasks-panel";
import { useDashboardData } from "@/hooks/use-dashboard";

export function DashboardMain() {
  const { dashboardData, isLoading } = useDashboardData();

  return (
    <main className="flex-1 min-w-0 flex flex-col overflow-x-hidden">
      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-6 pt-16 lg:pt-6">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-5">
          <DashboardHeader />
          <div className="overflow-x-auto pb-1 -mx-1 px-1">
            <DateFilterTabs />
          </div>

          {isLoading || !dashboardData ? (
            <DashboardSkeleton />
          ) : (
            <>
              <KpiCards kpis={dashboardData.kpis} />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 min-w-0">
                <div className="lg:col-span-2 flex flex-col gap-5 min-w-0">
                  <RevenueForecast
                    total={dashboardData.revenue.total}
                    trend={dashboardData.revenue.trend}
                    trendDirection={dashboardData.revenue.trendDirection}
                    data={dashboardData.revenue.data}
                  />
                  <PipelineSummary
                    totalDeals={dashboardData.pipeline.totalDeals}
                    totalValue={dashboardData.pipeline.totalValue}
                    stages={dashboardData.pipeline.stages}
                  />
                </div>

                <div className="flex flex-col gap-5 min-w-0">
                  <ActivityFeed groups={dashboardData.activities.groups} />
                  <TasksPanel />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
