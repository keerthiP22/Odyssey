import { useEffect, useState } from "react";

import Greeting from "@/components/home/Greeting";
import MorningRitual from "@/components/home/MorningRitual";
import IdentityCard from "@/components/home/IdentityCard";
import BeforeWeBegin from "@/components/home/BeforeWeBegin";
import WeatherCard from "@/components/home/WeatherCard";

import { getTasks, type Task } from "@/services/taskService";

const RITUAL_COUNT = 4;

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

export default function Home() {
  const [rituals, setRituals] = useState<boolean[]>(() =>
    loadTodayRituals()
  );

  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [tasksError, setTasksError] = useState(false);

  useEffect(() => {
    setRituals(loadTodayRituals());

    async function loadTasks() {
      try {
        setTasksError(false);

        const loadedTasks = await getTasks();

        setTasks(loadedTasks);
      } catch (error) {
        console.error("Home task loading error:", error);
        setTasksError(true);
      } finally {
        setTasksLoading(false);
      }
    }

    loadTasks();
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

  const ritualsComplete =
    rituals.length === RITUAL_COUNT &&
    rituals.every(Boolean);

  const activeTasks = tasks.filter(
  (task) => !task.completed
);

const completedTaskCount = tasks.filter(
  (task) => task.completed
).length;

const missionProgress =
  tasks.length === 0
    ? 0
    : Math.round(
        (completedTaskCount / tasks.length) * 100
      );

const missionTask = [...activeTasks].sort(
  (a, b) => b.priority - a.priority
)[0];

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 pb-24 sm:space-y-5 sm:pb-6">
      {/* 1. Greeting + weather */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-4">
        <div className="min-w-0 flex-1">
          <Greeting userName="Keerthi" />
        </div>

        <WeatherCard />
      </div>

      {/* 2. Ritual + Today's Mission */}
      <div className="grid gap-5 lg:grid-cols-2">
        <MorningRitual
          rituals={rituals}
          onToggle={handleRitualToggle}
        />

        <IdentityCard
          task={missionTask}
          progress={missionProgress}
          loading={tasksLoading}
          error={tasksError}
        />
      </div>

      {/* 3. JARVIS Guide */}
      <BeforeWeBegin
        ritualsComplete={ritualsComplete}
      />
    </div>
  );
}