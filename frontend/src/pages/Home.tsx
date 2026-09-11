import { useEffect, useState } from "react";

import Greeting from "@/components/home/Greeting";
import MorningRitual from "@/components/home/MorningRitual";
import IdentityCard from "@/components/home/IdentityCard";
import BeforeWeBegin from "@/components/home/BeforeWeBegin";

const RITUAL_COUNT = 4;
const INITIAL_MISSION_PROGRESS = 65;

function getTodayKey() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getRitualStorageKey() {
  return `odyssey:morning-ritual:${getTodayKey()}`;
}

function getMissionStorageKey() {
  return `odyssey:mission:${getTodayKey()}`;
}

function loadTodayRituals(): boolean[] {
  try {
    const stored = localStorage.getItem(getRitualStorageKey());

    if (!stored) {
      return Array(RITUAL_COUNT).fill(false);
    }

    const parsed = JSON.parse(stored);

    if (
      !Array.isArray(parsed) ||
      parsed.length !== RITUAL_COUNT ||
      !parsed.every((value) => typeof value === "boolean")
    ) {
      return Array(RITUAL_COUNT).fill(false);
    }

    return parsed;
  } catch {
    return Array(RITUAL_COUNT).fill(false);
  }
}

function loadTodayMissionProgress(): number {
  try {
    const stored = localStorage.getItem(getMissionStorageKey());

    if (stored === null) {
      return INITIAL_MISSION_PROGRESS;
    }

    const parsed = Number(stored);

    if (
      !Number.isFinite(parsed) ||
      parsed < 0 ||
      parsed > 100
    ) {
      return INITIAL_MISSION_PROGRESS;
    }

    return parsed;
  } catch {
    return INITIAL_MISSION_PROGRESS;
  }
}

export default function Home() {
  const [rituals, setRituals] = useState<boolean[]>(() =>
    loadTodayRituals()
  );

  const [missionProgress, setMissionProgress] = useState<number>(() =>
    loadTodayMissionProgress()
  );

  useEffect(() => {
    setRituals(loadTodayRituals());
    setMissionProgress(loadTodayMissionProgress());
  }, []);

  const handleRitualToggle = (index: number) => {
    setRituals((current) => {
      const updated = [...current];

      updated[index] = !updated[index];

      try {
        localStorage.setItem(
          getRitualStorageKey(),
          JSON.stringify(updated)
        );
      } catch {
        // Keep the UI usable if localStorage is unavailable.
      }

      return updated;
    });
  };

  const handleMissionProgress = () => {
    setMissionProgress((current) => {
      if (current >= 100) {
        return 100;
      }

      const updated = Math.min(current + 5, 100);

      try {
        localStorage.setItem(
          getMissionStorageKey(),
          String(updated)
        );
      } catch {
        // Keep the UI usable if localStorage is unavailable.
      }

      return updated;
    });
  };

  const ritualsComplete =
    rituals.length === RITUAL_COUNT &&
    rituals.every(Boolean);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 pb-24 sm:space-y-5 sm:pb-6">
      {/* 1. Greeting */}
      <Greeting userName="Keerthi" />

      {/* 2. Morning Ritual + Today's Mission */}
      <div className="grid gap-5 lg:grid-cols-2">
        <MorningRitual
          rituals={rituals}
          onToggle={handleRitualToggle}
        />

        <IdentityCard
          progress={missionProgress}
          onContinue={handleMissionProgress}
        />
      </div>

      {/* 3. JARVIS Guide */}
      <BeforeWeBegin
        ritualsComplete={ritualsComplete}
      />
    </div>
  );
}