"use client";

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface SparklineChartProps {
  data: number[];
  color?: string;
}

export function SparklineChart({ data, color = "#3567FF" }: SparklineChartProps) {
  const chartData = data.map((value, index) => ({ index, value }));
  const gradientId = `sparkline-gradient-${color.replace("#", "")}`;

  return (
    <ResponsiveContainer width="100%" height={60} minWidth={0}>
      <AreaChart data={chartData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.15} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Tooltip
          content={() => null}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={1.5}
          fill={`url(#${gradientId})`}
          dot={false}
          activeDot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
