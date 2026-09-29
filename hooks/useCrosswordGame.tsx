import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ALL_WORDS } from "../data/words";
import { generateCrossword, isPuzzleComplete, isWordComplete } from "../game/crosswordGenerator";
import { Cell, CrosswordWord, Direction, PlacedWord } from "../types/crossword";
import {
  emptyProgress,
  levelForXp,
  loadProgress,
  PlayerProgress,
  saveProgress,
  unlockNextLevel
} from "../services/progressStorage";
import {
  DAILY_GOAL_COINS,
  DAILY_GOAL_WORDS,
  dailyWordsFor,
  goalDoneToday,
  registerWordCompleted,
  streakFor,
  todayKey
} from "../services/dailyProgress";
import { playCoinSpent, playCorrect, playKey, playTap, playTick, playTickUrgent, playTimeUp, playVictory } from "../services/sounds";

// ---------- Economia do jogo (ajuste aqui) ----------
const XP_PER_WORD = 10;
const XP_PER_PUZZLE = 100;
const COINS_PER_WORD = 5;
const COINS_PER_PUZZLE = 20;
/** Moedas gastas a cada letra revelada pelo botão de dica. */
export const REVEAL_COST = 5;

// ---------- Relógio da cruzadinha ----------
/** Tempo total (segundos) pra terminar cada cruzadinha antes de estourar. */
export const TIME_LIMIT_SECONDS = 240; // 4 minutos
/** Moedas cobradas quando o tempo esgota e a cruzadinha é reembaralhada. */
export const TIMEOUT_COST = 5;
/**
 * Segundos ganhos no relógio a cada palavra concluída DIGITANDO (não conta
 * quando a palavra é resolvida pelo botão de dica — senão dava pra "trapacear"
 * pagando moedas pra ganhar tempo de graça). Sem teto: quanto mais palavras
 * acertar, mais tempo sobra.
 */
export const TIME_BONUS_PER_WORD = 15;

// ---------- Tamanho máximo da grade ----------
// As células têm 34px e a tela do celular comporta ~9 colunas.
export const MAX_GRID_COLS = 9;
export const MAX_GRID_ROWS = 13;

type SelectedCell = { row: number; col: number };

type ProgressDelta = { xp?: number; coins?: number; newlyLearnedWordId?: string };

/** Quando o puzzle é o nível de uma categoria (não o modo "Todas"). */
export type LevelContext = {
  categoryKey: string;
  level: number;
  totalLevels: number;
};

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

