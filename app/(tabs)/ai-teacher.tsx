import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PlaceholderScreen } from "@/components/placeholder-screen";
import { Colors } from "@/theme";

export default function AITeacher() {
  return (
    <PlaceholderScreen
      title="AI Teacher"
      description="Live video lessons with your AI teacher are coming soon."
      icon={<MaterialCommunityIcons name="robot-outline" size={32} color={Colors.purple} />}
    />
  );
}
