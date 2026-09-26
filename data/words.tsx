import { CrosswordWord } from "../types/crossword";

/**
 * Word bank for the game.
 *
 * Rules applied to this file:
 * - No duplicate English answers.
 * - No duplicate Portuguese translations.
 * - Answers contain only A-Z and have at most 13 letters.
 * - Only project-supported categories are used.
 * - Each word keeps its original difficulty level.
 *
 * Each word carries the learning metadata (translation, pronunciation,
 * example) so the UI can show a "learned word" card after the player
 * completes it.
 */
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
  }
  // ... resto das palavras avançadas
];
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
  },
  {
    id: "teacher",
    answer: "TEACHER",
    clue: "A person who teaches.",
    category: "education",
    difficulty: "beginner",
    translation: "professor",
    pronunciation: "/ˈtiː.tʃər/",
    example: "The teacher is very kind."
  },
  {
    id: "bread",
    answer: "BREAD",
    clue: "Food made from flour.",
    category: "food",
    difficulty: "beginner",
    translation: "pão",
    pronunciation: "/bred/",
    example: "I like fresh bread."
  },
  {
    id: "cheese",
    answer: "CHEESE",
    clue: "A food made from milk.",
    category: "food",
    difficulty: "beginner",
    translation: "queijo",
    pronunciation: "/tʃiːz/",
    example: "She likes cheese on her pizza."
  },
  {
    id: "window",
    answer: "WINDOW",
    clue: "You can look through it to see outside.",
    category: "home",
    difficulty: "beginner",
    translation: "janela",
    pronunciation: "/ˈwɪn.doʊ/",
    example: "Open the window, please."
  },
  {
    id: "garden",
    answer: "GARDEN",
    clue: "A place where plants and flowers grow.",
    category: "home",
    difficulty: "beginner",
    translation: "jardim",
    pronunciation: "/ˈɡɑːr.dən/",
    example: "There are flowers in the garden."
  },
  {
    id: "ticket",
    answer: "TICKET",
    clue: "Something you need to enter or travel.",
    category: "travel",
    difficulty: "beginner",
    translation: "ingresso",
    pronunciation: "/ˈtɪk.ɪt/",
    example: "I have a ticket for the train."
  },
  {
    id: "hotel",
    answer: "HOTEL",
    clue: "A place where travelers can stay.",
    category: "travel",
    difficulty: "beginner",
    translation: "hotel",
    pronunciation: "/hoʊˈtel/",
    example: "Our hotel is near the beach."
  },
  {
    id: "mother",
    answer: "MOTHER",
    clue: "A female parent.",
    category: "family",
    difficulty: "beginner",
    translation: "mãe",
    pronunciation: "/ˈmʌð.ər/",
    example: "My mother is at home."
  },
  {
    id: "brother",
    answer: "BROTHER",
    clue: "A male sibling.",
    category: "family",
    difficulty: "beginner",
    translation: "irmão",
    pronunciation: "/ˈbrʌð.ər/",
    example: "My brother likes soccer."
  },
  {
    id: "sister",
    answer: "SISTER",
    clue: "A female sibling.",
    category: "family",
    difficulty: "beginner",
    translation: "irmã",
    pronunciation: "/ˈsɪs.tər/",
    example: "My sister is very funny."
  },
  {
    id: "angry",
    answer: "ANGRY",
    clue: "Feeling mad or upset.",
    category: "feelings",
    difficulty: "beginner",
    translation: "bravo",
    pronunciation: "/ˈæŋ.ɡri/",
    example: "He is angry with me."
  },
  {
    id: "sad",
    answer: "SAD",
    clue: "Feeling unhappy.",
    category: "feelings",
    difficulty: "beginner",
    translation: "triste",
    pronunciation: "/sæd/",
    example: "She feels sad today."
  },
  {
    id: "excited",
    answer: "EXCITED",
    clue: "Feeling very happy about something.",
    category: "feelings",
    difficulty: "beginner",
    translation: "animado",
    pronunciation: "/ɪkˈsaɪ.tɪd/",
    example: "I am excited about the trip."
  },
  {
    id: "keyboard",
    answer: "KEYBOARD",
    clue: "You use it to type on a computer.",
    category: "technology",
    difficulty: "beginner",
    translation: "teclado",
    pronunciation: "/ˈkiː.bɔːrd/",
    example: "The keyboard is black."
  },
  {
    id: "camera",
    answer: "CAMERA",
    clue: "A device used to take pictures.",
    category: "technology",
    difficulty: "beginner",
    translation: "câmera",
    pronunciation: "/ˈkæm.rə/",
    example: "I have a new camera."
  },
  {
    id: "company",
    answer: "COMPANY",
    clue: "A business organization.",
    category: "business",
    difficulty: "beginner",
    translation: "empresa",
    pronunciation: "/ˈkʌm.pə.ni/",
    example: "She works for a big company."
  },
  {
    id: "office",
    answer: "OFFICE",
    clue: "A place where people work.",
    category: "business",
    difficulty: "beginner",
    translation: "escritório",
    pronunciation: "/ˈɒf.ɪs/",
    example: "He works in an office."
  },
  {
    id: "manager",
    answer: "MANAGER",
    clue: "A person who manages a team or business.",
    category: "business",
    difficulty: "beginner",
    translation: "gerente",
    pronunciation: "/ˈmæn.ɪ.dʒər/",
    example: "The manager called a meeting."
  },
  {
    id: "actor",
    answer: "ACTOR",
    clue: "A person who performs in movies.",
    category: "movies",
    difficulty: "beginner",
    translation: "ator",
    pronunciation: "/ˈæk.tər/",
    example: "The actor is very famous."
  },
  {
    id: "scene",
    answer: "SCENE",
    clue: "A part of a movie or story.",
    category: "movies",
    difficulty: "beginner",
    translation: "cena",
    pronunciation: "/siːn/",
    example: "That was my favorite scene."
  },
  {
    id: "milk",
    answer: "MILK",
    clue: "A white drink that comes from cows.",
    category: "food",
    difficulty: "beginner",
    translation: "leite",
    pronunciation: "/mɪlk/",
    example: "I drink milk every morning."
  },
  {
    id: "egg",
    answer: "EGG",
    clue: "A food that comes from a chicken.",
    category: "food",
    difficulty: "beginner",
    translation: "ovo",
    pronunciation: "/eɡ/",
    example: "She ate an egg for breakfast."
  },
  {
    id: "rice",
    answer: "RICE",
    clue: "A white or brown grain you eat.",
    category: "food",
    difficulty: "beginner",
    translation: "arroz",
    pronunciation: "/raɪs/",
    example: "We eat rice with beans."
  },
  {
    id: "fish",
    answer: "FISH",
    clue: "An animal that lives in water.",
    category: "food",
    difficulty: "beginner",
    translation: "peixe",
    pronunciation: "/fɪʃ/",
    example: "The fish is very fresh."
  },
  {
    id: "chair",
    answer: "CHAIR",
    clue: "You sit on this.",
    category: "home",
    difficulty: "beginner",
    translation: "cadeira",
    pronunciation: "/tʃer/",
    example: "Please sit on the chair."
  },
  {
    id: "table",
    answer: "TABLE",
    clue: "You put things on this flat furniture.",
    category: "home",
    difficulty: "beginner",
    translation: "mesa",
    pronunciation: "/ˈteɪ.bəl/",
    example: "The book is on the table."
  },
  {
    id: "door",
    answer: "DOOR",
    clue: "You open it to enter a room.",
    category: "home",
    difficulty: "beginner",
    translation: "porta",
    pronunciation: "/dɔːr/",
    example: "Close the door, please."
  },
  {
    id: "bed",
    answer: "BED",
    clue: "You sleep on this.",
    category: "home",
    difficulty: "beginner",
    translation: "cama",
    pronunciation: "/bed/",
    example: "My bed is very comfortable."
  },
  {
    id: "car",
    answer: "CAR",
    clue: "A vehicle with four wheels.",
    category: "travel",
    difficulty: "beginner",
    translation: "carro",
    pronunciation: "/kɑːr/",
    example: "We go to work by car."
  },
  {
    id: "bus",
    answer: "BUS",
    clue: "A large vehicle for many passengers.",
    category: "travel",
    difficulty: "beginner",
    translation: "ônibus",
    pronunciation: "/bʌs/",
    example: "I take the bus to school."
  },
  {
    id: "train",
    answer: "TRAIN",
    clue: "A vehicle that runs on rails.",
    category: "travel",
    difficulty: "beginner",
    translation: "trem",
    pronunciation: "/treɪn/",
    example: "The train arrives at noon."
  },
  {
    id: "plane",
    answer: "PLANE",
    clue: "A vehicle that flies in the sky.",
    category: "travel",
    difficulty: "beginner",
    translation: "avião",
    pronunciation: "/pleɪn/",
    example: "The plane is landing now."
  },
  {
    id: "beach",
    answer: "BEACH",
    clue: "A place with sand near the sea.",
    category: "travel",
    difficulty: "beginner",
    translation: "praia",
    pronunciation: "/biːtʃ/",
    example: "We went to the beach yesterday."
  },
  {
    id: "city",
    answer: "CITY",
    clue: "A large town.",
    category: "travel",
    difficulty: "beginner",
    translation: "cidade",
    pronunciation: "/ˈsɪt.i/",
    example: "São Paulo is a big city."
  },
  {
    id: "father",
    answer: "FATHER",
    clue: "A male parent.",
    category: "family",
    difficulty: "beginner",
    translation: "pai",
    pronunciation: "/ˈfɑː.ðər/",
    example: "My father works a lot."
  },
  {
    id: "son",
    answer: "SON",
    clue: "A male child.",
    category: "family",
    difficulty: "beginner",
    translation: "filho",
    pronunciation: "/sʌn/",
    example: "Their son is a doctor."
  },
  {
    id: "daughter",
    answer: "DAUGHTER",
    clue: "A female child.",
    category: "family",
    difficulty: "beginner",
    translation: "filha",
    pronunciation: "/ˈdɔː.tər/",
    example: "My daughter loves to draw."
  },
  {
    id: "baby",
    answer: "BABY",
    clue: "A very young child.",
    category: "family",
    difficulty: "beginner",
    translation: "bebê",
    pronunciation: "/ˈbeɪ.bi/",
    example: "The baby is sleeping."
  },
  {
    id: "love",
    answer: "LOVE",
    clue: "A strong feeling of affection.",
    category: "feelings",
    difficulty: "beginner",
    translation: "amor",
    pronunciation: "/lʌv/",
    example: "I love my family."
  },
  {
    id: "tired",
    answer: "TIRED",
    clue: "Feeling sleepy or without energy.",
    category: "feelings",
    difficulty: "beginner",
    translation: "cansado",
    pronunciation: "/ˈtaɪ.ərd/",
    example: "I am tired after work."
  },
  {
    id: "hungry",
    answer: "HUNGRY",
    clue: "Feeling that you need to eat.",
    category: "feelings",
    difficulty: "beginner",
    translation: "com fome",
    pronunciation: "/ˈhʌŋ.ɡri/",
    example: "The children are hungry."
  },
  {
    id: "thirsty",
    answer: "THIRSTY",
    clue: "Feeling that you need to drink.",
    category: "feelings",
    difficulty: "beginner",
    translation: "com sede",
    pronunciation: "/ˈθɜːr.sti/",
    example: "I am thirsty after running."
  },
  {
    id: "scared",
    answer: "SCARED",
    clue: "Feeling afraid.",
    category: "feelings",
    difficulty: "beginner",
    translation: "assustado",
    pronunciation: "/skerd/",
    example: "She is scared of dogs."
  },
  {
    id: "phone",
    answer: "PHONE",
    clue: "A device used to call people.",
    category: "technology",
    difficulty: "beginner",
    translation: "telefone",
    pronunciation: "/foʊn/",
    example: "My phone is on the table."
  },
  {
    id: "screen",
    answer: "SCREEN",
    clue: "The flat part of a device where images appear.",
    category: "technology",
    difficulty: "beginner",
    translation: "tela",
    pronunciation: "/skriːn/",
    example: "The screen is too bright."
  },
  {
    id: "mouse",
    answer: "MOUSE",
    clue: "You use it to click on a computer.",
    category: "technology",
    difficulty: "beginner",
    translation: "mouse",
    pronunciation: "/maʊs/",
    example: "The mouse is not working."
  },
  {
    id: "job",
    answer: "JOB",
    clue: "Work you do to earn money.",
    category: "business",
    difficulty: "beginner",
    translation: "emprego",
    pronunciation: "/dʒɑːb/",
    example: "She has a new job."
  },
  {
    id: "money",
    answer: "MONEY",
    clue: "You use it to buy things.",
    category: "business",
    difficulty: "beginner",
    translation: "dinheiro",
    pronunciation: "/ˈmʌn.i/",
    example: "I need money to travel."
  },
  {
    id: "movie",
    answer: "MOVIE",
    clue: "A film you watch at the cinema.",
    category: "movies",
    difficulty: "beginner",
    translation: "filme",
    pronunciation: "/ˈmuː.vi/",
    example: "Let's watch a movie tonight."
  },
  {
    id: "star",
    answer: "STAR",
    clue: "A famous actor or a light in the sky.",
    category: "movies",
    difficulty: "beginner",
    translation: "estrela",
    pronunciation: "/stɑːr/",
    example: "She is a movie star."
  },
  {
    id: "hand",
    answer: "HAND",
    clue: "The part of your body at the end of your arm.",
    category: "home",
    difficulty: "beginner",
    translation: "mão",
    pronunciation: "/hænd/",
    example: "Wash your hands before eating."
  },
  {
    id: "head",
    answer: "HEAD",
    clue: "The top part of your body.",
    category: "home",
    difficulty: "beginner",
    translation: "cabeça",
    pronunciation: "/hed/",
    example: "My head hurts."
  },
  {
    id: "eye",
    answer: "EYE",
    clue: "You see with this.",
    category: "home",
    difficulty: "beginner",
    translation: "olho",
    pronunciation: "/aɪ/",
    example: "She has blue eyes."
  },
  {
    id: "foot",
    answer: "FOOT",
    clue: "The part of your body you stand on.",
    category: "home",
    difficulty: "beginner",
    translation: "pé",
    pronunciation: "/fʊt/",
    example: "My foot hurts."
  },
  {
    id: "leg",
    answer: "LEG",
    clue: "The part of your body used to walk.",
    category: "home",
    difficulty: "beginner",
    translation: "perna",
    pronunciation: "/leɡ/",
    example: "He broke his leg."
  },
  {
    id: "arm",
    answer: "ARM",
    clue: "The part of your body between shoulder and hand.",
    category: "home",
    difficulty: "beginner",
    translation: "braço",
    pronunciation: "/ɑːrm/",
    example: "She raised her arm."
  },
  {
    id: "red",
    answer: "RED",
    clue: "The color of blood.",
    category: "food",
    difficulty: "beginner",
    translation: "vermelho",
    pronunciation: "/red/",
    example: "The apple is red."
  },
  {
    id: "blue",
    answer: "BLUE",
    clue: "The color of the sky.",
    category: "travel",
    difficulty: "beginner",
    translation: "azul",
    pronunciation: "/bluː/",
    example: "The sea is blue."
  },
  {
    id: "green",
    answer: "GREEN",
    clue: "The color of grass.",
    category: "travel",
    difficulty: "beginner",
    translation: "verde",
    pronunciation: "/ɡriːn/",
    example: "The leaves are green."
  },
  {
    id: "black",
    answer: "BLACK",
    clue: "The darkest color.",
    category: "home",
    difficulty: "beginner",
    translation: "preto",
    pronunciation: "/blæk/",
    example: "The cat is black."
  },
  {
    id: "white",
    answer: "WHITE",
    clue: "The color of snow.",
    category: "home",
    difficulty: "beginner",
    translation: "branco",
    pronunciation: "/waɪt/",
    example: "The wall is white."
  },
  {
    id: "big",
    answer: "BIG",
    clue: "Large in size.",
    category: "home",
    difficulty: "beginner",
    translation: "grande",
    pronunciation: "/bɪɡ/",
    example: "That is a big house."
  },
  {
    id: "small",
    answer: "SMALL",
    clue: "Little in size.",
    category: "home",
    difficulty: "beginner",
    translation: "pequeno",
    pronunciation: "/smɔːl/",
    example: "The dog is small."
  },
  {
    id: "hot",
    answer: "HOT",
    clue: "Having a high temperature.",
    category: "food",
    difficulty: "beginner",
    translation: "quente",
    pronunciation: "/hɑːt/",
    example: "The soup is hot."
  },
  {
    id: "cold",
    answer: "COLD",
    clue: "Having a low temperature.",
    category: "food",
    difficulty: "beginner",
    translation: "frio",
    pronunciation: "/koʊld/",
    example: "The water is cold."
  },
  {
    id: "new",
    answer: "NEW",
    clue: "Recently made or bought.",
    category: "business",
    difficulty: "beginner",
    translation: "novo",
    pronunciation: "/nuː/",
    example: "I have a new phone."
  },
  {
    id: "old",
    answer: "OLD",
    clue: "Having existed for a long time.",
    category: "home",
    difficulty: "beginner",
    translation: "velho",
    pronunciation: "/oʊld/",
    example: "This is an old book."
  },
  {
    id: "good",
    answer: "GOOD",
    clue: "Of high quality.",
    category: "feelings",
    difficulty: "beginner",
    translation: "bom",
    pronunciation: "/ɡʊd/",
    example: "This is a good idea."
  },
  {
    id: "bad",
    answer: "BAD",
    clue: "Of low quality.",
    category: "feelings",
    difficulty: "beginner",
    translation: "ruim",
    pronunciation: "/bæd/",
    example: "The weather is bad."
  },
  {
    id: "day",
    answer: "DAY",
    clue: "The time when the sun is up.",
    category: "travel",
    difficulty: "beginner",
    translation: "dia",
    pronunciation: "/deɪ/",
    example: "Have a nice day."
  },
  {
    id: "night",
    answer: "NIGHT",
    clue: "The time when it is dark.",
    category: "travel",
    difficulty: "beginner",
    translation: "noite",
    pronunciation: "/naɪt/",
    example: "Good night."
  },
  {
    id: "week",
    answer: "WEEK",
    clue: "Seven days.",
    category: "business",
    difficulty: "beginner",
    translation: "semana",
    pronunciation: "/wiːk/",
    example: "See you next week."
  },
  {
    id: "year",
    answer: "YEAR",
    clue: "Twelve months.",
    category: "business",
    difficulty: "beginner",
    translation: "ano",
    pronunciation: "/jɪr/",
    example: "Happy New Year."
  },
  {
    id: "music",
    answer: "MUSIC",
    clue: "Sounds made by instruments or voices.",
    category: "movies",
    difficulty: "beginner",
    translation: "música",
    pronunciation: "/ˈmjuː.zɪk/",
    example: "I love this music."
  },
  {
    id: "game",
    answer: "GAME",
    clue: "An activity you play for fun.",
    category: "movies",
    difficulty: "beginner",
    translation: "jogo",
    pronunciation: "/ɡeɪm/",
    example: "Let's play a game."
  },
  {
    id: "ball",
    answer: "BALL",
    clue: "A round object used in games.",
    category: "movies",
    difficulty: "beginner",
    translation: "bola",
    pronunciation: "/bɔːl/",
    example: "Throw the ball."
  },
  {
    id: "tree",
    answer: "TREE",
    clue: "A tall plant with leaves.",
    category: "travel",
    difficulty: "beginner",
    translation: "árvore",
    pronunciation: "/triː/",
    example: "The tree is very tall."
  },
  {
    id: "flower",
    answer: "FLOWER",
    clue: "A colorful plant part.",
    category: "home",
    difficulty: "beginner",
    translation: "flor",
    pronunciation: "/ˈflaʊ.ər/",
    example: "The flower smells good."
  },
  {
    id: "rain",
    answer: "RAIN",
    clue: "Water falling from the sky.",
    category: "travel",
    difficulty: "beginner",
    translation: "chuva",
    pronunciation: "/reɪn/",
    example: "The rain is heavy."
  },
  {
    id: "snow",
    answer: "SNOW",
    clue: "White ice falling from the sky.",
    category: "travel",
    difficulty: "beginner",
    translation: "neve",
    pronunciation: "/snoʊ/",
    example: "The snow is falling."
  },
  {
    id: "wind",
    answer: "WIND",
    clue: "Moving air.",
    category: "travel",
    difficulty: "beginner",
    translation: "vento",
    pronunciation: "/wɪnd/",
    example: "The wind is strong."
  },
  {
    id: "fire",
    answer: "FIRE",
    clue: "Hot flames that burn.",
    category: "home",
    difficulty: "beginner",
    translation: "fogo",
    pronunciation: "/ˈfaɪ.ər/",
    example: "The fire is warm."
  },
  {
    id: "sea",
    answer: "SEA",
    clue: "A large body of salt water.",
    category: "travel",
    difficulty: "beginner",
    translation: "mar",
    pronunciation: "/siː/",
    example: "The sea is calm."
  },
  {
    id: "sky",
    answer: "SKY",
    clue: "The space above the earth.",
    category: "travel",
    difficulty: "beginner",
    translation: "céu",
    pronunciation: "/skaɪ/",
    example: "The sky is clear."
  },
  {
    id: "moon",
    answer: "MOON",
    clue: "The bright object in the night sky.",
    category: "travel",
    difficulty: "beginner",
    translation: "lua",
    pronunciation: "/muːn/",
    example: "The moon is full."
  },
  {
    id: "street",
    answer: "STREET",
    clue: "A road in a city or town.",
    category: "travel",
    difficulty: "beginner",
    translation: "rua",
    pronunciation: "/striːt/",
    example: "I live on this street."
  },
  {
    id: "shop",
    answer: "SHOP",
    clue: "A place where you buy things.",
    category: "business",
    difficulty: "beginner",
    translation: "loja",
    pronunciation: "/ʃɑːp/",
    example: "The shop is open."
  },
  {
    id: "park",
    answer: "PARK",
    clue: "A public area with trees and grass.",
    category: "travel",
    difficulty: "beginner",
    translation: "parque",
    pronunciation: "/pɑːrk/",
    example: "We play in the park."
  },
  {
    id: "hospital",
    answer: "HOSPITAL",
    clue: "A place where sick people are treated.",
    category: "home",
    difficulty: "beginner",
    translation: "hospital",
    pronunciation: "/ˈhɑː.spɪ.təl/",
    example: "She works at the hospital."
  },
  {
    id: "bank",
    answer: "BANK",
    clue: "A place that keeps money safe.",
    category: "business",
    difficulty: "beginner",
    translation: "banco",
    pronunciation: "/bæŋk/",
    example: "I need to go to the bank."
  },
  {
    id: "church",
    answer: "CHURCH",
    clue: "A building for religious services.",
    category: "home",
    difficulty: "beginner",
    translation: "igreja",
    pronunciation: "/tʃɜːrtʃ/",
    example: "The church is old."
  },
  {
    id: "museum",
    answer: "MUSEUM",
    clue: "A place where art and history are shown.",
    category: "education",
    difficulty: "beginner",
    translation: "museu",
    pronunciation: "/mjuːˈziː.əm/",
    example: "We visited the museum."
  },
  {
    id: "farm",
    answer: "FARM",
    clue: "A place where crops and animals are raised.",
    category: "food",
    difficulty: "beginner",
    translation: "fazenda",
    pronunciation: "/fɑːrm/",
    example: "The farm has many cows."
  },
  {
    id: "animal",
    answer: "ANIMAL",
    clue: "A living creature like a dog or cat.",
    category: "home",
    difficulty: "beginner",
    translation: "animal",
    pronunciation: "/ˈæn.ɪ.məl/",
    example: "The animal is wild."
  },
  {
    id: "bird",
    answer: "BIRD",
    clue: "An animal with wings that can fly.",
    category: "home",
    difficulty: "beginner",
    translation: "pássaro",
    pronunciation: "/bɜːrd/",
    example: "The bird is singing."
  },
  {
    id: "horse",
    answer: "HORSE",
    clue: "A large animal people ride.",
    category: "home",
    difficulty: "beginner",
    translation: "cavalo",
    pronunciation: "/hɔːrs/",
    example: "The horse runs fast."
  },
  {
    id: "cow",
    answer: "COW",
    clue: "A large farm animal that gives milk.",
    category: "food",
    difficulty: "beginner",
    translation: "vaca",
    pronunciation: "/kaʊ/",
    example: "The cow is in the field."
  },
  {
    id: "pig",
    answer: "PIG",
    clue: "A pink farm animal.",
    category: "food",
    difficulty: "beginner",
    translation: "porco",
    pronunciation: "/pɪɡ/",
    example: "The pig is dirty."
  },
  {
    id: "duck",
    answer: "DUCK",
    clue: "A bird that swims in water.",
    category: "food",
    difficulty: "beginner",
    translation: "pato",
    pronunciation: "/dʌk/",
    example: "The duck is in the lake."
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
    translation: "bonito",
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
    id: "language",
    answer: "LANGUAGE",
    clue: "A system of words used by people to communicate.",
    category: "education",
    difficulty: "intermediate",
    translation: "idioma",
    pronunciation: "/ˈlæŋ.ɡwɪdʒ/",
    example: "English is a global language."
  },
  {
    id: "student",
    answer: "STUDENT",
    clue: "A person who studies at a school.",
    category: "education",
    difficulty: "intermediate",
    translation: "estudante",
    pronunciation: "/ˈstuː.dənt/",
    example: "She is a good student."
  },
  {
    id: "library",
    answer: "LIBRARY",
    clue: "A place with many books.",
    category: "education",
    difficulty: "intermediate",
    translation: "biblioteca",
    pronunciation: "/ˈlaɪ.brer.i/",
    example: "I study at the library."
  },
  {
    id: "science",
    answer: "SCIENCE",
    clue: "The study of the natural world.",
    category: "education",
    difficulty: "intermediate",
    translation: "ciência",
    pronunciation: "/ˈsaɪ.əns/",
    example: "Science explains many things."
  },
  {
    id: "history",
    answer: "HISTORY",
    clue: "The study of past events.",
    category: "education",
    difficulty: "intermediate",
    translation: "história",
    pronunciation: "/ˈhɪs.tər.i/",
    example: "I love history class."
  },
  {
    id: "question",
    answer: "QUESTION",
    clue: "Something you ask.",
    category: "education",
    difficulty: "intermediate",
    translation: "pergunta",
    pronunciation: "/ˈkwes.tʃən/",
    example: "Can I ask a question?"
  },
  {
    id: "answer",
    answer: "ANSWER",
    clue: "A reply to a question.",
    category: "education",
    difficulty: "intermediate",
    translation: "resposta",
    pronunciation: "/ˈæn.sər/",
    example: "The answer is correct."
  },
  {
    id: "breakfast",
    answer: "BREAKFAST",
    clue: "The first meal of the day.",
    category: "food",
    difficulty: "intermediate",
    translation: "café da manhã",
    pronunciation: "/ˈbrek.fəst/",
    example: "I eat breakfast at 7 AM."
  },
  {
    id: "lunch",
    answer: "LUNCH",
    clue: "The meal you eat in the middle of the day.",
    category: "food",
    difficulty: "intermediate",
    translation: "almoço",
    pronunciation: "/lʌntʃ/",
    example: "We had lunch at noon."
  },
  {
    id: "dinner",
    answer: "DINNER",
    clue: "The main meal of the day, usually in the evening.",
    category: "food",
    difficulty: "intermediate",
    translation: "jantar",
    pronunciation: "/ˈdɪn.ər/",
    example: "Dinner is ready."
  },
  {
    id: "coffee",
    answer: "COFFEE",
    clue: "A hot drink made from roasted beans.",
    category: "food",
    difficulty: "intermediate",
    translation: "café",
    pronunciation: "/ˈkɔː.fi/",
    example: "I need coffee in the morning."
  },
  {
    id: "juice",
    answer: "JUICE",
    clue: "A drink made from fruit.",
    category: "food",
    difficulty: "intermediate",
    translation: "suco",
    pronunciation: "/dʒuːs/",
    example: "Orange juice is my favorite."
  },
  {
    id: "chicken",
    answer: "CHICKEN",
    clue: "A bird often eaten as food.",
    category: "food",
    difficulty: "intermediate",
    translation: "frango",
    pronunciation: "/ˈtʃɪk.ɪn/",
    example: "We had chicken for dinner."
  },
  {
    id: "vegetable",
    answer: "VEGETABLE",
    clue: "A plant used as food.",
    category: "food",
    difficulty: "intermediate",
    translation: "legume",
    pronunciation: "/ˈvedʒ.tə.bəl/",
    example: "Eat your vegetables."
  },
  {
    id: "fruit",
    answer: "FRUIT",
    clue: "A sweet food that grows on a tree or plant.",
    category: "food",
    difficulty: "intermediate",
    translation: "fruta",
    pronunciation: "/fruːt/",
    example: "Fruit is good for your health."
  },
  {
    id: "sugar",
    answer: "SUGAR",
    clue: "A sweet substance added to food and drinks.",
    category: "food",
    difficulty: "intermediate",
    translation: "açúcar",
    pronunciation: "/ˈʃʊɡ.ər/",
    example: "I don't put sugar in my coffee."
  },
  {
    id: "salt",
    answer: "SALT",
    clue: "A white substance used to flavor food.",
    category: "food",
    difficulty: "intermediate",
    translation: "sal",
    pronunciation: "/sɔːlt/",
    example: "Add a little salt to the soup."
  },
  {
    id: "bathroom",
    answer: "BATHROOM",
    clue: "The room where you take a shower.",
    category: "home",
    difficulty: "intermediate",
    translation: "banheiro",
    pronunciation: "/ˈbæθ.ruːm/",
    example: "The bathroom is upstairs."
  },
  {
    id: "bedroom",
    answer: "BEDROOM",
    clue: "The room where you sleep.",
    category: "home",
    difficulty: "intermediate",
    translation: "quarto",
    pronunciation: "/ˈbed.ruːm/",
    example: "My bedroom is small."
  },
  {
    id: "living",
    answer: "LIVING",
    clue: "Related to the room where you relax.",
    category: "home",
    difficulty: "intermediate",
    translation: "sala de estar",
    pronunciation: "/ˈlɪv.ɪŋ/",
    example: "We watch TV in the living room."
  },
  {
    id: "apartment",
    answer: "APARTMENT",
    clue: "A set of rooms to live in, inside a building.",
    category: "home",
    difficulty: "intermediate",
    translation: "apartamento",
    pronunciation: "/əˈpɑːrt.mənt/",
    example: "They live in a small apartment."
  },
  {
    id: "neighbor",
    answer: "NEIGHBOR",
    clue: "A person who lives near you.",
    category: "home",
    difficulty: "intermediate",
    translation: "vizinho",
    pronunciation: "/ˈneɪ.bər/",
    example: "My neighbor is very friendly."
  },
  {
    id: "vacation",
    answer: "VACATION",
    clue: "A period of time to rest and travel.",
    category: "travel",
    difficulty: "intermediate",
    translation: "férias",
    pronunciation: "/veɪˈkeɪ.ʃən/",
    example: "We are going on vacation next week."
  },
  {
    id: "passport",
    answer: "PASSPORT",
    clue: "A document needed to travel to other countries.",
    category: "travel",
    difficulty: "intermediate",
    translation: "passaporte",
    pronunciation: "/ˈpæs.pɔːrt/",
    example: "Don't forget your passport."
  },
  {
    id: "luggage",
    answer: "LUGGAGE",
    clue: "The bags you take when you travel.",
    category: "travel",
    difficulty: "intermediate",
    translation: "bagagem",
    pronunciation: "/ˈlʌɡ.ɪdʒ/",
    example: "Our luggage is heavy."
  },
  {
    id: "map",
    answer: "MAP",
    clue: "A drawing that shows places and roads.",
    category: "travel",
    difficulty: "intermediate",
    translation: "mapa",
    pronunciation: "/mæp/",
    example: "I looked at the map."
  },
  {
    id: "island",
    answer: "ISLAND",
    clue: "Land surrounded by water.",
    category: "travel",
    difficulty: "intermediate",
    translation: "ilha",
    pronunciation: "/ˈaɪ.lənd/",
    example: "We visited a beautiful island."
  },
  {
    id: "mountain",
    answer: "MOUNTAIN",
    clue: "A very high natural place on Earth.",
    category: "travel",
    difficulty: "intermediate",
    translation: "montanha",
    pronunciation: "/ˈmaʊn.tɪn/",
    example: "The mountain is covered in snow."
  },
  {
    id: "river",
    answer: "RIVER",
    clue: "A large natural stream of water.",
    category: "travel",
    difficulty: "intermediate",
    translation: "rio",
    pronunciation: "/ˈrɪv.ər/",
    example: "The river flows to the sea."
  },
  {
    id: "forest",
    answer: "FOREST",
    clue: "A large area with many trees.",
    category: "travel",
    difficulty: "intermediate",
    translation: "floresta",
    pronunciation: "/ˈfɔːr.ɪst/",
    example: "We walked through the forest."
  },
  {
    id: "cousin",
    answer: "COUSIN",
    clue: "The child of your aunt or uncle.",
    category: "family",
    difficulty: "intermediate",
    translation: "primo",
    pronunciation: "/ˈkʌz.ən/",
    example: "My cousin lives in Canada."
  },
  {
    id: "uncle",
    answer: "UNCLE",
    clue: "The brother of your mother or father.",
    category: "family",
    difficulty: "intermediate",
    translation: "tio",
    pronunciation: "/ˈʌŋ.kəl/",
    example: "My uncle is a teacher."
  },
  {
    id: "aunt",
    answer: "AUNT",
    clue: "The sister of your mother or father.",
    category: "family",
    difficulty: "intermediate",
    translation: "tia",
    pronunciation: "/ænt/",
    example: "My aunt makes great cookies."
  },
  {
    id: "husband",
    answer: "HUSBAND",
    clue: "The man a woman is married to.",
    category: "family",
    difficulty: "intermediate",
    translation: "marido",
    pronunciation: "/ˈhʌz.bənd/",
    example: "Her husband is very kind."
  },
  {
    id: "wife",
    answer: "WIFE",
    clue: "The woman a man is married to.",
    category: "family",
    difficulty: "intermediate",
    translation: "esposa",
    pronunciation: "/waɪf/",
    example: "His wife works at a hospital."
  },
  {
    id: "worried",
    answer: "WORRIED",
    clue: "Feeling anxious about something.",
    category: "feelings",
    difficulty: "intermediate",
    translation: "preocupado",
    pronunciation: "/ˈwɜːr.id/",
    example: "She is worried about the exam."
  },
  {
    id: "surprised",
    answer: "SURPRISED",
    clue: "Feeling that something unexpected happened.",
    category: "feelings",
    difficulty: "intermediate",
    translation: "surpreso",
    pronunciation: "/sərˈpraɪzd/",
    example: "I was surprised by the news."
  },
  {
    id: "proud",
    answer: "PROUD",
    clue: "Feeling good about something you did.",
    category: "feelings",
    difficulty: "intermediate",
    translation: "orgulhoso",
    pronunciation: "/praʊd/",
    example: "I am proud of my work."
  },
  {
    id: "lonely",
    answer: "LONELY",
    clue: "Feeling sad because you are alone.",
    category: "feelings",
    difficulty: "intermediate",
    translation: "sozinho",
    pronunciation: "/ˈloʊn.li/",
    example: "He felt lonely at night."
  },
  {
    id: "internet",
    answer: "INTERNET",
    clue: "A global network that connects computers.",
    category: "technology",
    difficulty: "intermediate",
    translation: "internet",
    pronunciation: "/ˈɪn.tər.net/",
    example: "The internet is very fast here."
  },
  {
    id: "website",
    answer: "WEBSITE",
    clue: "A set of pages on the internet.",
    category: "technology",
    difficulty: "intermediate",
    translation: "site",
    pronunciation: "/ˈweb.saɪt/",
    example: "Visit our website for more info."
  },
  {
    id: "email",
    answer: "EMAIL",
    clue: "A message sent electronically.",
    category: "technology",
    difficulty: "intermediate",
    translation: "email",
    pronunciation: "/ˈiː.meɪl/",
    example: "I sent you an email."
  },
  {
    id: "password",
    answer: "PASSWORD",
    clue: "A secret word used to access something.",
    category: "technology",
    difficulty: "intermediate",
    translation: "senha",
    pronunciation: "/ˈpæs.wɜːrd/",
    example: "I forgot my password."
  },
  {
    id: "download",
    answer: "DOWNLOAD",
    clue: "To copy a file from the internet to your device.",
    category: "technology",
    difficulty: "intermediate",
    translation: "baixar",
    pronunciation: "/ˈdaʊn.loʊd/",
    example: "I will download the app."
  },
  {
    id: "customer",
    answer: "CUSTOMER",
    clue: "A person who buys something.",
    category: "business",
    difficulty: "intermediate",
    translation: "cliente",
    pronunciation: "/ˈkʌs.tə.mər/",
    example: "The customer is always right."
  },
  {
    id: "product",
    answer: "PRODUCT",
    clue: "Something made to be sold.",
    category: "business",
    difficulty: "intermediate",
    translation: "produto",
    pronunciation: "/ˈprɑː.dʌkt/",
    example: "This product is very popular."
  },
  {
    id: "market",
    answer: "MARKET",
    clue: "A place where things are bought and sold.",
    category: "business",
    difficulty: "intermediate",
    translation: "mercado",
    pronunciation: "/ˈmɑːr.kɪt/",
    example: "We went to the market."
  },
  {
    id: "price",
    answer: "PRICE",
    clue: "The amount of money something costs.",
    category: "business",
    difficulty: "intermediate",
    translation: "preço",
    pronunciation: "/praɪs/",
    example: "The price is too high."
  },
  {
    id: "sale",
    answer: "SALE",
    clue: "An event where things are sold at lower prices.",
    category: "business",
    difficulty: "intermediate",
    translation: "promoção",
    pronunciation: "/seɪl/",
    example: "The store has a big sale."
  },
  {
    id: "director",
    answer: "DIRECTOR",
    clue: "The person who directs a movie.",
    category: "movies",
    difficulty: "intermediate",
    translation: "diretor",
    pronunciation: "/dəˈrek.tər/",
    example: "The director is very talented."
  },
  {
    id: "audience",
    answer: "AUDIENCE",
    clue: "The people who watch a movie or show.",
    category: "movies",
    difficulty: "intermediate",
    translation: "público",
    pronunciation: "/ˈɔː.di.əns/",
    example: "The audience loved the film."
  },
  {
    id: "cinema",
    answer: "CINEMA",
    clue: "A place where movies are shown.",
    category: "movies",
    difficulty: "intermediate",
    translation: "cinema",
    pronunciation: "/ˈsɪn.ə.mə/",
    example: "Let's go to the cinema."
  },
  {
    id: "culture",
    answer: "CULTURE",
    clue: "The customs and beliefs of a society.",
    category: "education",
    difficulty: "intermediate",
    translation: "cultura",
    pronunciation: "/ˈkʌl.tʃər/",
    example: "Brazilian culture is rich."
  },
  {
    id: "art",
    answer: "ART",
    clue: "Creative work like painting or music.",
    category: "education",
    difficulty: "intermediate",
    translation: "arte",
    pronunciation: "/ɑːrt/",
    example: "She studies art."
  },
  {
    id: "grammar",
    answer: "GRAMMAR",
    clue: "The rules of a language.",
    category: "education",
    difficulty: "intermediate",
    translation: "gramática",
    pronunciation: "/ˈɡræm.ər/",
    example: "English grammar can be tricky."
  },
  {
    id: "vocabulary",
    answer: "VOCABULARY",
    clue: "The words you know in a language.",
    category: "education",
    difficulty: "intermediate",
    translation: "vocabulário",
    pronunciation: "/vəˈkæb.jə.ler.i/",
    example: "Reading improves your vocabulary."
  },
  {
    id: "exercise",
    answer: "EXERCISE",
    clue: "Physical activity to stay healthy.",
    category: "feelings",
    difficulty: "intermediate",
    translation: "exercício",
    pronunciation: "/ˈek.sər.saɪz/",
    example: "I do exercise every morning."
  },
  {
    id: "healthy",
    answer: "HEALTHY",
    clue: "In good physical condition.",
    category: "food",
    difficulty: "intermediate",
    translation: "saudável",
    pronunciation: "/ˈhel.θi/",
    example: "Eating vegetables keeps you healthy."
  },
  {
    id: "doctor",
    answer: "DOCTOR",
    clue: "A person who treats sick people.",
    category: "home",
    difficulty: "intermediate",
    translation: "médico",
    pronunciation: "/ˈdɑːk.tər/",
    example: "The doctor is very kind."
  },
  {
    id: "nurse",
    answer: "NURSE",
    clue: "A person who cares for patients.",
    category: "home",
    difficulty: "intermediate",
    translation: "enfermeiro",
    pronunciation: "/nɜːrs/",
    example: "The nurse is very helpful."
  },
  {
    id: "police",
    answer: "POLICE",
    clue: "People who keep order and safety.",
    category: "business",
    difficulty: "intermediate",
    translation: "polícia",
    pronunciation: "/pəˈliːs/",
    example: "Call the police."
  },
  {
    id: "engineer",
    answer: "ENGINEER",
    clue: "A person who designs machines or structures.",
    category: "technology",
    difficulty: "intermediate",
    translation: "engenheiro",
    pronunciation: "/ˌen.dʒɪˈnɪr/",
    example: "She is an engineer."
  },
  {
    id: "artist",
    answer: "ARTIST",
    clue: "A person who creates art.",
    category: "movies",
    difficulty: "intermediate",
    translation: "artista",
    pronunciation: "/ˈɑːr.tɪst/",
    example: "The artist painted a beautiful picture."
  },
  {
    id: "writer",
    answer: "WRITER",
    clue: "A person who writes books or stories.",
    category: "education",
    difficulty: "intermediate",
    translation: "escritor",
    pronunciation: "/ˈraɪ.tər/",
    example: "He is a famous writer."
  },
  {
    id: "singer",
    answer: "SINGER",
    clue: "A person who sings.",
    category: "movies",
    difficulty: "intermediate",
    translation: "cantor",
    pronunciation: "/ˈsɪŋ.ər/",
    example: "The singer has a great voice."
  },
  {
    id: "dancer",
    answer: "DANCER",
    clue: "A person who dances.",
    category: "movies",
    difficulty: "intermediate",
    translation: "dançarino",
    pronunciation: "/ˈdæn.sər/",
    example: "She is a talented dancer."
  },
  {
    id: "painting",
    answer: "PAINTING",
    clue: "A picture made with paint.",
    category: "movies",
    difficulty: "intermediate",
    translation: "pintura",
    pronunciation: "/ˈpeɪn.tɪŋ/",
    example: "The painting is in the museum."
  },
  {
    id: "sculpture",
    answer: "SCULPTURE",
    clue: "A work of art made from stone or metal.",
    category: "movies",
    difficulty: "intermediate",
    translation: "escultura",
    pronunciation: "/ˈskʌlp.tʃər/",
    example: "The sculpture is beautiful."
  },
  {
    id: "theater",
    answer: "THEATER",
    clue: "A place where plays are performed.",
    category: "movies",
    difficulty: "intermediate",
    translation: "teatro",
    pronunciation: "/ˈθiː.ə.tər/",
    example: "We went to the theater."
  },
  {
    id: "concert",
    answer: "CONCERT",
    clue: "A live music performance.",
    category: "movies",
    difficulty: "intermediate",
    translation: "concerto",
    pronunciation: "/ˈkɑːn.sərt/",
    example: "The concert was amazing."
  },
  {
    id: "festival",
    answer: "FESTIVAL",
    clue: "A special event with music, food, or art.",
    category: "travel",
    difficulty: "intermediate",
    translation: "festival",
    pronunciation: "/ˈfes.tɪ.vəl/",
    example: "The festival lasts three days."
  },
  {
    id: "holiday",
    answer: "HOLIDAY",
    clue: "A special day of celebration or rest.",
    category: "travel",
    difficulty: "intermediate",
    translation: "feriado",
    pronunciation: "/ˈhɑː.lə.deɪ/",
    example: "Christmas is a holiday."
  },
  {
    id: "birthday",
    answer: "BIRTHDAY",
    clue: "The day you were born.",
    category: "family",
    difficulty: "intermediate",
    translation: "aniversário",
    pronunciation: "/ˈbɜːrθ.deɪ/",
    example: "Happy birthday!"
  },
  {
    id: "wedding",
    answer: "WEDDING",
    clue: "A ceremony where two people get married.",
    category: "family",
    difficulty: "intermediate",
    translation: "casamento",
    pronunciation: "/ˈwed.ɪŋ/",
    example: "The wedding was beautiful."
  },
  {
    id: "party",
    answer: "PARTY",
    clue: "A social event with food and music.",
    category: "family",
    difficulty: "intermediate",
    translation: "festa",
    pronunciation: "/ˈpɑːr.ti/",
    example: "We had a great party."
  },
  {
    id: "gift",
    answer: "GIFT",
    clue: "Something you give to someone.",
    category: "family",
    difficulty: "intermediate",
    translation: "presente",
    pronunciation: "/ɡɪft/",
    example: "I bought a gift for my mother."
  },
  {
    id: "letter",
    answer: "LETTER",
    clue: "A written message sent by mail.",
    category: "education",
    difficulty: "intermediate",
    translation: "carta",
    pronunciation: "/ˈlet.ər/",
    example: "I received a letter today."
  },
  {
    id: "message",
    answer: "MESSAGE",
    clue: "A piece of information sent to someone.",
    category: "technology",
    difficulty: "intermediate",
    translation: "mensagem",
    pronunciation: "/ˈmes.ɪdʒ/",
    example: "I got your message."
  },
  {
    id: "notebook",
    answer: "NOTEBOOK",
    clue: "A book with empty pages for writing.",
    category: "education",
    difficulty: "intermediate",
    translation: "caderno",
    pronunciation: "/ˈnoʊt.bʊk/",
    example: "Write it in your notebook."
  },
  {
    id: "pencil",
    answer: "PENCIL",
    clue: "A tool used for writing or drawing.",
    category: "education",
    difficulty: "intermediate",
    translation: "lápis",
    pronunciation: "/ˈpen.səl/",
    example: "I need a pencil."
  },
  {
    id: "paper",
    answer: "PAPER",
    clue: "A thin material used for writing.",
    category: "education",
    difficulty: "intermediate",
    translation: "papel",
    pronunciation: "/ˈpeɪ.pər/",
    example: "Give me a sheet of paper."
  },
  {
    id: "desk",
    answer: "DESK",
    clue: "A table used for working or studying.",
    category: "home",
    difficulty: "intermediate",
    translation: "escrivaninha",
    pronunciation: "/desk/",
    example: "My desk is organized."
  },
  {
    id: "lamp",
    answer: "LAMP",
    clue: "A device that gives light.",
    category: "home",
    difficulty: "intermediate",
    translation: "lâmpada",
    pronunciation: "/læmp/",
    example: "Turn on the lamp."
  },
  {
    id: "mirror",
    answer: "MIRROR",
    clue: "You see your reflection in it.",
    category: "home",
    difficulty: "intermediate",
    translation: "espelho",
    pronunciation: "/ˈmɪr.ər/",
    example: "She looked in the mirror."
  },
  {
    id: "carpet",
    answer: "CARPET",
    clue: "A soft covering for the floor.",
    category: "home",
    difficulty: "intermediate",
    translation: "tapete",
    pronunciation: "/ˈkɑːr.pɪt/",
    example: "The carpet is red."
  },
  {
    id: "curtain",
    answer: "CURTAIN",
    clue: "A cloth that covers a window.",
    category: "home",
    difficulty: "intermediate",
    translation: "cortina",
    pronunciation: "/ˈkɜːr.tən/",
    example: "Open the curtains."
  },
  {
    id: "pillow",
    answer: "PILLOW",
    clue: "A soft cushion for your head.",
    category: "home",
    difficulty: "intermediate",
    translation: "travesseiro",
    pronunciation: "/ˈpɪl.oʊ/",
    example: "The pillow is very soft."
  },
  {
    id: "blanket",
    answer: "BLANKET",
    clue: "A warm cover for your bed.",
    category: "home",
    difficulty: "intermediate",
    translation: "cobertor",
    pronunciation: "/ˈblæŋ.kɪt/",
    example: "I need an extra blanket."
  },
  {
    id: "towel",
    answer: "TOWEL",
    clue: "A cloth used to dry yourself.",
    category: "home",
    difficulty: "intermediate",
    translation: "toalha",
    pronunciation: "/ˈtaʊ.əl/",
    example: "Bring me a towel, please."
  },
  {
    id: "soap",
    answer: "SOAP",
    clue: "You use it to wash your hands.",
    category: "home",
    difficulty: "intermediate",
    translation: "sabão",
    pronunciation: "/soʊp/",
    example: "Wash your hands with soap."
  },
  {
    id: "brush",
    answer: "BRUSH",
    clue: "A tool used for cleaning or painting.",
    category: "home",
    difficulty: "intermediate",
    translation: "escova",
    pronunciation: "/brʌʃ/",
    example: "I brush my teeth every day."
  },
  {
    id: "clock",
    answer: "CLOCK",
    clue: "A device that shows the time.",
    category: "home",
    difficulty: "intermediate",
    translation: "relógio",
    pronunciation: "/klɑːk/",
    example: "The clock is on the wall."
  },
  {
    id: "wallet",
    answer: "WALLET",
    clue: "A small case for money and cards.",
    category: "business",
    difficulty: "intermediate",
    translation: "carteira",
    pronunciation: "/ˈwɑː.lɪt/",
    example: "I lost my wallet."
  },
  {
    id: "umbrella",
    answer: "UMBRELLA",
    clue: "You use it when it rains.",
    category: "travel",
    difficulty: "intermediate",
    translation: "guarda-chuva",
    pronunciation: "/ʌmˈbrel.ə/",
    example: "Take an umbrella with you."
  },
  {
    id: "suitcase",
    answer: "SUITCASE",
    clue: "A bag for clothes when traveling.",
    category: "travel",
    difficulty: "intermediate",
    translation: "mala",
    pronunciation: "/ˈsuːt.keɪs/",
    example: "My suitcase is full."
  },
  {
    id: "backpack",
    answer: "BACKPACK",
    clue: "A bag you carry on your back.",
    category: "travel",
    difficulty: "intermediate",
    translation: "mochila",
    pronunciation: "/ˈbæk.pæk/",
    example: "My backpack is heavy."
  },
  {
    id: "bridge",
    answer: "BRIDGE",
    clue: "A structure built over a river or road.",
    category: "travel",
    difficulty: "intermediate",
    translation: "ponte",
    pronunciation: "/brɪdʒ/",
    example: "The bridge is very old."
  },
  {
    id: "castle",
    answer: "CASTLE",
    clue: "A large old building with towers.",
    category: "travel",
    difficulty: "intermediate",
    translation: "castelo",
    pronunciation: "/ˈkæs.əl/",
    example: "We visited a castle."
  },
  {
    id: "village",
    answer: "VILLAGE",
    clue: "A small town in the countryside.",
    category: "travel",
    difficulty: "intermediate",
    translation: "vila",
    pronunciation: "/ˈvɪl.ɪdʒ/",
    example: "The village is quiet."
  },
  {
    id: "country",
    answer: "COUNTRY",
    clue: "A nation with its own government.",
    category: "travel",
    difficulty: "intermediate",
    translation: "país",
    pronunciation: "/ˈkʌn.tri/",
    example: "Brazil is a large country."
  },
  {
    id: "capital",
    answer: "CAPITAL",
    clue: "The main city of a country.",
    category: "travel",
    difficulty: "intermediate",
    translation: "capital",
    pronunciation: "/ˈkæp.ɪ.təl/",
    example: "Brasília is the capital of Brazil."
  },
  {
    id: "border",
    answer: "BORDER",
    clue: "The line between two countries.",
    category: "travel",
    difficulty: "intermediate",
    translation: "fronteira",
    pronunciation: "/ˈbɔːr.dər/",
    example: "We crossed the border."
  },
  {
    id: "customs",
    answer: "CUSTOMS",
    clue: "The place where luggage is checked at a border.",
    category: "travel",
    difficulty: "intermediate",
    translation: "alfândega",
    pronunciation: "/ˈkʌs.təmz/",
    example: "We went through customs."
  },
  {
    id: "visa",
    answer: "VISA",
    clue: "A document that allows you to enter a country.",
    category: "travel",
    difficulty: "intermediate",
    translation: "visto",
    pronunciation: "/ˈviː.zə/",
    example: "I need a visa for that country."
  },
  {
    id: "flight",
    answer: "FLIGHT",
    clue: "A trip by airplane.",
    category: "travel",
    difficulty: "intermediate",
    translation: "voo",
    pronunciation: "/flaɪt/",
    example: "Our flight is at 6 PM."
  },
  {
    id: "pilot",
    answer: "PILOT",
    clue: "A person who flies a plane.",
    category: "travel",
    difficulty: "intermediate",
    translation: "piloto",
    pronunciation: "/ˈpaɪ.lət/",
    example: "The pilot is very experienced."
  },
  {
    id: "crew",
    answer: "CREW",
    clue: "The group of people working on a plane or ship.",
    category: "travel",
    difficulty: "intermediate",
    translation: "tripulação",
    pronunciation: "/kruː/",
    example: "The crew is friendly."
  },
  {
    id: "seat",
    answer: "SEAT",
    clue: "A place where you sit.",
    category: "travel",
    difficulty: "intermediate",
    translation: "assento",
    pronunciation: "/siːt/",
    example: "My seat is near the window."
  },
  {
    id: "gate",
    answer: "GATE",
    clue: "The door you use to board a plane.",
    category: "travel",
    difficulty: "intermediate",
    translation: "portão",
    pronunciation: "/ɡeɪt/",
    example: "The gate is number 12."
  },
  {
    id: "delay",
    answer: "DELAY",
    clue: "A situation where something happens later than planned.",
    category: "travel",
    difficulty: "intermediate",
    translation: "atraso",
    pronunciation: "/dɪˈleɪ/",
    example: "There was a flight delay."
  },
  {
    id: "arrival",
    answer: "ARRIVAL",
    clue: "The act of reaching a place.",
    category: "travel",
    difficulty: "intermediate",
    translation: "chegada",
    pronunciation: "/əˈraɪ.vəl/",
    example: "The arrival time is 3 PM."
  },
  ]
  export const ALL_WORDS: CrosswordWord[] = [
  ...BEGINNER_WORDS,
  ...INTERMEDIATE_WORDS,
  ...ADVANCED_WORDS
];

export function getWordsByDifficulty(
  difficulty: CrosswordWord["difficulty"]
): CrosswordWord[] {
  if (!difficulty) return ALL_WORDS;
  return ALL_WORDS.filter(word => word.difficulty === difficulty);
}

export function getWordsByCategory(category: string): CrosswordWord[] {
  return ALL_WORDS.filter(word => word.category === category);
}