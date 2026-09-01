import { images } from "@/constants/images";
import { getLanguageByCode } from "@/data/languages";
import { getLessonById } from "@/data/lessons";
import {
  AI_TEACHER_USER_ID,
  fetchLessonCall,
  startAgentSession,
  stopAgentSession,
  type AgentSession,
} from "@/lib/stream";
import { useLearningStore } from "@/store/learningStore";
import { Colors } from "@/theme";
import type { Lesson } from "@/types/learning";
import { useAuth, useUser } from "@clerk/expo";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Call,
  CallingState,
  StreamCall,
  useCall,
  useCallStateHooks,
  useStreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type CallPhase = "connecting" | "reconnecting" | "joined" | "error" | "ended";

/** Connection status of the AI teacher's own agent session, tracked separately from the
 * student's call phase above — the two connect independently. */
type AgentStatus = "idle" | "connecting" | "connected" | "failed";

type ControlButtonProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  active: boolean;
  disabled?: boolean;
  onPress: () => void;
};

function ControlButton({ icon, label, active, disabled, onPress }: ControlButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      className="items-center gap-1.5"
      style={disabled ? { opacity: 0.4 } : undefined}
    >
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

const STATUS_COPY: Record<CallPhase, { label: string; color: string }> = {
  connecting: { label: "Connecting…", color: Colors.warning },
  reconnecting: { label: "Reconnecting…", color: Colors.warning },
  joined: { label: "Online", color: Colors.green },
  error: { label: "Connection error", color: Colors.error },
  ended: { label: "Call ended", color: Colors.textSecondary },
};

/** `null` for "idle" — nothing to show before the agent session has even been requested. */
const AGENT_STATUS_COPY: Record<AgentStatus, { label: string; color: string } | null> = {
  idle: null,
  connecting: { label: "AI teacher connecting…", color: Colors.warning },
  connected: { label: "AI teacher online", color: Colors.green },
  failed: { label: "AI teacher unavailable", color: Colors.error },
};

type AudioLessonViewProps = {
  lesson: Lesson;
  userImageUrl?: string | null;
  userFirstName?: string | null;
  phase: CallPhase;
  errorMessage?: string;
  onRetry: () => void;
  agentStatus: AgentStatus;
  onRetryAgent: () => void;
  micOn: boolean;
  onToggleMic: () => void;
  cameraOn: boolean;
  onToggleCamera: () => void;
  subtitlesOn: boolean;
  onToggleSubtitles: () => void;
  onBack: () => void;
  onEndCall: () => void;
  timerLabel: string;
};

/** Presentational shell — the original Audio Lesson UI, driven by call state passed as props. */
function AudioLessonView({
  lesson,
  userImageUrl,
  userFirstName,
  phase,
  errorMessage,
  onRetry,
  agentStatus,
  onRetryAgent,
  micOn,
  onToggleMic,
  cameraOn,
  onToggleCamera,
  subtitlesOn,
  onToggleSubtitles,
  onBack,
  onEndCall,
  timerLabel,
}: AudioLessonViewProps) {
  const language = getLanguageByCode(lesson.languageCode);
  const primaryGoal = lesson.goals[0];
  const primaryPhrase = lesson.phrases[0];
  const controlsEnabled = phase === "joined";
  const status = STATUS_COPY[phase];
  // Once the student's own call is joined, the status row switches from reporting the call
  // connection to reporting the AI teacher's — that's the more useful signal at that point.
  const headerStatus = phase === "joined" ? (AGENT_STATUS_COPY[agentStatus] ?? status) : status;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <View className="flex-row items-center justify-between px-5 pb-3 pt-1">
        <TouchableOpacity onPress={onBack} hitSlop={8}>
          <Ionicons name="chevron-back" size={26} color={Colors.textPrimary} />
        </TouchableOpacity>

        <View className="flex-1 px-3">
          <Text className="text-h4 font-poppins-bold text-text-primary" numberOfLines={1}>
            {lesson.aiTeacherPrompt.teacherName}
          </Text>
          <View className="flex-row items-center gap-1.5">
            <View style={{ backgroundColor: headerStatus.color }} className="h-2 w-2 rounded-full" />
            <Text className="text-body-sm font-poppins-regular text-text-secondary">
              {headerStatus.label}
            </Text>
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
          <View style={styles.card} className="absolute right-4 top-4 items-end gap-1">
            <View className="h-16 w-16 overflow-hidden rounded-2xl border-2 border-white">
              {userImageUrl ? (
                <Image source={{ uri: userImageUrl }} className="h-full w-full" resizeMode="cover" />
              ) : (
                <View className="h-full w-full items-center justify-center bg-surface">
                  <Ionicons name="person" size={22} color={Colors.textSecondary} />
                </View>
              )}
              {!micOn && (
                <View className="absolute bottom-1 right-1 h-5 w-5 items-center justify-center rounded-full bg-error">
                  <Ionicons name="mic-off" size={11} color="#FFFFFF" />
                </View>
              )}
            </View>
            <Text className="text-caption font-poppins-medium text-text-secondary">
              {userFirstName ?? "You"}
            </Text>
          </View>
        )}

        {phase === "connecting" || phase === "reconnecting" ? (
          // 1. Call connecting — waiting on the student's own Stream call to join.
          <View className="items-center gap-3">
            <ActivityIndicator size="large" color={Colors.purple} />
            <Text className="text-body-md font-poppins-medium text-text-secondary">{status.label}</Text>
          </View>
        ) : phase === "error" ? (
          <View className="items-center gap-3 px-8">
            <Ionicons name="cloud-offline-outline" size={36} color={Colors.error} />
            <Text className="text-center text-body-md font-poppins-medium text-text-secondary">
              {errorMessage ?? "Couldn't connect to this lesson."}
            </Text>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={onRetry}
              className="items-center justify-center rounded-full bg-purple px-6 py-3"
            >
              <Text className="text-body-md font-poppins-semibold text-white">Try Again</Text>
            </TouchableOpacity>
          </View>
        ) : agentStatus === "connecting" || agentStatus === "idle" ? (
          // 2. Call is joined, but the AI teacher hasn't connected yet.
          <View className="items-center gap-3">
            <ActivityIndicator size="large" color={Colors.purple} />
            <Text className="text-body-md font-poppins-medium text-text-secondary">
              AI teacher connecting…
            </Text>
          </View>
        ) : agentStatus === "failed" ? (
          // 4. The agent session couldn't be started — non-blocking, the student can retry
          // just the agent without leaving the call.
          <View className="items-center gap-3 px-8">
            <Ionicons name="alert-circle-outline" size={36} color={Colors.error} />
            <Text className="text-center text-body-md font-poppins-medium text-text-secondary">
              The AI teacher couldn&apos;t join this lesson.
            </Text>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={onRetryAgent}
              className="items-center justify-center rounded-full bg-purple px-6 py-3"
            >
              <Text className="text-body-md font-poppins-semibold text-white">Retry AI Teacher</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // 3. AI teacher connected — lesson is active.
          <>
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
          </>
        )}
      </View>

      <View className="flex-row items-center justify-between px-8 pb-5 pt-4">
        <ControlButton
          icon={cameraOn ? "videocam" : "videocam-off"}
          label="Camera"
          active={cameraOn}
          onPress={onToggleCamera}
        />
        <ControlButton
          icon={micOn ? "mic" : "mic-off"}
          label="Mic"
          active={micOn}
          disabled={!controlsEnabled}
          onPress={onToggleMic}
        />
        <ControlButton
          icon="language"
          label="Subtitles"
          active={subtitlesOn}
          onPress={onToggleSubtitles}
        />
        <TouchableOpacity activeOpacity={0.8} onPress={onEndCall} className="items-center gap-1.5">
          <View style={styles.card} className="h-14 w-14 items-center justify-center rounded-full bg-error">
            <MaterialCommunityIcons name="phone-hangup" size={24} color="#FFFFFF" />
          </View>
          <Text className="text-body-sm font-poppins-medium text-text-primary">
            {phase === "ended" ? "Ending…" : "End Call"}
          </Text>
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

