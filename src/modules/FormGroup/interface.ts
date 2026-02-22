export interface Option {
  id: string;
  questionId?: string;
  text: string;
  order?: number;
}

export interface Question {
  id: string;
  formId?: string;
  text: string;
  type: string;
  isRequired: boolean;
  order?: number;
  options: Option[];
}

export interface Form {
  id: string;
  title: string;
  description: string;
  status: string;
  userId: string;
  createdAt: string;
  questions: Question[];
}

export interface Answer {
  id: string;
  submissionId: string;
  questionId: string;
  value: string;
}

export interface Submission {
  id: string;
  formId: string;
  createdAt: string;
  answers: Answer[];
}

export interface QuestionStats {
  questionId: string;
  questionText: string;
  questionType: string;
  totalAnswers: number;
  optionCounts: { label: string; count: number }[];
  textResponses: string[];
}
