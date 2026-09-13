import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  getEnvironmentTokens,
  getTimeOfDay,
  type EnvironmentMood,
  type EnvironmentTokens,
  type TimeOfDay,
} from "@/lib/environment";

import {
  getCurrentWeather,
  type WeatherData,
} from "@/services/weatherService";

interface EnvironmentContextValue {
  weather: WeatherData | null;
  isWeatherLoading: boolean;
  weatherError: boolean;
  timeOfDay: TimeOfDay;
  mood: EnvironmentMood;
  tokens: EnvironmentTokens;
}

const EnvironmentContext =
  createContext<EnvironmentContextValue | null>(
    null
  );

function getEnvironmentMood(
  condition: WeatherData["condition"] | undefined
): EnvironmentMood {
  switch (condition) {
    case "clear":
      return "clear";

    case "partly-cloudy":
      return "partly-cloudy";

    case "cloudy":
      return "cloudy";

    case "drizzle":
    case "rain":
      return "rain";

    case "thunderstorm":
      return "storm";

    case "fog":
      return "fog";

    default:
      return "clear";
  }
}

export function EnvironmentProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [weather, setWeather] =
    useState<WeatherData | null>(null);

  const [isWeatherLoading, setIsWeatherLoading] =
    useState(true);

  const [weatherError, setWeatherError] =
    useState(false);

  const [timeOfDay, setTimeOfDay] =
    useState<TimeOfDay>(() =>
      getTimeOfDay()
    );

  useEffect(() => {
    let mounted = true;

    getCurrentWeather()
      .then((data) => {
        if (!mounted) {
          return;
        }

        setWeather(data);
        setWeatherError(false);
      })
      .catch((error) => {
        console.error(
          "Environment weather error:",
          error
        );

        if (mounted) {
          setWeatherError(true);
        }
      })
      .finally(() => {
        if (mounted) {
          setIsWeatherLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const updateTime = () => {
      setTimeOfDay(getTimeOfDay());
    };

    updateTime();

    const interval = window.setInterval(
      updateTime,
      60 * 1000
    );

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const mood = useMemo(
    () =>
      getEnvironmentMood(
        weather?.condition
      ),
    [weather?.condition]
  );

  const tokens = useMemo(
    () =>
      getEnvironmentTokens(
        mood,
        timeOfDay
      ),
    [mood, timeOfDay]
  );

  useEffect(() => {
    const root =
      document.documentElement;

    root.style.setProperty(
      "--env-base",
      tokens.base
    );

    root.style.setProperty(
      "--env-base-secondary",
      tokens.baseSecondary
    );

    root.style.setProperty(
      "--env-glow",
      tokens.glow
    );

    root.style.setProperty(
      "--env-glow-secondary",
      tokens.glowSecondary
    );

    root.style.setProperty(
      "--env-glow-alpha",
      String(tokens.glowAlpha)
    );

    root.style.setProperty(
      "--env-glow-secondary-alpha",
      String(
        tokens.glowSecondaryAlpha
      )
    );

    root.style.setProperty(
      "--env-overlay",
      tokens.overlay
    );

    root.style.setProperty(
      "--env-overlay-alpha",
      String(tokens.overlayAlpha)
    );

    root.style.setProperty(
      "--env-card-tint",
      tokens.cardTint
    );

    root.style.setProperty(
      "--env-card-tint-alpha",
      String(tokens.cardTintAlpha)
    );

    root.style.setProperty(
      "--env-border-tint",
      tokens.borderTint
    );

    root.style.setProperty(
      "--env-border-tint-alpha",
      String(
        tokens.borderTintAlpha
      )
    );

    root.style.setProperty(
      "--env-accent",
      tokens.accent
    );

    root.dataset.environmentMood =
      mood;

    root.dataset.timeOfDay =
      timeOfDay;
  }, [tokens, mood, timeOfDay]);

  const value = useMemo(
    () => ({
      weather,
      isWeatherLoading,
      weatherError,
      timeOfDay,
      mood,
      tokens,
    }),
    [
      weather,
      isWeatherLoading,
      weatherError,
      timeOfDay,
      mood,
      tokens,
    ]
  );

  return (
    <EnvironmentContext.Provider
      value={value}
    >
      {children}
    </EnvironmentContext.Provider>
  );
}

export function useEnvironment() {
  const context =
    useContext(EnvironmentContext);

  if (!context) {
    throw new Error(
      "useEnvironment must be used inside EnvironmentProvider."
    );
  }

  return context;
}