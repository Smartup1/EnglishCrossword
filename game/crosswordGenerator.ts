import { Cell, CrosswordWord } from "../types/crossword";

export function createGrid(words: CrosswordWord[], size = 9): Cell[][] {
  const grid = Array.from({ length: size }, () =>
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

export function isPuzzleComplete(grid: Cell[][]) {
  return grid.every(row =>
    row.every(cell => cell.letter === null || cell.value === cell.letter)
  );
}