/**
 * Color tokens for the Lingua design system.
 * Mirrors the `--color-*` CSS variables defined in `global.css` so the
 * same values are usable both as NativeWind classNames (e.g. `bg-purple`)
 * and as plain JS/TS for the cases AGENTS.md calls out for StyleSheet
 * (shadows, Animated, platform-specific styles, etc).
 */

export const Colors = {
  // Brand
  purple: "#6C4EF5",
  deepPurple: "#5B3BF6",
  blue: "#4D8BFF",
  green: "#21C16B",

  // Semantic
  success: "#21C16B",
  warning: "#FFC800",
  streak: "#FF8A00",
  error: "#FF4D4F",
  info: "#4D8BFF",

  // Neutrals
  textPrimary: "#0D132B",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  surface: "#F6F7FB",
  background: "#FFFFFF",

  // Soft tinted backgrounds (e.g. home screen goal/next-up cards)
  peach: "#FCEEE1",
  peachTrack: "#F5DCC2",
  mint: "#EEF5E5",
  goldTint: "#FDF3D8",
  blueTint: "#E3F2FD",
  purpleTint: "#EDE9FE",
} as const;

/**
 * Dark mode counterpart to `Colors`. Brand/status accents stay the same
 * across themes — only neutrals and tinted card backgrounds invert.
 * Use via the `useThemeColors` hook for the RN-specific cases in
 * AGENTS.md's Style Exception table; everything else should use the
 * `dark:`-aware NativeWind tokens in `global.css` instead.
 */
export const DarkColors = {
  // Brand
  purple: "#6C4EF5",
  deepPurple: "#5B3BF6",
  blue: "#4D8BFF",
  green: "#21C16B",

  // Semantic
  success: "#21C16B",
  warning: "#FFC800",
  streak: "#FF8A00",
  error: "#FF4D4F",
  info: "#4D8BFF",

  // Neutrals
  textPrimary: "#F4F5FA",
  textSecondary: "#98A0B8",
  border: "#2A3358",
  surface: "#151B33",
  background: "#0B1020",

  // Soft tinted backgrounds (e.g. home screen goal/next-up cards)
  peach: "#2C2013",
  peachTrack: "#4A3620",
  mint: "#16241C",
  goldTint: "#3A331A",
  blueTint: "#17233A",
  purpleTint: "#241B4D",
} as const;
