import type { ReactNode } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/theme";

type PlaceholderScreenProps = {
  title: string;
  description: string;
  icon: ReactNode;
};

export function PlaceholderScreen({ title, description, icon }: PlaceholderScreenProps) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <View className="flex-1 items-center justify-center gap-4 px-10">
        <View className="h-20 w-20 items-center justify-center rounded-full bg-surface">{icon}</View>
        <Text className="text-h2 font-poppins-semibold text-text-primary">{title}</Text>
        <Text className="text-center text-body-md font-poppins-regular text-text-secondary">
          {description}
        </Text>
      </View>
    </SafeAreaView>
  );
}
