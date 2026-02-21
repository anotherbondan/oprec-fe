"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { customFetch } from "@/src/lib/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import QuestionCard from "@/src/modules/FormDetailModule/components/QuestionCard";
import { toast } from "sonner";

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
  status: string;
  createdAt: string;
  questions: Question[];
}

export default function FormDetailModule() {
  const queryClient = useQueryClient();
  const params = useParams();
  const id = params.id as string;

  // ─── Query: fetch form detail ───
  const {
    data: form,
    isLoading,
    isError,
  } = useQuery<Form>({
    queryKey: ["form", id],
    queryFn: async () => {
      return await customFetch(`/forms/${id}`, {
        method: "GET",
      });
    },
    enabled: !!id,
  });

  // ─── Mutation: update form title/description ───
  const updateFormMutation = useMutation({
    mutationFn: async (payload: Partial<Form>) => {
      return await customFetch(`/forms/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["form", id] });
    },
  });

  // ─── Mutation: create a new question ───
  const createQuestionMutation = useMutation({
    mutationFn: async (payload: {
      formId: string;
      text: string;
      type: string;
      isRequired: boolean;
      order: number;
    }) => {
      return await customFetch("/questions", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["form", id] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // ─── Mutation: update a question ───
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["form", id] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // ─── Mutation: delete a question ───
  const deleteQuestionMutation = useMutation({
    mutationFn: async (questionId: string) => {
      return await customFetch(`/questions/${questionId}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["form", id] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // ─── Mutation: create an option ───
  const createOptionMutation = useMutation({
    mutationFn: async (payload: { questionId: string; text: string }) => {
      return await customFetch("/options", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["form", id] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // ─── Mutation: update an option ───
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["form", id] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // ─── Mutation: delete an option ───
  const deleteOptionMutation = useMutation({
    mutationFn: async (optionId: string) => {
      return await customFetch(`/options/${optionId}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["form", id] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // ─── Local state for inline editing (title/description) ───
  const [localTitle, setLocalTitle] = useState<string | null>(null);
  const [localDescription, setLocalDescription] = useState<string | null>(null);

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

  const displayTitle = localTitle ?? form.title;
  const displayDescription = localDescription ?? form.description;

  // ─── Handlers ───
  const handleAddQuestion = () => {
    createQuestionMutation.mutate({
      formId: id,
      text: "New Question",
      type: "SHORT_TEXT",
      isRequired: false,
      order: form.questions?.length ?? 0,
    });
  };

  const handleDeleteQuestion = (qId: string) => {
    deleteQuestionMutation.mutate(qId);
  };

  const handleAddOption = (qId: string) => {
    const question = form.questions?.find((q) => q.id === qId);
    createOptionMutation.mutate({
      questionId: qId,
      text: `Option ${(question?.options?.length ?? 0) + 1}`,
    });
  };

  const handleDeleteOption = (oId: string) => {
    deleteOptionMutation.mutate(oId);
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
              value={displayTitle}
              onChange={(e) => setLocalTitle(e.target.value)}
              onBlur={(e) => {
                updateFormMutation.mutate({ title: e.target.value });
                setLocalTitle(null);
              }}
            />
            <Input
              className="mt-2 border-none px-0"
              value={displayDescription}
              onChange={(e) => setLocalDescription(e.target.value)}
              onBlur={(e) => {
                updateFormMutation.mutate({ description: e.target.value });
                setLocalDescription(null);
              }}
            />
          </CardHeader>
        </Card>

        {form.questions?.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            index={index}
            onChangeText={() => {}}
            onBlurText={(value) =>
              updateQuestionMutation.mutate({
                questionId: question.id,
                payload: { text: value },
              })
            }
            onChangeType={(value) => {
              updateQuestionMutation.mutate({
                questionId: question.id,
                payload: { type: value },
              });
            }}
            onToggleRequired={(value) =>
              updateQuestionMutation.mutate({
                questionId: question.id,
                payload: { isRequired: value },
              })
            }
            onDelete={() => handleDeleteQuestion(question.id)}
            onAddOption={() => handleAddOption(question.id)}
            onChangeOption={(oId, value) =>
              updateOptionMutation.mutate({
                optionId: oId,
                payload: { text: value },
              })
            }
            onDeleteOption={(oId) => handleDeleteOption(oId)}
          />
        ))}

        <Button
          variant="outline"
          className="w-full border-dashed mt-4"
          onClick={handleAddQuestion}
          disabled={createQuestionMutation.isPending}
        >
          <Plus className="w-4 h-4 mr-2" />
          {createQuestionMutation.isPending ? "Adding..." : "Add Question"}
        </Button>
      </div>
    </div>
  );
}
