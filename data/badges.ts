import { images } from "@/constants/images";
import type { ImageSourcePropType } from "react-native";

export type Badge = {
  id: string;
  image?: ImageSourcePropType;
  emoji?: string;
  label: string;
  tintClassName: string;
};

export const badges: Badge[] = [
  { id: "first-treasure", image: images.treasure, label: "First lesson", tintClassName: "bg-peach" },
  { id: "gold-medal", emoji: "🏅", label: "7 day streak", tintClassName: "bg-gold-tint" },
  { id: "blue-shield", emoji: "🛡️", label: "Unit complete", tintClassName: "bg-blue-tint" },
  { id: "purple-star", emoji: "🎖️", label: "Perfect lesson", tintClassName: "bg-purple-tint" },
];
