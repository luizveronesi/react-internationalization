export type Question = {
  question: string;
  answers: string[];
  correct: number; // correspond to the index of the array of answers
  code?: string; // if there is code to be analyzed
  translations: Record<string, string[]>; // key is the international code for the language, first element is the question
};
