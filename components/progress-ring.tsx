import { useThemeColors } from "@/hooks/useThemeColors";
import { Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

type ProgressRingProps = {
  progress: number; // 0-1
  size?: number;
  strokeWidth?: number;
};

export function ProgressRing({ progress, size = 64, strokeWidth = 6 }: ProgressRingProps) {
  const colors = useThemeColors();
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(Math.max(progress, 0), 1));

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: "-90deg" }] }}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.border}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.purple}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          fill="none"
        />
      </Svg>
      <View className="absolute inset-0 items-center justify-center">
        <Text className="text-body-sm font-poppins-bold text-text-primary">
          {Math.round(progress * 100)}%
        </Text>
      </View>
    </View>
  );
}
