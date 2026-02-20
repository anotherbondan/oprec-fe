"use client";

import { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { ArrowLeft, Plus, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { customFetch } from "@/src/lib/api-client";
import { useQuery } from "@tanstack/react-query";

interface Option {
  id: string;
  questionId?: string;
  text: string;
  order?: number;
}

interface Question {
  id: string;
  formId?: string;
  text: string;
  type: string;
  isRequired: boolean;
  order?: number;
  options: Option[];
}

interface Form {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  questions: Question[];
}

const QUESTION_TYPES = [
  { value: "SHORT_TEXT", label: "Short Text" },
  { value: "LONG_TEXT", label: "Long Text" },
  { value: "RADIO", label: "Single Choice (Radio)" },
  { value: "CHECKBOX", label: "Multiple Choice (Checkbox)" },
  { value: "DROPDOWN", label: "Dropdown" },
];

export default function FormBuilderPage() {
  const params = useParams();
  const id = params.id as string;

  const [form, setForm] = useState<Form | null>(null);

  const { data, isLoading, isError } = useQuery<Form>({
    queryKey: ["form", id],
    queryFn: async () => {
      return await customFetch(`/forms/${id}`, {
        method: "GET",
      });
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      setForm(data);
    }
  }, [data]);

  /* ---------------- LOADING & ERROR ---------------- */

  if (isLoading || !form) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading form...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Failed to load form</p>
      </div>
    );
  }

  /* ---------------- HANDLERS ---------------- */

  const updateForm = (updated: Partial<Form>) => {
    setForm((prev) => (prev ? { ...prev, ...updated } : prev));
  };

  const updateQuestions = (questions: Question[]) => {
    setForm((prev) => (prev ? { ...prev, questions } : prev));
  };

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: crypto.randomUUID(),
      text: "New Question",
      type: "SHORT_TEXT",
      isRequired: false,
      options: [],
    };

    updateQuestions([...form.questions, newQuestion]);
  };

  const handleUpdateQuestion = (
    qId: string,
    field: keyof Question,
    value: any,
  ) => {
    const updated = form.questions.map((q) =>
      q.id === qId ? { ...q, [field]: value } : q,
    );

    updateQuestions(updated);
  };

  const handleDeleteQuestion = (qId: string) => {
    updateQuestions(form.questions.filter((q) => q.id !== qId));
  };

  const handleAddOption = (qId: string) => {
    const updated = form.questions.map((q) => {
      if (q.id === qId) {
        return {
          ...q,
          options: [
            ...q.options,
            {
              id: crypto.randomUUID(),
              text: `Option ${q.options.length + 1}`,
            },
          ],
        };
      }
      return q;
    });

    updateQuestions(updated);
  };

  const handleUpdateOption = (
    qId: string,
    oId: string,
    newText: string,
  ) => {
    const updated = form.questions.map((q) => {
      if (q.id === qId) {
        return {
          ...q,
          options: q.options.map((o) =>
            o.id === oId ? { ...o, text: newText } : o,
          ),
        };
      }
      return q;
    });

    updateQuestions(updated);
  };

  const handleDeleteOption = (qId: string, oId: string) => {
    const updated = form.questions.map((q) => {
      if (q.id === qId) {
        return {
          ...q,
          options: q.options.filter((o) => o.id !== oId),
        };
      }
      return q;
    });

    updateQuestions(updated);
  };

  /* ---------------- RENDER ---------------- */

  return (
    <div className="min-h-screen bg-secondary/10 py-10 px-4">
      <div className="container mx-auto max-w-3xl">
        <Button variant="ghost" className="mb-6 px-0" asChild>
          <Link href="/forms">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Forms
          </Link>
        </Button>

        <Card className="border-t-8 border-t-primary shadow-md mb-6">
          <CardHeader>
            <Input
              className="text-2xl font-bold border-none px-0"
              value={form.title}
              onChange={(e) =>
                updateForm({ title: e.target.value })
              }
            />
            <Input
              className="mt-2 border-none px-0"
              value={form.description}
              onChange={(e) =>
                updateForm({ description: e.target.value })
              }
            />
          </CardHeader>
        </Card>

        {form.questions?.map((question, index) => (
          <Card key={question.id} className="mb-4">
            <CardContent className="pt-6">
              <Input
                value={question.text}
                onChange={(e) =>
                  handleUpdateQuestion(
                    question.id,
                    "text",
                    e.target.value,
                  )
                }
                placeholder={`Question ${index + 1}`}
              />

              {["RADIO", "CHECKBOX", "DROPDOWN"].includes(
                question.type,
              ) && (
                <div className="mt-4 space-y-2">
                  {question.options.map((opt) => (
                    <div key={opt.id} className="flex gap-2">
                      <Input
                        value={opt.text}
                        onChange={(e) =>
                          handleUpdateOption(
                            question.id,
                            opt.id,
                            e.target.value,
                          )
                        }
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                          handleDeleteOption(
                            question.id,
                            opt.id,
                          )
                        }
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleAddOption(question.id)
                    }
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Option
                  </Button>
                </div>
              )}

              <div className="flex justify-between mt-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={question.isRequired}
                    onChange={(e) =>
                      handleUpdateQuestion(
                        question.id,
                        "isRequired",
                        e.target.checked,
                      )
                    }
                  />
                  Required
                </label>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() =>
                    handleDeleteQuestion(question.id)
                  }
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button
          variant="outline"
          className="w-full border-dashed mt-4"
          onClick={handleAddQuestion}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Question
        </Button>
      </div>
    </div>
  );
}