import { CrosswordWord } from "../types/crossword";

/**
 * Word bank for the game.
 * Organized by difficulty, as described in the README (Fase 4 - Aprendizado).
 * Each word carries the learning metadata (translation, pronunciation, example)
 * so the UI can show a "learned word" card after the player completes it.
 */

export const BEGINNER_WORDS: CrosswordWord[] = [
  {
    id: "school",
    answer: "SCHOOL",
    clue: "A place where you learn.",
    category: "education",
    difficulty: "beginner",
    translation: "escola",
    pronunciation: "/skuːl/",
    example: "I go to school every day."
  },
  {
    id: "book",
    answer: "BOOK",
    clue: "You read this.",
    category: "education",
    difficulty: "beginner",
    translation: "livro",
    pronunciation: "/bʊk/",
    example: "She is reading a book."
  },
  {
    id: "apple",
    answer: "APPLE",
    clue: "A red or green fruit.",
    category: "food",
    difficulty: "beginner",
    translation: "maçã",
    pronunciation: "/ˈæp.əl/",
    example: "An apple a day keeps the doctor away."
  },
  {
    id: "water",
    answer: "WATER",
    clue: "You drink this.",
    category: "food",
    difficulty: "beginner",
    translation: "água",
    pronunciation: "/ˈwɔː.tər/",
    example: "Can I have a glass of water?"
  },
  {
    id: "cat",
    answer: "CAT",
    clue: "A small animal that says meow.",
    category: "home",
    difficulty: "beginner",
    translation: "gato",
    pronunciation: "/kæt/",
    example: "The cat is sleeping on the sofa."
  },
  {
    id: "dog",
    answer: "DOG",
    clue: "A loyal animal that says woof.",
    category: "home",
    difficulty: "beginner",
    translation: "cachorro",
    pronunciation: "/dɒɡ/",
    example: "My dog loves to play outside."
  },
  {
    id: "house",
    answer: "HOUSE",
    clue: "A place where people live.",
    category: "home",
    difficulty: "beginner",
    translation: "casa",
    pronunciation: "/haʊs/",
    example: "We bought a new house."
  },
  {
    id: "sun",
    answer: "SUN",
    clue: "The bright star in our sky.",
    category: "travel",
    difficulty: "beginner",
    translation: "sol",
    pronunciation: "/sʌn/",
    example: "The sun rises in the east."
  },
  {
    id: "food",
    answer: "FOOD",
    clue: "What you eat.",
    category: "food",
    difficulty: "beginner",
    translation: "comida",
    pronunciation: "/fuːd/",
    example: "This food tastes amazing."
  },
  {
    id: "family",
    answer: "FAMILY",
    clue: "Parents, children and relatives.",
    category: "family",
    difficulty: "beginner",
    translation: "família",
    pronunciation: "/ˈfæm.əl.i/",
    example: "I love spending time with my family."
  },
  {
    id: "friend",
    answer: "FRIEND",
    clue: "Someone you like and trust.",
    category: "feelings",
    difficulty: "beginner",
    translation: "amigo",
    pronunciation: "/frend/",
    example: "She is my best friend."
  },
  {
    id: "happy",
    answer: "HAPPY",
    clue: "Feeling joy.",
    category: "feelings",
    difficulty: "beginner",
    translation: "feliz",
    pronunciation: "/ˈhæp.i/",
    example: "I am happy today."
  }
];

