import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

type TodayPlanItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  iconBackground: string;
  title: string;
  subtitle: string;
  completed: boolean;
  onPress: () => void;
};

export function TodayPlanItem({ icon, iconBackground, title, subtitle, completed, onPress }: TodayPlanItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="flex-row items-center gap-3 py-2.5"
    >
      <View className="h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: iconBackground }}>
        <Ionicons name={icon} size={20} color="#FFFFFF" />
      </View>

      <View className="flex-1">
        <Text className="text-body-lg font-poppins-semibold text-text-primary">{title}</Text>
        <Text className="text-body-sm font-poppins-regular text-text-secondary">{subtitle}</Text>
      </View>

      {completed ? (
        <View className="h-7 w-7 items-center justify-center rounded-full bg-purple">
          <Ionicons name="checkmark" size={16} color="#FFFFFF" />
        </View>
      ) : (
        <View className="h-7 w-7 rounded-full border-2 border-border" />
      )}
    </TouchableOpacity>
  );
}
