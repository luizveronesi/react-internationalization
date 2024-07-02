export type UserData = {
  name: string;
  choices: UserChoice[];
  date: Date;
};

export type UserChoice = {
  theme: number;
  level: string;
  question: number;
  value: number;
  correct: boolean;
};

export const EMPTY_USER: UserData = {
  name: '',
  choices: [],
  date: new Date(),
};
