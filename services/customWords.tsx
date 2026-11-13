import AsyncStorage from "@react-native-async-storage/async-storage";
import { CrosswordWord } from "../types/crossword";
import { toGridAnswer } from "../game/wordModes";

/**
 * "Minhas palavras": palavras que o jogador adiciona (inglês + tradução).
 * Não conferimos se a tradução está certa — confiamos no jogador. Só validamos
 * o que o jogo precisa para montar a grade (letras, tamanho, duplicatas).
 */

const STORAGE_KEY = "englishCrossword:customWords";

export const MAX_CUSTOM_WORDS = 200;
/** Maior palavra que cabe na grade (MAX_GRID_ROWS do jogo). */
export const MAX_ANSWER_LETTERS = 13;
const MAX_TEXT_LENGTH = 30;

export type CustomWord = {
  id: string;
  /** Como o jogador digitou em inglês (ex.: "ice cream"). */
  english: string;
  /** Como o jogador digitou em português (ex.: "sorvete"). */
  portuguese: string;
  createdAt: number;
};

export type ValidationResult = { ok: true; word: CustomWord } | { ok: false; message: string };

const clean = (text: string) => text.replace(/\s+/g, " ").trim();

/** Valida e monta a palavra. Devolve a mensagem de erro (em português) quando não dá. */
export function validateCustomWord(
  existing: CustomWord[],
  englishRaw: string,
  portugueseRaw: string,
  now: number = Date.now()
): ValidationResult {
  const english = clean(englishRaw);
  const portuguese = clean(portugueseRaw);

  if (!english || !portuguese) return { ok: false, message: "Preencha a palavra em inglês e a tradução." };
  if (english.length > MAX_TEXT_LENGTH || portuguese.length > MAX_TEXT_LENGTH) {
    return { ok: false, message: `Use no máximo ${MAX_TEXT_LENGTH} caracteres em cada campo.` };
  }
  if (/\d/.test(english + portuguese)) return { ok: false, message: "Use apenas letras (sem números)." };

  const englishGrid = toGridAnswer(english);
  const portugueseGrid = toGridAnswer(portuguese);
  if (englishGrid.length < 2 || portugueseGrid.length < 2) {
    return { ok: false, message: "Cada palavra precisa de pelo menos 2 letras." };
  }
  if (englishGrid.length > MAX_ANSWER_LETTERS || portugueseGrid.length > MAX_ANSWER_LETTERS) {
    return { ok: false, message: `A palavra cabe na grade com até ${MAX_ANSWER_LETTERS} letras (espaços não contam).` };
  }
  if (englishGrid === portugueseGrid) {
    return { ok: false, message: "As duas palavras ficariam iguais na grade (ex.: hotel). Escolha outra." };
  }

  const id = `custom-${englishGrid.toLowerCase()}`;
  if (existing.some(word => word.id === id)) {
    return { ok: false, message: "Você já adicionou essa palavra." };
  }
  if (existing.length >= MAX_CUSTOM_WORDS) {
    return { ok: false, message: `Limite de ${MAX_CUSTOM_WORDS} palavras. Remova alguma para adicionar outra.` };
  }

  return { ok: true, word: { id, english: english.toLowerCase(), portuguese, createdAt: now } };
}

export function removeCustomWord(list: CustomWord[], id: string): CustomWord[] {
  return list.filter(word => word.id !== id);
}

/** Converte para o formato do banco de palavras (answer = inglês, translation = português). */
export function toCrosswordWords(list: CustomWord[]): CrosswordWord[] {
  return list.map(word => ({
    id: word.id,
    answer: toGridAnswer(word.english),
    displayEnglish: word.english,
    clue: word.portuguese,
    translation: word.portuguese,
    category: "custom",
    difficulty: "beginner",
    custom: true
  }));
}

function parse(raw: string | null): CustomWord[] {
  if (!raw) return [];
  try {
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.filter(
      (w): w is CustomWord =>
        !!w &&
        typeof w.id === "string" &&
        typeof w.english === "string" &&
        typeof w.portuguese === "string" &&
        toGridAnswer(w.english).length >= 2 &&
        toGridAnswer(w.portuguese).length >= 2
    );
  } catch {
    return [];
  }
}

export async function loadCustomWords(): Promise<CustomWord[]> {
  try {
    return parse(await AsyncStorage.getItem(STORAGE_KEY));
  } catch {
    return [];
  }
}

export async function saveCustomWords(list: CustomWord[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // Salvar é "melhor esforço": perder um save é melhor do que travar o app.
  }
}
