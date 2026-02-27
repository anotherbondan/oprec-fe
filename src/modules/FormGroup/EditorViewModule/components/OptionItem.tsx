"use client";

import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";

interface Props {
  value: string;
  onDelete: () => void;
  onBlur: (value: string) => void;
}

export default function OptionItem({ value, onDelete, onBlur }: Props) {
  const [localValue, setLocalValue] = useState(value);
  return (
    <div className="flex gap-2">
      <Input
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={() => onBlur(localValue)}
      />

      <Button size="icon" variant="ghost" onClick={onDelete}>
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
}
