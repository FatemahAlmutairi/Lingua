import { AuthMascot } from "@/components/auth-mascot";
import { AuthTextField } from "@/components/auth-text-field";
import { SocialAuthButton } from "@/components/social-auth-button";
import { VerificationModal } from "@/components/verification-modal";
import { resolveClerkAuthError } from "@/lib/clerk";
import { Colors } from "@/theme";
import { useClerk, useSignIn } from "@clerk/expo";
import { useSSO } from "@clerk/expo/experimental";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SocialStrategy = "oauth_google" | "oauth_apple";

export default function SignIn() {
  const { signIn } = useSignIn();
  const { startSSOFlow } = useSSO();
  const { signOut } = useClerk();

  const [email, setEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialLoading, setSocialLoading] = useState<SocialStrategy | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const { error: sendError } = await signIn.emailCode.sendCode({ emailAddress: email });
      if (sendError) {
        setError(await resolveClerkAuthError(sendError, signOut));
        return;
      }

      setIsVerifying(true);
    } catch (err) {
      setError(await resolveClerkAuthError(err, signOut));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerify = async (code: string) => {
    try {
      const { error: verifyError } = await signIn.emailCode.verifyCode({ code });
      if (verifyError) {
        return resolveClerkAuthError(verifyError, signOut);
      }

      const { error: finalizeError } = await signIn.finalize();
      if (finalizeError) {
        return resolveClerkAuthError(finalizeError, signOut);
      }

      return null;
    } catch (err) {
      return resolveClerkAuthError(err, signOut);
    }
  };

  const handleSocialAuth = async (strategy: SocialStrategy) => {
    setError(null);
    setSocialLoading(strategy);
    try {
      await startSSOFlow({ strategy });
    } catch (err) {
      setError(await resolveClerkAuthError(err, signOut));
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View className="flex-1 px-6 pt-2">
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={8}
          className="h-10 w-10 items-start justify-center"
        >
          <Ionicons name="chevron-back" size={26} color={Colors.textPrimary} />
        </TouchableOpacity>

        <ScrollView
          className="flex-1"
          contentContainerClassName="gap-6 pb-6"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="gap-2">
            <Text className="text-h1 font-poppins-bold text-text-primary">Welcome back</Text>
            <Text className="text-body-lg font-poppins-regular text-text-secondary">
              Continue your language journey ✨
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
          </View>

          {error && (
            <Text className="text-body-sm font-poppins-medium text-error">{error}</Text>
          )}

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleSignIn}
            disabled={isSubmitting}
            className="items-center justify-center rounded-full bg-purple py-4"
            style={isSubmitting ? { opacity: 0.7 } : undefined}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-body-lg font-poppins-semibold text-white">Sign In</Text>
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
        </ScrollView>

        <View className="mb-4 flex-row items-center justify-center gap-1">
          <Text className="text-body-md font-poppins-regular text-text-secondary">
            Don&apos;t have an account?
          </Text>
          <Link href="/sign-up" className="text-body-md font-poppins-semibold text-purple">
            Sign up
          </Link>
        </View>
      </View>

      <VerificationModal
        visible={isVerifying}
        email={email}
        onClose={() => setIsVerifying(false)}
        onVerify={handleVerify}
      />
    </SafeAreaView>
  );
}
