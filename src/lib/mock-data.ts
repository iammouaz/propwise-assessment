import type { ActivityEntry, DashboardData } from "@/types/dashboard";

export const todayData: DashboardData = {
  kpis: [
    {
      label: "Total Leads",
      value: "248",
      trend: 12.4,
      trendDirection: "up",
      sparklineData: [30, 42, 38, 55, 47, 60, 58, 72, 65, 80, 75, 90],
    },
    {
      label: "Revenue YTD",
      value: "AED 1.42M",
      trend: 24.6,
      trendDirection: "up",
      sparklineData: [80, 95, 88, 110, 105, 130, 125, 145, 140, 160, 155, 175],
    },
    {
      label: "Active Deals",
      value: "43",
      trend: 8.2,
      trendDirection: "up",
      sparklineData: [20, 25, 22, 30, 28, 35, 33, 38, 36, 42, 40, 43],
    },
    {
      label: "Completed Tasks",
      value: "156",
      trend: 24.6,
      trendDirection: "up",
      sparklineData: [60, 70, 65, 85, 80, 100, 95, 120, 115, 140, 135, 156],
    },
  ],
  revenue: {
    total: "AED 2.84M",
    trend: 18.3,
    trendDirection: "up",
    data: [
      { month: "Jan", thisYear: 180000, lastYear: 140000 },
      { month: "Feb", thisYear: 210000, lastYear: 160000 },
      { month: "Mar", thisYear: 195000, lastYear: 150000 },
      { month: "Apr", thisYear: 250000, lastYear: 185000 },
      { month: "May", thisYear: 235000, lastYear: 195000 },
      { month: "Jun", thisYear: 280000, lastYear: 210000 },
      { month: "Jul", thisYear: 265000, lastYear: 220000 },
      { month: "Aug", thisYear: 310000, lastYear: 240000 },
      { month: "Sep", thisYear: 295000, lastYear: 255000 },
      { month: "Oct", thisYear: 340000, lastYear: 270000 },
      { month: "Nov", thisYear: 325000, lastYear: 280000 },
      { month: "Dec", thisYear: 365000, lastYear: 295000 },
    ],
  },
  pipeline: {
    totalDeals: 106,
    totalStages: 6,
    totalValue: "AED 2.3M",
    stages: [
      { stage: "New Lead", count: 42, value: 840000, currency: "AED", relativeWidth: 100 },
      { stage: "Contacted", count: 28, value: 560000, currency: "AED", relativeWidth: 62 },
      { stage: "Qualified", count: 18, value: 450000, currency: "AED", relativeWidth: 43 },
      { stage: "Proposal", count: 18, value: 450000, currency: "AED", relativeWidth: 30 },
      { stage: "Negotiation", count: null, value: null, currency: "AED", relativeWidth: 17 },
      { stage: "Closed Won", count: null, value: null, currency: "AED", relativeWidth: 12 },
    ],
  },
  activities: {
    groups: [
      {
        label: "Just now",
        entries: [
          {
            id: "a1",
            message: "New lead {Sara Al-Mansoori} added to {New Lead} stage",
            highlights: [
              { text: "Sara Al-Mansoori", type: "person" },
              { text: "New Lead", type: "stage" },
            ],
            timestamp: new Date().toISOString(),
            relativeTime: "Just now",
            icon: "lead",
          },
          {
            id: "a2",
            message: "Deal {Palm Residences #1082} moved to {Proposal}",
            highlights: [
              { text: "Palm Residences #1082", type: "deal" },
              { text: "Proposal", type: "stage" },
            ],
            timestamp: new Date(Date.now() - 2 * 60000).toISOString(),
            relativeTime: "2m ago",
            icon: "deal",
          },
        ],
      },
      {
        label: "Earlier today",
        entries: [
          {
            id: "a3",
            message: "Call logged with {Ahmed Al-Rashid} — follow-up scheduled",
            highlights: [{ text: "Ahmed Al-Rashid", type: "person" }],
            timestamp: new Date(Date.now() - 3 * 3600000).toISOString(),
            relativeTime: "3h ago",
            icon: "call",
          },
          {
            id: "a4",
            message: "Email sent to {Sarah Mitchell} regarding proposal",
            highlights: [{ text: "Sarah Mitchell", type: "person" }],
            timestamp: new Date(Date.now() - 5 * 3600000).toISOString(),
            relativeTime: "5h ago",
            icon: "email",
          },
          {
            id: "a5",
            message: "Note added to {Downtown Dubai #0934}",
            highlights: [{ text: "Downtown Dubai #0934", type: "deal" }],
            timestamp: new Date(Date.now() - 6 * 3600000).toISOString(),
            relativeTime: "6h ago",
            icon: "note",
          },
        ],
      },
      {
        label: "Yesterday",
        entries: [
          {
            id: "a6",
            message: "Task completed: send documents to {Omar Khalil}",
            highlights: [{ text: "Omar Khalil", type: "person" }],
            timestamp: new Date(Date.now() - 24 * 3600000).toISOString(),
            relativeTime: "Yesterday",
            icon: "task",
          },
          {
            id: "a7",
            message: "Commission recorded for {Marina View #0721}",
            highlights: [{ text: "Marina View #0721", type: "deal" }],
            timestamp: new Date(Date.now() - 26 * 3600000).toISOString(),
            relativeTime: "Yesterday",
            icon: "commission",
          },
        ],
      },
    ],
  },
  tasks: {
    completed: 3,
    total: 5,
    items: [
      {
        id: "t1",
        title: "Update deal #1024 documents",
        dueLabel: "Due · 4:30 PM",
        isOverdue: false,
        type: "task",
        priority: "low",
        completed: false,
      },
      {
        id: "t2",
        title: "Send proposal to Sarah Mitchell",
        dueLabel: "Due · 11:00 AM",
        isOverdue: false,
        type: "email",
        priority: "high",
        completed: false,
      },
      {
        id: "t3",
        title: "Schedule viewing – Palm Jumeirah",
        dueLabel: "Due · 2:00 PM",
        isOverdue: false,
        type: "meeting",
        priority: "med",
        completed: false,
      },
      {
        id: "t4",
        title: "Weekly team sync",
        dueLabel: "Upcoming · 5:00 PM",
        isOverdue: false,
        type: "meeting",
        priority: "med",
        completed: false,
      },
      {
        id: "t5",
        title: "Follow up with Ahmed Al-Rashid",
        dueLabel: "Overdue · 2h ago",
        isOverdue: true,
        type: "call",
        priority: "high",
        completed: false,
      },
    ],
  },
};

