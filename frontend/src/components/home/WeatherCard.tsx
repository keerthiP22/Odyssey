import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudSun,
  Moon,
  Sun,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  getCurrentWeather,
  type WeatherCondition,
  type WeatherData,
} from "@/services/weatherService";

function isNightHour(hour: number) {
  return hour >= 19 || hour < 6;
}

function getWeatherIcon(
  condition: WeatherCondition,
  isNight: boolean
) {
  if (condition === "clear") {
    return isNight ? Moon : Sun;
  }

  if (condition === "partly-cloudy") {
    return isNight ? CloudMoon : CloudSun;
  }

  if (condition === "cloudy") {
    return Cloud;
  }

  if (condition === "drizzle") {
    return CloudDrizzle;
  }

  if (condition === "rain") {
    return CloudRain;
  }

  if (condition === "thunderstorm") {
    return CloudLightning;
  }

  return CloudFog;
}

export default function WeatherCard() {
  const [weather, setWeather] = useState<WeatherData | null>(
    null
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    getCurrentWeather()
      .then((data) => {
        if (isMounted) {
          setWeather(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const isNight = isNightHour(new Date().getHours());

  const Icon = weather
    ? getWeatherIcon(weather.condition, isNight)
    : Cloud;

  return (
    <section
      aria-label="Current weather"
      className="relative w-full shrink-0 overflow-hidden rounded-[18px] border border-white/[0.06] bg-[#131826]/70 px-4 py-3.5 sm:w-[200px] lg:w-[188px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 -top-6 h-20 w-20 rounded-full bg-sky-400/[0.05] blur-2xl"
      />

      {!weather && !error && (
        <div className="relative flex items-center gap-2.5 text-[#69738A]">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.03]">
            <Cloud size={15} strokeWidth={1.6} />
          </div>

          <p className="text-xs">Loading weather...</p>
        </div>
      )}

      {error && (
        <div className="relative flex items-center gap-2.5 text-[#69738A]">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.03]">
            <Cloud size={15} strokeWidth={1.6} />
          </div>

          <p className="text-xs">Weather unavailable</p>
        </div>
      )}

      {weather && (
        <div className="relative">
          {/* Mobile: horizontal layout that uses the card's full width */}
          <div className="flex items-center gap-3 sm:hidden">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-300/[0.08] text-sky-200/90">
              <Icon size={18} strokeWidth={1.6} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-[22px] font-semibold leading-none tracking-[-0.03em] text-[#E7E9EF]">
                  {weather.temperature}°
                </span>

                <span className="truncate text-xs text-[#8890A2]">
                  {weather.conditionLabel}
                </span>

                <span className="ml-auto shrink-0 truncate text-[11px] font-medium uppercase tracking-[0.14em] text-[#7C8598]">
                  {weather.location}
                </span>
              </div>

              <p className="mt-1 truncate text-[11px] text-[#5E687C]">
                Feels {weather.feelsLike}° · H {weather.high}° L{" "}
                {weather.low}° · Rain {weather.rainChance}%
              </p>
            </div>
          </div>

          {/* Desktop / tablet: original compact stacked layout, unchanged */}
          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-300/[0.08] text-sky-200/90">
                <Icon size={15} strokeWidth={1.6} />
              </div>

              <p className="truncate text-[11px] font-medium uppercase tracking-[0.14em] text-[#7C8598]">
                {weather.location}
              </p>
            </div>

            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-[26px] font-semibold leading-none tracking-[-0.03em] text-[#E7E9EF]">
                {weather.temperature}°
              </span>

              <span className="truncate text-xs text-[#8890A2]">
                {weather.conditionLabel}
              </span>
            </div>

            <p className="mt-2 truncate text-[11px] text-[#5E687C]">
              Feels {weather.feelsLike}° · H {weather.high}° L{" "}
              {weather.low}° · Rain {weather.rainChance}%
            </p>
          </div>
        </div>
      )}
    </section>
  );
}