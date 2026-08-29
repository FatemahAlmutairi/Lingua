import { useClerk, useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { posthog } from "@/lib/posthog";
import { useLanguageStore } from "@/store/languageStore";
import { Colors } from "@/theme";

export default function Profile() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const clearSelectedLanguage = useLanguageStore((state) => state.clearSelectedLanguage);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <View className="flex-1 gap-10 px-6 pt-10">
        <View className="items-center gap-3">
          <View className="h-20 w-20 items-center justify-center rounded-full bg-surface">
            <Ionicons name="person" size={32} color={Colors.purple} />
          </View>
          <Text className="text-h2 font-poppins-semibold text-text-primary">Profile</Text>
          {user?.primaryEmailAddress && (
            <Text className="text-body-md font-poppins-regular text-text-secondary">
              {user.primaryEmailAddress.emailAddress}
            </Text>
          )}
        </View>

        <View className="gap-3">
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {
              clearSelectedLanguage();
              posthog?.capture("language_cleared");
            }}
            className="items-center justify-center rounded-full border border-border py-4"
          >
            <Text className="text-body-lg font-poppins-semibold text-text-primary">
              Clear Language (Test)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={async () => {
              posthog?.capture("user_signed_out");
              await signOut();
            }}
            className="items-center justify-center rounded-full bg-purple py-4"
          >
            <Text className="text-body-lg font-poppins-semibold text-white">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
