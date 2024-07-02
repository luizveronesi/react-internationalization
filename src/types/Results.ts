interface Result {
  correct: number;
  total: number;
}

export interface Results {
  [theme: string]: {
    [level: string]: Result;
  };
}