export function useCrosswordGame(
  words: CrosswordWord[] = ALL_WORDS,
  maxWords = 6,
  levelContext?: LevelContext
) {
  // Cada vez que a tela do jogo abre, sorteia palavras e cruzamentos novos.
  // shuffleSeed muda quando o tempo esgota (ver mais abaixo), forçando uma
  // nova cruzadinha com o mesmo grupo de palavras sem sair da tela.
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const crossword = useMemo(
    () =>
      generateCrossword(words, {
        maxWords,
        random: true,
        maxCols: MAX_GRID_COLS,
        maxRows: MAX_GRID_ROWS
      }),
    [words, maxWords, shuffleSeed]
  );

  const [grid, setGrid] = useState<Cell[][]>(() => cloneGrid(crossword.grid));
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
  const [activeDirection, setActiveDirection] = useState<Direction>("across");
  const [completedWordIds, setCompletedWordIds] = useState<Set<string>>(new Set());
  const [learnedWord, setLearnedWord] = useState<PlacedWord | null>(null);

  // Refs espelham o estado de forma SÍNCRONA. Assim dois toques rápidos
  // (ex.: no botão de dica) nunca enxergam um saldo/grade desatualizado.
  const gridRef = useRef(grid);
  const completedRef = useRef(completedWordIds);

  const commitGrid = useCallback((next: Cell[][]) => {
    gridRef.current = next;
    setGrid(next);
  }, []);

  const markCompleted = useCallback((ids: string[]) => {
    const updated = new Set(completedRef.current);
    ids.forEach(id => updated.add(id));
    completedRef.current = updated;
    setCompletedWordIds(updated);
  }, []);

  // Quando o tempo esgota, shuffleSeed muda e o `crossword` acima é
  // recalculado (mesmas palavras, cruzamento novo). Aqui a grade e o
  // progresso da rodada são reiniciados para bater com a cruzadinha nova —
  // exceto na primeira montagem, que já começa correta.
  const isFirstCrossword = useRef(true);
  useEffect(() => {
    if (isFirstCrossword.current) {
      isFirstCrossword.current = false;
      return;
    }
    commitGrid(cloneGrid(crossword.grid));
    completedRef.current = new Set();
    setCompletedWordIds(new Set());
    setLearnedWord(null);
    setSelectedCell(null);
  }, [crossword, commitGrid]);

  // Progresso (XP/moedas/nível/palavras) salvo no aparelho via AsyncStorage.
  // Começa zerado (sem presente) até o progresso salvo carregar.
  const [progress, setProgress] = useState<PlayerProgress>(emptyProgress);
  const progressRef = useRef(progress);
  // Sobe 1 a cada vez que o jogador cumpre a meta do dia (a tela comemora).
  const [goalEvent, setGoalEvent] = useState(0);
  // Sobe 1 a cada vez que o jogador libera o próximo nível de uma categoria.
  const [levelUnlockEvent, setLevelUnlockEvent] = useState(0);
  const [unlockedLevel, setUnlockedLevel] = useState<number | null>(null);

  /** Aplica ganhos/gastos NA HORA (síncrono) e salva em segundo plano. */
  const applyProgress = useCallback((delta: ProgressDelta) => {
    const current = progressRef.current;
    const wordsLearned =
      delta.newlyLearnedWordId && !current.wordsLearned.includes(delta.newlyLearnedWordId)
        ? [...current.wordsLearned, delta.newlyLearnedWordId]
        : current.wordsLearned;
    const xp = current.xp + (delta.xp ?? 0);
    let next: PlayerProgress = {
      ...current,
      xp,
      coins: Math.max(0, current.coins + (delta.coins ?? 0)),
      level: levelForXp(xp),
      wordsLearned
    };

    // Cada palavra concluída conta para a meta do dia e para a sequência.
    let goalReached = false;
    if (delta.newlyLearnedWordId !== undefined) {
      const result = registerWordCompleted(next, todayKey());
      next = result.progress;
      goalReached = result.goalReached;
    }

    progressRef.current = next;
    setProgress(next);
    void saveProgress(next);
    if (goalReached) setGoalEvent(n => n + 1);
  }, []);

  /** Ao terminar o puzzle de um nível de categoria, tenta liberar o próximo. */
  const tryUnlockNextLevel = useCallback(() => {
    if (!levelContext) return;
    const { categoryKey, level, totalLevels } = levelContext;
    const result = unlockNextLevel(progressRef.current, categoryKey, level, totalLevels);
    if (!result.unlockedNew) return;

    progressRef.current = result.progress;
    setProgress(result.progress);
    void saveProgress(result.progress);
    setUnlockedLevel(result.newLevel);
    setLevelUnlockEvent(n => n + 1);
  }, [levelContext]);

  useEffect(() => {
    let cancelled = false;
    loadProgress().then(loaded => {
      if (cancelled) return;
      progressRef.current = loaded;
      setProgress(loaded);
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

  // ---------- Relógio da cruzadinha ----------
  // Reinicia sempre que uma cruzadinha nova entra em cena (primeira vez ou
  // reembaralhada por tempo esgotado).
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT_SECONDS);
  const lastTickMarkRef = useRef(TIME_LIMIT_SECONDS);
  // Sobe 1 quando o tempo esgota e a cruzadinha é reembaralhada (tinha moeda).
  const [timeUpEvent, setTimeUpEvent] = useState(0);
  // Sobe 1 quando o tempo esgota SEM moeda pra pagar — a tela deve voltar ao início.
  const [sentHomeEvent, setSentHomeEvent] = useState(0);

  useEffect(() => {
    setTimeLeft(TIME_LIMIT_SECONDS);
    lastTickMarkRef.current = TIME_LIMIT_SECONDS;
  }, [crossword]);

  // Contagem regressiva: pausa enquanto o card de palavra aprendida está
  // aberto (Modal por cima da tela) ou depois que o jogador já venceu.
  useEffect(() => {
    if (complete || learnedWord || timeLeft <= 0) return;
    const id = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, complete, learnedWord]);

  // Tique a cada minuto cheio, avisos aos 30/20/10s, e tique afiado a cada
  // segundo nos últimos 10s (vai ficando mais urgente conforme o tempo acaba).
  useEffect(() => {
    if (timeLeft <= 0) return;
    const isMinuteMark = timeLeft % 60 === 0 && timeLeft !== lastTickMarkRef.current;
    if (isMinuteMark) {
      lastTickMarkRef.current = timeLeft;
      playTick();
      return;
    }
    if (timeLeft <= 30 && timeLeft % 10 === 0) {
      playTick();
      return;
    }
    if (timeLeft <= 10) {
      playTickUrgent();
    }
  }, [timeLeft]);

  // Tempo esgotado: buzina + reembaralha cobrando TIMEOUT_COST, ou — sem
  // moedas suficientes — avisa a tela (via sentHomeEvent) pra voltar ao início.
  const timeUpHandledRef = useRef(false);
  useEffect(() => {
    if (complete) return;
    if (timeLeft > 0) {
      timeUpHandledRef.current = false;
      return;
    }
    if (timeUpHandledRef.current) return;
    timeUpHandledRef.current = true;

    playTimeUp();
    if (progressRef.current.coins >= TIMEOUT_COST) {
      applyProgress({ coins: -TIMEOUT_COST });
      setShuffleSeed(n => n + 1);
      setTimeUpEvent(n => n + 1);
    } else {
      setSentHomeEvent(n => n + 1);
    }
  }, [timeLeft, complete, applyProgress]);

  const selectCell = useCallback(
    (row: number, col: number) => {
      if (!gridRef.current[row]?.[col]?.letter) return;

      const candidates = wordsAtCell(placedWords, row, col);
      if (candidates.length === 0) return;

      const tappingSameCell = selectedCell?.row === row && selectedCell?.col === col;

      if (tappingSameCell && candidates.length > 1) {
        // Alterna entre horizontal/vertical quando a célula pertence a duas palavras.
        setActiveDirection(current => (current === "across" ? "down" : "across"));
        playTap();
        return;
      }

      const preferred = candidates.find(word => word.direction === activeDirection);
      setActiveDirection((preferred ?? candidates[0]).direction);
      setSelectedCell({ row, col });
      playTap();
    },
    [placedWords, selectedCell, activeDirection]
  );

  const selectWord = useCallback((word: PlacedWord) => {
    setActiveDirection(word.direction);
    setSelectedCell({ row: word.row, col: word.col });
    playTap();
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

      playKey();

      const next = gridRef.current.map((r, ri) =>
        r.map((cell, ci) => (ri === row && ci === col ? { ...cell, value: upper } : cell))
      );
      commitGrid(next);

      // Palavras que passam por esta célula e ficaram certas agora
      // (a digitada e, se for o caso, a que a cruza).
      const finished = wordsAtCell(placedWords, row, col).filter(
        word => !completedRef.current.has(word.id) && isWordComplete(next, word)
      );

      if (finished.length > 0) {
        markCompleted(finished.map(word => word.id));
        setLearnedWord(finished.find(word => word.id === activeWord?.id) ?? finished[0]);

        const puzzleDone = isPuzzleComplete(next);
        finished.forEach((word, index) => {
          const bonus = puzzleDone && index === 0;
          applyProgress({
            xp: XP_PER_WORD + (bonus ? XP_PER_PUZZLE : 0),
            coins: COINS_PER_WORD + (bonus ? COINS_PER_PUZZLE : 0),
            newlyLearnedWordId: word.id
          });
        });
        if (puzzleDone) {
          playVictory();
          tryUnlockNextLevel();
        } else {
          playCorrect();
          // Bônus de tempo só por completar digitando (a dica não dá bônus).
          setTimeLeft(t => t + TIME_BONUS_PER_WORD * finished.length);
        }
      }

      moveWithinActiveWord(row, col, 1);
    },
    [
      selectedCell,
      activeWord,
      placedWords,
      commitGrid,
      markCompleted,
      applyProgress,
      tryUnlockNextLevel,
      moveWithinActiveWord
    ]
  );

  const erase = useCallback(() => {
    if (!selectedCell) return;
    const { row, col } = selectedCell;
    const current = gridRef.current;

    playKey();

    if (current[row][col].value) {
      commitGrid(
        current.map((r, ri) =>
          r.map((cell, ci) => (ri === row && ci === col ? { ...cell, value: "" } : cell))
        )
      );
    } else {
      moveWithinActiveWord(row, col, -1);
    }
  }, [selectedCell, commitGrid, moveWithinActiveWord]);

  const dismissLearnedWord = useCallback(() => setLearnedWord(null), []);

  /**
   * Botão de dica: revela UMA letra e cobra REVEAL_COST moedas.
   * Sem moedas suficientes não faz nada (o botão também aparece bloqueado).
   *
   * Começa pela palavra selecionada; quando ela fica pronta, segue para a
   * próxima palavra incompleta. Palavras terminadas com ajuda contam como
   * aprendidas, mas não dão XP nem moedas.
   */
  const revealNext = useCallback(() => {
    const current = gridRef.current;
    if (isPuzzleComplete(current)) return;
    if (progressRef.current.coins < REVEAL_COST) return;

    const target =
      activeWord && !isWordComplete(current, activeWord)
        ? activeWord
        : placedWords.find(word => !isWordComplete(current, word));
    if (!target) return;

    const index = target.answer.split("").findIndex((expected, i) => {
      const r = target.direction === "down" ? target.row + i : target.row;
      const c = target.direction === "across" ? target.col + i : target.col;
      return current[r][c].value !== expected;
    });
    if (index === -1) return;

    const row = target.direction === "down" ? target.row + index : target.row;
    const col = target.direction === "across" ? target.col + index : target.col;
    const letter = target.answer[index];

    // Cobra primeiro (síncrono), depois revela.
    applyProgress({ coins: -REVEAL_COST });
    playCoinSpent();

    const next = current.map((r, ri) =>
      r.map((cell, ci) => (ri === row && ci === col ? { ...cell, value: letter } : cell))
    );
    commitGrid(next);
    setActiveDirection(target.direction);
    setSelectedCell({ row, col });

    // A letra revelada pode terminar a palavra atual e/ou a que a cruza.
    const newlyDone = placedWords.filter(
      word => !completedRef.current.has(word.id) && isWordComplete(next, word)
    );
    if (newlyDone.length > 0) {
      markCompleted(newlyDone.map(word => word.id));
      newlyDone.forEach(word => applyProgress({ newlyLearnedWordId: word.id }));
      if (isPuzzleComplete(next)) {
        playVictory();
        tryUnlockNextLevel();
      } else {
        playCorrect();
      }
    }
  }, [activeWord, placedWords, commitGrid, markCompleted, applyProgress, tryUnlockNextLevel]);

  const lettersLeft = useMemo(
    () =>
      grid.reduce(
        (total, row) =>
          total + row.filter(cell => cell.letter !== null && cell.value !== cell.letter).length,
        0
      ),
    [grid]
  );

  const canReveal = !complete && progress.coins >= REVEAL_COST;

  const today = todayKey();

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
    revealNext,
    revealCost: REVEAL_COST,
    canReveal,
    lettersLeft,
    dismissLearnedWord,
    // Sequência diária e meta do dia
    streak: streakFor(progress, today),
    bestStreak: progress.bestStreak,
    dailyWords: dailyWordsFor(progress, today),
    dailyGoal: DAILY_GOAL_WORDS,
    dailyGoalCoins: DAILY_GOAL_COINS,
    goalDone: goalDoneToday(progress, today),
    goalEvent,
    // Progressão de nível por categoria (só relevante quando levelContext é passado)
    levelUnlockEvent,
    unlockedLevel,
    categoryLevels: progress.categoryLevels,
    // Relógio da cruzadinha
    timeLeft,
    timeLimit: TIME_LIMIT_SECONDS,
    timeoutCost: TIMEOUT_COST,
    timeUpEvent,
    sentHomeEvent
  };
}
