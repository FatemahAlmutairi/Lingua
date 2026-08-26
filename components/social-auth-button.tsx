import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { Text, TouchableOpacity } from "react-native";

type SocialAuthButtonProps = {
  icon: ComponentProps<typeof Ionicons>["name"];
  iconColor: string;
  label: string;
  onPress?: () => void;
};

export function SocialAuthButton({ icon, iconColor, label, onPress }: SocialAuthButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="flex-row items-center justify-center gap-3 rounded-2xl border border-border py-4"
    >
      <Ionicons name={icon} size={22} color={iconColor} />
      <Text className="text-body-lg font-poppins-medium text-text-primary">{label}</Text>
    </TouchableOpacity>
  );
}
