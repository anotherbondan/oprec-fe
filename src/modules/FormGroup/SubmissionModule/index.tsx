"use client";

import { useMemo } from "react";
import { Button } from "@/src/components/ui/button";
import { ArrowLeft, Inbox } from "lucide-react";
import Link from "next/link";
import { customFetch } from "@/src/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { Form, Submission, QuestionStats } from "../interface";
import SummaryCards from "./components/SummaryCards";
import QuestionChart from "./components/QuestionChart";

interface SubmissionViewPageProps {
  form: Form;
}

export default function SubmissionViewPage({ form }: SubmissionViewPageProps) {
  const formId = form.id;

  const {
    data: submissions,
    isLoading,
    isError,
  } = useQuery<Submission[]>({
    queryKey: ["submissions", formId],
    queryFn: async () => {
      const response = await customFetch<{ data: Submission[] }>(
        `/forms/${formId}/submissions`,
        { method: "GET" },
      );
      return response.data;
    },
    enabled: !!formId,
  });

  // Compute per-question statistics from raw submissions
  const questionStats: QuestionStats[] = useMemo(() => {
    if (!form.questions || !submissions) return [];

    return form.questions.map((question) => {
      const answers = submissions?.flatMap((sub) =>
        sub.answers.filter((a) => a.questionId === question.id),
      );

      const isChoice = ["RADIO", "CHECKBOX", "DROPDOWN"].includes(
        question.type,
      );

      // For choice questions, count how many times each option was selected
      const optionCounts = isChoice
        ? question.options.map((opt) => ({
            label: opt.text,
            count: answers.filter((a) => {
              // CHECKBOX answers may be comma-separated
              if (question.type === "CHECKBOX") {
                return a.value
                  .split(",")
                  .map((v) => v.trim())
                  .includes(opt.text);
              }
              return a.value === opt.text;
            }).length,
          }))
        : [];

      // For text questions, collect all text responses
      const textResponses = !isChoice
        ? answers.map((a) => a.value).filter((v) => v.trim() !== "")
        : [];

      return {
        questionId: question.id,
        questionText: question.text,
        questionType: question.type,
        totalAnswers: answers.length,
        optionCounts,
        textResponses,
      };
    });
  }, [form.questions, submissions]);

  return (
    <div className="min-h-screen bg-secondary/10 py-10 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" className="px-1" asChild>
            <Link href={`/forms/${formId}`}>
              <ArrowLeft className="w-4 h-4" />
              Back to Form Editor
            </Link>
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">{form.title}</h1>
          <p className="text-muted-foreground mt-1">
            Submission statistics &amp; response overview
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-3">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-muted-foreground">Loading submissions…</p>
            </div>
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="flex items-center justify-center py-20">
            <p className="text-destructive">
              Failed to load submissions. Please try again.
            </p>
          </div>
        )}

        {/* Content */}
        {submissions && (
          <>
            {/* Summary cards */}
            <SummaryCards
              submissions={submissions}
              totalQuestions={form.questions?.length ?? 0}
            />

            {/* Empty state */}
            {submissions.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-muted rounded-full p-6 mb-4">
                  <Inbox className="w-10 h-10 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  No submissions yet
                </h2>
                <p className="text-muted-foreground max-w-sm">
                  Share your form with respondents to start collecting
                  responses. Charts and statistics will appear here.
                </p>
              </div>
            )}

            {/* Per-question charts */}
            {submissions.length > 0 && (
              <div className="mt-8 space-y-6">
                <h2 className="text-xl font-semibold">
                  Response Breakdown by Question
                </h2>
                {questionStats.map((stats, i) => (
                  <QuestionChart
                    key={stats.questionId}
                    stats={stats}
                    index={i}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
