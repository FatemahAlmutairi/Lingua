import type { Lesson } from "@/types/learning";
import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

export type LessonStatus = "completed" | "in-progress" | "not-started";

type LessonCardProps = {
  lesson: Lesson;
  status: LessonStatus;
  onPress: () => void;
};

export function LessonCard({ lesson, status, onPress }: LessonCardProps) {
  const isInProgress = status === "in-progress";
  const isCompleted = status === "completed";

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className={
        isInProgress
          ? "mb-3 flex-row items-center justify-between rounded-2xl border-2 border-purple bg-purple-tint px-4 py-3.5"
          : "mb-3 flex-row items-center justify-between rounded-2xl border border-border bg-background px-4 py-3.5"
      }
    >
      <View className="flex-1 pr-3">
        <Text
          className={
            isInProgress
              ? "text-body-sm font-poppins-semibold text-purple"
              : "text-body-sm font-poppins-regular text-text-secondary"
          }
        >
          Lesson {lesson.order}
        </Text>
        <Text className="text-body-lg font-poppins-semibold text-text-primary">{lesson.title}</Text>

        {isInProgress && (
          <Text className="text-body-sm font-poppins-medium text-purple">In progress</Text>
        )}
        {status === "not-started" && (
          <Text className="text-body-sm font-poppins-regular text-text-secondary" numberOfLines={1}>
            {lesson.description}
          </Text>
        )}
      </View>

      {isCompleted && (
        <View className="h-8 w-8 items-center justify-center rounded-full bg-green">
          <Ionicons name="checkmark" size={18} color="#FFFFFF" />
        </View>
      )}

      {isInProgress && (
        <Image
          source={{ uri: `https://picsum.photos/seed/${lesson.id}/100/100` }}
          className="h-11 w-11 rounded-xl"
        />
      )}
    </TouchableOpacity>
  );
}
