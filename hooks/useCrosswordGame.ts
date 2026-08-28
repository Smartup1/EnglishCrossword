import { useMemo, useState } from "react";
import { STARTER_PUZZLE } from "../data/puzzles";
import { createGrid, isPuzzleComplete } from "../game/crosswordGenerator";

export function useCrosswordGame() {
  const [grid, setGrid] = useState(() => createGrid(STARTER_PUZZLE));
  const [selected, setSelected] = useState<{ row: number; col: number } | null>(null);

  const complete = useMemo(() => isPuzzleComplete(grid), [grid]);

  function selectCell(row: number, col: number) {
    if (grid[row][col].letter) setSelected({ row, col });
  }

  function typeLetter(letter: string) {
    if (!selected) return;
    setGrid(current => current.map((row, r) =>
      row.map((cell, c) =>
        r === selected.row && c === selected.col
          ? { ...cell, value: letter.toUpperCase() }
          : cell
      )
    ));
  }

  function erase() {
    if (!selected) return;
    setGrid(current => current.map((row, r) =>
      row.map((cell, c) =>
        r === selected.row && c === selected.col ? { ...cell, value: "" } : cell
      )
    ));
  }

  return { grid, selected, selectCell, typeLetter, erase, complete, words: STARTER_PUZZLE };
}