import { Colors } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";

type AuthTextFieldProps = TextInputProps & {
  label: string;
  isPassword?: boolean;
};

export function AuthTextField({ label, isPassword, ...inputProps }: AuthTextFieldProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View className="rounded-2xl border border-border px-4 py-2.5">
      <Text className="text-body-sm font-poppins-regular text-text-secondary">{label}</Text>
      <View className="flex-row items-center">
        <TextInput
          className="flex-1 py-1 text-body-lg font-poppins-regular text-text-primary"
          placeholderTextColor={Colors.textSecondary}
          secureTextEntry={isPassword && !isVisible}
          {...inputProps}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setIsVisible((visible) => !visible)} hitSlop={8}>
            <Ionicons
              name={isVisible ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
