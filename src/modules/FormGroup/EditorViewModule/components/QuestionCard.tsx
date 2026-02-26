"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import OptionItem from "./OptionItem";
import { QUESTION_TYPES } from "../../const";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Label } from "@/src/components/ui/label";

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
  const [localText, setLocalText] = useState<string | null>(null);
  const displayText = localText ?? question.text;

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex w-full gap-2">
          <Input
            value={displayText}
            onChange={(e) => {
              setLocalText(e.target.value);
              onChangeText(e.target.value);
            }}
            onBlur={(e) => {
              onBlurText(e.target.value);
              setLocalText(null);
            }}
            placeholder={`Question ${index + 1}`}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {
                  QUESTION_TYPES.find((type) => type.value === question.type)
                    ?.label
                }{" "}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Choose Question Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {QUESTION_TYPES.map((type) => (
                  <DropdownMenuItem
                    key={type.value}
                    onClick={() => onChangeType(type.value)}
                  >
                    {type.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

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
          <Label className="flex items-center gap-2">
            <Input
              type="checkbox"
              checked={question.isRequired}
              onChange={(e) => onToggleRequired(e.target.checked)}
            />
            Required
          </Label>

          <Button size="icon" variant="ghost" onClick={onDelete}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default React.memo(QuestionCard);
