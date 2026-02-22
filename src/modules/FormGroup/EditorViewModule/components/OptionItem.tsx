"use client";

import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { X } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onDelete: () => void;
}

export default function OptionItem({
  value,
  onChange,
  onDelete,
}: Props) {
  return (
    <div className="flex gap-2">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <Button
        size="icon"
        variant="ghost"
        onClick={onDelete}
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
}