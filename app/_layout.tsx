import "@/global.css";

import { ClerkProvider, useAuth, useUser } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useLanguageStore } from "@/store/languageStore";
import { useStreamVideoSession } from "@/hooks/useStreamVideoSession";
import { Fonts } from "@/theme";
import { StreamVideo } from "@stream-io/video-react-native-sdk";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { PostHogErrorBoundary, PostHogProvider } from "posthog-react-native";
import { useEffect, useRef, type ReactNode } from "react";
import { posthog } from "@/lib/posthog";

SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file");
}

function PostHogIdentity({ children }: { children: ReactNode }) {
  const { isLoaded, user } = useUser();
  const identifiedUserId = useRef<string | null>(null);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!user) {
      if (identifiedUserId.current) {
        posthog?.reset();
        identifiedUserId.current = null;
      }
      return;
    }

    if (identifiedUserId.current === user.id) {
      return;
    }

    if (identifiedUserId.current) {
      posthog?.reset();
    }

    const personProperties = {
      ...(user.primaryEmailAddress?.emailAddress
        ? { email: user.primaryEmailAddress.emailAddress }
        : {}),
      ...(user.fullName ? { name: user.fullName } : {}),
    };

    posthog?.identify(user.id, { $set: personProperties });
    identifiedUserId.current = user.id;
  }, [isLoaded, user]);

  return <>{children}</>;
}

/** Mounts the Stream Video client once the signed-in user's session is ready. */
function StreamVideoGate({ children }: { children: ReactNode }) {
  const { client } = useStreamVideoSession();

  if (!client) {
    return <>{children}</>;
  }

  return <StreamVideo client={client}>{children}</StreamVideo>;
}

function RootNavigator() {
  const { isLoaded, isSignedIn } = useAuth();
  const hasHydrated = useLanguageStore((state) => state.hasHydrated);

  const [fontsLoaded, fontError] = useFonts({
    [Fonts.regular]: require("../assets/fonts/Poppins-Regular.ttf"),
    [Fonts.medium]: require("../assets/fonts/Poppins-Medium.ttf"),
    [Fonts.semiBold]: require("../assets/fonts/Poppins-SemiBold.ttf"),
    [Fonts.bold]: require("../assets/fonts/Poppins-Bold.ttf"),
  });

  const hasHiddenSplash = useRef(false);

  useEffect(() => {
    if (isLoaded && (fontsLoaded || fontError) && hasHydrated && !hasHiddenSplash.current) {
      hasHiddenSplash.current = true;
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [isLoaded, fontsLoaded, fontError, hasHydrated]);

  if (!isLoaded || (!fontsLoaded && !fontError) || !hasHydrated) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(auth)" />
      </Stack.Protected>

      <Stack.Protected guard={!!isSignedIn}>
        <Stack.Screen name="index" />
        <Stack.Screen name="language-select" />
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  const content = (
    <StreamVideoGate>
      <RootNavigator />
    </StreamVideoGate>
  );

  return (
    <ClerkProvider publishableKey={publishableKey!} tokenCache={tokenCache}>
      {posthog ? (
        <PostHogProvider client={posthog}>
          <PostHogIdentity>
            <PostHogErrorBoundary>{content}</PostHogErrorBoundary>
          </PostHogIdentity>
        </PostHogProvider>
      ) : (
        content
      )}
    </ClerkProvider>
  );
}
