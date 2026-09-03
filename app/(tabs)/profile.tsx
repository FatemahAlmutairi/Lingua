import { ProgressRing } from "@/components/progress-ring";
import { images } from "@/constants/images";
import { badges } from "@/data/badges";
import { getLanguageByCode, languages } from "@/data/languages";
import { getLessonsByLanguage } from "@/data/lessons";
import { useThemeColors } from "@/hooks/useThemeColors";
import { posthog } from "@/lib/posthog";
import { useLanguageStore } from "@/store/languageStore";
import { useLearningStore } from "@/store/learningStore";
import { usePreferencesStore } from "@/store/preferencesStore";
import { useThemeStore } from "@/store/themeStore";
import { useClerk, useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const colors = useThemeColors();
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const clearSelectedLanguage = useLanguageStore((state) => state.clearSelectedLanguage);
  const completedLessonIds = useLearningStore((state) => state.completedLessonIds);
  const streak = useLearningStore((state) => state.streak);
  const resetProgress = useLearningStore((state) => state.resetProgress);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const setDarkMode = useThemeStore((state) => state.setDarkMode);
  const emailNotifications = usePreferencesStore((state) => state.emailNotifications);
  const setEmailNotifications = usePreferencesStore((state) => state.setEmailNotifications);

  const languageCode = selectedLanguage ?? languages[0].code;
  const language = getLanguageByCode(languageCode) ?? languages[0];
  const languageLessons = getLessonsByLanguage(languageCode);
  const completedInLanguage = languageLessons.filter((lesson) =>
    completedLessonIds.includes(lesson.id)
  ).length;
  const progress = languageLessons.length > 0 ? completedInLanguage / languageLessons.length : 0;

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerClassName="gap-6 pb-8" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between px-5 pt-3">
          <View className="flex-row items-center gap-2">
            <Image source={images.mascotLogo} className="h-9 w-9" resizeMode="contain" />
            <Text className="text-h3 font-poppins-bold text-purple">lingua</Text>
          </View>
          <ProgressRing progress={progress} />
        </View>

        <View className="px-5">
          <Text className="text-h1 font-poppins-bold text-text-primary">
            {user?.firstName ? `${user.firstName}'s Profile` : "Your Profile"}
          </Text>
        </View>

        <View className="items-center gap-1">
          <Image
            source={user?.imageUrl ? { uri: user.imageUrl } : images.mascotWelcome}
            className="h-24 w-24 rounded-full border-4 border-surface"
          />
          <Text className="mt-2 text-h3 font-poppins-semibold text-text-primary">
            {user?.fullName ?? "Learner"}
          </Text>
          {memberSince && (
            <Text className="text-body-md font-poppins-regular text-text-secondary">
              Member since: {memberSince}
            </Text>
          )}
        </View>

        <View className="mx-5 gap-3 rounded-3xl bg-peach px-5 py-5">
          <Text className="text-h4 font-poppins-semibold text-text-primary">Learning Stats</Text>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Ionicons name="flame" size={24} color={colors.streak} />
              <View>
                <Text className="text-h2 font-poppins-bold text-text-primary">{streak}</Text>
                <Text className="text-body-sm font-poppins-regular text-text-secondary">Day Streak</Text>
              </View>
            </View>

            <View>
              <Text className="text-h2 font-poppins-bold text-text-primary">
                {completedLessonIds.length}
              </Text>
              <Text className="text-body-sm font-poppins-regular text-text-secondary">
                Total Lessons Completed
              </Text>
            </View>
          </View>

          <View className="h-px bg-peach-track" />

          <Text className="text-h4 font-poppins-semibold text-text-primary">
            {language.name} (A1)
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push("/language-select")}
          className="mx-5 flex-row items-center justify-between rounded-2xl border border-border px-4 py-3.5"
        >
          <View className="flex-row items-center gap-3">
            <Image source={{ uri: language.flagEmoji }} className="h-9 w-9 rounded-full" />
            <View>
              <Text className="text-body-sm font-poppins-regular text-text-secondary">
                Learning language
              </Text>
              <Text className="text-body-lg font-poppins-semibold text-text-primary">
                {language.name}
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </TouchableOpacity>

        <View className="gap-3 px-5">
          <Text className="text-h4 font-poppins-semibold text-text-primary">Badges</Text>
          <View className="flex-row gap-3">
            {badges.map((badge) => (
              <View
                key={badge.id}
                accessible
                accessibilityLabel={badge.label}
                className={`h-16 w-16 items-center justify-center rounded-2xl ${badge.tintClassName}`}
              >
                {badge.image ? (
                  <Image source={badge.image} className="h-9 w-9" resizeMode="contain" />
                ) : (
                  <Text className="text-h2">{badge.emoji}</Text>
                )}
              </View>
            ))}
          </View>
        </View>

        <View className="gap-4 px-5">
          <Text className="text-h4 font-poppins-semibold text-text-primary">Learning Preferences</Text>

          <View className="flex-row items-center justify-between">
            <Text className="text-body-lg font-poppins-regular text-text-primary">
              Email notifications
            </Text>
            <Switch
              value={emailNotifications}
              onValueChange={setEmailNotifications}
              trackColor={{ true: colors.purple, false: colors.border }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-body-lg font-poppins-regular text-text-primary">Dark Mode</Text>
            <Switch
              value={isDarkMode}
              onValueChange={setDarkMode}
              trackColor={{ true: colors.purple, false: colors.border }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <View className="px-5">
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={async () => {
              posthog?.capture("user_signed_out");
              await signOut();
              clearSelectedLanguage();
              resetProgress();
            }}
            className="items-center justify-center rounded-full border border-border py-4"
          >
            <Text className="text-body-lg font-poppins-semibold text-text-primary">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
