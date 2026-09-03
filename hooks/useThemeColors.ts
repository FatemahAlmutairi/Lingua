import { Colors, DarkColors } from "@/theme";
import { useColorScheme } from "react-native";

/**
 * Resolves the active color palette for RN-specific style exceptions
 * (SafeAreaView, icon `color` props, Switch, StyleSheet, etc. — see
 * AGENTS.md's Style Exception table) that can't pick up NativeWind's
 * `dark:`-aware tokens automatically.
 */
export function useThemeColors() {
  const scheme = useColorScheme();
  return scheme === "dark" ? DarkColors : Colors;
}
