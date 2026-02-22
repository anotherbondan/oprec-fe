"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Card, CardHeader } from "@/src/components/ui/card";
import { useParams } from "next/navigation";
import { customFetch } from "@/src/lib/api-client";
import { useMutation } from "@tanstack/react-query";
import QuestionRenderer from "./components/QuestionRenderer";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Form } from "../interface";

export default function RespondentViewPage({ form }: { form: Form }) {
  const params = useParams();
  const formId = params.id as string;

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  // ─── Mutation: submit answers ───
  const submitMutation = useMutation({
    mutationFn: async (payload: {
      answers: { questionId: string; value: string }[];
    }) => {
      return await customFetch(`/forms/${formId}/submissions`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Your response has been submitted!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    if (validationErrors[questionId]) {
      setValidationErrors((prev) => {
        const copy = { ...prev };
        delete copy[questionId];
        return copy;
      });
    }
  };

  const handleSubmit = () => {
    if (!form) return;

    const errors: Record<string, string> = {};
    form.questions.forEach((q) => {
      if (q.isRequired && (!answers[q.id] || answers[q.id].trim() === "")) {
        errors[q.id] = "This question is required";
      }
    });

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      toast.error("Please fill in all required questions.");
      return;
    }

    const answerPayload = form.questions
      .filter((q) => answers[q.id] && answers[q.id].trim() !== "")
      .map((q) => ({
        questionId: q.id,
        value: answers[q.id].trim(),
      }));

    if (answerPayload.length === 0) {
      toast.error("Please answer at least one question.");
      return;
    }

    submitMutation.mutate({ answers: answerPayload });
  };

  // ─── Success state ───
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/10">
        <Card className="max-w-md w-full mx-4">
          <CardHeader className="text-center space-y-4 py-10">
            <div className="bg-green-100 rounded-full p-4 w-fit mx-auto">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold">Response Submitted!</h2>
            <p className="text-muted-foreground">
              Thank you for filling out{" "}
              <span className="font-medium text-foreground">{form.title}</span>.
              Your response has been recorded.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSubmitted(false);
                setAnswers({});
              }}
            >
              Submit another response
            </Button>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // ─── Form view ───
  return (
    <div className="min-h-screen bg-secondary/10 py-10 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Form header */}
        <Card className="border-t-8 border-t-primary shadow-md mb-6">
          <CardHeader>
            <h1 className="text-2xl font-bold">{form.title}</h1>
            {form.description && (
              <p className="text-muted-foreground mt-1">{form.description}</p>
            )}
            <p className="text-xs text-muted-foreground mt-3">
              <span className="text-red-500">*</span> indicates required
              questions
            </p>
          </CardHeader>
        </Card>

        {/* Questions */}
        {form.questions.map((question, index) => (
          <div key={question.id}>
            <QuestionRenderer
              question={question}
              index={index}
              value={answers[question.id] || ""}
              onChange={(val) => handleAnswerChange(question.id, val)}
            />
            {validationErrors[question.id] && (
              <p className="text-red-500 text-xs -mt-3 mb-4 ml-1">
                {validationErrors[question.id]}
              </p>
            )}
          </div>
        ))}

        {/* Submit button */}
        <div className="flex justify-between items-center mt-6">
          <Button
            onClick={handleSubmit}
            disabled={submitMutation.isPending}
            size="lg"
          >
            {submitMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
          <Button
            variant="ghost"
            onClick={() => setAnswers({})}
            disabled={submitMutation.isPending}
          >
            Clear form
          </Button>
        </div>
      </div>
    </div>
  );
}
