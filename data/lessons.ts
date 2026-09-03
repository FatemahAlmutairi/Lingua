import type { Lesson, LanguageCode } from "@/types/learning";
import { getUnitsByLanguage } from "@/data/units";

export const lessons: Lesson[] = [
  // ---------------------------------------------------------------------
  // Spanish — teacher: Luna
  // ---------------------------------------------------------------------
  {
    id: "es-l1",
    unitId: "es-unit-1",
    languageCode: "es",
    title: "Greetings",
    description: "Say hello, goodbye, and be polite in Spanish.",
    order: 1,
    xpReward: 10,
    goals: [
      { id: "es-l1-g1", description: "Greet someone and say goodbye" },
      { id: "es-l1-g2", description: "Say please and thank you" },
    ],
    vocabulary: [
      { id: "es-v-hola", term: "hola", translation: "hello" },
      { id: "es-v-adios", term: "adiós", translation: "goodbye" },
      { id: "es-v-buenosdias", term: "buenos días", translation: "good morning" },
      { id: "es-v-gracias", term: "gracias", translation: "thank you" },
      { id: "es-v-porfavor", term: "por favor", translation: "please" },
    ],
    phrases: [
      { id: "es-p-comoestas", phrase: "¿Cómo estás?", translation: "How are you?", context: "Casual greeting between friends" },
      { id: "es-p-muchogusto", phrase: "Mucho gusto", translation: "Nice to meet you", context: "Said when meeting someone for the first time" },
    ],
    activities: [
      {
        id: "es-l1-a1",
        type: "vocabulary",
        prompt: "Learn this word",
        vocabulary: { id: "es-v-hola", term: "hola", translation: "hello" },
      },
      {
        id: "es-l1-a2",
        type: "multiple-choice",
        prompt: "Choose the correct translation",
        question: "What does 'gracias' mean?",
        options: ["hello", "goodbye", "thank you", "please"],
        correctAnswer: "thank you",
      },
      {
        id: "es-l1-a3",
        type: "translate",
        prompt: "Translate this phrase",
        sourceText: "Good morning",
        correctTranslation: "buenos días",
      },
      {
        id: "es-l1-a4",
        type: "listen",
        prompt: "Type what you hear",
        audioText: "adiós",
        correctAnswer: "adiós",
      },
    ],
    aiTeacherPrompt: {
      teacherName: "Luna",
      systemPrompt:
        "You are Luna, a warm, energetic Spanish teacher meeting your student live for this " +
        "lesson on greetings. Speak mostly in English, and when you introduce a word like " +
        "'hola' (hello) or 'gracias' (thank you), say it slowly and give the English meaning " +
        "right after. Use short, natural sentences with contractions and real encouragement, " +
        "and stay only on today's goal — greeting someone, saying goodbye, and saying please " +
        "and thank you. Listen to how the student responds, adapt your next line to what they " +
        "said, and ask them to repeat a word or try again whenever it'll help. Keep every " +
        "reply to one or two conversational sentences, and don't drift into other topics or " +
        "other languages.",
      introMessage:
        "Hi, I'm Luna! Today we're learning how to say hello and goodbye in Spanish, starting " +
        "with one of my favorite words — hola, that means hello. Want to try saying it with me?",
      topics: ["hola / adiós", "buenos días", "gracias / por favor", "¿Cómo estás?", "Mucho gusto"],
    },
  },
  {
    id: "es-l2",
    unitId: "es-unit-1",
    languageCode: "es",
    title: "Introducing Yourself",
    description: "Say your name and where you're from in Spanish.",
    order: 2,
    xpReward: 10,
    goals: [
      { id: "es-l2-g1", description: "Say your name" },
      { id: "es-l2-g2", description: "Say where you are from" },
    ],
    vocabulary: [
      { id: "es-v-mellamo", term: "me llamo", translation: "my name is" },
      { id: "es-v-soyde", term: "soy de", translation: "I am from" },
      { id: "es-v-encantado", term: "encantado/a", translation: "delighted (nice to meet you)" },
    ],
    phrases: [
      { id: "es-p-comotellamas", phrase: "¿Cómo te llamas?", translation: "What is your name?" },
      { id: "es-p-soydeee", phrase: "Soy de Estados Unidos", translation: "I am from the United States" },
    ],
    activities: [
      {
        id: "es-l2-a1",
        type: "vocabulary",
        prompt: "Learn this word",
        vocabulary: { id: "es-v-mellamo", term: "me llamo", translation: "my name is" },
      },
      {
        id: "es-l2-a2",
        type: "multiple-choice",
        prompt: "Choose the correct translation",
        question: "What does '¿Cómo te llamas?' mean?",
        options: ["How are you?", "What is your name?", "Where are you from?", "Nice to meet you"],
        correctAnswer: "What is your name?",
      },
      {
        id: "es-l2-a3",
        type: "translate",
        prompt: "Translate this phrase",
        sourceText: "I am from the United States",
        correctTranslation: "Soy de Estados Unidos",
      },
    ],
    aiTeacherPrompt: {
      teacherName: "Luna",
      systemPrompt:
        "You are Luna, a warm, energetic Spanish teacher meeting your student live for this " +
        "lesson on introducing yourself. Speak mostly in English, and when you introduce a " +
        "phrase like 'me llamo' (my name is) or 'soy de' (I am from), say it slowly and give " +
        "the English meaning right after. Use short, natural sentences with contractions and " +
        "real encouragement, and stay only on today's goal — saying your name and where " +
        "you're from. Model it yourself first with 'me llamo' and 'soy de', then ask the " +
        "student to introduce themselves the same way, listening closely and adapting your " +
        "next line to what they say. Keep every reply to one or two conversational sentences, " +
        "and don't drift into other topics or other languages.",
      introMessage:
        "¡Hola de nuevo! I'm Luna, and today I'll show you how to introduce yourself in " +
        "Spanish — me llamo means my name is. Ready to tell me yours?",
      topics: ["me llamo", "soy de", "¿Cómo te llamas?", "encantado/a"],
    },
  },
  {
    id: "es-l3",
    unitId: "es-unit-1",
    languageCode: "es",
    title: "Numbers 1-10",
    description: "Count from one to ten in Spanish.",
    order: 3,
    xpReward: 10,
    goals: [
      { id: "es-l3-g1", description: "Count from one to ten" },
      { id: "es-l3-g2", description: "Ask and answer how old someone is" },
    ],
    vocabulary: [
      { id: "es-v-uno", term: "uno", translation: "one" },
      { id: "es-v-dos", term: "dos", translation: "two" },
      { id: "es-v-tres", term: "tres", translation: "three" },
      { id: "es-v-cuatro", term: "cuatro", translation: "four" },
      { id: "es-v-cinco", term: "cinco", translation: "five" },
      { id: "es-v-seis", term: "seis", translation: "six" },
      { id: "es-v-siete", term: "siete", translation: "seven" },
      { id: "es-v-ocho", term: "ocho", translation: "eight" },
      { id: "es-v-nueve", term: "nueve", translation: "nine" },
      { id: "es-v-diez", term: "diez", translation: "ten" },
    ],
    phrases: [
      { id: "es-p-cuantosanos", phrase: "¿Cuántos años tienes?", translation: "How old are you?" },
      { id: "es-p-tengoanos", phrase: "Tengo diez años", translation: "I am ten years old" },
    ],
    activities: [
      {
        id: "es-l3-a1",
        type: "vocabulary",
        prompt: "Learn this word",
        vocabulary: { id: "es-v-tres", term: "tres", translation: "three" },
      },
      {
        id: "es-l3-a2",
        type: "multiple-choice",
        prompt: "Choose the correct translation",
        question: "What does 'cinco' mean?",
        options: ["two", "three", "four", "five"],
        correctAnswer: "five",
      },
      {
        id: "es-l3-a3",
        type: "listen",
        prompt: "Type what you hear",
        audioText: "cuatro",
        correctAnswer: "cuatro",
      },
    ],
    aiTeacherPrompt: {
      teacherName: "Luna",
      systemPrompt:
        "You are Luna, a warm, energetic Spanish teacher meeting your student live for this " +
        "lesson on numbers. Speak mostly in English, and when you introduce a number like " +
        "'uno' (one) or 'cinco' (five), say it slowly and give the English meaning right " +
        "after. Use short, natural sentences with contractions and real encouragement, and " +
        "stay only on today's goal — counting from one to ten and asking someone's age. " +
        "Count from uno to diez with the student one number at a time, then help them ask " +
        "and answer '¿Cuántos años tienes?' using 'Tengo ___ años'. Keep every reply to one " +
        "or two conversational sentences, and don't drift into other topics or other " +
        "languages.",
      introMessage:
        "¡Hola! I'm Luna, and today we're counting in Spanish. Let's start easy — uno means " +
        "one. Can you say it back to me?",
      topics: ["uno-diez", "¿Cuántos años tienes?", "Tengo ___ años"],
    },
  },

  // ---------------------------------------------------------------------
  // French — teacher: Claire
  // ---------------------------------------------------------------------
  {
    id: "fr-l1",
    unitId: "fr-unit-1",
    languageCode: "fr",
    title: "Greetings",
    description: "Say hello, goodbye, and be polite in French.",
    order: 1,
    xpReward: 10,
    goals: [
      { id: "fr-l1-g1", description: "Greet someone and say goodbye" },
      { id: "fr-l1-g2", description: "Say please and thank you" },
    ],
    vocabulary: [
      { id: "fr-v-bonjour", term: "bonjour", translation: "hello" },
      { id: "fr-v-aurevoir", term: "au revoir", translation: "goodbye" },
      { id: "fr-v-merci", term: "merci", translation: "thank you" },
      { id: "fr-v-silvousplait", term: "s'il vous plaît", translation: "please" },
      { id: "fr-v-bonsoir", term: "bonsoir", translation: "good evening" },
    ],
    phrases: [
      { id: "fr-p-commentcava", phrase: "Comment ça va ?", translation: "How's it going?", context: "Casual greeting between friends" },
      { id: "fr-p-enchante", phrase: "Enchanté(e)", translation: "Nice to meet you", context: "Said when meeting someone for the first time" },
    ],
    activities: [
      {
        id: "fr-l1-a1",
        type: "vocabulary",
        prompt: "Learn this word",
        vocabulary: { id: "fr-v-bonjour", term: "bonjour", translation: "hello" },
      },
      {
        id: "fr-l1-a2",
        type: "multiple-choice",
        prompt: "Choose the correct translation",
        question: "What does 'merci' mean?",
        options: ["hello", "goodbye", "thank you", "please"],
        correctAnswer: "thank you",
      },
      {
        id: "fr-l1-a3",
        type: "translate",
        prompt: "Translate this phrase",
        sourceText: "Good evening",
        correctTranslation: "bonsoir",
      },
      {
        id: "fr-l1-a4",
        type: "listen",
        prompt: "Type what you hear",
        audioText: "au revoir",
        correctAnswer: "au revoir",
      },
    ],
    aiTeacherPrompt: {
      teacherName: "Claire",
      systemPrompt:
        "You are Claire, a warm, energetic French teacher meeting your student live for this " +
        "lesson on greetings. Speak mostly in English, and when you introduce a word like " +
        "'bonjour' (hello) or 'merci' (thank you), say it slowly and give the English meaning " +
        "right after. Use short, natural sentences with contractions and real encouragement, " +
        "and stay only on today's goal — greeting someone, saying goodbye, and saying please " +
        "and thank you. Listen to how the student responds, adapt your next line to what they " +
        "said, and ask them to repeat a word or try again whenever it'll help. Keep every " +
        "reply to one or two conversational sentences, and don't drift into other topics or " +
        "other languages.",
      introMessage:
        "Hi, I'm Claire! Today we're learning how to greet people in French, starting with a " +
        "classic — bonjour, that means hello. Want to give it a try?",
      topics: ["bonjour / au revoir", "merci / s'il vous plaît", "bonsoir", "Comment ça va ?", "Enchanté(e)"],
    },
  },
  {
    id: "fr-l2",
    unitId: "fr-unit-1",
    languageCode: "fr",
    title: "Introducing Yourself",
    description: "Say your name and where you're from in French.",
    order: 2,
    xpReward: 10,
    goals: [
      { id: "fr-l2-g1", description: "Say your name" },
      { id: "fr-l2-g2", description: "Say where you are from" },
    ],
    vocabulary: [
      { id: "fr-v-jemappelle", term: "je m'appelle", translation: "my name is" },
      { id: "fr-v-jeviensde", term: "je viens de", translation: "I come from" },
      { id: "fr-v-enchantee2", term: "enchanté(e)", translation: "delighted (nice to meet you)" },
    ],
    phrases: [
      { id: "fr-p-commenttappelles", phrase: "Comment tu t'appelles ?", translation: "What is your name?" },
      { id: "fr-p-jeviensdesetats", phrase: "Je viens des États-Unis", translation: "I come from the United States" },
    ],
    activities: [
      {
        id: "fr-l2-a1",
        type: "vocabulary",
        prompt: "Learn this word",
        vocabulary: { id: "fr-v-jemappelle", term: "je m'appelle", translation: "my name is" },
      },
      {
        id: "fr-l2-a2",
        type: "multiple-choice",
        prompt: "Choose the correct translation",
        question: "What does 'Comment tu t'appelles ?' mean?",
        options: ["How are you?", "What is your name?", "Where are you from?", "Nice to meet you"],
        correctAnswer: "What is your name?",
      },
      {
        id: "fr-l2-a3",
        type: "translate",
        prompt: "Translate this phrase",
        sourceText: "I come from the United States",
        correctTranslation: "Je viens des États-Unis",
      },
    ],
    aiTeacherPrompt: {
      teacherName: "Claire",
      systemPrompt:
        "You are Claire, a warm, energetic French teacher meeting your student live for this " +
        "lesson on introducing yourself. Speak mostly in English, and when you introduce a " +
        "phrase like 'je m'appelle' (my name is) or 'je viens de' (I come from), say it " +
        "slowly and give the English meaning right after. Use short, natural sentences with " +
        "contractions and real encouragement, and stay only on today's goal — saying your " +
        "name and where you're from. Model it yourself first with 'je m'appelle' and 'je " +
        "viens de', then ask the student to introduce themselves the same way, listening " +
        "closely and adapting your next line to what they say. Keep every reply to one or " +
        "two conversational sentences, and don't drift into other topics or other languages.",
      introMessage:
        "Re-bonjour! I'm Claire, and today I'll show you how to introduce yourself in " +
        "French — je m'appelle means my name is. Want to tell me yours?",
      topics: ["je m'appelle", "je viens de", "Comment tu t'appelles ?", "enchanté(e)"],
    },
  },
  {
    id: "fr-l3",
    unitId: "fr-unit-1",
    languageCode: "fr",
    title: "Numbers 1-10",
    description: "Count from one to ten in French.",
    order: 3,
    xpReward: 10,
    goals: [
      { id: "fr-l3-g1", description: "Count from one to ten" },
      { id: "fr-l3-g2", description: "Ask and answer how old someone is" },
    ],
    vocabulary: [
      { id: "fr-v-un", term: "un", translation: "one" },
      { id: "fr-v-deux", term: "deux", translation: "two" },
      { id: "fr-v-trois", term: "trois", translation: "three" },
      { id: "fr-v-quatre", term: "quatre", translation: "four" },
      { id: "fr-v-cinq", term: "cinq", translation: "five" },
      { id: "fr-v-six", term: "six", translation: "six" },
      { id: "fr-v-sept", term: "sept", translation: "seven" },
      { id: "fr-v-huit", term: "huit", translation: "eight" },
      { id: "fr-v-neuf", term: "neuf", translation: "nine" },
      { id: "fr-v-dix", term: "dix", translation: "ten" },
    ],
    phrases: [
      { id: "fr-p-quelage", phrase: "Quel âge as-tu ?", translation: "How old are you?" },
      { id: "fr-p-jaiansdix", phrase: "J'ai dix ans", translation: "I am ten years old" },
    ],
    activities: [
      {
        id: "fr-l3-a1",
        type: "vocabulary",
        prompt: "Learn this word",
        vocabulary: { id: "fr-v-trois", term: "trois", translation: "three" },
      },
      {
        id: "fr-l3-a2",
        type: "multiple-choice",
        prompt: "Choose the correct translation",
        question: "What does 'cinq' mean?",
        options: ["two", "three", "four", "five"],
        correctAnswer: "five",
      },
      {
        id: "fr-l3-a3",
        type: "listen",
        prompt: "Type what you hear",
        audioText: "quatre",
        correctAnswer: "quatre",
      },
    ],
    aiTeacherPrompt: {
      teacherName: "Claire",
      systemPrompt:
        "You are Claire, a warm, energetic French teacher meeting your student live for this " +
        "lesson on numbers. Speak mostly in English, and when you introduce a number like " +
        "'un' (one) or 'cinq' (five), say it slowly and give the English meaning right after. " +
        "Use short, natural sentences with contractions and real encouragement, and stay only " +
        "on today's goal — counting from one to ten and asking someone's age. Count from un " +
        "to dix with the student one number at a time, then help them ask and answer 'Quel " +
        "âge as-tu ?' using 'J'ai ___ ans'. Keep every reply to one or two conversational " +
        "sentences, and don't drift into other topics or other languages.",
      introMessage:
        "Salut! I'm Claire, and today we're counting in French. Let's start simple — un " +
        "means one. Can you say it back to me?",
      topics: ["un-dix", "Quel âge as-tu ?", "J'ai ___ ans"],
    },
  },
  {
    id: "fr-l4",
    unitId: "fr-unit-1",
    languageCode: "fr",
    title: "Colors",
    description: "Name common colors in French.",
    order: 4,
    xpReward: 10,
    goals: [
      { id: "fr-l4-g1", description: "Name basic colors" },
      { id: "fr-l4-g2", description: "Describe an object's color" },
    ],
    vocabulary: [
      { id: "fr-v-rouge", term: "rouge", translation: "red" },
      { id: "fr-v-bleu", term: "bleu", translation: "blue" },
      { id: "fr-v-vert", term: "vert", translation: "green" },
      { id: "fr-v-jaune", term: "jaune", translation: "yellow" },
      { id: "fr-v-noir", term: "noir", translation: "black" },
    ],
    phrases: [
      { id: "fr-p-quellecouleur", phrase: "De quelle couleur est-ce ?", translation: "What color is it?" },
      { id: "fr-p-cestrouge", phrase: "C'est rouge", translation: "It's red" },
    ],
    activities: [
      {
        id: "fr-l4-a1",
        type: "vocabulary",
        prompt: "Learn this word",
        vocabulary: { id: "fr-v-rouge", term: "rouge", translation: "red" },
      },
      {
        id: "fr-l4-a2",
        type: "multiple-choice",
        prompt: "Choose the correct translation",
        question: "What does 'vert' mean?",
        options: ["red", "blue", "green", "yellow"],
        correctAnswer: "green",
      },
      {
        id: "fr-l4-a3",
        type: "translate",
        prompt: "Translate this phrase",
        sourceText: "It's black",
        correctTranslation: "C'est noir",
      },
    ],
    aiTeacherPrompt: {
      teacherName: "Claire",
      systemPrompt:
        "You are Claire, a warm, energetic French teacher meeting your student live for this " +
        "lesson on colors. Speak mostly in English, and when you introduce a color like " +
        "'rouge' (red) or 'bleu' (blue), say it slowly and give the English meaning right " +
        "after. Use short, natural sentences with contractions and real encouragement, and " +
        "stay only on today's goal — naming basic colors and describing an object's color. " +
        "Point out something colorful, ask the student to name its color in French, and " +
        "gently repeat the word if they need another try. Keep every reply to one or two " +
        "conversational sentences, and don't drift into other topics or other languages.",
      introMessage:
        "Hi, it's Claire! Today we're learning colors in French — rouge means red. Do you " +
        "see anything red nearby you can name?",
      topics: ["rouge / bleu / vert", "jaune / noir", "De quelle couleur est-ce ?"],
    },
  },
  {
    id: "fr-l5",
    unitId: "fr-unit-1",
    languageCode: "fr",
    title: "At the Café",
    description: "Order food and drinks at a French café.",
    order: 5,
    xpReward: 10,
    goals: [
      { id: "fr-l5-g1", description: "Order a drink politely" },
      { id: "fr-l5-g2", description: "Ask for the bill" },
    ],
    vocabulary: [
      { id: "fr-v-uncafe", term: "un café", translation: "a coffee" },
      { id: "fr-v-laddition", term: "l'addition", translation: "the bill" },
      { id: "fr-v-jevoudrais", term: "je voudrais", translation: "I would like" },
      { id: "fr-v-uneau", term: "une eau", translation: "a water" },
      { id: "fr-v-lecroissant", term: "le croissant", translation: "the croissant" },
    ],
    phrases: [
      {
        id: "fr-p-jevoudraisuncafe",
        phrase: "Je voudrais un café, s'il vous plaît",
        translation: "I would like a coffee, please",
      },
      { id: "fr-p-ladditionsvp", phrase: "L'addition, s'il vous plaît", translation: "The bill, please" },
    ],
    activities: [
      {
        id: "fr-l5-a1",
        type: "vocabulary",
        prompt: "Learn this word",
        vocabulary: { id: "fr-v-uncafe", term: "un café", translation: "a coffee" },
      },
      {
        id: "fr-l5-a2",
        type: "multiple-choice",
        prompt: "Choose the correct translation",
        question: "What does 'l'addition' mean?",
        options: ["the menu", "the bill", "the coffee", "the water"],
        correctAnswer: "the bill",
      },
      {
        id: "fr-l5-a3",
        type: "translate",
        prompt: "Translate this phrase",
        sourceText: "I would like a coffee, please",
        correctTranslation: "Je voudrais un café, s'il vous plaît",
      },
      {
        id: "fr-l5-a4",
        type: "listen",
        prompt: "Type what you hear",
        audioText: "L'addition, s'il vous plaît",
        correctAnswer: "L'addition, s'il vous plaît",
      },
    ],
    aiTeacherPrompt: {
      teacherName: "Claire",
      systemPrompt:
        "You are Claire, a warm, energetic French teacher meeting your student live for this " +
        "lesson set at a café. Speak mostly in English, and when you introduce a phrase like " +
        "'je voudrais' (I would like) or 'l'addition' (the bill), say it slowly and give the " +
        "English meaning right after. Use short, natural sentences with contractions and real " +
        "encouragement, and stay only on today's goal — ordering a drink politely and asking " +
        "for the bill. Role-play the café scene with the student: greet them, help them order " +
        "using 'je voudrais', and practice asking for the bill together. Keep every reply to " +
        "one or two conversational sentences, and don't drift into other topics or other " +
        "languages.",
      introMessage:
        "Bonjour, welcome to our café lesson! I'm Claire, and today you'll learn to order " +
        "like a local — je voudrais means I would like. Ready to order something?",
      topics: ["je voudrais", "un café / une eau", "l'addition, s'il vous plaît"],
    },
  },

  // ---------------------------------------------------------------------
  // Japanese — teacher: Yuki
  // ---------------------------------------------------------------------
  {
    id: "ja-l1",
    unitId: "ja-unit-1",
    languageCode: "ja",
    title: "Greetings",
    description: "Say hello, goodbye, and be polite in Japanese.",
    order: 1,
    xpReward: 10,
    goals: [
      { id: "ja-l1-g1", description: "Greet someone and say goodbye" },
      { id: "ja-l1-g2", description: "Say please and thank you" },
    ],
    vocabulary: [
      { id: "ja-v-konnichiwa", term: "こんにちは (konnichiwa)", translation: "hello" },
      { id: "ja-v-sayounara", term: "さようなら (sayounara)", translation: "goodbye" },
      { id: "ja-v-arigatou", term: "ありがとう (arigatou)", translation: "thank you" },
      { id: "ja-v-onegaishimasu", term: "お願いします (onegaishimasu)", translation: "please" },
      { id: "ja-v-ohayou", term: "おはよう (ohayou)", translation: "good morning" },
    ],
    phrases: [
      { id: "ja-p-ogenki", phrase: "お元気ですか？ (Ogenki desu ka?)", translation: "How are you?", context: "Polite greeting" },
      { id: "ja-p-hajimemashite", phrase: "はじめまして (Hajimemashite)", translation: "Nice to meet you", context: "Said when meeting someone for the first time" },
    ],
    activities: [
      {
        id: "ja-l1-a1",
        type: "vocabulary",
        prompt: "Learn this word",
        vocabulary: { id: "ja-v-konnichiwa", term: "こんにちは (konnichiwa)", translation: "hello" },
      },
      {
        id: "ja-l1-a2",
        type: "multiple-choice",
        prompt: "Choose the correct translation",
        question: "What does 'ありがとう (arigatou)' mean?",
        options: ["hello", "goodbye", "thank you", "please"],
        correctAnswer: "thank you",
      },
      {
        id: "ja-l1-a3",
        type: "translate",
        prompt: "Translate this phrase",
        sourceText: "good morning",
        correctTranslation: "おはよう (ohayou)",
      },
      {
        id: "ja-l1-a4",
        type: "listen",
        prompt: "Type what you hear",
        audioText: "さようなら (sayounara)",
        correctAnswer: "さようなら (sayounara)",
      },
    ],
    aiTeacherPrompt: {
      teacherName: "Yuki",
      systemPrompt:
        "You are Yuki, a warm, energetic Japanese teacher meeting your student live for this " +
        "lesson on greetings. Speak mostly in English, and when you introduce a word like " +
        "'konnichiwa' (hello) or 'arigatou' (thank you), say it slowly along with its romaji " +
        "and give the English meaning right after. Use short, natural sentences with " +
        "contractions and real encouragement, and stay only on today's goal — greeting " +
        "someone, saying goodbye, and saying please and thank you. Listen to how the student " +
        "responds, adapt your next line to what they said, and ask them to repeat a word or " +
        "try again whenever it'll help. Keep every reply to one or two conversational " +
        "sentences, and don't drift into other topics or other languages.",
      introMessage:
        "Hi, I'm Yuki! Today we're learning how to greet people in Japanese, starting with " +
        "konnichiwa, which means hello. Want to try saying it with me?",
      topics: ["konnichiwa / sayounara", "arigatou / onegaishimasu", "ohayou", "Ogenki desu ka?", "Hajimemashite"],
    },
  },
  {
    id: "ja-l2",
    unitId: "ja-unit-1",
    languageCode: "ja",
    title: "Introducing Yourself",
    description: "Say your name and where you're from in Japanese.",
    order: 2,
    xpReward: 10,
    goals: [
      { id: "ja-l2-g1", description: "Say your name" },
      { id: "ja-l2-g2", description: "Say where you are from" },
    ],
    vocabulary: [
      { id: "ja-v-namaewa", term: "私の名前は (watashi no namae wa)", translation: "my name is" },
      { id: "ja-v-karakimashita", term: "から来ました (kara kimashita)", translation: "I come from" },
      { id: "ja-v-yoroshiku", term: "よろしくお願いします (yoroshiku onegaishimasu)", translation: "pleased to meet you" },
    ],
    phrases: [
      { id: "ja-p-onamaewa", phrase: "お名前は何ですか？ (Onamae wa nan desu ka?)", translation: "What is your name?" },
      { id: "ja-p-amerikakara", phrase: "アメリカから来ました (Amerika kara kimashita)", translation: "I come from the United States" },
    ],
    activities: [
      {
        id: "ja-l2-a1",
        type: "vocabulary",
        prompt: "Learn this word",
        vocabulary: { id: "ja-v-namaewa", term: "私の名前は (watashi no namae wa)", translation: "my name is" },
      },
      {
        id: "ja-l2-a2",
        type: "multiple-choice",
        prompt: "Choose the correct translation",
        question: "What does 'お名前は何ですか？' mean?",
        options: ["How are you?", "What is your name?", "Where are you from?", "Nice to meet you"],
        correctAnswer: "What is your name?",
      },
      {
        id: "ja-l2-a3",
        type: "translate",
        prompt: "Translate this phrase",
        sourceText: "I come from the United States",
        correctTranslation: "アメリカから来ました (Amerika kara kimashita)",
      },
    ],
    aiTeacherPrompt: {
      teacherName: "Yuki",
      systemPrompt:
        "You are Yuki, a warm, energetic Japanese teacher meeting your student live for this " +
        "lesson on introducing yourself. Speak mostly in English, and when you introduce a " +
        "phrase like 'watashi no namae wa ___ desu' (my name is) or '___ kara kimashita' " +
        "(I come from), " +
        "say it slowly along with its romaji and give the English meaning right after. Use " +
        "short, natural sentences with contractions and real encouragement, and stay only on " +
        "today's goal — saying your name and where you're from. Model it yourself first, then " +
        "ask the student to introduce themselves the same way, listening closely and adapting " +
        "your next line to what they say. Keep every reply to one or two conversational " +
        "sentences, and don't drift into other topics or other languages.",
      introMessage:
        "Hi again, it's Yuki! Today I'll show you how to introduce yourself in Japanese — " +
        "watashi no namae wa means my name is. Want to tell me yours?",
      topics: ["watashi no namae wa", "kara kimashita", "Onamae wa nan desu ka?", "yoroshiku onegaishimasu"],
    },
  },
  {
    id: "ja-l3",
    unitId: "ja-unit-1",
    languageCode: "ja",
    title: "Numbers 1-10",
    description: "Count from one to ten in Japanese.",
    order: 3,
    xpReward: 10,
    goals: [
      { id: "ja-l3-g1", description: "Count from one to ten" },
      { id: "ja-l3-g2", description: "Ask and answer how old someone is" },
    ],
    vocabulary: [
      { id: "ja-v-ichi", term: "一 (ichi)", translation: "one" },
      { id: "ja-v-ni", term: "二 (ni)", translation: "two" },
      { id: "ja-v-san", term: "三 (san)", translation: "three" },
      { id: "ja-v-yon", term: "四 (yon)", translation: "four" },
      { id: "ja-v-go", term: "五 (go)", translation: "five" },
      { id: "ja-v-roku", term: "六 (roku)", translation: "six" },
      { id: "ja-v-nana", term: "七 (nana)", translation: "seven" },
      { id: "ja-v-hachi", term: "八 (hachi)", translation: "eight" },
      { id: "ja-v-kyuu", term: "九 (kyuu)", translation: "nine" },
      { id: "ja-v-juu", term: "十 (juu)", translation: "ten" },
    ],
    phrases: [
      { id: "ja-p-nansai", phrase: "何歳ですか？ (Nansai desu ka?)", translation: "How old are you?" },
      { id: "ja-p-jussai", phrase: "十歳です (Jussai desu)", translation: "I am ten years old" },
    ],
    activities: [
      {
        id: "ja-l3-a1",
        type: "vocabulary",
        prompt: "Learn this word",
        vocabulary: { id: "ja-v-san", term: "三 (san)", translation: "three" },
      },
      {
        id: "ja-l3-a2",
        type: "multiple-choice",
        prompt: "Choose the correct translation",
        question: "What does '五 (go)' mean?",
        options: ["two", "three", "four", "five"],
        correctAnswer: "five",
      },
      {
        id: "ja-l3-a3",
        type: "listen",
        prompt: "Type what you hear",
        audioText: "四 (yon)",
        correctAnswer: "四 (yon)",
      },
    ],
    aiTeacherPrompt: {
      teacherName: "Yuki",
      systemPrompt:
        "You are Yuki, a warm, energetic Japanese teacher meeting your student live for this " +
        "lesson on numbers. Speak mostly in English, and when you introduce a number like " +
        "'ichi' (one) or 'go' (five), say it slowly along with its romaji and give the " +
        "English meaning right after. Use short, natural sentences with contractions and real " +
        "encouragement, and stay only on today's goal — counting from one to ten and asking " +
        "someone's age. Count from ichi to juu with the student one number at a time, then " +
        "help them ask and answer '何歳ですか？' using '___歳です'. Keep every reply to one or " +
        "two conversational sentences, and don't drift into other topics or other languages.",
      introMessage:
        "Hi, I'm Yuki! Today we're counting in Japanese. Let's start easy — ichi means one. " +
        "Can you say it back to me?",
      topics: ["ichi-juu", "何歳ですか？", "___歳です"],
    },
  },
  {
    id: "ja-l4",
    unitId: "ja-unit-1",
    languageCode: "ja",
    title: "Daily Verbs",
    description: "Learn common everyday action words in Japanese.",
    order: 4,
    xpReward: 10,
    goals: [
      { id: "ja-l4-g1", description: "Use basic verbs to describe daily actions" },
      { id: "ja-l4-g2", description: "Form a simple sentence with a verb" },
    ],
    vocabulary: [
      { id: "ja-v-taberu", term: "食べる (taberu)", translation: "to eat" },
      { id: "ja-v-nomu", term: "飲む (nomu)", translation: "to drink" },
      { id: "ja-v-iku", term: "行く (iku)", translation: "to go" },
      { id: "ja-v-miru", term: "見る (miru)", translation: "to see / to watch" },
      { id: "ja-v-suru", term: "する (suru)", translation: "to do" },
    ],
    phrases: [
      { id: "ja-p-nanitabemasuka", phrase: "何を食べますか？ (Nani o tabemasu ka?)", translation: "What do you eat?" },
      { id: "ja-p-gakkouniikimasu", phrase: "学校に行きます (Gakkou ni ikimasu)", translation: "I go to school" },
    ],
    activities: [
      {
        id: "ja-l4-a1",
        type: "vocabulary",
        prompt: "Learn this word",
        vocabulary: { id: "ja-v-taberu", term: "食べる (taberu)", translation: "to eat" },
      },
      {
        id: "ja-l4-a2",
        type: "multiple-choice",
        prompt: "Choose the correct translation",
        question: "What does '飲む (nomu)' mean?",
        options: ["to eat", "to drink", "to go", "to see"],
        correctAnswer: "to drink",
      },
      {
        id: "ja-l4-a3",
        type: "translate",
        prompt: "Translate this phrase",
        sourceText: "I go to school",
        correctTranslation: "学校に行きます (Gakkou ni ikimasu)",
      },
    ],
    aiTeacherPrompt: {
      teacherName: "Yuki",
      systemPrompt:
        "You are Yuki, a warm, energetic Japanese teacher meeting your student live for this " +
        "lesson on daily verbs. Speak mostly in English, and when you introduce a verb like " +
        "'taberu' (to eat) or 'nomu' (to drink), say it slowly along with its romaji and give " +
        "the English meaning right after. Use short, natural sentences with contractions and " +
        "real encouragement, and stay only on today's goal — using basic verbs to describe " +
        "daily actions and forming a simple sentence with one. Demonstrate each verb with a " +
        "quick everyday example, then ask the student to try making their own sentence with " +
        "it. Keep every reply to one or two conversational sentences, and don't drift into " +
        "other topics or other languages.",
      introMessage:
        "Hi, it's Yuki! Today we're learning everyday action words in Japanese — taberu " +
        "means to eat. Can you think of something you like to eat?",
      topics: ["taberu / nomu", "iku / miru / suru", "Nani o tabemasu ka?"],
    },
  },
  {
    id: "ja-l5",
    unitId: "ja-unit-1",
    languageCode: "ja",
    title: "Food & Drinks",
    description: "Talk about food and drinks in Japanese.",
    order: 5,
    xpReward: 10,
    goals: [
      { id: "ja-l5-g1", description: "Name common foods and drinks" },
      { id: "ja-l5-g2", description: "Order something to eat or drink" },
    ],
    vocabulary: [
      { id: "ja-v-mizu", term: "水 (mizu)", translation: "water" },
      { id: "ja-v-gohan", term: "ご飯 (gohan)", translation: "rice / meal" },
      { id: "ja-v-ocha", term: "お茶 (ocha)", translation: "tea" },
      { id: "ja-v-sushi", term: "寿司 (sushi)", translation: "sushi" },
      { id: "ja-v-ringo", term: "りんご (ringo)", translation: "apple" },
    ],
    phrases: [
      { id: "ja-p-omizuonegai", phrase: "お水をお願いします (Omizu o onegaishimasu)", translation: "Water, please" },
      { id: "ja-p-oishiidesu", phrase: "おいしいです (Oishii desu)", translation: "It's delicious" },
    ],
    activities: [
      {
        id: "ja-l5-a1",
        type: "vocabulary",
        prompt: "Learn this word",
        vocabulary: { id: "ja-v-gohan", term: "ご飯 (gohan)", translation: "rice / meal" },
      },
      {
        id: "ja-l5-a2",
        type: "multiple-choice",
        prompt: "Choose the correct translation",
        question: "What does 'お茶 (ocha)' mean?",
        options: ["water", "tea", "rice", "apple"],
        correctAnswer: "tea",
      },
      {
        id: "ja-l5-a3",
        type: "listen",
        prompt: "Type what you hear",
        audioText: "寿司 (sushi)",
        correctAnswer: "寿司 (sushi)",
      },
    ],
    aiTeacherPrompt: {
      teacherName: "Yuki",
      systemPrompt:
        "You are Yuki, a warm, energetic Japanese teacher meeting your student live for this " +
        "lesson on food and drinks. Speak mostly in English, and when you introduce a word " +
        "like 'mizu' (water) or 'gohan' (rice / meal), say it slowly along with its romaji " +
        "and give the English meaning right after. Use short, natural sentences with " +
        "contractions and real encouragement, and stay only on today's goal — naming common " +
        "foods and drinks and ordering something to eat or drink. Ask the student what they " +
        "like to eat or drink, then practice ordering water together and reacting with " +
        "'Oishii desu' afterward. Keep every reply to one or two conversational sentences, " +
        "and don't drift into other topics or other languages.",
      introMessage:
        "Hi, I'm Yuki! Let's talk about food and drinks in Japanese — mizu means water. " +
        "What's your favorite thing to drink?",
      topics: ["mizu / ocha", "gohan / sushi / ringo", "Omizu o onegaishimasu"],
    },
  },

  // ---------------------------------------------------------------------
  // German — teacher: Max
  // ---------------------------------------------------------------------
  {
    id: "de-l1",
    unitId: "de-unit-1",
    languageCode: "de",
    title: "Greetings",
    description: "Say hello, goodbye, and be polite in German.",
    order: 1,
    xpReward: 10,
    goals: [
      { id: "de-l1-g1", description: "Greet someone and say goodbye" },
      { id: "de-l1-g2", description: "Say please and thank you" },
    ],
    vocabulary: [
      { id: "de-v-hallo", term: "hallo", translation: "hello" },
      { id: "de-v-tschuss", term: "tschüss", translation: "goodbye" },
      { id: "de-v-danke", term: "danke", translation: "thank you" },
      { id: "de-v-bitte", term: "bitte", translation: "please" },
      { id: "de-v-gutenmorgen", term: "guten Morgen", translation: "good morning" },
    ],
    phrases: [
      { id: "de-p-wiegehts", phrase: "Wie geht's?", translation: "How are you?", context: "Casual greeting between friends" },
      { id: "de-p-freutmich", phrase: "Freut mich", translation: "Nice to meet you", context: "Said when meeting someone for the first time" },
    ],
    activities: [
      {
        id: "de-l1-a1",
        type: "vocabulary",
        prompt: "Learn this word",
        vocabulary: { id: "de-v-hallo", term: "hallo", translation: "hello" },
      },
      {
        id: "de-l1-a2",
        type: "multiple-choice",
        prompt: "Choose the correct translation",
        question: "What does 'danke' mean?",
        options: ["hello", "goodbye", "thank you", "please"],
        correctAnswer: "thank you",
      },
      {
        id: "de-l1-a3",
        type: "translate",
        prompt: "Translate this phrase",
        sourceText: "good morning",
        correctTranslation: "guten Morgen",
      },
      {
        id: "de-l1-a4",
        type: "listen",
        prompt: "Type what you hear",
        audioText: "tschüss",
        correctAnswer: "tschüss",
      },
    ],
    aiTeacherPrompt: {
      teacherName: "Max",
      systemPrompt:
        "You are Max, a warm, energetic German teacher meeting your student live for this " +
        "lesson on greetings. Speak mostly in English, and when you introduce a word like " +
        "'hallo' (hello) or 'danke' (thank you), say it slowly and give the English meaning " +
        "right after. Use short, natural sentences with contractions and real encouragement, " +
        "and stay only on today's goal — greeting someone, saying goodbye, and saying please " +
        "and thank you. Listen to how the student responds, adapt your next line to what they " +
        "said, and ask them to repeat a word or try again whenever it'll help. Keep every " +
        "reply to one or two conversational sentences, and don't drift into other topics or " +
        "other languages.",
      introMessage:
        "Hi, I'm Max! Today we're learning how to greet people in German, starting with " +
        "hallo, which means hello. Want to try saying it with me?",
      topics: ["hallo / tschüss", "danke / bitte", "guten Morgen", "Wie geht's?", "Freut mich"],
    },
  },
  {
    id: "de-l2",
    unitId: "de-unit-1",
    languageCode: "de",
    title: "Introducing Yourself",
    description: "Say your name and where you're from in German.",
    order: 2,
    xpReward: 10,
    goals: [
      { id: "de-l2-g1", description: "Say your name" },
      { id: "de-l2-g2", description: "Say where you are from" },
    ],
    vocabulary: [
      { id: "de-v-ichheisse", term: "ich heiße", translation: "my name is" },
      { id: "de-v-ichkommeaus", term: "ich komme aus", translation: "I come from" },
      { id: "de-v-freutmich2", term: "freut mich", translation: "pleased to meet you" },
    ],
    phrases: [
      { id: "de-p-wieheisstdu", phrase: "Wie heißt du?", translation: "What is your name?" },
      { id: "de-p-ausdenusa", phrase: "Ich komme aus den USA", translation: "I come from the United States" },
    ],
    activities: [
      {
        id: "de-l2-a1",
        type: "vocabulary",
        prompt: "Learn this word",
        vocabulary: { id: "de-v-ichheisse", term: "ich heiße", translation: "my name is" },
      },
      {
        id: "de-l2-a2",
        type: "multiple-choice",
        prompt: "Choose the correct translation",
        question: "What does 'Wie heißt du?' mean?",
        options: ["How are you?", "What is your name?", "Where are you from?", "Nice to meet you"],
        correctAnswer: "What is your name?",
      },
      {
        id: "de-l2-a3",
        type: "translate",
        prompt: "Translate this phrase",
        sourceText: "I come from the United States",
        correctTranslation: "Ich komme aus den USA",
      },
    ],
    aiTeacherPrompt: {
      teacherName: "Max",
      systemPrompt:
        "You are Max, a warm, energetic German teacher meeting your student live for this " +
        "lesson on introducing yourself. Speak mostly in English, and when you introduce a " +
        "phrase like 'ich heiße' (my name is) or 'ich komme aus' (I come from), say it slowly " +
        "and give the English meaning right after. Use short, natural sentences with " +
        "contractions and real encouragement, and stay only on today's goal — saying your " +
        "name and where you're from. Model it yourself first with 'ich heiße' and 'ich komme " +
        "aus', then ask the student to introduce themselves the same way, listening closely " +
        "and adapting your next line to what they say. Keep every reply to one or two " +
        "conversational sentences, and don't drift into other topics or other languages.",
      introMessage:
        "Hallo again! I'm Max, and today I'll show you how to introduce yourself in German — " +
        "ich heiße means my name is. Want to tell me yours?",
      topics: ["ich heiße", "ich komme aus", "Wie heißt du?", "freut mich"],
    },
  },
  {
    id: "de-l3",
    unitId: "de-unit-1",
    languageCode: "de",
    title: "Numbers 1-10",
    description: "Count from one to ten in German.",
    order: 3,
    xpReward: 10,
    goals: [
      { id: "de-l3-g1", description: "Count from one to ten" },
      { id: "de-l3-g2", description: "Ask and answer how old someone is" },
    ],
    vocabulary: [
      { id: "de-v-eins", term: "eins", translation: "one" },
      { id: "de-v-zwei", term: "zwei", translation: "two" },
      { id: "de-v-drei", term: "drei", translation: "three" },
      { id: "de-v-vier", term: "vier", translation: "four" },
      { id: "de-v-fuenf", term: "fünf", translation: "five" },
      { id: "de-v-sechs", term: "sechs", translation: "six" },
      { id: "de-v-sieben", term: "sieben", translation: "seven" },
      { id: "de-v-acht", term: "acht", translation: "eight" },
      { id: "de-v-neun", term: "neun", translation: "nine" },
      { id: "de-v-zehn", term: "zehn", translation: "ten" },
    ],
    phrases: [
      { id: "de-p-wiealt", phrase: "Wie alt bist du?", translation: "How old are you?" },
      { id: "de-p-ichbinzehn", phrase: "Ich bin zehn Jahre alt", translation: "I am ten years old" },
    ],
    activities: [
      {
        id: "de-l3-a1",
        type: "vocabulary",
        prompt: "Learn this word",
        vocabulary: { id: "de-v-drei", term: "drei", translation: "three" },
      },
      {
        id: "de-l3-a2",
        type: "multiple-choice",
        prompt: "Choose the correct translation",
        question: "What does 'fünf' mean?",
        options: ["two", "three", "four", "five"],
        correctAnswer: "five",
      },
      {
        id: "de-l3-a3",
        type: "listen",
        prompt: "Type what you hear",
        audioText: "vier",
        correctAnswer: "vier",
      },
    ],
    aiTeacherPrompt: {
      teacherName: "Max",
      systemPrompt:
        "You are Max, a warm, energetic German teacher meeting your student live for this " +
        "lesson on numbers. Speak mostly in English, and when you introduce a number like " +
        "'eins' (one) or 'fünf' (five), say it slowly and give the English meaning right " +
        "after. Use short, natural sentences with contractions and real encouragement, and " +
        "stay only on today's goal — counting from one to ten and asking someone's age. " +
        "Count from eins to zehn with the student one number at a time, then help them ask " +
        "and answer 'Wie alt bist du?' using 'Ich bin ___ Jahre alt'. Keep every reply to one " +
        "or two conversational sentences, and don't drift into other topics or other " +
        "languages.",
      introMessage:
        "Hi, I'm Max! Today we're counting in German. Let's start simple — eins means one. " +
        "Can you say it back to me?",
      topics: ["eins-zehn", "Wie alt bist du?", "Ich bin ___ Jahre alt"],
    },
  },
  {
    id: "de-l4",
    unitId: "de-unit-1",
    languageCode: "de",
    title: "Colors",
    description: "Name common colors in German.",
    order: 4,
    xpReward: 10,
    goals: [
      { id: "de-l4-g1", description: "Name basic colors" },
      { id: "de-l4-g2", description: "Describe an object's color" },
    ],
    vocabulary: [
      { id: "de-v-rot", term: "rot", translation: "red" },
      { id: "de-v-blau", term: "blau", translation: "blue" },
      { id: "de-v-gruen", term: "grün", translation: "green" },
      { id: "de-v-gelb", term: "gelb", translation: "yellow" },
      { id: "de-v-schwarz", term: "schwarz", translation: "black" },
    ],
    phrases: [
      { id: "de-p-welchefarbe", phrase: "Welche Farbe hat das?", translation: "What color is it?" },
      { id: "de-p-esistrot", phrase: "Es ist rot", translation: "It's red" },
    ],
    activities: [
      {
        id: "de-l4-a1",
        type: "vocabulary",
        prompt: "Learn this word",
        vocabulary: { id: "de-v-rot", term: "rot", translation: "red" },
      },
      {
        id: "de-l4-a2",
        type: "multiple-choice",
        prompt: "Choose the correct translation",
        question: "What does 'grün' mean?",
        options: ["red", "blue", "green", "yellow"],
        correctAnswer: "green",
      },
      {
        id: "de-l4-a3",
        type: "translate",
        prompt: "Translate this phrase",
        sourceText: "It's black",
        correctTranslation: "Es ist schwarz",
      },
    ],
    aiTeacherPrompt: {
      teacherName: "Max",
      systemPrompt:
        "You are Max, a warm, energetic German teacher meeting your student live for this " +
        "lesson on colors. Speak mostly in English, and when you introduce a color like 'rot' " +
        "(red) or 'blau' (blue), say it slowly and give the English meaning right after. Use " +
        "short, natural sentences with contractions and real encouragement, and stay only on " +
        "today's goal — naming basic colors and describing an object's color. Point out " +
        "something colorful, ask the student to name its color in German, and gently repeat " +
        "the word if they need another try. Keep every reply to one or two conversational " +
        "sentences, and don't drift into other topics or other languages.",
      introMessage:
        "Hi, it's Max! Today we're learning colors in German — rot means red. Do you see " +
        "anything red nearby you can name?",
      topics: ["rot / blau / grün", "gelb / schwarz", "Welche Farbe hat das?"],
    },
  },
  {
    id: "de-l5",
    unitId: "de-unit-1",
    languageCode: "de",
    title: "Im Café",
    description: "Order food and drinks at a German café.",
    order: 5,
    xpReward: 10,
    goals: [
      { id: "de-l5-g1", description: "Order a drink politely" },
      { id: "de-l5-g2", description: "Ask for the bill" },
    ],
    vocabulary: [
      { id: "de-v-derkaffee", term: "der Kaffee", translation: "the coffee" },
      { id: "de-v-dierechnung", term: "die Rechnung", translation: "the bill" },
      { id: "de-v-ichhaettegern", term: "ich hätte gern", translation: "I would like" },
      { id: "de-v-daswasser", term: "das Wasser", translation: "the water" },
      { id: "de-v-derkuchen", term: "der Kuchen", translation: "the cake" },
    ],
    phrases: [
      {
        id: "de-p-ichhaettegernkaffee",
        phrase: "Ich hätte gern einen Kaffee, bitte",
        translation: "I would like a coffee, please",
      },
      { id: "de-p-dierechnungbitte", phrase: "Die Rechnung, bitte", translation: "The bill, please" },
    ],
    activities: [
      {
        id: "de-l5-a1",
        type: "vocabulary",
        prompt: "Learn this word",
        vocabulary: { id: "de-v-derkaffee", term: "der Kaffee", translation: "the coffee" },
      },
      {
        id: "de-l5-a2",
        type: "multiple-choice",
        prompt: "Choose the correct translation",
        question: "What does 'die Rechnung' mean?",
        options: ["the menu", "the bill", "the coffee", "the water"],
        correctAnswer: "the bill",
      },
      {
        id: "de-l5-a3",
        type: "translate",
        prompt: "Translate this phrase",
        sourceText: "I would like a coffee, please",
        correctTranslation: "Ich hätte gern einen Kaffee, bitte",
      },
      {
        id: "de-l5-a4",
        type: "listen",
        prompt: "Type what you hear",
        audioText: "Die Rechnung, bitte",
        correctAnswer: "Die Rechnung, bitte",
      },
    ],
    aiTeacherPrompt: {
      teacherName: "Max",
      systemPrompt:
        "You are Max, a warm, energetic German teacher meeting your student live for this " +
        "lesson set at a café. Speak mostly in English, and when you introduce a phrase like " +
        "'ich hätte gern' (I would like) or 'die Rechnung' (the bill), say it slowly and give " +
        "the English meaning right after. Use short, natural sentences with contractions and " +
        "real encouragement, and stay only on today's goal — ordering a drink politely and " +
        "asking for the bill. Role-play the café scene with the student: greet them, help " +
        "them order using 'ich hätte gern', and practice asking for the bill together. Keep " +
        "every reply to one or two conversational sentences, and don't drift into other " +
        "topics or other languages.",
      introMessage:
        "Hallo, welcome to our café lesson! I'm Max, and today you'll learn to order like a " +
        "local — ich hätte gern means I would like. Ready to order something?",
      topics: ["ich hätte gern", "der Kaffee / das Wasser", "Die Rechnung, bitte"],
    },
  },
];

