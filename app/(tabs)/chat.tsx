import { Ionicons } from "@expo/vector-icons";
import { PlaceholderScreen } from "@/components/placeholder-screen";
import { Colors } from "@/theme";

export default function Chat() {
  return (
    <PlaceholderScreen
      title="Chat"
      description="Chat-based AI tutor conversations are coming soon."
      icon={<Ionicons name="chatbubble-ellipses" size={32} color={Colors.purple} />}
    />
  );
}
