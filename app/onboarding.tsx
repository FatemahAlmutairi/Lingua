import { images } from "@/constants/images";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Onboarding() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View className="flex-1 justify-between px-6 pb-4 pt-2">
        <View>
          <View className="flex-row items-center justify-center gap-2">
            <Image
              source={images.mascotLogo}
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
            <Text className="text-h2 font-poppins-bold text-text-primary">muolingo</Text>
          </View>

          <View className="mt-10 gap-3">
            <Text className="text-h1 font-poppins-bold leading-tight text-text-primary">
              Your AI language{"\n"}
              <Text className="text-purple">teacher.</Text>
            </Text>
            <Text className="text-body-lg font-poppins-regular text-text-secondary">
              Real conversations, personalized lessons, anytime, anywhere.
            </Text>
          </View>

          <View
            className="relative mt-8 w-full items-center justify-end"
            style={{ height: 370 }}
          >
            <View className="absolute left-[10%] top-[6%] rounded-2xl rounded-bl-md bg-[#E8EEFC] px-4 py-2.5">
              <Text className="text-body-md font-poppins-medium text-text-primary">Hello!</Text>
            </View>
            <View className="absolute right-[10%] top-0 rounded-2xl rounded-br-md bg-[#ECE8FE] px-4 py-2.5">
              <Text className="text-body-md font-poppins-medium text-purple">¡Hola!</Text>
            </View>
            <View className="absolute right-[4%] top-[22%] rounded-2xl rounded-br-md bg-[#FBEAE3] px-4 py-2.5">
              <Text className="text-body-md font-poppins-medium text-error">你好!</Text>
            </View>

            <Image
              source={images.mascotWelcome}
              style={{ width: 360, height: 360 }}
              resizeMode="contain"
            />
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push("/sign-up")}
          className="flex-row items-center justify-center gap-2 rounded-full bg-purple py-4"
        >
          <Text className="text-body-lg font-poppins-semibold text-white">Get Started</Text>
          <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
