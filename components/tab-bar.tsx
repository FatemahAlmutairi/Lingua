import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View, type LayoutChangeEvent } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Colors } from "@/theme";

const CIRCLE_SIZE = 52;
const BAR_PADDING = 8;

const ICON_SIZE = 24;

type TabIconProps = { color: string; isActive: boolean };

const TAB_CONFIG: Record<string, { label: string; renderIcon: (props: TabIconProps) => ReactNode }> = {
  index: {
    label: "Home",
    renderIcon: ({ color, isActive }) => (
      <Ionicons name={isActive ? "home" : "home-outline"} color={color} size={ICON_SIZE} />
    ),
  },
  learn: {
    label: "Learn",
    renderIcon: ({ color, isActive }) => (
      <Ionicons name={isActive ? "book" : "book-outline"} color={color} size={ICON_SIZE} />
    ),
  },
  "ai-teacher": {
    label: "AI Teacher",
    renderIcon: ({ color, isActive }) => (
      <MaterialCommunityIcons
        name={isActive ? "robot" : "robot-outline"}
        color={color}
        size={ICON_SIZE}
      />
    ),
  },
  chat: {
    label: "Chat",
    renderIcon: ({ color, isActive }) => (
      <Ionicons
        name={isActive ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"}
        color={color}
        size={ICON_SIZE}
      />
    ),
  },
  profile: {
    label: "Profile",
    renderIcon: ({ color, isActive }) => (
      <Ionicons name={isActive ? "person" : "person-outline"} color={color} size={ICON_SIZE} />
    ),
  },
};

export function TabBar({ state, navigation }: BottomTabBarProps) {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();
  const [barWidth, setBarWidth] = useState(0);
  const translateX = useSharedValue(0);

  const tabWidth = barWidth > 0 ? (barWidth - BAR_PADDING * 2) / state.routes.length : 0;

  useEffect(() => {
    if (tabWidth === 0) return;
    const target = BAR_PADDING + tabWidth * state.index + tabWidth / 2 - CIRCLE_SIZE / 2;
    translateX.value = withTiming(target, { duration: 250, easing: Easing.out(Easing.ease) });
  }, [state.index, tabWidth, translateX]);

  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  function handleLayout(event: LayoutChangeEvent) {
    setBarWidth(event.nativeEvent.layout.width);
  }

  return (
    <View
      onLayout={handleLayout}
      className="flex-row bg-background"
      style={[styles.bar, { paddingBottom: BAR_PADDING + insets.bottom }]}
    >
      {barWidth > 0 && <Animated.View pointerEvents="none" style={[styles.circle, circleStyle]} />}

      {state.routes.map((route, index) => {
        const config = TAB_CONFIG[route.name];
        if (!config) return null;
        const isActive = state.index === index;

        return (
          <Pressable
            key={route.key}
            onPress={() => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });
              if (!isActive && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }}
            className="flex-1 items-center"
          >
            <View style={styles.iconWrapper}>
              {config.renderIcon({
                color: isActive ? "#FFFFFF" : colors.textSecondary,
                isActive,
              })}
            </View>
            <Text
              numberOfLines={1}
              style={{ opacity: isActive ? 0 : 1 }}
              className="text-caption font-poppins-medium text-text-secondary"
            >
              {config.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    padding: BAR_PADDING,
    alignItems: "flex-start",
    ...Platform.select({
      ios: {
        shadowColor: "#0D132B",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  iconWrapper: {
    height: CIRCLE_SIZE,
    width: CIRCLE_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    position: "absolute",
    top: BAR_PADDING,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: Colors.purple,
  },
});
