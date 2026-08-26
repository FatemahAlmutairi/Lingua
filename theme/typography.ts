/**
 * Typography scale for the Lingua design system.
 * Mirrors the `--text-*` CSS variables in `global.css` so the same
 * scale is usable both as NativeWind classNames (e.g. `text-h1`) and
 * as plain JS/TS for StyleSheet-only cases.
 */

import { Fonts } from "./fonts";

type TextStyleToken = {
  fontSize: number;
  lineHeight: number;
  fontFamily: string;
};

export const Typography: Record<
  "h1" | "h2" | "h3" | "h4" | "bodyLarge" | "bodyMedium" | "bodySmall" | "caption",
  TextStyleToken
> = {
  h1: { fontSize: 32, lineHeight: 32 * 1.2, fontFamily: Fonts.bold },
  h2: { fontSize: 24, lineHeight: 24 * 1.3, fontFamily: Fonts.semiBold },
  h3: { fontSize: 20, lineHeight: 20 * 1.3, fontFamily: Fonts.semiBold },
  h4: { fontSize: 16, lineHeight: 16 * 1.4, fontFamily: Fonts.medium },
  bodyLarge: { fontSize: 16, lineHeight: 16 * 1.6, fontFamily: Fonts.regular },
  bodyMedium: { fontSize: 14, lineHeight: 14 * 1.6, fontFamily: Fonts.regular },
  bodySmall: { fontSize: 13, lineHeight: 13 * 1.6, fontFamily: Fonts.regular },
  caption: { fontSize: 11, lineHeight: 11 * 1.4, fontFamily: Fonts.regular },
};
