export type Period =
  | "today"
  | "this_week"
  | "this_month"
  | "this_quarter"
  | "this_year"
  | "custom";

export interface DashboardKPI {
  label: string;
  value: string;
  trend: number;
  trendDirection: "up" | "down";
  sparklineData: number[];
}

export interface RevenueDataPoint {
  month: string;
  thisYear: number;
  lastYear: number;
}

export interface PipelineStage {
  stage: string;
  count: number | null;
  value: number | null;
  currency: string;
  relativeWidth: number;
}

export type ActivityIcon =
  | "lead"
  | "deal"
  | "call"
  | "email"
  | "note"
  | "task"
  | "commission";

export interface ActivityHighlight {
  text: string;
  type: "person" | "stage" | "deal";
}

export interface ActivityEntry {
  id: string;
  message: string;
  highlights: ActivityHighlight[];
  timestamp: string;
  relativeTime: string;
  icon: ActivityIcon;
}

export interface ActivityGroup {
  label: string;
  entries: ActivityEntry[];
}

export type TaskType = "task" | "email" | "meeting" | "call";
export type TaskPriority = "low" | "med" | "high";

export interface Task {
  id: string;
  title: string;
  dueLabel: string;
  isOverdue: boolean;
  type: TaskType;
  priority: TaskPriority;
  completed: boolean;
}

export interface DashboardData {
  kpis: DashboardKPI[];
  revenue: {
    total: string;
    trend: number;
    trendDirection: "up" | "down";
    data: RevenueDataPoint[];
  };
  pipeline: {
    totalDeals: number;
    totalStages: number;
    totalValue: string;
    stages: PipelineStage[];
  };
  activities: {
    groups: ActivityGroup[];
  };
  tasks: {
    completed: number;
    total: number;
    items: Task[];
  };
}

export type ToastVariant = "neutral" | "success" | "error" | "info";

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastItem {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
  action?: ToastAction;
  duration?: number;
}
