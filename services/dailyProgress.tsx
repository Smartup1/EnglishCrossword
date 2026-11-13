import type { PlayerProgress } from "./progressStorage";

/**
 * Sequência diária 🔥 e meta do dia 🎯.
 *
 * - A meta do dia é concluir DAILY_GOAL_WORDS palavras (uma cruzadinha inteira).
 * - Bater a meta dá DAILY_GOAL_COINS moedas de bônus, uma vez por dia.
 * - Cada dia com a meta cumprida aumenta a sequência. Pular um dia zera.
 * - As datas usam o calendário do aparelho (AAAA-MM-DD).
 *
 * Tudo aqui é função pura (recebe a data de hoje), então é fácil de testar.
 */

// ---------- Ajuste aqui ----------
export const DAILY_GOAL_WORDS = 6;
export const DAILY_GOAL_COINS = 20;

const pad = (n: number) => String(n).padStart(2, "0");

/** Data local do aparelho no formato AAAA-MM-DD. */
export function todayKey(date: Date = new Date()): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Dias desde 1970, contando em UTC (imune a fuso e horário de verão). */
function dayNumber(key: string): number {
  const [y, m, d] = key.split("-").map(Number);
  return Math.round(Date.UTC(y, m - 1, d) / 86400000);
}

/** Quantos dias de `fromKey` até `toKey` (1 = "ontem para hoje"). */
export function daysBetween(fromKey: string, toKey: string): number {
  return dayNumber(toKey) - dayNumber(fromKey);
}

/** Soma (ou subtrai) dias a uma data AAAA-MM-DD. */
export function shiftDay(key: string, delta: number): string {
  const [y, m, d] = key.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d + delta));
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}

/** A meta de hoje já foi cumprida? */
export function goalDoneToday(progress: PlayerProgress, today: string): boolean {
  return progress.lastGoalDate === today;
}

/** Palavras concluídas hoje (zera sozinho quando vira o dia). */
export function dailyWordsFor(progress: PlayerProgress, today: string): number {
  return progress.dailyDate === today ? progress.dailyWords : 0;
}

/**
 * Sequência que deve aparecer na tela. Se o jogador deixou passar um dia
 * inteiro sem cumprir a meta, a sequência já está perdida (0).
 */
export function streakFor(progress: PlayerProgress, today: string): number {
  if (!progress.lastGoalDate) return 0;
  return daysBetween(progress.lastGoalDate, today) <= 1 ? progress.streak : 0;
}

/**
 * Registra UMA palavra concluída hoje. Se isso fecha a meta do dia, atualiza a
 * sequência e soma o bônus de moedas (só na primeira vez do dia).
 */
export function registerWordCompleted(
  progress: PlayerProgress,
  today: string
): { progress: PlayerProgress; goalReached: boolean } {
  const base: PlayerProgress =
    progress.dailyDate === today ? progress : { ...progress, dailyDate: today, dailyWords: 0 };

  let next: PlayerProgress = { ...base, dailyWords: base.dailyWords + 1 };
  let goalReached = false;

  if (next.dailyWords >= DAILY_GOAL_WORDS && base.lastGoalDate !== today) {
    goalReached = true;
    const continued = base.lastGoalDate !== null && daysBetween(base.lastGoalDate, today) === 1;
    const streak = continued ? base.streak + 1 : 1;
    next = {
      ...next,
      streak,
      bestStreak: Math.max(base.bestStreak, streak),
      lastGoalDate: today,
      coins: next.coins + DAILY_GOAL_COINS,
    };
  }

  return { progress: next, goalReached };
}
