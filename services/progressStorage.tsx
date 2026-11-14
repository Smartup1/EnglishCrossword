import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Persists player progress (Fase 5/6 do roadmap) locally on the device.
 * No backend yet — this is intentionally simple (single JSON blob) so it's
 * easy to swap for Supabase/Firebase later without touching call sites.
 */

const STORAGE_KEY = "englishCrossword:progress";

/** Moedas de presente para quem abre o jogo pela primeira vez. */
export const STARTER_COINS = 15;

export type PlayerProgress = {
  xp: number;
  coins: number;
  level: number;
  wordsLearned: string[]; // word ids already completed at least once

  // ---- Sequência diária e meta do dia ----
  /** Dias seguidos em que a meta do dia foi cumprida. */
  streak: number;
  /** Maior sequência que o jogador já teve. */
  bestStreak: number;
  /** Último dia (AAAA-MM-DD, horário do aparelho) em que a meta foi cumprida. */
  lastGoalDate: string | null;
  /** Dia a que `dailyWords` se refere. */
  dailyDate: string | null;
  /** Palavras concluídas em `dailyDate`. */
  dailyWords: number;

  /**
   * Maior nível já desbloqueado em cada categoria (chave = CategoryKey).
   * Ausente = ainda não desbloqueou nada além do nível 1.
   */
  categoryLevels: Record<string, number>;
};

/** Perfil zerado, sem presente (usado enquanto carrega e em dados corrompidos). */
export function emptyProgress(): PlayerProgress {
  return {
    xp: 0,
    coins: 0,
    level: 1,
    wordsLearned: [],
    streak: 0,
    bestStreak: 0,
    lastGoalDate: null,
    dailyDate: null,
    dailyWords: 0,
    categoryLevels: {},
  };
}

/** Perfil de quem nunca jogou: começa com moedas de presente. */
function newPlayerProgress(): PlayerProgress {
  return { ...emptyProgress(), coins: STARTER_COINS };
}

/** XP needed to go from `level` to `level + 1`. Simple linear curve for now. */
const XP_PER_LEVEL = 200;

export function levelForXp(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

const num = (value: unknown, fallback: number) =>
  typeof value === "number" && Number.isFinite(value) ? value : fallback;

const dateKey = (value: unknown) =>
  typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : null;

function parseCategoryLevels(value: unknown): Record<string, number> {
  if (!value || typeof value !== "object") return {};
  const result: Record<string, number> = {};
  for (const [key, level] of Object.entries(value as Record<string, unknown>)) {
    if (typeof level === "number" && Number.isFinite(level) && level >= 1) {
      result[key] = Math.floor(level);
    }
  }
  return result;
}

export async function loadProgress(): Promise<PlayerProgress> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    // Nunca jogou: ganha as moedas de presente. Quem já tem dados salvos
    // (mesmo de versões antigas do app) mantém o saldo que tinha.
    if (!raw) return newPlayerProgress();
    const parsed = JSON.parse(raw);
    return {
      xp: num(parsed.xp, 0),
      coins: num(parsed.coins, 0),
      level: num(parsed.level, 1),
      wordsLearned: Array.isArray(parsed.wordsLearned) ? parsed.wordsLearned : [],
      streak: num(parsed.streak, 0),
      bestStreak: num(parsed.bestStreak, 0),
      lastGoalDate: dateKey(parsed.lastGoalDate),
      dailyDate: dateKey(parsed.dailyDate),
      dailyWords: num(parsed.dailyWords, 0),
      categoryLevels: parseCategoryLevels(parsed.categoryLevels),
    };
  } catch {
    // Corrupted or unavailable storage: fall back to a fresh profile
    // instead of crashing the app (sem presente, para não dar moeda de graça).
    return emptyProgress();
  }
}

export async function saveProgress(progress: PlayerProgress): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Best-effort persistence: losing a save is better than crashing mid-game.
  }
}

/** Merges newly earned XP/coins/words into the stored profile and saves it. */
export async function addProgress(
  current: PlayerProgress,
  delta: { xp?: number; coins?: number; newlyLearnedWordId?: string }
): Promise<PlayerProgress> {
  const wordsLearned =
    delta.newlyLearnedWordId && !current.wordsLearned.includes(delta.newlyLearnedWordId)
      ? [...current.wordsLearned, delta.newlyLearnedWordId]
      : current.wordsLearned;

  const xp = current.xp + (delta.xp ?? 0);

  const next: PlayerProgress = {
    ...current,
    xp,
    coins: current.coins + (delta.coins ?? 0),
    level: levelForXp(xp),
    wordsLearned,
  };

  await saveProgress(next);
  return next;
}

// ---------- Progresso por nível de categoria ----------

/** Maior nível já desbloqueado numa categoria (o jogador sempre começa liberado no nível 1). */
export function getUnlockedLevel(progress: PlayerProgress, categoryKey: string): number {
  return progress.categoryLevels[categoryKey] ?? 1;
}

/**
 * Chamado quando o jogador termina a cruzadinha de `completedLevel` numa categoria.
 * Só libera o próximo nível se `completedLevel` for a fronteira atual (o nível mais
 * avançado já desbloqueado) — replay de um nível antigo não desbloqueia nada de novo.
 */
export function unlockNextLevel(
  progress: PlayerProgress,
  categoryKey: string,
  completedLevel: number,
  totalLevels: number
): { progress: PlayerProgress; unlockedNew: boolean; newLevel: number } {
  const current = getUnlockedLevel(progress, categoryKey);
  const next = Math.min(completedLevel + 1, totalLevels);

  if (next <= current) {
    return { progress, unlockedNew: false, newLevel: current };
  }

  const updated: PlayerProgress = {
    ...progress,
    categoryLevels: { ...progress.categoryLevels, [categoryKey]: next }
  };
  return { progress: updated, unlockedNew: true, newLevel: next };
}
