import type { Language, LanguageCode } from "@/types/learning";

export const languages: Language[] = [
  { code: "es", name: "Spanish", nativeName: "Español", flagEmoji: 'https://flagcdn.com/w320/es.png', accentColor: "#FF9600" },
  { code: "fr", name: "French", nativeName: "Français", flagEmoji: 'https://flagcdn.com/w320/fr.png', accentColor: "#1CB0F6" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flagEmoji: 'https://flagcdn.com/w320/jp.png', accentColor: "#FF4B4B" },
  { code: "de", name: "German", nativeName: "Deutsch", flagEmoji: 'https://flagcdn.com/w320/de.png', accentColor: "#58CC02" },
];

export function getLanguageByCode(code: LanguageCode): Language | undefined {
  return languages.find((language) => language.code === code);
}

/** Short greeting used on the home screen, e.g. "¡Hola, Alex!" */
export const languageGreetings: Record<LanguageCode, string> = {
  es: "¡Hola",
  fr: "Bonjour",
  ja: "こんにちは",
  de: "Hallo",
};