export function getLessonsByUnit(unitId: string): Lesson[] {
  return lessons
    .filter((lesson) => lesson.unitId === unitId)
    .sort((a, b) => a.order - b.order);
}

export function getLessonsByLanguage(languageCode: LanguageCode): Lesson[] {
  return lessons
    .filter((lesson) => lesson.languageCode === languageCode)
    .sort((a, b) => a.order - b.order);
}

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}

/** The next lesson a learner should take, in unit order, skipping completed ones. */
export function getNextLesson(
  languageCode: LanguageCode,
  completedLessonIds: string[]
): { lesson: Lesson; unitOrder: number; unitTitle: string } | undefined {
  const units = getUnitsByLanguage(languageCode);

  for (const unit of units) {
    const unitLessons = getLessonsByUnit(unit.id);
    const nextLesson = unitLessons.find((lesson) => !completedLessonIds.includes(lesson.id));
    if (nextLesson) {
      return { lesson: nextLesson, unitOrder: unit.order, unitTitle: unit.title };
    }
  }

  const lastUnit = units[units.length - 1];
  const lastLesson = lastUnit ? getLessonsByUnit(lastUnit.id).at(-1) : undefined;
  return lastUnit && lastLesson
    ? { lesson: lastLesson, unitOrder: lastUnit.order, unitTitle: lastUnit.title }
    : undefined;
}
