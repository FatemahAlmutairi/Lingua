import { LessonCard, type LessonStatus } from "@/components/lesson-card";
import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import { getLessonsByUnit, getNextLesson } from "@/data/lessons";
import { getUnitById, getUnitsByLanguage } from "@/data/units";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useLanguageStore } from "@/store/languageStore";
import { useLearningStore } from "@/store/learningStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type LessonsTab = "lessons" | "practice";

export default function Learn() {
  const colors = useThemeColors();
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const completedLessonIds = useLearningStore((state) => state.completedLessonIds);
  const [activeTab, setActiveTab] = useState<LessonsTab>("lessons");

  const languageCode = selectedLanguage ?? languages[0].code;
  const next = getNextLesson(languageCode, completedLessonIds);

  const units = getUnitsByLanguage(languageCode);
  const activeUnit = (next && getUnitById(next.lesson.unitId)) ?? units[0];

  if (!activeUnit) {
    return null;
  }

  const unitLessons = getLessonsByUnit(activeUnit.id);
  const completedCount = unitLessons.filter((lesson) => completedLessonIds.includes(lesson.id)).length;
  const firstIncompleteId = unitLessons.find((lesson) => !completedLessonIds.includes(lesson.id))?.id;

  function statusFor(lessonId: string): LessonStatus {
    if (completedLessonIds.includes(lessonId)) return "completed";
    if (lessonId === firstIncompleteId) return "in-progress";
    return "not-started";
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="flex-row items-center justify-between px-5 pb-3">
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="chevron-back" size={26} color={colors.textPrimary} />
        </TouchableOpacity>

        <View className="flex-1 items-center px-2">
          <Text className="text-h3 font-poppins-bold text-text-primary" numberOfLines={1}>
            {activeUnit.title}
          </Text>
          <Text className="text-body-sm font-poppins-regular text-text-secondary">
            Unit {activeUnit.order} · {completedCount}/{unitLessons.length} lessons
          </Text>
        </View>

        <Ionicons name="bookmark-outline" size={24} color={colors.textPrimary} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="relative">
          <Image source={images.palace} className="h-[220px] w-full" resizeMode="cover" />
          <Image
            source={images.mascotWelcome}
            className="absolute bottom-0 h-[160px] w-[160px] self-center"
            resizeMode="contain"
          />
        </View>

        <View className="-mt-6 rounded-t-[28px] bg-background pb-8 pt-5">
          <View className="mx-5 mb-5 flex-row border-b border-border">
            <TouchableOpacity
              className={
                activeTab === "lessons"
                  ? "flex-1 items-center border-b-2 border-purple pb-2.5"
                  : "flex-1 items-center pb-2.5"
              }
              onPress={() => setActiveTab("lessons")}
            >
              <Text
                className={
                  activeTab === "lessons"
                    ? "text-body-lg font-poppins-semibold text-purple"
                    : "text-body-lg font-poppins-regular text-text-secondary"
                }
              >
                Lessons
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={
                activeTab === "practice"
                  ? "flex-1 items-center border-b-2 border-purple pb-2.5"
                  : "flex-1 items-center pb-2.5"
              }
              onPress={() => setActiveTab("practice")}
            >
              <Text
                className={
                  activeTab === "practice"
                    ? "text-body-lg font-poppins-semibold text-purple"
                    : "text-body-lg font-poppins-regular text-text-secondary"
                }
              >
                Practice
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === "lessons" ? (
            <View className="px-5">
              {unitLessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  status={statusFor(lesson.id)}
                  onPress={() => router.push(`/lesson/${lesson.id}`)}
                />
              ))}
            </View>
          ) : (
            <View className="items-center justify-center gap-3 px-10 py-16">
              <Ionicons name="barbell-outline" size={32} color={colors.purple} />
              <Text className="text-h4 font-poppins-semibold text-text-primary">Practice coming soon</Text>
              <Text className="text-center text-body-md font-poppins-regular text-text-secondary">
                Vocabulary review and quick drills will show up here.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
