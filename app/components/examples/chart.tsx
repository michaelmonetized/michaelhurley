"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { month: "Jan", desktop: 24, mobile: 18 },
  { month: "Feb", desktop: 31, mobile: 22 },
  { month: "Mar", desktop: 45, mobile: 30 },
  { month: "Apr", desktop: 39, mobile: 27 },
];

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig;

export default function ChartExample() {
  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-64 w-full"
    >
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="desktop"
          fill="var(--color-desktop)"
          radius={0}
        />
        <Bar
          dataKey="mobile"
          fill="var(--color-mobile)"
          radius={0}
        />
      </BarChart>
    </ChartContainer>
  );
}
