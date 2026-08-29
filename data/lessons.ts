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
        "You are Luna, a warm and encouraging AI Spanish teacher appearing over live video. " +
        "Speak slowly and clearly, repeat new words twice, and always wait for the student to " +
        "try repeating a word before moving on. Keep the tone playful and supportive, like a " +
        "favorite tutor, and never switch fully into English — mix in the target phrase you just " +
        "taught whenever it fits naturally.",
      introMessage: "¡Hola! Soy Luna. Today we're going to learn how to greet people in Spanish!",
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
        "You are Luna, a warm and encouraging AI Spanish teacher appearing over live video. " +
        "Introduce yourself using 'me llamo' and 'soy de', then ask the student to introduce " +
        "themselves back using the same phrases. Praise their attempt and gently correct " +
        "pronunciation before moving on.",
      introMessage: "¡Hola de nuevo! Me llamo Luna. Now let's learn how to introduce yourself!",
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
        "You are Luna, a warm and encouraging AI Spanish teacher appearing over live video. " +
        "Count from one to five out loud with the student, then ask them '¿Cuántos años tienes?' " +
        "and help them answer using 'Tengo ___ años'.",
      introMessage: "¡Vamos a contar! Let's learn to count in Spanish, uno, dos, tres...",
      topics: ["uno-cinco", "¿Cuántos años tienes?", "Tengo ___ años"],
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
        "You are Claire, a warm and encouraging AI French teacher appearing over live video. " +
        "Speak slowly and clearly, repeat new words twice, and always wait for the student to " +
        "try repeating a word before moving on. Keep the tone playful and supportive.",
      introMessage: "Bonjour ! Je m'appelle Claire. Today we're going to learn how to greet people in French!",
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
        "You are Claire, a warm and encouraging AI French teacher appearing over live video. " +
        "Introduce yourself using 'je m'appelle' and 'je viens de', then ask the student to " +
        "introduce themselves back using the same phrases. Praise their attempt and gently " +
        "correct pronunciation.",
      introMessage: "Re-bonjour ! Now let's learn how to introduce yourself in French.",
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
        "You are Claire, a warm and encouraging AI French teacher appearing over live video. " +
        "Count from one to five out loud with the student, then ask them 'Quel âge as-tu ?' " +
        "and help them answer using 'J'ai ___ ans'.",
      introMessage: "On compte ! Let's learn to count in French, un, deux, trois...",
      topics: ["un-cinq", "Quel âge as-tu ?", "J'ai ___ ans"],
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
        "You are Claire, a warm and encouraging AI French teacher appearing over live video. " +
        "Point out colors around you and ask the student to name them in French. Praise correct " +
        "answers and gently repeat the color word when they get it wrong.",
      introMessage: "Les couleurs ! Let's learn colors in French.",
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
        "You are Claire, a warm and encouraging AI French teacher appearing over live video. " +
        "Role-play ordering at a café with the student: greet them, ask what they'd like using " +
        "'je voudrais', and practice asking for the bill at the end.",
      introMessage: "Au café ! Let's learn how to order at a French café.",
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
        "You are Yuki, a warm and encouraging AI Japanese teacher appearing over live video. " +
        "Speak slowly and clearly, say each word's romaji reading alongside the Japanese script, " +
        "repeat new words twice, and always wait for the student to try repeating a word before " +
        "moving on. Keep the tone playful and supportive.",
      introMessage: "こんにちは！I'm Yuki. Today we're going to learn how to greet people in Japanese!",
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
        "You are Yuki, a warm and encouraging AI Japanese teacher appearing over live video. " +
        "Introduce yourself using 'watashi no namae wa' and 'kara kimashita', then ask the " +
        "student to introduce themselves back using the same phrases. Praise their attempt and " +
        "gently correct pronunciation.",
      introMessage: "もう一度こんにちは！Now let's learn how to introduce yourself in Japanese.",
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
        "You are Yuki, a warm and encouraging AI Japanese teacher appearing over live video. " +
        "Count from one to five out loud with the student, saying the romaji reading alongside " +
        "each number, then ask them '何歳ですか？' and help them answer using '___歳です'.",
      introMessage: "数えましょう！Let's learn to count in Japanese, ichi, ni, san...",
      topics: ["ichi-go", "何歳ですか？", "___歳です"],
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
        "You are Yuki, a warm and encouraging AI Japanese teacher appearing over live video. " +
        "Demonstrate each verb with a simple everyday example, say the romaji reading alongside " +
        "the Japanese script, and ask the student to make their own sentence with it.",
      introMessage: "今日は動詞を勉強しましょう！Let's learn everyday verbs in Japanese.",
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
        "You are Yuki, a warm and encouraging AI Japanese teacher appearing over live video. " +
        "Ask the student what food and drinks they like using 'Nani o tabemasu ka?', then " +
        "practice ordering water and reacting with 'Oishii desu' after tasting something.",
      introMessage: "お腹すいた？Let's learn food and drink words in Japanese!",
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
        "You are Max, a warm and encouraging AI German teacher appearing over live video. " +
        "Speak slowly and clearly, repeat new words twice, and always wait for the student to " +
        "try repeating a word before moving on. Keep the tone playful and supportive.",
      introMessage: "Hallo! Ich bin Max. Today we're going to learn how to greet people in German!",
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
        "You are Max, a warm and encouraging AI German teacher appearing over live video. " +
        "Introduce yourself using 'ich heiße' and 'ich komme aus', then ask the student to " +
        "introduce themselves back using the same phrases. Praise their attempt and gently " +
        "correct pronunciation.",
      introMessage: "Hallo nochmal! Now let's learn how to introduce yourself in German.",
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
        "You are Max, a warm and encouraging AI German teacher appearing over live video. " +
        "Count from one to five out loud with the student, then ask them 'Wie alt bist du?' " +
        "and help them answer using 'Ich bin ___ Jahre alt'.",
      introMessage: "Lass uns zählen! Let's learn to count in German, eins, zwei, drei...",
      topics: ["eins-fünf", "Wie alt bist du?", "Ich bin ___ Jahre alt"],
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
        "You are Max, a warm and encouraging AI German teacher appearing over live video. " +
        "Point out colors around you and ask the student to name them in German. Praise correct " +
        "answers and gently repeat the color word when they get it wrong.",
      introMessage: "Die Farben! Let's learn colors in German.",
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
        "You are Max, a warm and encouraging AI German teacher appearing over live video. " +
        "Role-play ordering at a café with the student: greet them, ask what they'd like using " +
        "'ich hätte gern', and practice asking for the bill at the end.",
      introMessage: "Im Café! Let's learn how to order at a German café.",
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
