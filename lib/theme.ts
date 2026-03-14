import type { CSSProperties } from "react";

export type ThemeFontFamily =
  | "jakarta"
  | "bricolage"
  | "space"
  | "playfair"
  | "Inter"
  | "Roboto"
  | "Open Sans"
  | "Poppins"
  | "Montserrat";

export type ThemeBackgroundType = "template" | "solid" | "gradient";
export type ThemeMotionPreset = "steady" | "smooth" | "energetic";
export type ThemeInteractionPreset = "press" | "lift" | "glide";
export type ThemeButtonStyle = "rounded" | "square" | "pill";

export interface ThemeSettings {
  template: string;
  backgroundColor: string;
  textColor: string;
  linkColor: string;
  buttonStyle: ThemeButtonStyle;
  fontFamily: ThemeFontFamily;
  backgroundType: ThemeBackgroundType;
  backgroundImage: string | null;
  gradientFrom: string | null;
  gradientTo: string | null;
  motionPreset: ThemeMotionPreset;
  interactionPreset: ThemeInteractionPreset;
}

export const DEFAULT_THEME: ThemeSettings = {
  template: "default",
  backgroundColor: "#ffffff",
  textColor: "#111111",
  linkColor: "#ff4fa3",
  buttonStyle: "rounded",
  fontFamily: "jakarta",
  backgroundType: "template",
  backgroundImage: null,
  gradientFrom: "#ff4fa3",
  gradientTo: "#6d5efc",
  motionPreset: "smooth",
  interactionPreset: "press",
};

export function resolveTheme(
  theme?: Partial<ThemeSettings> | null,
): ThemeSettings {
  const merged = {
    ...DEFAULT_THEME,
    ...theme,
  } satisfies ThemeSettings;

  return {
    ...merged,
    fontFamily: normalizeFontFamily(merged.fontFamily),
    backgroundType: normalizeBackgroundType(merged.backgroundType),
    buttonStyle: normalizeButtonStyle(merged.buttonStyle),
    motionPreset: normalizeMotionPreset(merged.motionPreset),
    interactionPreset: normalizeInteractionPreset(merged.interactionPreset),
  };
}

export function getThemeFontFamily(fontFamily: ThemeFontFamily): string {
  switch (normalizeFontFamily(fontFamily)) {
    case "bricolage":
      return "var(--font-bricolage), sans-serif";
    case "space":
      return "var(--font-space), sans-serif";
    case "playfair":
      return "var(--font-playfair), serif";
    default:
      return "var(--font-jakarta), sans-serif";
  }
}

export function getThemeBackgroundStyle(
  theme: ThemeSettings,
  fallback: CSSProperties = {},
): CSSProperties {
  if (
    theme.backgroundType === "gradient" &&
    theme.gradientFrom &&
    theme.gradientTo
  ) {
    return {
      ...fallback,
      background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
      backgroundImage: undefined,
    };
  }

  if (theme.backgroundType === "solid") {
    return {
      ...fallback,
      background: theme.backgroundColor,
      backgroundImage: undefined,
    };
  }

  return fallback;
}

export function getThemeButtonRadius(buttonStyle: ThemeButtonStyle): string {
  switch (normalizeButtonStyle(buttonStyle)) {
    case "square":
      return "6px";
    case "pill":
      return "999px";
    default:
      return "18px";
  }
}

function normalizeFontFamily(fontFamily: ThemeFontFamily): ThemeFontFamily {
  switch (fontFamily) {
    case "Roboto":
    case "Open Sans":
      return "jakarta";
    case "Poppins":
    case "Montserrat":
      return "space";
    case "Inter":
      return "jakarta";
    default:
      return fontFamily;
  }
}

function normalizeBackgroundType(
  backgroundType: ThemeBackgroundType,
): ThemeBackgroundType {
  if (
    backgroundType === "template" ||
    backgroundType === "solid" ||
    backgroundType === "gradient"
  ) {
    return backgroundType;
  }

  return DEFAULT_THEME.backgroundType;
}

function normalizeButtonStyle(buttonStyle: ThemeButtonStyle): ThemeButtonStyle {
  if (
    buttonStyle === "rounded" ||
    buttonStyle === "square" ||
    buttonStyle === "pill"
  ) {
    return buttonStyle;
  }

  return DEFAULT_THEME.buttonStyle;
}

function normalizeMotionPreset(
  motionPreset: ThemeMotionPreset,
): ThemeMotionPreset {
  if (
    motionPreset === "steady" ||
    motionPreset === "smooth" ||
    motionPreset === "energetic"
  ) {
    return motionPreset;
  }

  return DEFAULT_THEME.motionPreset;
}

function normalizeInteractionPreset(
  interactionPreset: ThemeInteractionPreset,
): ThemeInteractionPreset {
  if (
    interactionPreset === "press" ||
    interactionPreset === "lift" ||
    interactionPreset === "glide"
  ) {
    return interactionPreset;
  }

  return DEFAULT_THEME.interactionPreset;
}
