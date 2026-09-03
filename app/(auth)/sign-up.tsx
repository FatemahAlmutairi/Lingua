import { AuthMascot } from "@/components/auth-mascot";
import { AuthTextField } from "@/components/auth-text-field";
import { SocialAuthButton } from "@/components/social-auth-button";
import { VerificationModal } from "@/components/verification-modal";
import { useThemeColors } from "@/hooks/useThemeColors";
import { resolveClerkAuthError } from "@/lib/clerk";
import { posthog } from "@/lib/posthog";
import { useClerk, useSignUp } from "@clerk/expo";
import { useSSO } from "@clerk/expo/experimental";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SocialStrategy = "oauth_google" | "oauth_apple";

export default function SignUp() {
  const { signUp } = useSignUp();
  const { startSSOFlow } = useSSO();
  const { signOut } = useClerk();
  const colors = useThemeColors();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialLoading, setSocialLoading] = useState<SocialStrategy | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    if (!email || !password || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const { error: passwordError } = await signUp.password({ emailAddress: email, password });
      if (passwordError) {
        setError(await resolveClerkAuthError(passwordError, signOut));
        return;
      }

      const { error: sendError } = await signUp.verifications.sendEmailCode();
      if (sendError) {
        setError(await resolveClerkAuthError(sendError, signOut));
        return;
      }

      posthog?.capture("sign_up_code_requested");
      setIsVerifying(true);
    } catch (err) {
      setError(await resolveClerkAuthError(err, signOut));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerify = async (code: string) => {
    try {
      const { error: verifyError } = await signUp.verifications.verifyEmailCode({ code });
      if (verifyError) {
        return resolveClerkAuthError(verifyError, signOut);
      }

      const { error: finalizeError } = await signUp.finalize();
      if (finalizeError) {
        return resolveClerkAuthError(finalizeError, signOut);
      }

      posthog?.capture("sign_up_completed", { method: "email_code" });
      return null;
    } catch (err) {
      return resolveClerkAuthError(err, signOut);
    }
  };

  const handleSocialAuth = async (strategy: SocialStrategy) => {
    setError(null);
    setSocialLoading(strategy);
    try {
      posthog?.capture("social_auth_started", { flow: "sign_up", provider: strategy });
      await startSSOFlow({ strategy });
    } catch (err) {
      setError(await resolveClerkAuthError(err, signOut));
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
      >
      <View className="flex-1 px-6 pt-2">
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={8}
          className="h-10 w-10 items-start justify-center"
        >
          <Ionicons name="chevron-back" size={26} color={colors.textPrimary} />
        </TouchableOpacity>

        <ScrollView
          className="flex-1"
          contentContainerClassName="gap-6 pb-6"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="gap-2">
            <Text className="text-h1 font-poppins-bold text-text-primary">
              Create your account
            </Text>
            <Text className="text-body-lg font-poppins-regular text-text-secondary">
              Start your language journey today ✨
            </Text>
          </View>

          <AuthMascot />

          <View className="gap-4">
            <AuthTextField
              label="Email"
              placeholder="alex@gmail.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            <AuthTextField
              label="Password"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              isPassword
              autoCapitalize="none"
            />
          </View>

          {error && (
            <Text className="text-body-sm font-poppins-medium text-error">{error}</Text>
          )}

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleSignUp}
            disabled={isSubmitting}
            className="items-center justify-center rounded-full bg-purple py-4"
            style={isSubmitting ? { opacity: 0.7 } : undefined}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-body-lg font-poppins-semibold text-white">Sign Up</Text>
            )}
          </TouchableOpacity>

          <View className="flex-row items-center gap-3">
            <View className="h-px flex-1 bg-border" />
            <Text className="text-body-sm font-poppins-regular text-text-secondary">
              or continue with
            </Text>
            <View className="h-px flex-1 bg-border" />
          </View>

          <View className="gap-3">
            <SocialAuthButton
              icon="logo-google"
              iconColor="#1F1F1F"
              label={socialLoading === "oauth_google" ? "Connecting…" : "Continue with Google"}
              onPress={() => handleSocialAuth("oauth_google")}
            />
          </View>

          {/* Required for sign-up on Expo web; Clerk skips this on iOS and Android. */}
          <View nativeID="clerk-captcha" />
        </ScrollView>

        <View className="mb-4 flex-row items-center justify-center gap-1">
          <Text className="text-body-md font-poppins-regular text-text-secondary">
            Already have an account?
          </Text>
          <Link href="/sign-in" className="text-body-md font-poppins-semibold text-purple">
            Log in
          </Link>
        </View>
      </View>
      </KeyboardAvoidingView>

      <VerificationModal
        visible={isVerifying}
        email={email}
        onClose={() => setIsVerifying(false)}
        onVerify={handleVerify}
      />
    </SafeAreaView>
  );
}
