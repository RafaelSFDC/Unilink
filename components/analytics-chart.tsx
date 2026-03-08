"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { format, parseISO } from "date-fns";

interface PostHogChartProps {
  data: { date: string; count: number }[];
}

export function PostHogChart({ data }: PostHogChartProps) {
  const chartData = data.map((item) => ({
    name: format(parseISO(item.date), "dd/MM"),
    views: item.count,
  }));

  return (
    <div className="h-[400px] w-full border-4 border-foreground p-6 bg-white shadow-neo">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis
            dataKey="name"
            stroke="#000000"
            fontSize={12}
            tickLine={false}
            axisLine={true}
            style={{ fontWeight: "bold" }}
          />
          <YAxis
            stroke="#000000"
            fontSize={12}
            tickLine={false}
            axisLine={true}
            allowDecimals={false}
            style={{ fontWeight: "bold" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "4px solid #000000",
              boxShadow: "4px 4px 0px 0px #000000",
              borderRadius: "0px",
              fontWeight: "bold",
            }}
          />
          <Bar
            dataKey="views"
            fill="#ffde00"
            stroke="#000000"
            strokeWidth={2}
            radius={[0, 0, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
