import { useAuth, useClerk, useUser } from "@clerk/expo";
import { Redirect } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName="gap-8 p-6 pt-16">
      <View className="gap-2">
        <Text className="text-h1 font-poppins-bold text-text-primary">
          You&apos;re signed in 🎉
        </Text>
        {user?.primaryEmailAddress && (
          <Text className="text-body-md font-poppins-regular text-text-secondary">
            {user.primaryEmailAddress.emailAddress}
          </Text>
        )}
      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => signOut()}
        className="items-center justify-center rounded-full bg-purple py-4"
      >
        <Text className="text-body-lg font-poppins-semibold text-white">Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
