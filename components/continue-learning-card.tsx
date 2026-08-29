import { Colors } from "@/theme";
import type { ImageSourcePropType } from "react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";

type ContinueLearningCardProps = {
  languageName?: string;
  unitOrder?: number;
  illustration: ImageSourcePropType;
  onPressContinue: () => void;
};

export function ContinueLearningCard({
  languageName = "Pick a language",
  unitOrder = 1,
  illustration,
  onPressContinue,
}: ContinueLearningCardProps) {
  return (
    // Added mx-5 here so the card width matches your other screen elements perfectly
    <View className="mx-5">
      <View 
        style={{ backgroundColor: Colors.purple }} 
        className="flex-row rounded-[20px] h-[135px] mb-6 overflow-hidden items-center"
      >
        <View className="flex-1 py-4 pl-5 pr-2 justify-between h-full">
          <View>
            <Text className="font-poppins text-[11px] text-white/75 mb-0.5">
              Continue learning
            </Text>
            <Text className="font-poppins-bold text-[20px] text-white leading-6">
              {languageName}
            </Text>
            <Text className="font-poppins text-xs text-white/65 mt-0.5">
              A1 · Unit {unitOrder}
            </Text>
          </View>
          <TouchableOpacity
            className="bg-white rounded-xl py-1.5 px-5 self-start"
            activeOpacity={0.85}
            testID="continue-learning-button"
            onPress={onPressContinue}
          >
            <Text 
              style={{ color: Colors.purple }} 
              className="font-poppins-semibold text-[12px]"
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
        
        <Image
          source={illustration}
          className="w-[110px] h-[135px]"
          resizeMode="contain"
        />
      </View>
    </View>
  );
}