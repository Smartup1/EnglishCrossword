export type Direction = "across" | "down";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type CrosswordWord = {
  id: string;
  answer: string;
  clue: string;
  category?: string;
  difficulty?: Difficulty;
  translation?: string;
  pronunciation?: string;
  example?: string;
  row?: number;
  col?: number;
  direction?: Direction;
};

/** A word after the generator has assigned it a fixed position. */
export type PlacedWord = CrosswordWord & {
  row: number;
  col: number;
  direction: Direction;
  /** Clue number matching the number printed in the grid's starting cell. */
  number?: number;
};

export type Cell = {
  letter: string | null;
  value: string;
  wordIds: string[];
  /** Clue number shown in the top-left corner of the cell, when this cell starts a word. */
  number?: number;
};

export type GeneratedCrossword = {
  grid: Cell[][];
  placedWords: PlacedWord[];
  size: number;
};
