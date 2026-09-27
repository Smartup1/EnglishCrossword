import { CrosswordWord, Difficulty } from "../types/crossword";

import { HOME_WORDS } from "./categories/home";
import { FOOD_WORDS } from "./categories/food";
import { TRAVEL_WORDS } from "./categories/travel";
import { FAMILY_WORDS } from "./categories/family";
import { BUSINESS_WORDS } from "./categories/business";
import { MOVIES_WORDS } from "./categories/movies";
import { TECHNOLOGY_WORDS } from "./categories/technology";
import { FEELINGS_WORDS } from "./categories/feelings";
import { EDUCATION_WORDS } from "./categories/education";

/**
 * Word bank for the game, agora dividido por categoria em `data/categories/`.
 *
 * Cada arquivo de categoria segue as mesmas regras:
 * - No duplicate English answers.
 * - No duplicate Portuguese translations.
 * - Answers contain only A-Z and have at most 13 letters.
 * - Only project-supported categories are used.
 * - Each word keeps its original difficulty level.
 *
 * Este arquivo apenas agrega todas as categorias e expõe helpers de busca.
 * Para adicionar palavras, edite o arquivo da categoria correspondente em
 * `data/categories/`. Para criar uma categoria nova, crie um novo arquivo lá
 * e registre-o em `CATEGORIES` abaixo.
 */

export type CategoryKey =
  | "home"
  | "food"
  | "travel"
  | "family"
  | "business"
  | "movies"
  | "technology"
  | "feelings"
  | "education";

/** Um "pedaço" sequencial das palavras de uma categoria. */
export type CategoryLevel = {
  /** Número do nível dentro da categoria, começando em 1. */
  level: number;
  words: CrosswordWord[];
};

export type CategoryInfo = {
  key: CategoryKey;
  /** Nome de exibição com emoji, ex.: "🏠 Home". */
  label: string;
  words: CrosswordWord[];
  /** Palavras da categoria divididas em níveis, do mais fácil ao mais difícil. */
  levels: CategoryLevel[];
};

const DIFFICULTY_ORDER: Record<Difficulty, number> = {
  beginner: 0,
  intermediate: 1,
  advanced: 2
};

/** Beginner antes de intermediate antes de advanced, para os níveis irem ficando mais difíceis. */
function sortedByDifficulty(words: CrosswordWord[]): CrosswordWord[] {
  return [...words].sort(
    (a, b) => DIFFICULTY_ORDER[a.difficulty ?? "beginner"] - DIFFICULTY_ORDER[b.difficulty ?? "beginner"]
  );
}

/**
 * Divide uma lista de palavras em grupos de ~`targetSize`, o mais parelho
 * possível (sem sobrar um grupinho de 1 ou 2 palavras no final).
 * Categorias pequenas (≤ targetSize + 2) viram um único nível.
 */
function chunkIntoLevels(words: CrosswordWord[], targetSize = 10): CrosswordWord[][] {
  if (words.length <= targetSize + 2) return [words];

  const groupCount = Math.max(1, Math.round(words.length / targetSize));
  const base = Math.floor(words.length / groupCount);
  const remainder = words.length % groupCount;

  const groups: CrosswordWord[][] = [];
  let index = 0;
  for (let g = 0; g < groupCount; g++) {
    const size = base + (g < remainder ? 1 : 0);
    groups.push(words.slice(index, index + size));
    index += size;
  }
  return groups;
}

function buildCategory(key: CategoryKey, label: string, words: CrosswordWord[]): CategoryInfo {
  const chunks = chunkIntoLevels(sortedByDifficulty(words));
  return {
    key,
    label,
    words,
    levels: chunks.map((levelWords, i) => ({ level: i + 1, words: levelWords }))
  };
}

/** Lista de todas as categorias disponíveis, com suas palavras e níveis. */
export const CATEGORIES: CategoryInfo[] = [
  buildCategory("home", "🏠 Home", HOME_WORDS),
  buildCategory("food", "🍔 Food", FOOD_WORDS),
  buildCategory("travel", "🌎 Travel", TRAVEL_WORDS),
  buildCategory("family", "👨‍👩‍👧 Family", FAMILY_WORDS),
  buildCategory("business", "💼 Business", BUSINESS_WORDS),
  buildCategory("movies", "🎬 Movies", MOVIES_WORDS),
  buildCategory("technology", "💻 Technology", TECHNOLOGY_WORDS),
  buildCategory("feelings", "❤️ Feelings", FEELINGS_WORDS),
  buildCategory("education", "📚 Education", EDUCATION_WORDS)
];

/** Todas as palavras do jogo, de todas as categorias juntas. */
export const ALL_WORDS: CrosswordWord[] = CATEGORIES.flatMap(c => c.words);

// Mantidos por compatibilidade com quem já usava estes nomes (agrupam por
// dificuldade em vez de categoria).
export const BEGINNER_WORDS: CrosswordWord[] = ALL_WORDS.filter(
  word => word.difficulty === "beginner"
);
export const INTERMEDIATE_WORDS: CrosswordWord[] = ALL_WORDS.filter(
  word => word.difficulty === "intermediate"
);
export const ADVANCED_WORDS: CrosswordWord[] = ALL_WORDS.filter(
  word => word.difficulty === "advanced"
);

export function getWordsByDifficulty(difficulty?: Difficulty): CrosswordWord[] {
  if (!difficulty) return ALL_WORDS;
  return ALL_WORDS.filter(word => word.difficulty === difficulty);
}

/** Palavras de uma categoria (ex.: "food"). Categoria vazia/undefined = todas. */
export function getWordsByCategory(category?: string): CrosswordWord[] {
  if (!category) return ALL_WORDS;
  return ALL_WORDS.filter(word => word.category === category);
}

/** Info (chave + rótulo + níveis) de uma categoria, para exibir na UI. */
export function getCategoryInfo(key: CategoryKey): CategoryInfo | undefined {
  return CATEGORIES.find(c => c.key === key);
}

/** Quantos níveis a categoria tem (mínimo 1). */
export function getCategoryLevelCount(key: CategoryKey): number {
  return getCategoryInfo(key)?.levels.length ?? 1;
}

/** Palavras de um nível específico da categoria. Nível fora do intervalo cai no mais próximo. */
export function getCategoryLevelWords(key: CategoryKey, level: number): CrosswordWord[] {
  const info = getCategoryInfo(key);
  if (!info || info.levels.length === 0) return [];
  const clamped = Math.min(Math.max(1, level), info.levels.length);
  return info.levels.find(l => l.level === clamped)?.words ?? info.levels[0].words;
}