type ConnectedAudioLessonProps = {
  lesson: Lesson;
  userImageUrl?: string | null;
  userFirstName?: string | null;
  isCompleted: boolean;
  onComplete: () => void;
  agentStatus: AgentStatus;
  onAgentConnected: () => void;
  onRetryAgent: () => void;
};

/** Rendered inside <StreamCall> once the call exists — owns live call state and controls. */
function ConnectedAudioLesson({
  lesson,
  userImageUrl,
  userFirstName,
  isCompleted,
  onComplete,
  agentStatus,
  onAgentConnected,
  onRetryAgent,
}: ConnectedAudioLessonProps) {
  const call = useCall();
  const { useCallCallingState, useMicrophoneState, useRemoteParticipants } = useCallStateHooks();
  const callingState = useCallCallingState();
  const { status: micStatus } = useMicrophoneState();
  const remoteParticipants = useRemoteParticipants();

  const [cameraOn, setCameraOn] = useState(true);
  const [subtitlesOn, setSubtitlesOn] = useState(true);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [ending, setEnding] = useState(false);

  // The agent-session API only tells us the session was requested, not that the AI
  // teacher has actually joined the call — that's confirmed here, from its participant
  // showing up as a remote participant.
  useEffect(() => {
    if (agentStatus === "connected") return;
    if (remoteParticipants.some((p) => p.userId === AI_TEACHER_USER_ID)) {
      onAgentConnected();
    }
  }, [remoteParticipants, agentStatus, onAgentConnected]);

  useEffect(() => {
    if (callingState !== CallingState.JOINED) return;
    const interval = setInterval(() => setElapsedSeconds((seconds) => seconds + 1), 1000);
    return () => clearInterval(interval);
  }, [callingState]);

  const phase: CallPhase = ending
    ? "ended"
    : callingState === CallingState.JOINED
      ? "joined"
      : callingState === CallingState.RECONNECTING
        ? "reconnecting"
        : "connecting";

  async function toggleMic() {
    try {
      await call?.microphone.toggle();
    } catch (err) {
      console.error("Failed to toggle microphone", err);
    }
  }

  async function leaveCall() {
    try {
      if (call && call.state.callingState !== CallingState.LEFT) {
        await call.leave();
      }
    } catch (err) {
      console.error("Failed to leave call", err);
    }
  }

  /** Chevron back — leave quietly, no lesson credit (matches the original back behavior). */
  async function handleBack() {
    if (ending) return;
    setEnding(true);
    await leaveCall();
    router.back();
  }

  /** Red hangup button — leave, mark the lesson complete, and award XP. */
  async function handleEndCall() {
    if (ending) return;
    setEnding(true);

    if (!isCompleted) {
      onComplete();
    }

    await leaveCall();
    router.back();
  }

  const timerLabel = elapsedSeconds < 60 ? `${elapsedSeconds}` : `${Math.floor(elapsedSeconds / 60)}m`;

  return (
    <AudioLessonView
      lesson={lesson}
      userImageUrl={userImageUrl}
      userFirstName={userFirstName}
      phase={phase}
      onRetry={() => {}}
      agentStatus={agentStatus}
      onRetryAgent={onRetryAgent}
      micOn={micStatus === "enabled"}
      onToggleMic={toggleMic}
      cameraOn={cameraOn}
      onToggleCamera={() => setCameraOn((value) => !value)}
      subtitlesOn={subtitlesOn}
      onToggleSubtitles={() => setSubtitlesOn((value) => !value)}
      onBack={handleBack}
      onEndCall={handleEndCall}
      timerLabel={timerLabel}
    />
  );
}

