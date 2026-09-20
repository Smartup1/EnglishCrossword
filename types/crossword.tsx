export type Direction = "across" | "down";

export type Difficulty = "beginner" | "intermediate" | "advanced";

/** Idioma da pista mostrada ao jogador (a resposta está no outro idioma). */
export type ClueLang = "en" | "pt";

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
  /** Forma de exibição em inglês (ex.: "school"). Preenchido por prepareWords. */
  english?: string;
  /** Forma de exibição em português, com acentos (ex.: "maçã"). Preenchido por prepareWords. */
  portuguese?: string;
  /** Idioma da pista. "pt" = vê português e responde em inglês. */
  clueLang?: ClueLang;
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
