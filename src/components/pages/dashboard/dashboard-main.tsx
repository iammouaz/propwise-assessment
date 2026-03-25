"use client";

import { ActivityFeed } from "./activity-feed";
import { DashboardHeader } from "./dashboard-header";
import {
  KpiCardsSkeleton,
  RevenueSkeleton,
  PipelineSkeleton,
  FeedSkeleton,
  TasksSkeleton,
} from "./dashboard-skeleton";
import { DateFilterTabs } from "./date-filter-tabs";
import { KpiCards } from "./kpi-cards";
import { PipelineSummary } from "./pipeline-summary";
import { RevenueForecast } from "./revenue-forecast";
import { TasksPanel } from "./tasks-panel";
import { useDashboardData } from "@/hooks/use-dashboard";

export function DashboardMain() {
  const { dashboardData, isLoading } = useDashboardData();

  const showSkeletons = isLoading || !dashboardData;

  return (
    <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden py-3 pr-3 pl-0 lg:pl-0">
      <div className="flex-1 bg-white dark:bg-gray-900 rounded-[32px] border border-gray-200 dark:border-gray-800 overflow-y-auto overflow-x-hidden shadow-sm">
        <div className="px-4 py-6 sm:px-8 lg:px-10 pt-16 lg:pt-8">
          <div className="mx-auto flex flex-col gap-5">
            <DashboardHeader />
            <div className="overflow-x-auto pb-1 -mx-1 px-1">
              <DateFilterTabs />
            </div>

            {showSkeletons && !dashboardData ? (
              <>
                <KpiCardsSkeleton />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 min-w-0">
                  <div className="lg:col-span-2 flex flex-col gap-5 min-w-0">
                    <RevenueSkeleton />
                    <PipelineSkeleton />
                  </div>
                  <div className="flex flex-col gap-5 min-w-0">
                    <FeedSkeleton />
                    <TasksSkeleton />
                  </div>
                </div>
              </>
            ) : (
              <>
                {isLoading ? (
                  <KpiCardsSkeleton />
                ) : (
                  <KpiCards kpis={dashboardData!.kpis} />
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 min-w-0">
                  <div className="lg:col-span-2 flex flex-col gap-5 min-w-0">
                    {isLoading ? (
                      <RevenueSkeleton />
                    ) : (
                      <RevenueForecast
                        total={dashboardData!.revenue.total}
                        trend={dashboardData!.revenue.trend}
                        trendDirection={dashboardData!.revenue.trendDirection}
                        data={dashboardData!.revenue.data}
                      />
                    )}
                    {isLoading ? (
                      <PipelineSkeleton />
                    ) : (
                      <PipelineSummary
                        totalDeals={dashboardData!.pipeline.totalDeals}
                        totalValue={dashboardData!.pipeline.totalValue}
                        stages={dashboardData!.pipeline.stages}
                      />
                    )}
                  </div>

                  <div className="flex flex-col gap-5 min-w-0">
                    {isLoading ? (
                      <FeedSkeleton />
                    ) : (
                      <ActivityFeed groups={dashboardData!.activities.groups} />
                    )}
                    {isLoading ? <TasksSkeleton /> : <TasksPanel />}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
