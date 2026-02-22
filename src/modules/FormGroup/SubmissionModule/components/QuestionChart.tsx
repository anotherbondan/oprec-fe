"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { QuestionStats } from "../../interface";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const CHART_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

// Fallback hex colors for recharts (CSS vars may not resolve in SVG)
const FALLBACK_COLORS = [
  "#e76e50",
  "#2a9d8f",
  "#264653",
  "#e9c46a",
  "#f4a261",
  "#7c3aed",
  "#06b6d4",
  "#f43f5e",
];

function getTypeLabel(type: string) {
  const labels: Record<string, string> = {
    SHORT_TEXT: "Short Text",
    LONG_TEXT: "Long Text",
    RADIO: "Single Choice",
    CHECKBOX: "Multiple Choice",
    DROPDOWN: "Dropdown",
  };
  return labels[type] || type;
}

interface QuestionChartProps {
  stats: QuestionStats;
  index: number;
}

export default function QuestionChart({ stats, index }: QuestionChartProps) {
  const isChoiceType = ["RADIO", "CHECKBOX", "DROPDOWN"].includes(
    stats.questionType,
  );

  return (
    <Card className="bg-background">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">
            <span className="text-muted-foreground mr-2">Q{index + 1}.</span>
            {stats.questionText}
          </CardTitle>
          <Badge variant="secondary" className="text-xs shrink-0 ml-2">
            {getTypeLabel(stats.questionType)}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {stats.totalAnswers} response{stats.totalAnswers !== 1 ? "s" : ""}
        </p>
      </CardHeader>
      <CardContent>
        {stats.totalAnswers === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No responses yet for this question.
          </div>
        ) : isChoiceType ? (
          <ChoiceChart stats={stats} />
        ) : (
          <TextResponseList responses={stats.textResponses} />
        )}
      </CardContent>
    </Card>
  );
}

function ChoiceChart({ stats }: { stats: QuestionStats }) {
  const data = stats.optionCounts.map((opt) => ({
    name: opt.label,
    value: opt.count,
  }));

  if (stats.questionType === "CHECKBOX") {
    return (
      <div className="w-full">
        <ResponsiveContainer
          width="100%"
          height={Math.max(200, data.length * 50)}
        >
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis type="number" allowDecimals={false} />
            <YAxis
              type="category"
              dataKey="name"
              width={120}
              tick={{ fontSize: 13 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-popover, #fff)",
                border: "1px solid var(--color-border, #e5e7eb)",
                borderRadius: "8px",
                fontSize: "13px",
              }}
            />
            <Bar dataKey="value" name="Responses" radius={[0, 6, 6, 0]}>
              {data.map((_, i) => (
                <Cell
                  key={`cell-${i}`}
                  fill={FALLBACK_COLORS[i % FALLBACK_COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Pie chart for RADIO / DROPDOWN
  return (
    <div className="w-full flex justify-center">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
            label={({ name, percent = 0 }) =>
              `${name} (${(percent * 100).toFixed(0)}%)`
            }
            labelLine={true}
          >
            {data.map((_, i) => (
              <Cell
                key={`cell-${i}`}
                fill={FALLBACK_COLORS[i % FALLBACK_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-popover, #fff)",
              border: "1px solid var(--color-border, #e5e7eb)",
              borderRadius: "8px",
              fontSize: "13px",
            }}
            formatter={(value: number | undefined) => [
              `${value ?? 0} response${value !== 1 ? "s" : ""}`,
              "Count",
            ]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function TextResponseList({ responses }: { responses: string[] }) {
  return (
    <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
      {responses.map((text, i) => (
        <div
          key={i}
          className="bg-secondary/50 rounded-lg px-4 py-3 text-sm border border-border/50"
        >
          {text}
        </div>
      ))}
    </div>
  );
}
