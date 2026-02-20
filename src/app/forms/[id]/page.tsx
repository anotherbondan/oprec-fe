"use client";

import { useState } from "react";
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
import { ArrowLeft, Plus, Trash2, X } from "lucide-react";
import Link from "next/link";

const INITIAL_FORM_DETAIL = {
  id: "f1a2b3c4-d5e6-7f8a-9b0c-1d2e3f4a5b6c",
  title: "Customer Satisfaction Survey 2026",
  description: "Questionnaire to evaluate Q1 services. Please fill in honestly.",
  questions: [
    {
      id: "q1",
      text: "What is your full name?",
      type: "SHORT_TEXT",
      isRequired: true,
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
  ],
};

const QUESTION_TYPES = [
  { value: "SHORT_TEXT", label: "Short Text" },
  { value: "LONG_TEXT", label: "Long Text" },
  { value: "RADIO", label: "Single Choice (Radio)" },
  { value: "CHECKBOX", label: "Multiple Choice (Checkbox)" },
  { value: "DROPDOWN", label: "Dropdown" },
];

export default function FormBuilderPage() {
  const [form, setForm] = useState(INITIAL_FORM_DETAIL);

  const handleUpdateFormDetail = (field: "title" | "description", value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      id: `q${Date.now()}`,
      text: "New Question",
      type: "SHORT_TEXT",
      isRequired: false,
      options: [],
    };
    setForm({ ...form, questions: [...form.questions, newQuestion] });
  };

  const handleUpdateQuestion = (qId: string, field: string, value: any) => {
    const updatedQuestions = form.questions.map((q) => {
      if (q.id === qId) {
        if (field === "type" && (value === "SHORT_TEXT" || value === "LONG_TEXT")) {
          return { ...q, [field]: value, options: [] };
        }
        if (field === "type" && ["RADIO", "CHECKBOX", "DROPDOWN"].includes(value) && q.options.length === 0) {
          return { ...q, [field]: value, options: [{ id: `o${Date.now()}`, text: "Option 1" }] };
        }
        return { ...q, [field]: value };
      }
      return q;
    });
    setForm({ ...form, questions: updatedQuestions });
  };

  const handleDeleteQuestion = (qId: string) => {
    const updatedQuestions = form.questions.filter((q) => q.id !== qId);
    setForm({ ...form, questions: updatedQuestions });
  };

  const handleAddOption = (qId: string) => {
    const updatedQuestions = form.questions.map((q) => {
      if (q.id === qId) {
        const newOption = { id: `o${Date.now()}`, text: `Option ${q.options.length + 1}` };
        return { ...q, options: [...q.options, newOption] };
      }
      return q;
    });
    setForm({ ...form, questions: updatedQuestions });
  };

  const handleUpdateOption = (qId: string, oId: string, newText: string) => {
    const updatedQuestions = form.questions.map((q) => {
      if (q.id === qId) {
        const updatedOptions = q.options.map((opt) =>
          opt.id === oId ? { ...opt, text: newText } : opt
        );
        return { ...q, options: updatedOptions };
      }
      return q;
    });
    setForm({ ...form, questions: updatedQuestions });
  };

  const handleDeleteOption = (qId: string, oId: string) => {
    const updatedQuestions = form.questions.map((q) => {
      if (q.id === qId) {
        const updatedOptions = q.options.filter((opt) => opt.id !== oId);
        return { ...q, options: updatedOptions };
      }
      return q;
    });
    setForm({ ...form, questions: updatedQuestions });
  };

  return (
    <div className="min-h-screen bg-secondary/10 py-10 px-4">
      <div className="container mx-auto max-w-3xl">
        <Button variant="ghost" className="mb-6 hover:bg-transparent px-0" asChild>
          <Link href="/forms">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Forms
          </Link>
        </Button>

        <div className="space-y-6">
          <Card className="border-t-8 border-t-primary shadow-md">
            <CardHeader>
              <Input
                className="text-2xl font-bold border-none px-0 focus-visible:ring-0 shadow-none"
                value={form.title}
                onChange={(e) => handleUpdateFormDetail("title", e.target.value)}
                placeholder="Form Title"
              />
              <Input
                className="text-base text-foreground/80 mt-2 border-none px-0 focus-visible:ring-0 shadow-none"
                value={form.description}
                onChange={(e) => handleUpdateFormDetail("description", e.target.value)}
                placeholder="Form Description"
              />
            </CardHeader>
          </Card>

          {}
          {form.questions.map((question, index) => (
            <Card key={question.id} className="shadow-sm relative group">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  {}
                  <div className="flex-1">
                    <Input
                      value={question.text}
                      onChange={(e) => handleUpdateQuestion(question.id, "text", e.target.value)}
                      placeholder={`Question ${index + 1}`}
                      className="font-medium"
                    />
                  </div>
                  
                  {}
                  <select
                    className="flex h-10 w-full sm:w-[200px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    value={question.type}
                    onChange={(e) => handleUpdateQuestion(question.id, "type", e.target.value)}
                  >
                    {QUESTION_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {}
                {["RADIO", "CHECKBOX", "DROPDOWN"].includes(question.type) && (
                  <div className="space-y-2 pl-2 border-l-2 border-muted mt-4">
                    {question.options.map((opt, optIndex) => (
                      <div key={opt.id} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border border-muted-foreground/50" />
                        <Input
                          value={opt.text}
                          onChange={(e) => handleUpdateOption(question.id, opt.id, e.target.value)}
                          placeholder={`Option ${optIndex + 1}`}
                          className="h-8 w-full sm:w-[300px]"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => handleDeleteOption(question.id, opt.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="link"
                      size="sm"
                      className="text-primary p-0 h-8"
                      onClick={() => handleAddOption(question.id)}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Option
                    </Button>
                  </div>
                )}

                {}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`req-${question.id}`}
                      checked={question.isRequired}
                      onChange={(e) => handleUpdateQuestion(question.id, "isRequired", e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor={`req-${question.id}`} className="text-sm text-muted-foreground cursor-pointer">
                      Required
                    </label>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {}
          <Button
            variant="outline"
            className="w-full border-dashed border-2 py-8 text-muted-foreground hover:text-primary hover:border-primary"
            onClick={handleAddQuestion}
          >
            <Plus className="h-5 w-5 mr-2" /> Add New Question
          </Button>

          {}
          <div className="flex justify-end pt-4">
            <Button size="lg" className="w-full sm:w-auto" onClick={() => console.log(form)}>
              Save Form
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}