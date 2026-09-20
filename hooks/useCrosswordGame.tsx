import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ALL_WORDS } from "../data/words";
import { generateCrossword, isPuzzleComplete, isWordComplete } from "../game/crosswordGenerator";
import { Cell, CrosswordWord, Direction, PlacedWord } from "../types/crossword";
import { addProgress, loadProgress, PlayerProgress } from "../services/progressStorage";

const XP_PER_WORD = 10;
const XP_PER_PUZZLE = 100;

type SelectedCell = { row: number; col: number };

function cloneGrid(grid: Cell[][]): Cell[][] {
  return grid.map(row => row.map(cell => ({ ...cell })));
}

function wordsAtCell(placedWords: PlacedWord[], row: number, col: number): PlacedWord[] {
  return placedWords.filter(word => {
    for (let i = 0; i < word.answer.length; i++) {
      const r = word.direction === "down" ? word.row + i : word.row;
      const c = word.direction === "across" ? word.col + i : word.col;
      if (r === row && c === col) return true;
    }
    return false;
  });
}

function indexInWord(word: PlacedWord, row: number, col: number): number {
  return word.direction === "down" ? row - word.row : col - word.col;
}

export function useCrosswordGame(words: CrosswordWord[] = ALL_WORDS, maxWords = 6) {
  const crossword = useMemo(() => generateCrossword(words, { maxWords }), [words, maxWords]);

  const [grid, setGrid] = useState<Cell[][]>(() => cloneGrid(crossword.grid));
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
  const [activeDirection, setActiveDirection] = useState<Direction>("across");
  const [completedWordIds, setCompletedWordIds] = useState<Set<string>>(new Set());
  const [learnedWord, setLearnedWord] = useState<PlacedWord | null>(null);

  // Progress (XP/coins/level/words learned) is persisted across app restarts
  // via AsyncStorage — see services/progressStorage.tsx (Fase 5/6 do roadmap).
  const [progress, setProgress] = useState<PlayerProgress>({
    xp: 0,
    coins: 0,
    level: 1,
    wordsLearned: []
  });
  const progressRef = useRef(progress);
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    let cancelled = false;
    loadProgress().then(loaded => {
      if (!cancelled) setProgress(loaded);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const placedWords = crossword.placedWords;

  const activeWord = useMemo<PlacedWord | null>(() => {
    if (!selectedCell) return null;
    const candidates = wordsAtCell(placedWords, selectedCell.row, selectedCell.col);
    return candidates.find(word => word.direction === activeDirection) ?? candidates[0] ?? null;
  }, [placedWords, selectedCell, activeDirection]);

  const activeWordCells = useMemo(() => {
    if (!activeWord) return [];
    const cells: SelectedCell[] = [];
    for (let i = 0; i < activeWord.answer.length; i++) {
      cells.push({
        row: activeWord.direction === "down" ? activeWord.row + i : activeWord.row,
        col: activeWord.direction === "across" ? activeWord.col + i : activeWord.col
      });
    }
    return cells;
  }, [activeWord]);

  const complete = useMemo(() => isPuzzleComplete(grid), [grid]);

  const selectCell = useCallback(
    (row: number, col: number) => {
      if (!grid[row]?.[col]?.letter) return;

      const candidates = wordsAtCell(placedWords, row, col);
      if (candidates.length === 0) return;

      const tappingSameCell = selectedCell?.row === row && selectedCell?.col === col;

      if (tappingSameCell && candidates.length > 1) {
        // Toggle between across/down when the cell belongs to two words.
        setActiveDirection(current => (current === "across" ? "down" : "across"));
        return;
      }

      const preferred = candidates.find(word => word.direction === activeDirection);
      setActiveDirection((preferred ?? candidates[0]).direction);
      setSelectedCell({ row, col });
    },
    [grid, placedWords, selectedCell, activeDirection]
  );

  const selectWord = useCallback((word: PlacedWord) => {
    setActiveDirection(word.direction);
    setSelectedCell({ row: word.row, col: word.col });
  }, []);

  const moveWithinActiveWord = useCallback(
    (fromRow: number, fromCol: number, delta: 1 | -1) => {
      if (!activeWord) return;
      const index = indexInWord(activeWord, fromRow, fromCol) + delta;
      if (index < 0 || index >= activeWord.answer.length) return;
      const row = activeWord.direction === "down" ? activeWord.row + index : activeWord.row;
      const col = activeWord.direction === "across" ? activeWord.col + index : activeWord.col;
      setSelectedCell({ row, col });
    },
    [activeWord]
  );

  const typeLetter = useCallback(
    (letter: string) => {
      if (!selectedCell) return;
      const { row, col } = selectedCell;
      const upper = letter.toUpperCase();

      setGrid(current => {
        const next = current.map((r, ri) =>
          r.map((cell, ci) => (ri === row && ci === col ? { ...cell, value: upper } : cell))
        );

        if (activeWord && isWordComplete(next, activeWord) && !completedWordIds.has(activeWord.id)) {
          setCompletedWordIds(prev => new Set(prev).add(activeWord.id));
          setLearnedWord(activeWord);

          const puzzleWillBeComplete = isPuzzleComplete(next);
          addProgress(progressRef.current, {
            xp: XP_PER_WORD + (puzzleWillBeComplete ? XP_PER_PUZZLE : 0),
            coins: 5,
            newlyLearnedWordId: activeWord.id
          }).then(setProgress);
        }

        return next;
      });

      moveWithinActiveWord(row, col, 1);
    },
    [selectedCell, activeWord, completedWordIds, moveWithinActiveWord]
  );

  const erase = useCallback(() => {
    if (!selectedCell) return;
    const { row, col } = selectedCell;

    setGrid(current => {
      const currentValue = current[row][col].value;
      if (currentValue) {
        return current.map((r, ri) =>
          r.map((cell, ci) => (ri === row && ci === col ? { ...cell, value: "" } : cell))
        );
      }
      return current;
    });

    if (!grid[row][col].value) {
      moveWithinActiveWord(row, col, -1);
    }
  }, [selectedCell, grid, moveWithinActiveWord]);

  const dismissLearnedWord = useCallback(() => setLearnedWord(null), []);

  const useHint = useCallback(() => {
    if (!activeWord || progress.coins < 20) return;
    const nextEmptyIndex = activeWord.answer
      .split("")
      .findIndex((letter, i) => {
        const r = activeWord.direction === "down" ? activeWord.row + i : activeWord.row;
        const c = activeWord.direction === "across" ? activeWord.col + i : activeWord.col;
        return grid[r][c].value !== letter;
      });
    if (nextEmptyIndex === -1) return;

    const row = activeWord.direction === "down" ? activeWord.row + nextEmptyIndex : activeWord.row;
    const col = activeWord.direction === "across" ? activeWord.col + nextEmptyIndex : activeWord.col;
    const letter = activeWord.answer[nextEmptyIndex];

    const wordWillComplete =
      !completedWordIds.has(activeWord.id) &&
      activeWord.answer
        .split("")
        .every((expected, i) => {
          const r = activeWord.direction === "down" ? activeWord.row + i : activeWord.row;
          const c = activeWord.direction === "across" ? activeWord.col + i : activeWord.col;
          return (r === row && c === col) || grid[r][c].value === expected;
        });

    addProgress(progressRef.current, {
      coins: -20,
      xp: wordWillComplete ? XP_PER_WORD : 0,
      newlyLearnedWordId: wordWillComplete ? activeWord.id : undefined
    }).then(setProgress);

    if (wordWillComplete) {
      setCompletedWordIds(prev => new Set(prev).add(activeWord.id));
    }

    setGrid(current =>
      current.map((r, ri) =>
        r.map((cell, ci) => (ri === row && ci === col ? { ...cell, value: letter } : cell))
      )
    );
  }, [activeWord, progress.coins, grid, completedWordIds]);

  /**
   * Botão "revelar letra": grátis, revela UMA letra por toque.
   * Começa pela palavra selecionada; quando ela fica pronta, segue para a
   * próxima palavra incompleta, até o puzzle inteiro ficar preenchido.
   * Palavras terminadas com ajuda contam como aprendidas, mas não dão XP/moedas.
   */
  const revealNext = useCallback(() => {
    if (complete) return;

    const target =
      activeWord && !isWordComplete(grid, activeWord)
        ? activeWord
        : placedWords.find(word => !isWordComplete(grid, word));
    if (!target) return;

    const index = target.answer.split("").findIndex((letter, i) => {
      const r = target.direction === "down" ? target.row + i : target.row;
      const c = target.direction === "across" ? target.col + i : target.col;
      return grid[r][c].value !== letter;
    });
    if (index === -1) return;

    const row = target.direction === "down" ? target.row + index : target.row;
    const col = target.direction === "across" ? target.col + index : target.col;
    const letter = target.answer[index];

    const next = grid.map((r, ri) =>
      r.map((cell, ci) => (ri === row && ci === col ? { ...cell, value: letter } : cell))
    );
    setGrid(next);
    setActiveDirection(target.direction);
    setSelectedCell({ row, col });

    // A letra revelada pode terminar a palavra atual e/ou a que a cruza.
    const newlyDone = placedWords.filter(
      word => !completedWordIds.has(word.id) && isWordComplete(next, word)
    );
    if (newlyDone.length > 0) {
      setCompletedWordIds(prev => {
        const updated = new Set(prev);
        newlyDone.forEach(word => updated.add(word.id));
        return updated;
      });

      (async () => {
        let current = progressRef.current;
        for (const word of newlyDone) {
          current = await addProgress(current, { newlyLearnedWordId: word.id });
        }
        setProgress(current);
      })();
    }
  }, [complete, activeWord, grid, placedWords, completedWordIds]);

  const lettersLeft = useMemo(
    () =>
      grid.reduce(
        (total, row) =>
          total + row.filter(cell => cell.letter !== null && cell.value !== cell.letter).length,
        0
      ),
    [grid]
  );

  return {
    grid,
    words: placedWords,
    selected: selectedCell,
    activeWord,
    activeWordCells,
    activeDirection,
    completedWordIds,
    learnedWord,
    xp: progress.xp,
    coins: progress.coins,
    level: progress.level,
    wordsLearnedCount: progress.wordsLearned.length,
    complete,
    selectCell,
    selectWord,
    typeLetter,
    erase,
    useHint,
    revealNext,
    lettersLeft,
    dismissLearnedWord
  };
}
