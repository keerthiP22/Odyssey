// ------------------------------------------------------------
// Weather service
// ------------------------------------------------------------
//
// NOTE: There is currently no weather API wired into Odyssey
// (frontend or backend). This module returns clearly-marked
// MOCK data so the UI can be built and previewed now.
//
// To connect a real weather API later:
//   1. Replace the body of `getCurrentWeather` with a real
//      fetch call (either directly to a weather provider, or
//      to a future Odyssey backend endpoint).
//   2. Keep the returned shape as `WeatherData` so
//      `WeatherCard.tsx` does not need to change at all.
// ------------------------------------------------------------

export type WeatherCondition =
  | "clear"
  | "partly-cloudy"
  | "cloudy"
  | "drizzle"
  | "rain"
  | "thunderstorm"
  | "fog";

export interface WeatherData {
  location: string;
  /** Current temperature, in °C. */
  temperature: number;
  condition: WeatherCondition;
  /** Human-readable label, e.g. "Partly cloudy". */
  conditionLabel: string;
  /** "Feels like" temperature, in °C. */
  feelsLike: number;
  /** Today's forecast high, in °C. */
  high: number;
  /** Today's forecast low, in °C. */
  low: number;
  /** Chance of rain today, 0–100. */
  rainChance: number;
}

// ------------------------------------------------------------
// MOCK DATA — temporary, for visual development only.
// Replace this once a real weather API is connected.
// ------------------------------------------------------------

const MOCK_WEATHER: WeatherData = {
  location: "Bengaluru",
  temperature: 28,
  condition: "partly-cloudy",
  conditionLabel: "Partly cloudy",
  feelsLike: 30,
  high: 30,
  low: 23,
  rainChance: 20,
};

/**
 * Returns the current weather.
 *
 * This is async (and awaits a tick) intentionally, so the
 * calling component already handles the loading state a real
 * network request would require — swapping in a real API later
 * needs no changes on the consuming side.
 */
export async function getCurrentWeather(): Promise<WeatherData> {
  // TODO: replace with a real weather API call, e.g.:
  //
  // const response = await fetch(
  //   `https://api.example-weather.com/v1/current?location=Bengaluru`
  // );
  //
  // if (!response.ok) {
  //   throw new Error("Could not load weather.");
  // }
  //
  // const data = await response.json();
  // return mapApiResponseToWeatherData(data);

  await new Promise((resolve) => setTimeout(resolve, 0));

  return MOCK_WEATHER;
}