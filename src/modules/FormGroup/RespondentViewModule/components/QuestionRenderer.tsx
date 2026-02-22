"use client";

import React from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: string;
  text: string;
  type: string;
  isRequired: boolean;
  options: Option[];
}

interface Props {
  question: Question;
  index: number;
  value: string;
  onChange: (value: string) => void;
}

export default function QuestionRenderer({
  question,
  index,
  value,
  onChange,
}: Props) {
  const renderInput = () => {
    switch (question.type) {
      case "SHORT_TEXT":
        return (
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Your answer"
            className="mt-2"
          />
        );

      case "LONG_TEXT":
        return (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Your answer"
            rows={4}
            className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y"
          />
        );

      case "RADIO":
        return (
          <div className="mt-3 space-y-2">
            {question.options.map((opt) => (
              <label
                key={opt.id}
                className="flex items-center gap-3 cursor-pointer rounded-lg border border-input px-4 py-3 transition-colors hover:bg-accent/50 has-checked:border-primary has-checked:bg-primary/5"
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={opt.text}
                  checked={value === opt.text}
                  onChange={(e) => onChange(e.target.value)}
                  className="h-4 w-4 accent-primary"
                />
                <span className="text-sm">{opt.text}</span>
              </label>
            ))}
          </div>
        );

      case "CHECKBOX": {
        const selectedValues = value ? value.split("|||") : [];
        const toggleOption = (optText: string) => {
          const updated = selectedValues.includes(optText)
            ? selectedValues.filter((v) => v !== optText)
            : [...selectedValues, optText];
          onChange(updated.join("|||"));
        };

        return (
          <div className="mt-3 space-y-2">
            {question.options.map((opt) => (
              <label
                key={opt.id}
                className="flex items-center gap-3 cursor-pointer rounded-lg border border-input px-4 py-3 transition-colors hover:bg-accent/50 has-checked:border-primary has-checked:bg-primary/5"
              >
                <input
                  type="checkbox"
                  value={opt.text}
                  checked={selectedValues.includes(opt.text)}
                  onChange={() => toggleOption(opt.text)}
                  className="h-4 w-4 accent-primary rounded"
                />
                <span className="text-sm">{opt.text}</span>
              </label>
            ))}
          </div>
        );
      }

      case "DROPDOWN":
        return (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">Select an option</option>
            {question.options.map((opt) => (
              <option key={opt.id} value={opt.text}>
                {opt.text}
              </option>
            ))}
          </select>
        );

      default:
        return (
          <p className="text-sm text-muted-foreground">
            Unsupported question type
          </p>
        );
    }
  };

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <p className="text-sm font-medium">
          {index + 1}. {question.text}
          {question.isRequired && <span className="text-red-500 ml-1">*</span>}
        </p>
        {renderInput()}
      </CardContent>
    </Card>
  );
}
