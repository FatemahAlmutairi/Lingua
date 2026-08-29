import { images } from "@/constants/images";
import { getLanguageByCode } from "@/data/languages";
import { getLessonById } from "@/data/lessons";
import { useLearningStore } from "@/store/learningStore";
import { Colors } from "@/theme";
import { useUser } from "@clerk/expo";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ControlButtonProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  active: boolean;
  onPress: () => void;
};

function ControlButton({ icon, label, active, onPress }: ControlButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} className="items-center gap-1.5">
      <View
        style={styles.card}
        className={active ? "h-14 w-14 items-center justify-center rounded-full bg-white" : "h-14 w-14 items-center justify-center rounded-full bg-surface"}
      >
        <Ionicons name={icon} size={22} color={active ? Colors.textPrimary : Colors.textSecondary} />
      </View>
      <Text className="text-body-sm font-poppins-medium text-text-primary">{label}</Text>
    </TouchableOpacity>
  );
}

export default function AudioLessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = getLessonById(id);
  const { user } = useUser();

  const completedLessonIds = useLearningStore((state) => state.completedLessonIds);
  const completeLesson = useLearningStore((state) => state.completeLesson);
  const addXP = useLearningStore((state) => state.addXP);

  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [subtitlesOn, setSubtitlesOn] = useState(true);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setElapsedSeconds((seconds) => seconds + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!lesson) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
        <View className="flex-1 items-center justify-center gap-4 px-8">
          <Ionicons name="alert-circle-outline" size={40} color={Colors.textSecondary} />
          <Text className="text-body-lg font-poppins-semibold text-text-primary">
            Lesson not found
          </Text>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.replace("/(tabs)")}
            className="items-center justify-center rounded-full bg-purple px-6 py-3"
          >
            <Text className="text-body-md font-poppins-semibold text-white">Back to Learn</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const language = getLanguageByCode(lesson.languageCode);
  const primaryGoal = lesson.goals[0];
  const primaryPhrase = lesson.phrases[0];
  const isCompleted = completedLessonIds.includes(lesson.id);

  function handleEndCall() {
    if (!isCompleted) {
      completeLesson(lesson!.id);
      addXP(lesson!.xpReward);
    }
    router.back();
  }

  const timerLabel = elapsedSeconds < 60 ? `${elapsedSeconds}` : `${Math.floor(elapsedSeconds / 60)}m`;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <View className="flex-row items-center justify-between px-5 pb-3 pt-1">
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="chevron-back" size={26} color={Colors.textPrimary} />
        </TouchableOpacity>

        <View className="flex-1 px-3">
          <Text className="text-h4 font-poppins-bold text-text-primary" numberOfLines={1}>
            {lesson.aiTeacherPrompt.teacherName}
          </Text>
          <View className="flex-row items-center gap-1.5">
            <View className="h-2 w-2 rounded-full bg-green" />
            <Text className="text-body-sm font-poppins-regular text-text-secondary">Online</Text>
          </View>
        </View>

        <View className="flex-row items-center gap-2">
          <View className="h-9 w-9 items-center justify-center rounded-full bg-surface">
            <Ionicons name="videocam-outline" size={18} color={Colors.textPrimary} />
          </View>
          <View className="h-9 w-9 items-center justify-center rounded-full bg-surface">
            <Text className="text-body-sm font-poppins-semibold text-text-primary">{timerLabel}</Text>
          </View>
          <View className="h-9 w-9 items-center justify-center rounded-full bg-surface">
            <Ionicons name="notifications-outline" size={18} color={Colors.textPrimary} />
          </View>
        </View>
      </View>

      <View className="mx-5 mb-3 gap-2 rounded-2xl bg-surface px-4 py-3">
        <View className="flex-row items-center gap-2">
          {language && (
            <Image
              source={{ uri: language.flagEmoji }}
              className="h-4 w-5 rounded-[2px]"
              resizeMode="cover"
            />
          )}
          <Text className="flex-1 text-body-md font-poppins-semibold text-text-primary" numberOfLines={1}>
            {lesson.title}
          </Text>
        </View>

        {primaryGoal && (
          <View className="flex-row items-center gap-1.5">
            <Ionicons name="checkmark-circle-outline" size={14} color={Colors.textSecondary} />
            <Text className="flex-1 text-body-sm font-poppins-regular text-text-secondary" numberOfLines={1}>
              {primaryGoal.description}
            </Text>
          </View>
        )}

        {lesson.phrases.length > 0 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2 pt-1">
            {lesson.phrases.map((phrase) => (
              <View
                key={phrase.id}
                className="rounded-full border border-border bg-background px-3 py-1.5"
              >
                <Text className="text-body-sm font-poppins-medium text-text-primary">
                  {phrase.phrase}
                </Text>
              </View>
            ))}
          </ScrollView>
        )}
      </View>

      <View className="flex-1 items-center justify-center bg-[#F1ECFF]">
        {cameraOn && (
          <View style={styles.card} className="absolute right-4 top-4 h-16 w-16 overflow-hidden rounded-2xl border-2 border-white">
            {user?.imageUrl ? (
              <Image source={{ uri: user.imageUrl }} className="h-full w-full" resizeMode="cover" />
            ) : (
              <View className="h-full w-full items-center justify-center bg-surface">
                <Ionicons name="person" size={22} color={Colors.textSecondary} />
              </View>
            )}
          </View>
        )}

        <Image source={images.mascotWelcome} className="h-[220px] w-[220px]" resizeMode="contain" />

        {primaryPhrase && (
          <View
            style={styles.card}
            className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white px-4 py-3"
          >
            <View style={styles.bubbleTail} />
            <View className="flex-row items-start justify-between gap-3">
              <View className="flex-1 gap-0.5">
                <Text className="text-body-lg font-poppins-semibold text-text-primary">
                  {primaryPhrase.phrase}
                </Text>
                {subtitlesOn && (
                  <Text className="text-body-md font-poppins-regular text-text-secondary">
                    {primaryPhrase.translation}
                  </Text>
                )}
              </View>
              <Ionicons name="volume-high-outline" size={20} color={Colors.purple} />
            </View>
          </View>
        )}
      </View>

      <View className="flex-row items-center justify-between px-8 pb-5 pt-4">
        <ControlButton
          icon={cameraOn ? "videocam" : "videocam-off"}
          label="Camera"
          active={cameraOn}
          onPress={() => setCameraOn((value) => !value)}
        />
        <ControlButton
          icon={micOn ? "mic" : "mic-off"}
          label="Mic"
          active={micOn}
          onPress={() => setMicOn((value) => !value)}
        />
        <ControlButton
          icon="language"
          label="Subtitles"
          active={subtitlesOn}
          onPress={() => setSubtitlesOn((value) => !value)}
        />
        <TouchableOpacity activeOpacity={0.8} onPress={handleEndCall} className="items-center gap-1.5">
          <View style={styles.card} className="h-14 w-14 items-center justify-center rounded-full bg-error">
            <MaterialCommunityIcons name="phone-hangup" size={24} color="#FFFFFF" />
          </View>
          <Text className="text-body-sm font-poppins-medium text-text-primary">End Call</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card} className="mx-5 mb-5 flex-row rounded-2xl bg-white px-4 py-4">
        <View className="flex-1 items-center gap-1">
          <Text className="text-body-sm font-poppins-semibold text-text-primary">Speaking</Text>
          <Text className="text-body-md font-poppins-semibold text-green">Excellent</Text>
        </View>
        <View className="flex-1 items-center gap-1 border-x border-border">
          <Text className="text-body-sm font-poppins-semibold text-text-primary">Pronunciation</Text>
          <Text className="text-body-md font-poppins-semibold text-blue">Great</Text>
        </View>
        <View className="flex-1 items-center gap-1">
          <Text className="text-body-sm font-poppins-semibold text-text-primary">Grammar</Text>
          <Text className="text-body-md font-poppins-semibold text-blue">Good</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    ...Platform.select({
      ios: {
        shadowColor: "#0D132B",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 14,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  bubbleTail: {
    position: "absolute",
    bottom: -7,
    left: 28,
    width: 14,
    height: 14,
    backgroundColor: "#FFFFFF",
    transform: [{ rotate: "45deg" }],
  },
});
