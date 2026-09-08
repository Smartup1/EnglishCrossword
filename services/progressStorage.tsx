import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Persists player progress (Fase 5/6 do roadmap) locally on the device.
 * No backend yet — this is intentionally simple (single JSON blob) so it's
 * easy to swap for Supabase/Firebase later without touching call sites.
 */

const STORAGE_KEY = "englishCrossword:progress";

export type PlayerProgress = {
  xp: number;
  coins: number;
  level: number;
  wordsLearned: string[]; // word ids already completed at least once
};

const DEFAULT_PROGRESS: PlayerProgress = {
  xp: 0,
  coins: 0,
  level: 1,
  wordsLearned: [],
};

/** XP needed to go from `level` to `level + 1`. Simple linear curve for now. */
const XP_PER_LEVEL = 200;

export function levelForXp(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

export async function loadProgress(): Promise<PlayerProgress> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      xp: typeof parsed.xp === "number" ? parsed.xp : 0,
      coins: typeof parsed.coins === "number" ? parsed.coins : 0,
      level: typeof parsed.level === "number" ? parsed.level : 1,
      wordsLearned: Array.isArray(parsed.wordsLearned) ? parsed.wordsLearned : [],
    };
  } catch {
    // Corrupted or unavailable storage: fall back to a fresh profile
    // instead of crashing the app.
    return DEFAULT_PROGRESS;
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
    xp,
    coins: current.coins + (delta.coins ?? 0),
    level: levelForXp(xp),
    wordsLearned,
  };

  await saveProgress(next);
  return next;
}
