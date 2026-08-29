// Core types for the hardcoded lesson content system (see AGENTS.md "Lesson Content Rules").

export type LanguageCode = "es" | "fr" | "ja" | "de";

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flagEmoji: string;
  accentColor: string;
}

export interface Unit {
  id: string;
  languageCode: LanguageCode;
  title: string;
  description: string;
  order: number;
  lessonIds: string[];
}

export interface VocabularyItem {
  id: string;
  term: string;
  translation: string;
  example?: string;
}

export interface Phrase {
  id: string;
  phrase: string;
  translation: string;
  context?: string;
}

export interface LessonGoal {
  id: string;
  description: string;
}

export type ActivityType = "vocabulary" | "translate" | "multiple-choice" | "listen";

interface BaseActivity {
  id: string;
  type: ActivityType;
  prompt: string;
}

export interface VocabularyActivity extends BaseActivity {
  type: "vocabulary";
  vocabulary: VocabularyItem;
}

export interface TranslateActivity extends BaseActivity {
  type: "translate";
  sourceText: string;
  correctTranslation: string;
}

export interface MultipleChoiceActivity extends BaseActivity {
  type: "multiple-choice";
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface ListenActivity extends BaseActivity {
  type: "listen";
  /** Text to be spoken by TTS/the audio Vision Agent; the learner types what they hear. */
  audioText: string;
  correctAnswer: string;
}

export type Activity = VocabularyActivity | TranslateActivity | MultipleChoiceActivity | ListenActivity;

/** Drives a future audio/video Vision Agent session led by a named AI teacher. */
export interface AITeacherPrompt {
  teacherName: string;
  systemPrompt: string;
  introMessage: string;
  topics: string[];
}

export interface Lesson {
  id: string;
  unitId: string;
  languageCode: LanguageCode;
  title: string;
  description: string;
  order: number;
  xpReward: number;
  goals: LessonGoal[];
  vocabulary: VocabularyItem[];
  phrases: Phrase[];
  activities: Activity[];
  aiTeacherPrompt: AITeacherPrompt;
}