export const INTERMEDIATE_WORDS: CrosswordWord[] = [
  {
    id: "computer",
    answer: "COMPUTER",
    clue: "A machine used to browse the internet and run programs.",
    category: "technology",
    difficulty: "intermediate",
    translation: "computador",
    pronunciation: "/kəmˈpjuː.tər/",
    example: "I work on my computer every day."
  },
  {
    id: "travel",
    answer: "TRAVEL",
    clue: "To go from one place to another, often on a trip.",
    category: "travel",
    difficulty: "intermediate",
    translation: "viajar",
    pronunciation: "/ˈtræv.əl/",
    example: "We love to travel in the summer."
  },
  {
    id: "important",
    answer: "IMPORTANT",
    clue: "Having great meaning or value.",
    category: "business",
    difficulty: "intermediate",
    translation: "importante",
    pronunciation: "/ɪmˈpɔːr.tənt/",
    example: "This is an important decision."
  },
  {
    id: "beautiful",
    answer: "BEAUTIFUL",
    clue: "Very pleasing to look at.",
    category: "feelings",
    difficulty: "intermediate",
    translation: "bonito(a)",
    pronunciation: "/ˈbjuː.tɪ.fəl/",
    example: "What a beautiful sunset!"
  },
  {
    id: "airport",
    answer: "AIRPORT",
    clue: "A place where planes take off and land.",
    category: "travel",
    difficulty: "intermediate",
    translation: "aeroporto",
    pronunciation: "/ˈer.pɔːrt/",
    example: "We arrived at the airport early."
  },
  {
    id: "kitchen",
    answer: "KITCHEN",
    clue: "The room where you cook.",
    category: "home",
    difficulty: "intermediate",
    translation: "cozinha",
    pronunciation: "/ˈkɪtʃ.ɪn/",
    example: "My mother is cooking in the kitchen."
  },
  {
    id: "meeting",
    answer: "MEETING",
    clue: "A gathering of people to discuss something.",
    category: "business",
    difficulty: "intermediate",
    translation: "reunião",
    pronunciation: "/ˈmiː.tɪŋ/",
    example: "We have a meeting at 9 AM."
  },
  {
    id: "movie",
    answer: "MOVIE",
    clue: "A film you watch at the cinema.",
    category: "movies",
    difficulty: "intermediate",
    translation: "filme",
    pronunciation: "/ˈmuː.vi/",
    example: "Let's watch a movie tonight."
  }
];

export const ADVANCED_WORDS: CrosswordWord[] = [
  {
    id: "achievement",
    answer: "ACHIEVEMENT",
    clue: "Something accomplished successfully.",
    category: "business",
    difficulty: "advanced",
    translation: "conquista",
    pronunciation: "/əˈtʃiːv.mənt/",
    example: "Graduating was a great achievement."
  },
  {
    id: "environment",
    answer: "ENVIRONMENT",
    clue: "The natural world around us.",
    category: "education",
    difficulty: "advanced",
    translation: "meio ambiente",
    pronunciation: "/ɪnˈvaɪ.rən.mənt/",
    example: "We must protect the environment."
  },
  {
    id: "opportunity",
    answer: "OPPORTUNITY",
    clue: "A chance to do something.",
    category: "business",
    difficulty: "advanced",
    translation: "oportunidade",
    pronunciation: "/ˌɑː.pərˈtuː.nə.ti/",
    example: "This job is a great opportunity."
  },
  {
    id: "development",
    answer: "DEVELOPMENT",
    clue: "The process of growing or improving.",
    category: "business",
    difficulty: "advanced",
    translation: "desenvolvimento",
    pronunciation: "/dɪˈvel.əp.mənt/",
    example: "The company invests in software development."
  },
  {
    id: "experience",
    answer: "EXPERIENCE",
    clue: "Knowledge gained by doing something.",
    category: "education",
    difficulty: "advanced",
    translation: "experiência",
    pronunciation: "/ɪkˈspɪr.i.əns/",
    example: "She has a lot of work experience."
  },
  {
    id: "technology",
    answer: "TECHNOLOGY",
    clue: "Tools and machines developed from science.",
    category: "technology",
    difficulty: "advanced",
    translation: "tecnologia",
    pronunciation: "/tekˈnɑː.lə.dʒi/",
    example: "New technology changes fast."
  }
];

export const ALL_WORDS: CrosswordWord[] = [
  ...BEGINNER_WORDS,
  ...INTERMEDIATE_WORDS,
  ...ADVANCED_WORDS
];

export function getWordsByDifficulty(difficulty: CrosswordWord["difficulty"]): CrosswordWord[] {
  if (!difficulty) return ALL_WORDS;
  return ALL_WORDS.filter(word => word.difficulty === difficulty);
}

export function getWordsByCategory(category: string): CrosswordWord[] {
  return ALL_WORDS.filter(word => word.category === category);
}
