import { Cell, CrosswordWord, Direction, GeneratedCrossword, PlacedWord } from "../types/crossword";

/**
 * Crossword generation engine (Fase 3 do roadmap).
 *
 * Responsável por:
 *  1. Escolher uma palavra inicial e colocá-la no centro da grade.
 *  2. Procurar palavras com letras em comum às já posicionadas.
 *  3. Tentar cruzar horizontalmente e verticalmente.
 *  4. Validar colisões (letras conflitantes e palavras "coladas").
 *  5. Priorizar o posicionamento que gera mais cruzamentos com o que já existe.
 *  6. Cortar a grade para o menor retângulo que contém todas as palavras.
 *
 * O componente visual nunca deve calcular posições: essa responsabilidade
 * fica isolada aqui, em game/crosswordGenerator.ts.
 */

type Occupied = {
  letter: string;
  wordIds: string[];
};

type GenerateOptions = {
  /** Working canvas size used while placing words, before trimming. Default 21. */
  workingSize?: number;
  /** Max number of words to try to fit. Default: all provided words. */
  maxWords?: number;
  /** Extra empty cells kept around the trimmed puzzle. Default 0. */
  padding?: number;
};

function cellKey(row: number, col: number): string {
  return `${row},${col}`;
}

/**
 * Attempts to place `word` at (row, col) in `direction` against the current
 * occupied map. Returns false on any letter conflict or if the word would
 * touch another word head-to-tail (which would silently create an
 * unintended longer word).
 */
function canPlace(
  occupied: Map<string, Occupied>,
  word: string,
  row: number,
  col: number,
  direction: Direction,
  size: number
): boolean {
  for (let i = 0; i < word.length; i++) {
    const r = direction === "down" ? row + i : row;
    const c = direction === "across" ? col + i : col;
    if (r < 0 || c < 0 || r >= size || c >= size) return false;

    const existing = occupied.get(cellKey(r, c));
    if (existing && existing.letter !== word[i]) return false;

    // If this cell is new (not a crossing), its perpendicular neighbours
    // must be empty, otherwise the word would run alongside another one.
    if (!existing) {
      const neighbours =
        direction === "across"
          ? [cellKey(r - 1, c), cellKey(r + 1, c)]
          : [cellKey(r, c - 1), cellKey(r, c + 1)];
      for (const key of neighbours) {
        if (occupied.has(key)) return false;
      }
    }
  }

  // The cell right before the start and right after the end must be empty,
  // otherwise this word would merge into a neighbouring one.
  const beforeR = direction === "down" ? row - 1 : row;
  const beforeC = direction === "across" ? col - 1 : col;
  if (beforeR >= 0 && beforeC >= 0 && occupied.has(cellKey(beforeR, beforeC))) return false;

  const afterR = direction === "down" ? row + word.length : row;
  const afterC = direction === "across" ? col + word.length : col;
  if (afterR < size && afterC < size && occupied.has(cellKey(afterR, afterC))) return false;

  return true;
}

function place(
  occupied: Map<string, Occupied>,
  word: CrosswordWord,
  row: number,
  col: number,
  direction: Direction
): PlacedWord {
  for (let i = 0; i < word.answer.length; i++) {
    const r = direction === "down" ? row + i : row;
    const c = direction === "across" ? col + i : col;
    const key = cellKey(r, c);
    const existing = occupied.get(key);
    occupied.set(key, {
      letter: word.answer[i],
      wordIds: existing ? [...existing.wordIds, word.id] : [word.id]
    });
  }
  return { ...word, row, col, direction };
}

/**
 * Generates a crossword puzzle from a pool of candidate words.
 *
 * Strategy (greedy with best-fit scoring, as described in the README):
 *  - Sort candidates by length (longer words anchor the grid better).
 *  - Place the first word across the middle of a working canvas.
 *  - For every following candidate, scan all already-placed words for a
 *    shared letter and evaluate every valid crossing position, scoring by
 *    number of overlaps with existing letters (more connections = better).
 *  - Keep the best scoring placement found; skip words that cannot cross
 *    anything without a collision.
 *  - Trim the working canvas down to the smallest rectangle that still
 *    contains every placed word.
 */
