"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { ClipboardList, HelpCircle, Clock } from "lucide-react";
import { Submission } from "../../interface";

interface SummaryCardsProps {
  submissions: Submission[];
  totalQuestions: number;
}

export default function SummaryCards({
  submissions,
  totalQuestions,
}: SummaryCardsProps) {
  const latestSubmission =
    submissions.length > 0
      ? new Date(
          Math.max(...submissions.map((s) => new Date(s.createdAt).getTime())),
        )
      : null;

  const stats = [
    {
      title: "Total Submissions",
      value: submissions.length,
      icon: ClipboardList,
      color: "text-blue-600 bg-blue-100",
    },
    {
      title: "Total Questions",
      value: totalQuestions,
      icon: HelpCircle,
      color: "text-purple-600 bg-purple-100",
    },
    {
      title: "Latest Submission",
      value: latestSubmission
        ? latestSubmission.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "None yet",
      icon: Clock,
      color: "text-emerald-600 bg-emerald-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-background">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.color}`}>
              <stat.icon className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
