import { images } from "@/constants/images";
import { Colors } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image, View } from "react-native";

export function AuthMascot() {
  return (
    <View className="items-center justify-center" style={{ height: 190 }}>
      <Ionicons
        name="sparkles"
        size={18}
        color={Colors.streak}
        style={{ position: "absolute", left: "16%", top: "8%" }}
      />
      <Ionicons
        name="sparkles"
        size={16}
        color={Colors.blue}
        style={{ position: "absolute", right: "14%", top: "24%" }}
      />
      <Ionicons
        name="sparkles"
        size={14}
        color={Colors.streak}
        style={{ position: "absolute", right: "24%", bottom: "6%" }}
      />
      <Image source={images.mascotAuth} style={{ width: 220, height: 180 }} resizeMode="contain" />
    </View>
  );
}
