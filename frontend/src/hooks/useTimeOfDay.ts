import { useEffect, useState } from "react";

export type TimeOfDay = "morning" | "day" | "evening" | "night";

function getTimeOfDay(hour = new Date().getHours()): TimeOfDay {
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

export function useTimeOfDay(): TimeOfDay {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(() =>
    getTimeOfDay()
  );

  useEffect(() => {
    const updateTimeOfDay = () => {
      setTimeOfDay(getTimeOfDay());
    };

    updateTimeOfDay();
    const interval = window.setInterval(updateTimeOfDay, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  return timeOfDay;
}