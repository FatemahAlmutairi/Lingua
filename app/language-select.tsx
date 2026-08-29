import { LanguageCard } from "@/components/language-card";
import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import { posthog } from "@/lib/posthog";
import { useLanguageStore } from "@/store/languageStore";
import { Colors } from "@/theme";
import type { LanguageCode } from "@/types/learning";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EARTH_IMAGE_ASPECT_RATIO = 1127 / 828;

export default function LanguageSelection() {
  const storedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const setSelectedLanguage = useLanguageStore((state) => state.setSelectedLanguage);
  const [query, setQuery] = useState("");
  const [selectedCode, setSelectedCode] = useState<LanguageCode>(storedLanguage ?? languages[0].code);
  const { width: screenWidth } = useWindowDimensions();
  const earthImageHeight = screenWidth / EARTH_IMAGE_ASPECT_RATIO;

  const filteredLanguages = languages.filter((language) => {
    const search = query.trim().toLowerCase();
    return (
      language.name.toLowerCase().includes(search) ||
      language.nativeName.toLowerCase().includes(search)
    );
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <View className="flex-row items-center justify-between px-6 pb-4">
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="chevron-back" size={26} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text className="text-h4 font-poppins-bold text-text-primary">Choose a language</Text>
        <View className="w-6" />
      </View>

      <ScrollView className="flex-1" contentContainerClassName="pb-6" showsVerticalScrollIndicator={false}>
        <View className="px-6">
          <View className="mb-6 flex-row items-center gap-2 rounded-full bg-surface px-4 py-3">
            <Ionicons name="search" size={18} color={Colors.textSecondary} />
            <TextInput
              className="flex-1 text-body-md font-poppins-regular text-text-primary"
              placeholder="Search languages"
              placeholderTextColor={Colors.textSecondary}
              value={query}
              onChangeText={setQuery}
            />
          </View>

          <Text className="mb-3 text-body-md font-poppins-semibold text-text-secondary">
            Popular
          </Text>

          <View className="gap-3">
            {filteredLanguages.map((language) => (
              <LanguageCard
                key={language.code}
                language={language}
                selected={selectedCode === language.code}
                onPress={() => setSelectedCode(language.code)}
              />
            ))}
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {
              setSelectedLanguage(selectedCode);
              posthog?.capture("language_selected", { language_code: selectedCode });
              router.replace("/");
            }}
            className="mt-6 items-center justify-center rounded-full bg-purple py-4"
          >
            <Text className="text-body-lg font-poppins-semibold text-white">
              Confirm selection
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-20 w-full overflow-hidden" style={{ height: earthImageHeight * 0.72 }}>
          <Image
            source={images.earth}
            resizeMode="cover"
            style={{
              width: screenWidth,
              height: earthImageHeight,
              position: "absolute",
              top: 0,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
