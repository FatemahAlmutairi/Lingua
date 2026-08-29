import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

type NextUpCardProps = {
  title: string;
  subtitle: string;
  avatarUri: string;
  onPress: () => void;
};

export function NextUpCard({ title, subtitle, avatarUri, onPress }: NextUpCardProps) {
  return (
    <View className="mx-5 flex-row items-center justify-between rounded-3xl bg-mint px-5 py-4">
      <View className="flex-1 gap-1">
        <Text className="text-body-sm font-poppins-medium text-text-secondary">Next up</Text>
        <Text className="text-body-lg font-poppins-semibold text-text-primary">{title}</Text>
        <Text className="text-body-sm font-poppins-regular text-text-secondary">{subtitle}</Text>
      </View>

      <TouchableOpacity activeOpacity={0.85} onPress={onPress} className="relative ml-3">
        <Image source={{ uri: avatarUri }} className="h-16 w-16 rounded-full" />
        <View className="absolute -bottom-1 -right-1 h-7 w-7 items-center justify-center rounded-full bg-green">
          <Ionicons name="videocam" size={16} color="#FFFFFF" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
