import type { LanguageCode, Unit } from "@/types/learning";

export const units: Unit[] = [
  {
    id: "es-unit-1",
    languageCode: "es",
    title: "Basics 1",
    description: "Greet people, introduce yourself, and count in Spanish.",
    order: 1,
    lessonIds: ["es-l1", "es-l2", "es-l3"],
  },
  {
    id: "fr-unit-1",
    languageCode: "fr",
    title: "Basics 1",
    description: "Greet people, count, name colors, and order at a café in French.",
    order: 1,
    lessonIds: ["fr-l1", "fr-l2", "fr-l3", "fr-l4", "fr-l5"],
  },
  {
    id: "ja-unit-1",
    languageCode: "ja",
    title: "Basics 1",
    description: "Greet people, count, learn daily verbs, and talk about food in Japanese.",
    order: 1,
    lessonIds: ["ja-l1", "ja-l2", "ja-l3", "ja-l4", "ja-l5"],
  },
  {
    id: "de-unit-1",
    languageCode: "de",
    title: "Basics 1",
    description: "Greet people, count, name colors, and order at a café in German.",
    order: 1,
    lessonIds: ["de-l1", "de-l2", "de-l3", "de-l4", "de-l5"],
  },
];

export function getUnitsByLanguage(languageCode: LanguageCode): Unit[] {
  return units
    .filter((unit) => unit.languageCode === languageCode)
    .sort((a, b) => a.order - b.order);
}

export function getUnitById(id: string): Unit | undefined {
  return units.find((unit) => unit.id === id);
}
