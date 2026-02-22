export const QUESTION_TYPES = [
  { value: "SHORT_TEXT", label: "Short Text" },
  { value: "LONG_TEXT", label: "Long Text" },
  { value: "RADIO", label: "Single Choice" },
  { value: "CHECKBOX", label: "Multiple Choice" },
  { value: "DROPDOWN", label: "Dropdown" },
];

export const FORM_STATUS = [
  { value: "DRAFT", label: "Draft" },
  { value: "PUBLISHED", label: "Published" },
  { value: "CLOSED", label: "Closed" },
] as const;

export const FALLBACK_COLORS = [
  "#e76e50",
  "#2a9d8f",
  "#264653",
  "#e9c46a",
  "#f4a261",
  "#7c3aed",
  "#06b6d4",
  "#f43f5e",
];