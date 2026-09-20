import { ClueLang, CrosswordWord } from "../types/crossword";

/**
 * Modos de jogo (direção da tradução):
 *  - "pt-en": a pista é a palavra em PORTUGUÊS e o jogador responde em INGLÊS
 *  - "en-pt": a pista é a palavra em INGLÊS e o jogador responde em PORTUGUÊS
 *  - "mixed": mistura os dois sentidos no mesmo puzzle
 *
 * O gerador de palavras cruzadas só olha para `answer`, então basta trocar
 * pista/resposta ANTES de gerar o grid. O jogo em si não muda.
 */
export type GameMode = "pt-en" | "en-pt" | "mixed";

export const DEFAULT_MODE: GameMode = "pt-en";

export function parseMode(value: string | string[] | undefined): GameMode {
  const v = Array.isArray(value) ? value[0] : value;
  return v === "pt-en" || v === "en-pt" || v === "mixed" ? v : DEFAULT_MODE;
}

/**
 * Converte uma palavra para o formato aceito pela grade (só A–Z):
 *   "maçã"          -> "MACA"
 *   "bonito(a)"     -> "BONITO"
 *   "meio ambiente" -> "MEIOAMBIENTE"
 */
export function toGridAnswer(text: string): string {
  return text
    .replace(/\(.*?\)/g, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z]/g, "")
    .toUpperCase();
}

/**
 * Recebe o banco de palavras (answer = inglês, translation = português) e
 * devolve as palavras prontas para o modo escolhido: `clue` vira UMA palavra
 * do outro idioma e `answer` vira a resposta (sem acentos) para a grade.
 *
 * Palavras ignoradas para evitar ambiguidade:
 *  - sem tradução;
 *  - pista igual à resposta (cognatos como "hotel");
 *  - pistas repetidas (duas palavras com a mesma tradução);
 *  - respostas repetidas.
 */
export function prepareWords(words: CrosswordWord[], mode: GameMode): CrosswordWord[] {
  const usedClues = new Set<string>();
  const usedAnswers = new Set<string>();
  const prepared: CrosswordWord[] = [];

  for (const word of words) {
    const portuguese = word.translation?.trim();
    if (!portuguese) continue;

    const english = word.answer.toLowerCase();

    const clueLang: ClueLang =
      mode === "pt-en" ? "pt" : mode === "en-pt" ? "en" : Math.random() < 0.5 ? "pt" : "en";

    const clue = clueLang === "pt" ? portuguese : english;
    const answer = toGridAnswer(clueLang === "pt" ? word.answer : portuguese);

    if (answer.length < 2) continue;
    if (toGridAnswer(clue) === answer) continue; // cognato: pista = resposta

    const clueKey = `${clueLang}:${toGridAnswer(clue)}`;
    if (usedClues.has(clueKey) || usedAnswers.has(answer)) continue;
    usedClues.add(clueKey);
    usedAnswers.add(answer);

    prepared.push({ ...word, clue, answer, english, portuguese, clueLang });
  }

  return prepared;
}
