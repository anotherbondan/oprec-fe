"use client";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Badge } from "@/src/components/ui/badge";
import { ArrowLeft, CheckSquare, Circle, ChevronDown } from "lucide-react";
import Link from "next/link";

const DUMMY_FORM_DETAIL = {
  id: "f1a2b3c4-d5e6-7f8a-9b0c-1d2e3f4a5b6c",
  title: "Customer Satisfaction Survey 2026",
  description:
    "Questionnaire to evaluate Q1 services. Please fill in honestly.",
  questions: [
    {
      id: "q1",
      text: "What is your full name?",
      type: "SHORT_TEXT",
      isRequired: true,
      options: [],
    },
    {
      id: "q2",
      text: "How was your experience using our services?",
      type: "LONG_TEXT",
      isRequired: false,
      options: [],
    },
    {
      id: "q3",
      text: "How satisfied are you with the latest features?",
      type: "RADIO",
      isRequired: true,
      options: [
        { id: "o1", text: "Very Satisfied" },
        { id: "o2", text: "Satisfied" },
        { id: "o3", text: "Dissatisfied" },
      ],
    },
    {
      id: "q4",
      text: "Which features do you use frequently?",
      type: "CHECKBOX",
      isRequired: false,
      options: [
        { id: "o4", text: "Analytics Dashboard" },
        { id: "o5", text: "Report Builder" },
        { id: "o6", text: "Email Notifications" },
      ],
    },
  ],
};

export default function FormPreviewPage() {
  const form = DUMMY_FORM_DETAIL;

  const renderQuestionInput = (question: any) => {
    switch (question.type) {
      case "SHORT_TEXT":
        return (
          <Input
            disabled
            placeholder="Short text answer..."
            className="bg-muted/50"
          />
        );
      case "LONG_TEXT":
        return (
          <textarea
            disabled
            className="flex min-h-25 w-full rounded-md border border-input bg-muted/50 px-3 py-2 text-sm shadow-sm opacity-70 cursor-not-allowed"
            placeholder="Long text answer..."
          />
        );
      case "RADIO":
        return (
          <div className="space-y-3 mt-3">
            {question.options.map((opt: any) => (
              <div
                key={opt.id}
                className="flex items-center space-x-3 text-muted-foreground"
              >
                <Circle className="w-4 h-4" />
                <span className="text-sm">{opt.text}</span>
              </div>
            ))}
          </div>
        );
      case "CHECKBOX":
        return (
          <div className="space-y-3 mt-3">
            {question.options.map((opt: any) => (
              <div
                key={opt.id}
                className="flex items-center space-x-3 text-muted-foreground"
              >
                <CheckSquare className="w-4 h-4" />
                <span className="text-sm">{opt.text}</span>
              </div>
            ))}
          </div>
        );
      case "DROPDOWN":
        return (
          <div className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-muted/50 px-3 py-2 text-sm opacity-70 cursor-not-allowed">
            <span>Select one...</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-secondary/10 py-10 px-4">
      <div className="container mx-auto max-w-3xl">
        <Button
          variant="ghost"
          className="mb-6 hover:bg-transparent px-0"
          asChild
        >
          <Link href="/forms">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Link>
        </Button>

        <div className="space-y-6">
          <Card className="border-t-8 border-t-primary shadow-md">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-3xl font-bold">
                  {form.title}
                </CardTitle>
                <Badge variant="secondary">Preview Mode</Badge>
              </div>
              <CardDescription className="text-base text-foreground/80 mt-2">
                {form.description}
              </CardDescription>
            </CardHeader>
          </Card>

          {form.questions.map((question, index) => (
            <Card key={question.id} className="shadow-sm">
              <CardContent className="pt-6">
                <div className="mb-4">
                  <h3 className="text-lg font-medium flex items-start">
                    <span className="mr-2 text-muted-foreground">
                      {index + 1}.
                    </span>
                    {question.text}
                    {question.isRequired && (
                      <span className="text-destructive ml-1">*</span>
                    )}
                  </h3>
                </div>

                <div className="pl-6">{renderQuestionInput(question)}</div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-end pt-4">
            <Button disabled size="lg" className="w-full sm:w-auto">
              Submit Answer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
