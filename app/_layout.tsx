import "@/global.css";

import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { Fonts } from "@/theme";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef } from "react";

SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file");
}

function RootNavigator() {
  const { isLoaded, isSignedIn } = useAuth();

  const [fontsLoaded, fontError] = useFonts({
    [Fonts.regular]: require("../assets/fonts/Poppins-Regular.ttf"),
    [Fonts.medium]: require("../assets/fonts/Poppins-Medium.ttf"),
    [Fonts.semiBold]: require("../assets/fonts/Poppins-SemiBold.ttf"),
    [Fonts.bold]: require("../assets/fonts/Poppins-Bold.ttf"),
  });

  const hasHiddenSplash = useRef(false);

  useEffect(() => {
    if (isLoaded && (fontsLoaded || fontError) && !hasHiddenSplash.current) {
      hasHiddenSplash.current = true;
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [isLoaded, fontsLoaded, fontError]);

  if (!isLoaded || (!fontsLoaded && !fontError)) {
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
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey!} tokenCache={tokenCache}>
      <RootNavigator />
    </ClerkProvider>
  );
}
