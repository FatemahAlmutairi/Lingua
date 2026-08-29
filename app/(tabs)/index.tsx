import { ContinueLearningCard } from "@/components/continue-learning-card";
import { DailyGoalCard } from "@/components/daily-goal-card";
import { HomeHeader } from "@/components/home-header";
import { NextUpCard } from "@/components/next-up-card";
import { TodayPlanItem } from "@/components/today-plan-item";
import { images } from "@/constants/images";
import { getLanguageByCode, languageGreetings, languages } from "@/data/languages";
import { getNextLesson } from "@/data/lessons";
import { useLanguageStore } from "@/store/languageStore";
import { useLearningStore } from "@/store/learningStore";
import { Colors } from "@/theme";
import { useUser } from "@clerk/expo";
import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { user } = useUser();
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const completedLessonIds = useLearningStore((state) => state.completedLessonIds);
  const xpToday = useLearningStore((state) => state.xpToday);
  const dailyGoal = useLearningStore((state) => state.dailyGoal);
  const streak = useLearningStore((state) => state.streak);

  const languageCode = selectedLanguage ?? languages[0].code;
  const language = getLanguageByCode(languageCode) ?? languages[0];
  const next = getNextLesson(languageCode, completedLessonIds);
  const firstName = user?.firstName ?? "there";

  if (!next) {
    return null;
  }

  const { lesson, unitOrder } = next;

  const planItems = [
    {
      id: "lesson",
      icon: "book" as const,
      iconBackground: Colors.purple,
      title: "Lesson",
      subtitle: lesson.title,
      completed: completedLessonIds.includes(lesson.id),
      onPress: () => router.push("/(tabs)/learn"),
    },
    {
      id: "ai-conversation",
      icon: "headset" as const,
      iconBackground: Colors.purple,
      title: "AI Conversation",
      subtitle: lesson.aiTeacherPrompt.topics[0] ?? "Practice speaking",
      completed: false,
      onPress: () => router.push("/(tabs)/chat"),
    },
    {
      id: "new-words",
      icon: "chatbubble-ellipses" as const,
      iconBackground: Colors.error,
      title: "New words",
      subtitle: `${lesson.vocabulary.length} words`,
      completed: false,
      onPress: () => router.push("/(tabs)/learn"),
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView contentContainerClassName="gap-4 pb-8" showsVerticalScrollIndicator={false}>
        <HomeHeader
          greeting={languageGreetings[languageCode]}
          firstName={firstName}
          language={language}
          streak={streak}
          onPressNotifications={() => {}}
        />

        <DailyGoalCard xpEarned={xpToday} xpGoal={dailyGoal} />

        <ContinueLearningCard
          languageName={language.name}
          unitOrder={unitOrder}
          illustration={images.palace}
          onPressContinue={() => router.push("/(tabs)/learn")}
        />

        <View className="px-5">
          <View className="mb-1 flex-row items-center justify-between">
            <Text className="text-h4 font-poppins-bold text-text-primary">Today&apos;s plan</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/learn")} hitSlop={8}>
              <Text className="text-body-sm font-poppins-semibold text-purple">View all</Text>
            </TouchableOpacity>
          </View>

          {planItems.map((item) => (
            <TodayPlanItem key={item.id} {...item} />
          ))}
        </View>

        <NextUpCard
          title="AI Video Call"
          subtitle="Practice speaking"
          avatarUri={`https://picsum.photos/seed/${lesson.aiTeacherPrompt.teacherName}/200/200`}
          onPress={() => router.push("/(tabs)/ai-teacher")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
