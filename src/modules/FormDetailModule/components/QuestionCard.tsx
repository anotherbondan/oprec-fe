"use client";

import React from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import OptionItem from "./OptionItem";
import { QUESTION_TYPES } from "../const";

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
  onChangeText: (value: string) => void;
  onChangeType: (value: string) => void;
  onBlurText: (value: string) => void;
  onToggleRequired: (value: boolean) => void;
  onDelete: () => void;
  onAddOption: () => void;
  onChangeOption: (oId: string, value: string) => void;
  onDeleteOption: (oId: string) => void;
}

function QuestionCard({
  question,
  index,
  onChangeText,
  onChangeType,
  onBlurText,
  onToggleRequired,
  onDelete,
  onAddOption,
  onChangeOption,
  onDeleteOption,
}: Props) {
  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <Input
          value={question.text}
          onChange={(e) => onChangeText(e.target.value)}
          onBlur={(e) => onBlurText(e.target.value)}
          placeholder={`Question ${index + 1}`}
        />
        <select
          className="mt-3 border rounded px-2 py-1 text-sm"
          value={question.type}
          onChange={(e) => onChangeType(e.target.value)}
        >
          {QUESTION_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>

        {["RADIO", "CHECKBOX", "DROPDOWN"].includes(question.type) && (
          <div className="mt-4 space-y-2">
            {question.options.map((opt) => (
              <OptionItem
                key={opt.id}
                value={opt.text}
                onChange={(val) => onChangeOption(opt.id, val)}
                onDelete={() => onDeleteOption(opt.id)}
              />
            ))}

            <Button size="sm" variant="outline" onClick={onAddOption}>
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
              onChange={(e) => onToggleRequired(e.target.checked)}
            />
            Required
          </label>

          <Button size="icon" variant="ghost" onClick={onDelete}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default React.memo(QuestionCard);
