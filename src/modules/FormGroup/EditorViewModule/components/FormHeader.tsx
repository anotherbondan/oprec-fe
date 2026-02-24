"use client";

import { Input } from "@/src/components/ui/input";
import { Card, CardHeader } from "@/src/components/ui/card";

interface Props {
  title: string;
  description: string;
  onChangeTitle: (value: string) => void;
  onBlurTitle: (value: string) => void;
  onChangeDescription: (value: string) => void;
  onBlurDescription: (value: string) => void;
}

export default function FormHeader({
  title,
  description,
  onChangeTitle,
  onBlurTitle,
  onChangeDescription,
  onBlurDescription,
}: Props) {
  return (
    <Card className="border-t-8 border-t-primary shadow-md mb-6">
      <CardHeader>
        <Input
          className="text-2xl font-bold border-none pl-3"
          value={title}
          onChange={(e) => onChangeTitle(e.target.value)}
          onBlur={(e) => onBlurTitle(e.target.value)}
        />

        <Input
          className="mt-2 border-none pl-3"
          value={description}
          onChange={(e) => onChangeDescription(e.target.value)}
          onBlur={(e) => onBlurDescription(e.target.value)}
        />
      </CardHeader>
    </Card>
  );
}