export default function AudioLessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = getLessonById(id);
  const { user } = useUser();
  const { getToken } = useAuth();
  const client = useStreamVideoClient();

  const completedLessonIds = useLearningStore((state) => state.completedLessonIds);
  const completeLesson = useLearningStore((state) => state.completeLesson);
  const addXP = useLearningStore((state) => state.addXP);

  const [call, setCall] = useState<Call>();
  const [connectError, setConnectError] = useState<string>();
  const [retryToken, setRetryToken] = useState(0);
  const [agentStatus, setAgentStatus] = useState<AgentStatus>("idle");
  const [agentRetryToken, setAgentRetryToken] = useState(0);

  // Joins the student's own Stream call. The AI teacher's session is started by a separate
  // effect below, once this one packs the lesson context into the call and hands it off —
  // that keeps "retry the agent" from having to rejoin the whole call.
  useEffect(() => {
    if (!client || !lesson) return;

    let cancelled = false;
    let activeCall: Call | undefined;
    setConnectError(undefined);
    setCall(undefined);

    (async () => {
      try {
        const { callId, callType } = await fetchLessonCall(getToken, lesson.id);
        if (cancelled) return;

        const c = client.call(callType, callId, { reuseInstance: true });
        activeCall = c;
        await c.join();
        if (cancelled) return;

        // Audio-only: make sure no camera track ever publishes, regardless of call-type defaults.
        await c.camera.disable().catch(() => {});
        await c.microphone.enable().catch(() => {});

        // Pack the full lesson context into the call's custom data so the AI teacher (joining
        // separately, server-side) can read it on join — the app already has this lesson data
        // bundled locally, so there's no need to round-trip it through a server route.
        const language = getLanguageByCode(lesson.languageCode);
        try {
          await c.update({
            custom: {
              lessonId: lesson.id,
              lessonTitle: lesson.title,
              languageCode: lesson.languageCode,
              languageName: language?.name,
              teacherName: lesson.aiTeacherPrompt.teacherName,
              goals: lesson.goals,
              vocabulary: lesson.vocabulary,
              phrases: lesson.phrases,
              systemPrompt: lesson.aiTeacherPrompt.systemPrompt,
              introMessage: lesson.aiTeacherPrompt.introMessage,
              topics: lesson.aiTeacherPrompt.topics,
            },
          });
        } catch (err) {
          // Non-fatal — the agent falls back to generic instructions if this data is missing.
          console.error("Failed to attach lesson context to the call", err);
        }
        if (cancelled) return;

        setCall(c);
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to join lesson call", err);
          setConnectError(err instanceof Error ? err.message : "Couldn't connect to this lesson.");
        }
      }
    })();

    return () => {
      cancelled = true;
      if (activeCall && activeCall.state.callingState !== CallingState.LEFT) {
        activeCall.leave().catch((err) => console.error(err));
      }
      setCall(undefined);
    };
    // `getToken` is read fresh inside the effect rather than tracked, so a new function
    // reference from useAuth() doesn't re-trigger a join.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, lesson?.id, retryToken]);

  // Starts the AI teacher once the call (with its custom data already attached) is ready.
  // Kept separate from the join effect above so retrying just the agent — via
  // `agentRetryToken` — doesn't tear down and rejoin the student's own call.
  useEffect(() => {
    if (!call) {
      setAgentStatus("idle");
      return;
    }

    let cancelled = false;
    let agentSession: AgentSession | undefined;
    setAgentStatus("connecting");

    (async () => {
      try {
        // Best-effort: the AI teacher is a nice-to-have, not a blocker — if the
        // agent service is unavailable the lesson still continues without it.
        agentSession = await startAgentSession(getToken, call.id, call.type);
      } catch (err) {
        console.error("Failed to start AI teacher session", err);
        if (!cancelled) setAgentStatus("failed");
      }
    })();

    return () => {
      cancelled = true;
      if (agentSession) {
        stopAgentSession(getToken, agentSession.callId, agentSession.sessionId).catch((err) =>
          console.error("Failed to stop AI teacher session", err),
        );
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [call, agentRetryToken]);

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

  if (call) {
    return (
      <StreamCall call={call}>
        <ConnectedAudioLesson
          lesson={lesson}
          userImageUrl={user?.imageUrl}
          userFirstName={user?.firstName}
          isCompleted={completedLessonIds.includes(lesson.id)}
          onComplete={() => {
            completeLesson(lesson.id);
            addXP(lesson.xpReward);
          }}
          agentStatus={agentStatus}
          onAgentConnected={() => setAgentStatus("connected")}
          onRetryAgent={() => setAgentRetryToken((n) => n + 1)}
        />
      </StreamCall>
    );
  }

  return (
    <AudioLessonView
      lesson={lesson}
      userImageUrl={user?.imageUrl}
      userFirstName={user?.firstName}
      phase={connectError ? "error" : "connecting"}
      errorMessage={connectError}
      onRetry={() => setRetryToken((n) => n + 1)}
      agentStatus={agentStatus}
      onRetryAgent={() => {}}
      micOn={false}
      onToggleMic={() => {}}
      cameraOn={true}
      onToggleCamera={() => {}}
      subtitlesOn
      onToggleSubtitles={() => {}}
      onBack={() => router.back()}
      onEndCall={() => router.back()}
      timerLabel="0"
    />
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
