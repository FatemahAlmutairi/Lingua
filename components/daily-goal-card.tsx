import { images } from "@/constants/images";
import { Colors } from "@/theme";
import { Image, Text, View } from "react-native";

type DailyGoalCardProps = {
  xpEarned: number;
  xpGoal: number;
};

export function DailyGoalCard({ xpEarned, xpGoal }: DailyGoalCardProps) {
  const progress = xpGoal > 0 ? Math.min(xpEarned / xpGoal, 1) : 0;

  return (
    <View className="mx-5 flex-row items-center justify-between overflow-hidden rounded-3xl bg-peach px-5 py-4">
      <View className="flex-1 gap-2 pr-3">
        <Text className="text-body-sm font-poppins-regular text-text-secondary">Daily goal</Text>

        <View className="flex-row items-baseline gap-1">
          <Text className="text-h1 font-poppins-bold text-text-primary">{xpEarned}</Text>
          <Text className="text-body-md font-poppins-medium text-text-secondary">/ {xpGoal} XP</Text>
        </View>

        <View className="h-2 w-full overflow-hidden rounded-full bg-peach-track">
          <View
            className="h-full rounded-full"
            style={{ width: `${progress * 100}%`, backgroundColor: Colors.streak }}
          />
        </View>
      </View>

      <Image source={images.treasure} className="h-[76px] w-[76px]" resizeMode="contain" />
    </View>
  );
}
