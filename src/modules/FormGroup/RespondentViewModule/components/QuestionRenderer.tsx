"use client";

import React from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Button } from "@/src/components/ui/button";
import { ChevronDown } from "lucide-react";

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
              <Label
                key={opt.id}
                className="flex items-center gap-3 cursor-pointer rounded-lg border border-input px-4 py-3 transition-colors hover:bg-accent/50 has-checked:border-primary has-checked:bg-primary/5"
              >
                <Input
                  type="radio"
                  name={`question-${question.id}`}
                  value={opt.text}
                  checked={value === opt.text}
                  onChange={(e) => onChange(e.target.value)}
                  className="h-4 w-4 accent-primary"
                />
                <span className="text-sm">{opt.text}</span>
              </Label>
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
              <Label
                key={opt.id}
                className="flex items-center gap-3 cursor-pointer rounded-lg border border-input px-4 py-3 transition-colors hover:bg-accent/50 has-checked:border-primary has-checked:bg-primary/5"
              >
                <div className="">
                  <Input
                    type="checkbox"
                    value={opt.text}
                    checked={selectedValues.includes(opt.text)}
                    onChange={() => toggleOption(opt.text)}
                    className="h-4 w-4 accent-primary rounded"
                  />
                </div>
                <span className="text-sm w-full">{opt.text}</span>
              </Label>
            ))}
          </div>
        );
      }

      case "DROPDOWN":
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-fit justify-between mt-2 font-normal"
              >
                {value ? value : "Select an option"}
                <ChevronDown className="w-4 h-4 ml-2 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-full">
              <DropdownMenuGroup>
                {question.options.map((opt) => (
                  <DropdownMenuItem
                    key={opt.id}
                    onClick={() => onChange(opt.text)}
                    className="cursor-pointer"
                  >
                    {opt.text}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
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
