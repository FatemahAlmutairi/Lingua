import { Colors } from "@/theme";
import type { Language } from "@/types/learning";
import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

type HomeHeaderProps = {
  greeting: string;
  firstName: string;
  language: Language;
  streak: number;
  onPressNotifications: () => void;
};

export function HomeHeader({ greeting, firstName, language, streak, onPressNotifications }: HomeHeaderProps) {
  return (
    <View className="flex-row items-center justify-between px-5 pt-3">
      <View className="flex-row items-center gap-2.5">
        <Image source={{ uri: language.flagEmoji }} className="h-10 w-10 rounded-full" />
        <View className="flex-row items-center gap-1">
          <Text className="text-h4 font-poppins-semibold text-text-primary">
            {greeting}, {firstName}!
          </Text>
          <Text className="text-h4">👋</Text>
        </View>
      </View>

      <View className="flex-row items-center gap-4">
        <View className="flex-row items-center gap-1">
          <Ionicons name="flame" size={22} color={Colors.streak} />
          <Text className="text-h4 font-poppins-bold text-streak">{streak}</Text>
        </View>
        <TouchableOpacity onPress={onPressNotifications} hitSlop={8}>
          <Ionicons name="notifications-outline" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
