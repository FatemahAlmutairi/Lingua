import { useThemeColors } from "@/hooks/useThemeColors";
import type { Language } from "@/types/learning";
import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

type LanguageCardProps = {
  language: Language;
  selected: boolean;
  onPress: () => void;
};

export function LanguageCard({ language, selected, onPress }: LanguageCardProps) {
  const colors = useThemeColors();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className={
        selected
          ? "flex-row items-center justify-between rounded-2xl border-2 border-purple bg-purple-tint px-4 py-3.5"
          : "flex-row items-center justify-between rounded-2xl border border-border px-4 py-3.5"
      }
    >
      <View className="flex-row items-center gap-3">
        <Image source={{ uri: language.flagEmoji }} className="h-11 w-11 rounded-full" />
        <View>
          <Text className="text-h4 font-poppins-semibold text-text-primary">{language.name}</Text>
          <Text className="text-body-sm font-poppins-regular text-text-secondary">
            {language.nativeName}
          </Text>
        </View>
      </View>

      {selected ? (
        <View className="h-7 w-7 items-center justify-center rounded-full bg-purple">
          <Ionicons name="checkmark" size={16} color="#FFFFFF" />
        </View>
      ) : (
        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
      )}
    </TouchableOpacity>
  );
}
