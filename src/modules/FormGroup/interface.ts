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