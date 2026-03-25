import { Skeleton } from "@/components/ui/skeleton";

function KpiCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-7 w-24" />
        </div>
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <Skeleton className="h-14 w-full" />
    </div>
  );
}

export function KpiCardsSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[0, 1, 2, 3].map((i) => (
        <KpiCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function RevenueSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-7 w-32" />
        </div>
        <Skeleton className="h-5 w-20" />
      </div>
      <Skeleton className="w-full h-[180px]" />
    </div>
  );
}

export function PipelineSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-7 w-32" />
        </div>
        <Skeleton className="h-5 w-20" />
      </div>
      <Skeleton className="w-full h-[220px]" />
    </div>
  );
}

export function FeedSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-12" />
      </div>
      {[0, 1].map((gi) => (
        <div key={gi} className="flex flex-col gap-3">
          <Skeleton className="h-3 w-16" />
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="w-7 h-7 rounded-full flex-shrink-0" />
              <div className="flex flex-col gap-1.5 flex-1">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-2.5 w-12" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function TasksSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-12" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-1.5 w-full rounded-full" />
        <Skeleton className="h-3 w-20" />
      </div>
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-100 dark:border-gray-800">
          <Skeleton className="w-4 h-4 rounded flex-shrink-0" />
          <div className="flex flex-col gap-1 flex-1">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-2.5 w-24" />
          </div>
          <div className="flex gap-1.5">
            <Skeleton className="h-5 w-12 rounded-full" />
            <Skeleton className="h-5 w-10 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
