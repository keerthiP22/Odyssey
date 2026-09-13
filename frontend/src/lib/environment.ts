export type TimeOfDay =
  | "morning"
  | "day"
  | "evening"
  | "night";

export type EnvironmentMood =
  | "clear"
  | "partly-cloudy"
  | "cloudy"
  | "rain"
  | "storm"
  | "fog";

export interface EnvironmentTokens {
  base: string;
  baseSecondary: string;

  glow: string;
  glowSecondary: string;

  glowAlpha: number;
  glowSecondaryAlpha: number;

  overlay: string;
  overlayAlpha: number;

  cardTint: string;
  cardTintAlpha: number;

  borderTint: string;
  borderTintAlpha: number;

  accent: string;

  mood: EnvironmentMood;
}

const WEATHER_MOODS: Record<
  EnvironmentMood,
  {
    glow: string;
    glowSecondary: string;
    overlay: string;
    accent: string;

    glowAlpha: number;
    glowSecondaryAlpha: number;
    overlayAlpha: number;

    cardTint: string;
    cardTintAlpha: number;

    borderTint: string;
    borderTintAlpha: number;
  }
> = {
  clear: {
    glow: "#9B8FFF",
    glowSecondary: "#F1B96B",
    overlay: "#10162A",
    accent: "#C2B9FF",

    glowAlpha: 0.26,
    glowSecondaryAlpha: 0.16,
    overlayAlpha: 0.0,

    cardTint: "#665BC2",
    cardTintAlpha: 0.065,

    borderTint: "#B8AEFF",
    borderTintAlpha: 0.085,
  },

  "partly-cloudy": {
    glow: "#7F8FEA",
    glowSecondary: "#A9B4C9",
    overlay: "#111827",
    accent: "#AEBBFF",

    glowAlpha: 0.21,
    glowSecondaryAlpha: 0.09,
    overlayAlpha: 0.025,

    cardTint: "#59699D",
    cardTintAlpha: 0.055,

    borderTint: "#A8B5D5",
    borderTintAlpha: 0.07,
  },

  cloudy: {
    glow: "#71839F",
    glowSecondary: "#98A5B8",
    overlay: "#1B2433",
    accent: "#A9B7CC",

    glowAlpha: 0.18,
    glowSecondaryAlpha: 0.08,
    overlayAlpha: 0.06,

    cardTint: "#64748B",
    cardTintAlpha: 0.065,

    borderTint: "#A5B3C6",
    borderTintAlpha: 0.065,
  },

  rain: {
    glow: "#477BAE",
    glowSecondary: "#506D9B",
    overlay: "#0D1929",
    accent: "#88B9E8",

    glowAlpha: 0.29,
    glowSecondaryAlpha: 0.13,
    overlayAlpha: 0.11,

    cardTint: "#3D638A",
    cardTintAlpha: 0.085,

    borderTint: "#80B0DA",
    borderTintAlpha: 0.085,
  },

  storm: {
    glow: "#3B527A",
    glowSecondary: "#4A5C85",
    overlay: "#060C18",
    accent: "#829BC5",

    glowAlpha: 0.31,
    glowSecondaryAlpha: 0.12,
    overlayAlpha: 0.17,

    cardTint: "#2C4163",
    cardTintAlpha: 0.105,

    borderTint: "#778FB8",
    borderTintAlpha: 0.09,
  },

  fog: {
    glow: "#8996A8",
    glowSecondary: "#A7AFBA",
    overlay: "#252C36",
    accent: "#B7C0CC",

    glowAlpha: 0.22,
    glowSecondaryAlpha: 0.11,
    overlayAlpha: 0.085,

    cardTint: "#758190",
    cardTintAlpha: 0.08,

    borderTint: "#A9B4C1",
    borderTintAlpha: 0.08,
  },
};

const TIME_MODIFIERS: Record<
  TimeOfDay,
  {
    base: string;
    baseSecondary: string;

    glowMultiplier: number;
    secondaryMultiplier: number;
    overlayMultiplier: number;
    warmMultiplier: number;
  }
> = {
  morning: {
    base: "#0D1727",
    baseSecondary: "#142238",

    glowMultiplier: 1.1,
    secondaryMultiplier: 1.2,
    overlayMultiplier: 0.7,
    warmMultiplier: 1.25,
  },

  day: {
    base: "#0B1424",
    baseSecondary: "#122039",

    glowMultiplier: 1.25,
    secondaryMultiplier: 1.15,
    overlayMultiplier: 0.8,
    warmMultiplier: 1.0,
  },

  evening: {
    base: "#0B1020",
    baseSecondary: "#17162B",

    glowMultiplier: 1.0,
    secondaryMultiplier: 0.85,
    overlayMultiplier: 1.1,
    warmMultiplier: 0.7,
  },

  night: {
    base: "#060A14",
    baseSecondary: "#0B1120",

    glowMultiplier: 0.78,
    secondaryMultiplier: 0.55,
    overlayMultiplier: 1.3,
    warmMultiplier: 0.25,
  },
};

export function getTimeOfDay(
  date = new Date()
): TimeOfDay {
  const hour = date.getHours();

  if (hour >= 5 && hour < 11) {
    return "morning";
  }

  if (hour >= 11 && hour < 17) {
    return "day";
  }

  if (hour >= 17 && hour < 20) {
    return "evening";
  }

  return "night";
}

export function getEnvironmentTokens(
  mood: EnvironmentMood,
  timeOfDay: TimeOfDay
): EnvironmentTokens {
  const weather = WEATHER_MOODS[mood];
  const time = TIME_MODIFIERS[timeOfDay];

  return {
    base: time.base,
    baseSecondary: time.baseSecondary,

    glow: weather.glow,
    glowSecondary: weather.glowSecondary,

    glowAlpha: Math.min(
      weather.glowAlpha *
        time.glowMultiplier,
      0.38
    ),

    glowSecondaryAlpha: Math.min(
      weather.glowSecondaryAlpha *
        time.secondaryMultiplier *
        time.warmMultiplier,
      0.22
    ),

    overlay: weather.overlay,

    overlayAlpha: Math.min(
      weather.overlayAlpha *
        time.overlayMultiplier,
      0.25
    ),

    cardTint: weather.cardTint,
    cardTintAlpha: weather.cardTintAlpha,

    borderTint: weather.borderTint,
    borderTintAlpha:
      weather.borderTintAlpha,

    accent: weather.accent,

    mood,
  };
}