function parseKpiValue(value: string, label: string): number {
  if (label === "Revenue YTD") {
    const match = value.match(/[\d.]+/);
    return match ? parseFloat(match[0]) * 1_000_000 : 0;
  }
  return parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
}

function formatKpiValue(raw: number, label: string): string {
  if (label === "Revenue YTD") {
    return `AED ${(raw / 1_000_000).toFixed(2)}M`;
  }
  return String(Math.round(raw));
}

function scaleData(data: DashboardData, factor: number): DashboardData {
  return {
    ...data,
    kpis: data.kpis.map((kpi) => {
      const baseValue = parseKpiValue(kpi.value, kpi.label);
      const newValue = baseValue * factor;
      return {
        ...kpi,
        value: formatKpiValue(newValue, kpi.label),
        trend: Math.round((kpi.trend * (0.7 + Math.random() * 0.6)) * 10) / 10,
        sparklineData: kpi.sparklineData.map((v) =>
          Math.round(v * factor * (0.9 + Math.random() * 0.2))
        ),
      };
    }),
    revenue: {
      ...data.revenue,
      total: `AED ${((2840000 * factor) / 1000000).toFixed(2)}M`,
      trend: Math.round((data.revenue.trend * (0.7 + Math.random() * 0.6)) * 10) / 10,
      data: data.revenue.data.map((d) => ({
        ...d,
        thisYear: Math.round(d.thisYear * factor),
        lastYear: Math.round(d.lastYear * factor * 0.85),
      })),
    },
    pipeline: {
      ...data.pipeline,
      stages: data.pipeline.stages.map((s) => ({
        ...s,
        count: s.count ? Math.round(s.count * factor) : null,
        value: s.value ? Math.round(s.value * factor) : null,
      })),
    },
  };
}

const liveActivityPool: Omit<ActivityEntry, "id" | "timestamp" | "relativeTime">[] = [
  {
    message: "New lead {Fatima Al-Hassan} added to {New Lead} stage",
    highlights: [
      { text: "Fatima Al-Hassan", type: "person" },
      { text: "New Lead", type: "stage" },
    ],
    icon: "lead",
  },
  {
    message: "Deal {Marina Tower #2205} moved to {Qualified}",
    highlights: [
      { text: "Marina Tower #2205", type: "deal" },
      { text: "Qualified", type: "stage" },
    ],
    icon: "deal",
  },
  {
    message: "Call logged with {Khalid Al-Farsi} — meeting requested",
    highlights: [{ text: "Khalid Al-Farsi", type: "person" }],
    icon: "call",
  },
  {
    message: "Email sent to {Nadia Okafor} regarding site visit",
    highlights: [{ text: "Nadia Okafor", type: "person" }],
    icon: "email",
  },
  {
    message: "Note added to {Business Bay #0441}",
    highlights: [{ text: "Business Bay #0441", type: "deal" }],
    icon: "note",
  },
  {
    message: "Task completed: follow-up call with {James Thornton}",
    highlights: [{ text: "James Thornton", type: "person" }],
    icon: "task",
  },
  {
    message: "Commission recorded for {JBR Apartment #0315}",
    highlights: [{ text: "JBR Apartment #0315", type: "deal" }],
    icon: "commission",
  },
];

let liveActivityIndex = 0;

export function getNextLiveActivity(): ActivityEntry {
  const template = liveActivityPool[liveActivityIndex % liveActivityPool.length];
  liveActivityIndex++;
  return {
    ...template,
    id: `live-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    timestamp: new Date().toISOString(),
    relativeTime: "Just now",
  };
}

export function getMockDataForPeriod(period: string): DashboardData {
  switch (period) {
    case "today":
      return todayData;
    case "this_week":
      return scaleData(todayData, 1.15);
    case "this_month":
      return scaleData(todayData, 1.42);
    case "this_quarter":
      return scaleData(todayData, 2.1);
    case "this_year":
      return scaleData(todayData, 3.8);
    case "custom":
      return scaleData(todayData, 1.0);
    default:
      return todayData;
  }
}
