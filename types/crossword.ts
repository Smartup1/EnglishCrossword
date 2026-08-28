export type Direction = "across" | "down";

export type CrosswordWord = {
  id: string;
  answer: string;
  clue: string;
  row?: number;
  col?: number;
  direction?: Direction;
};

export type Cell = {
  letter: string | null;
  value: string;
  wordIds: string[];
};