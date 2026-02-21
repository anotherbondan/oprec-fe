"use client";

import { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { customFetch } from "@/src/lib/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import QuestionCard from "@/src/modules/FormDetailModule/components/QuestionCard";

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

export default function FormDetailModule() {
  const queryClient = useQueryClient();
  const params = useParams();
  const id = params.id as string;

  const [form, setForm] = useState<Form | null>(null);

  const updateFormMutation = useMutation({
    mutationFn: async (payload: Partial<Form>) => {
      return await customFetch(`/forms/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["form", id], data);
    },
  });

  const updateQuestionMutation = useMutation({
    mutationFn: async ({
      questionId,
      payload,
    }: {
      questionId: string;
      payload: Partial<Question>;
    }) => {
      return await customFetch(`/questions/${questionId}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["form", id], data);
    },
  });

  const updateOptionMutation = useMutation({
    mutationFn: async ({
      optionId,
      payload,
    }: {
      optionId: string;
      payload: Partial<Option>;
    }) => {
      return await customFetch(`/options/${optionId}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["form", id], data);
    },
  });

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
    if (data && !form) {
      setForm(data);
    }
  }, [data]);

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

  const updateForm = (updated: Partial<Form>) => {
    setForm((prev) => (prev ? { ...prev, ...updated } : prev));

    updateFormMutation.mutate(updated);
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

    updateQuestions([...(form.questions || []), newQuestion]);
  };

  const handleUpdateQuestion = (
    qId: string,
    field: keyof Question,
    value: any,
  ) => {
    const updated = form.questions?.map((q) =>
      q.id === qId ? { ...q, [field]: value } : q,
    );

    updateQuestions(updated);

    updateQuestionMutation.mutate({
      questionId: qId,
      payload: { [field]: value },
    });
  };

  const handleDeleteQuestion = (qId: string) => {
    updateQuestions(form.questions?.filter((q) => q.id !== qId));
  };

  const handleAddOption = (qId: string) => {
    const updated = form.questions?.map((q) => {
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

  const handleUpdateOption = (qId: string, oId: string, newText: string) => {
    const updated = form.questions?.map((q) => {
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

    updateOptionMutation.mutate({
      optionId: oId,
      payload: { text: newText },
    });
  };

  const handleDeleteOption = (qId: string, oId: string) => {
    const updated = form.questions?.map((q) => {
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
                setForm((prev) =>
                  prev ? { ...prev, title: e.target.value } : prev,
                )
              }
              onBlur={(e) =>
                updateFormMutation.mutate({ title: e.target.value })
              }
            />
            <Input
              className="mt-2 border-none px-0"
              value={form.description}
              onChange={(e) =>
                setForm((prev) =>
                  prev ? { ...prev, description: e.target.value } : prev,
                )
              }
              onBlur={(e) =>
                updateFormMutation.mutate({ description: e.target.value })
              }
            />
          </CardHeader>
        </Card>

        {form.questions?.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            index={index}
            onChangeText={(value) => {
              const updated = form.questions?.map((q) =>
                q.id === question.id ? { ...q, text: value } : q,
              );
              updateQuestions(updated);
            }}
            onBlurText={(value) =>
              updateQuestionMutation.mutate({
                questionId: question.id,
                payload: { text: value },
              })
            }
            onChangeType={(value) => {
              const updated = form.questions.map((q) =>
                q.id === question.id
                  ? {
                      ...q,
                      type: value,
                      options: ["RADIO", "CHECKBOX", "DROPDOWN"].includes(value)
                        ? q.options.length
                          ? q.options
                          : [
                              {
                                id: crypto.randomUUID(),
                                text: "Option 1",
                              },
                            ]
                        : [],
                    }
                  : q,
              );

              updateQuestions(updated);

              updateQuestionMutation.mutate({
                questionId: question.id,
                payload: { type: value },
              });
            }}
            onToggleRequired={(value) =>
              handleUpdateQuestion(question.id, "isRequired", value)
            }
            onDelete={() => handleDeleteQuestion(question.id)}
            onAddOption={() => handleAddOption(question.id)}
            onChangeOption={(oId, value) =>
              handleUpdateOption(question.id, oId, value)
            }
            onDeleteOption={(oId) => handleDeleteOption(question.id, oId)}
          />
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
