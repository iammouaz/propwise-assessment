"use client";

import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import { activePeriodAtom } from "@/store";

export function DashboardPeriodUrl() {
  const period = useAtomValue(activePeriodAtom);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const current =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("period")
        : null;
    if (current === period) return;
    router.replace(`${pathname}?period=${period}`, { scroll: false });
  }, [period, pathname, router]);

  return null;
}