export function generateCrossword(
  words: CrosswordWord[],
  options: GenerateOptions = {}
): GeneratedCrossword {
  const workingSize = options.workingSize ?? 21;
  const maxWords = options.maxWords ?? words.length;
  const padding = options.padding ?? 0;

  const candidates = [...words]
    .filter(word => word.answer && word.answer.length > 0)
    .sort((a, b) => b.answer.length - a.answer.length);

  if (candidates.length === 0) {
    return { grid: [], placedWords: [], size: 0 };
  }

  const occupied = new Map<string, Occupied>();
  const placed: PlacedWord[] = [];

  const first = candidates[0];
  const startRow = Math.floor(workingSize / 2);
  const startCol = Math.floor((workingSize - first.answer.length) / 2);
  placed.push(place(occupied, first, startRow, startCol, "across"));

  for (let idx = 1; idx < candidates.length && placed.length < maxWords; idx++) {
    const word = candidates[idx];
    if (placed.some(p => p.id === word.id)) continue;

    let best: { row: number; col: number; direction: Direction; score: number } | null = null;

    for (const existingWord of placed) {
      for (let i = 0; i < word.answer.length; i++) {
        for (let j = 0; j < existingWord.answer.length; j++) {
          if (word.answer[i] !== existingWord.answer[j]) continue;

          const direction: Direction = existingWord.direction === "across" ? "down" : "across";
          const row = direction === "down" ? existingWord.row - i : existingWord.row + j;
          const col = direction === "across" ? existingWord.col - i : existingWord.col + j;

          if (!canPlace(occupied, word.answer, row, col, direction, workingSize)) continue;

          let crossings = 0;
          for (let k = 0; k < word.answer.length; k++) {
            const r = direction === "down" ? row + k : row;
            const c = direction === "across" ? col + k : col;
            if (occupied.has(cellKey(r, c))) crossings++;
          }

          if (!best || crossings > best.score) {
            best = { row, col, direction, score: crossings };
          }
        }
      }
    }

    if (best) {
      placed.push(place(occupied, word, best.row, best.col, best.direction));
    }
  }

  return buildGrid(placed, occupied, padding);
}

/** Trims the working canvas to the smallest rectangle containing every placed word and builds the Cell grid. */
function buildGrid(
  placed: PlacedWord[],
  occupied: Map<string, Occupied>,
  padding: number
): GeneratedCrossword {
  let minRow = Infinity;
  let maxRow = -Infinity;
  let minCol = Infinity;
  let maxCol = -Infinity;

  for (const key of Array.from(occupied.keys())) {
    const [r, c] = key.split(",").map(Number);
    minRow = Math.min(minRow, r);
    maxRow = Math.max(maxRow, r);
    minCol = Math.min(minCol, c);
    maxCol = Math.max(maxCol, c);
  }

  minRow -= padding;
  minCol -= padding;
  maxRow += padding;
  maxCol += padding;

  const height = maxRow - minRow + 1;
  const width = maxCol - minCol + 1;

  const grid: Cell[][] = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({ letter: null, value: "", wordIds: [] }))
  );

  for (const [key, data] of Array.from(occupied.entries())) {
    const [r, c] = key.split(",").map(Number);
    grid[r - minRow][c - minCol] = {
      letter: data.letter,
      value: "",
      wordIds: data.wordIds
    };
  }

  const normalizedPlaced: PlacedWord[] = placed.map(word => ({
    ...word,
    row: word.row - minRow,
    col: word.col - minCol
  }));

  // Assign clue numbers: a cell gets a number when it's the start of an
  // across and/or down word (standard crossword numbering).
  let nextNumber = 1;
  const numbered = new Map<string, number>();
  const sortedByPosition = [...normalizedPlaced].sort((a, b) => a.row - b.row || a.col - b.col);
  for (const word of sortedByPosition) {
    const key = cellKey(word.row, word.col);
    if (!numbered.has(key)) {
      numbered.set(key, nextNumber);
      nextNumber++;
    }
    grid[word.row][word.col].number = numbered.get(key);
  }

  const numberedPlaced: PlacedWord[] = normalizedPlaced.map(word => ({
    ...word,
    number: numbered.get(cellKey(word.row, word.col))
  }));

  return { grid, placedWords: numberedPlaced, size: Math.max(height, width) };
}

/** Legacy helper kept for backwards compatibility with statically positioned puzzles (data/puzzles.ts). */
export function createGrid(words: CrosswordWord[], size = 9): Cell[][] {
  const grid: Cell[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({ letter: null, value: "", wordIds: [] }))
  );

  for (const word of words) {
    if (word.row === undefined || word.col === undefined || !word.direction) continue;

    for (let i = 0; i < word.answer.length; i++) {
      const row = word.direction === "down" ? word.row + i : word.row;
      const col = word.direction === "across" ? word.col + i : word.col;

      if (row < 0 || col < 0 || row >= size || col >= size) continue;

      grid[row][col].letter = word.answer[i];
      grid[row][col].wordIds.push(word.id);
    }
  }
  return grid;
}

export function isPuzzleComplete(grid: Cell[][]): boolean {
  return grid.every(row => row.every(cell => cell.letter === null || cell.value === cell.letter));
}

/** Returns true when every cell belonging to a specific word already has the correct value. */
export function isWordComplete(grid: Cell[][], word: PlacedWord): boolean {
  for (let i = 0; i < word.answer.length; i++) {
    const r = word.direction === "down" ? word.row + i : word.row;
    const c = word.direction === "across" ? word.col + i : word.col;
    if (grid[r]?.[c]?.value !== word.answer[i]) return false;
  }
  return true;
}
