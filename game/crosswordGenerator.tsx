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

export type GenerateOptions = {
  /** Working canvas size used while placing words, before trimming. Default 21. */
  workingSize?: number;
  /** Max number of words to try to fit. Default: all provided words. */
  maxWords?: number;
  /** Extra empty cells kept around the trimmed puzzle. Default 0. */
  padding?: number;
  /**
   * Sorteia as palavras e as posições a cada chamada (cada partida fica
   * diferente e palavras curtas também entram). Default false = comportamento
   * antigo, sempre igual, com as palavras mais longas.
   */
  random?: boolean;
  /** Quantas tentativas sorteadas fazer procurando um encaixe bom. Default 150. */
  attempts?: number;
  /** Largura máxima da grade final, em células (a tela só comporta ~9). Default sem limite. */
  maxCols?: number;
  /** Altura máxima da grade final, em células. Default sem limite. */
  maxRows?: number;
  /** Fonte de aleatoriedade (útil em testes). Default Math.random. */
  rng?: () => number;
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

type Layout = {
  placed: PlacedWord[];
  occupied: Map<string, Occupied>;
};

type Limits = {
  workingSize: number;
  maxWords: number;
  maxCols: number;
  maxRows: number;
  random: boolean;
  rng: () => number;
};

/** Caixa que contém todas as letras já colocadas. */
type Bounds = { minR: number; maxR: number; minC: number; maxC: number };

function boundsOf(occupied: Map<string, Occupied>): Bounds {
  let minR = Infinity;
  let maxR = -Infinity;
  let minC = Infinity;
  let maxC = -Infinity;
  for (const key of Array.from(occupied.keys())) {
    const [r, c] = key.split(",").map(Number);
    minR = Math.min(minR, r);
    maxR = Math.max(maxR, r);
    minC = Math.min(minC, c);
    maxC = Math.max(maxC, c);
  }
  return { minR, maxR, minC, maxC };
}

/** A grade continuaria dentro do limite de largura/altura se a palavra fosse colocada aqui? */
function fitsLimits(
  bounds: Bounds,
  wordLength: number,
  row: number,
  col: number,
  direction: Direction,
  limits: Limits
): boolean {
  const endR = direction === "down" ? row + wordLength - 1 : row;
  const endC = direction === "across" ? col + wordLength - 1 : col;
  const height = Math.max(bounds.maxR, endR) - Math.min(bounds.minR, row) + 1;
  const width = Math.max(bounds.maxC, endC) - Math.min(bounds.minC, col) + 1;
  return height <= limits.maxRows && width <= limits.maxCols;
}

/**
 * Uma tentativa de montar a grade com as palavras na ordem recebida.
 * A primeira vai no centro; cada seguinte cruza uma já colocada, na posição
 * com mais cruzamentos (no modo aleatório, empates são sorteados).
 */
function layoutOnce(candidates: CrosswordWord[], limits: Limits): Layout | null {
  if (candidates.length === 0) return null;

  const { workingSize, maxWords, rng, random } = limits;
  const occupied = new Map<string, Occupied>();
  const placed: PlacedWord[] = [];

  const first = candidates[0];
  // Palavra que não cabe na largura da tela vai na vertical.
  const firstDirection: Direction = !random
    ? "across"
    : first.answer.length > limits.maxCols
      ? "down"
      : rng() < 0.5
        ? "across"
        : "down";
  const mid = Math.floor(workingSize / 2);
  const offset = Math.floor((workingSize - first.answer.length) / 2);
  placed.push(
    place(
      occupied,
      first,
      firstDirection === "across" ? mid : offset,
      firstDirection === "across" ? offset : mid,
      firstDirection
    )
  );

  for (let idx = 1; idx < candidates.length && placed.length < maxWords; idx++) {
    const word = candidates[idx];
    if (placed.some(p => p.id === word.id)) continue;

    const bounds = boundsOf(occupied);
    let bestScore = 0;
    let options: { row: number; col: number; direction: Direction }[] = [];

    for (const existingWord of placed) {
      for (let i = 0; i < word.answer.length; i++) {
        for (let j = 0; j < existingWord.answer.length; j++) {
          if (word.answer[i] !== existingWord.answer[j]) continue;

          const direction: Direction = existingWord.direction === "across" ? "down" : "across";
          const row = direction === "down" ? existingWord.row - i : existingWord.row + j;
          const col = direction === "across" ? existingWord.col - i : existingWord.col + j;

          if (!canPlace(occupied, word.answer, row, col, direction, workingSize)) continue;
          if (!fitsLimits(bounds, word.answer.length, row, col, direction, limits)) continue;

          let crossings = 0;
          for (let k = 0; k < word.answer.length; k++) {
            const r = direction === "down" ? row + k : row;
            const c = direction === "across" ? col + k : col;
            if (occupied.has(cellKey(r, c))) crossings++;
          }

          if (crossings > bestScore) {
            bestScore = crossings;
            options = [{ row, col, direction }];
          } else if (crossings === bestScore && crossings > 0) {
            options.push({ row, col, direction });
          }
        }
      }
    }

    if (options.length > 0) {
      const chosen = random ? options[Math.floor(rng() * options.length)] : options[0];
      placed.push(place(occupied, word, chosen.row, chosen.col, chosen.direction));
    }
  }

  return { placed, occupied };
}

function countCrossings(occupied: Map<string, Occupied>): number {
  let total = 0;
  for (const cell of Array.from(occupied.values())) if (cell.wordIds.length > 1) total++;
  return total;
}

/** Sorteia `count` palavras diferentes (Fisher–Yates parcial). */
function sample<T>(items: T[], count: number, rng: () => number): T[] {
  const copy = [...items];
  const n = Math.min(count, copy.length);
  for (let i = 0; i < n; i++) {
    const j = i + Math.floor(rng() * (copy.length - i));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

/**
 * Generates a crossword puzzle from a pool of candidate words.
 *
 * Modo padrão (random = false): estratégia gulosa e determinística original —
 * ordena por tamanho e cruza cada palavra na melhor posição.
 *
 * Modo random = true (o do jogo):
 *  - sorteia as palavras do banco (curtas e longas com a mesma chance);
 *  - tenta encaixar todas; se o grupo não couber, sorteia outro;
 *  - só aceita grades que respeitam maxCols x maxRows (caber na tela);
 *  - entre 3 grades que encaixaram tudo, escolhe a mais compacta;
 *  - se nenhuma encaixar tudo, fica com a que encaixou mais palavras.
 */
export function generateCrossword(
  words: CrosswordWord[],
  options: GenerateOptions = {}
): GeneratedCrossword {
  const workingSize = options.workingSize ?? 21;
  const maxWords = options.maxWords ?? words.length;
  const padding = options.padding ?? 0;
  const random = options.random ?? false;
  const rng = options.rng ?? Math.random;
  const maxCols = options.maxCols ?? Infinity;
  const maxRows = options.maxRows ?? Infinity;

  const limits: Limits = { workingSize, maxWords, maxCols, maxRows, random, rng };
  const pool = words.filter(word => word.answer && word.answer.length > 0);

  if (pool.length === 0) {
    return { grid: [], placedWords: [], size: 0 };
  }

  if (!random) {
    const ordered = [...pool].sort((a, b) => b.answer.length - a.answer.length);
    const layout = layoutOnce(ordered, limits)!;
    return buildGrid(layout.placed, layout.occupied, padding);
  }

  // Palavras que nunca caberiam (mais longas que a maior dimensão) ficam de fora.
  const longestAllowed = Math.max(Math.min(maxCols, workingSize), Math.min(maxRows, workingSize));
  const eligible = pool.filter(word => word.answer.length <= longestAllowed);
  const usable = eligible.length > 0 ? eligible : pool;

  const target = Math.min(maxWords, usable.length);
  // Sorteia EXATAMENTE as palavras da partida. (Sortear mais e encaixar as que
  // couberem favorecia palavras fáceis de cruzar e quase eliminava as curtas.)
  // Se o grupo sorteado não couber inteiro, sorteia outro.
  const sampleSize = target;
  const attempts = options.attempts ?? 150;
  const wantedSuccesses = 3;

  let bestPartial: { layout: Layout; score: number } | null = null;
  const successes: { layout: Layout; score: number }[] = [];

  for (let attempt = 0; attempt < attempts && successes.length < wantedSuccesses; attempt++) {
    // Palavras longas primeiro (ancoram melhor), com desempate sorteado.
    const ordered = sample(usable, sampleSize, rng).sort(
      (a, b) => b.answer.length - a.answer.length || rng() - 0.5
    );
    const layout = layoutOnce(ordered, limits);
    if (!layout) continue;

    const bounds = boundsOf(layout.occupied);
    const area = (bounds.maxR - bounds.minR + 1) * (bounds.maxC - bounds.minC + 1);
    const score = countCrossings(layout.occupied) * 10 - area * 0.2;

    if (layout.placed.length >= target) {
      successes.push({ layout, score });
    } else {
      const partialScore = layout.placed.length * 1000 + score;
      if (!bestPartial || partialScore > bestPartial.score) {
        bestPartial = { layout, score: partialScore };
      }
    }
  }

  const chosen =
    successes.length > 0
      ? successes.reduce((a, b) => (b.score > a.score ? b : a)).layout
      : bestPartial!.layout;

  return buildGrid(chosen.placed, chosen.occupied, padding);
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
