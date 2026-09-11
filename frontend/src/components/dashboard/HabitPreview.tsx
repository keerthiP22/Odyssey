import {
  CheckCircle2,
  Circle,
  Flame,
} from "lucide-react";
import { useState } from "react";

import GlassPanel from "@/components/common/GlassPanel";

interface Habit {
  id: number;
  title: string;
  streak: string;
  done: boolean;
}

export default function HabitPreview() {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: 1,
      title: "Drink Water",
      streak: "18 days",
      done: true,
    },
    {
      id: 2,
      title: "Morning Workout",
      streak: "9 days",
      done: true,
    },
    {
      id: 3,
      title: "Read 20 Minutes",
      streak: "4 days",
      done: false,
    },
    {
      id: 4,
      title: "Journal",
      streak: "12 days",
      done: true,
    },
  ]);

  function toggleHabit(id: number) {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id
          ? { ...habit, done: !habit.done }
          : habit
      )
    );
  }

  const completed = habits.filter((h) => h.done).length;
  const progress = (completed / habits.length) * 100;

  return (
    <GlassPanel className="p-8">
      {/* Header */}

      <div className="mb-8">
        <div className="flex items-center gap-2 text-orange-300">
          <Flame size={18} />

          <span className="text-sm uppercase tracking-[0.25em]">
            Daily Rituals
          </span>
        </div>

        <h2 className="mt-3 text-2xl font-semibold text-white">
          Habits
        </h2>
      </div>

      {/* Habits */}

      <div className="space-y-4">
        {habits.map((habit) => (
          <button
            key={habit.id}
            onClick={() => toggleHabit(habit.id)}
            className="flex w-full items-center justify-between rounded-2xl bg-white/[0.03] px-4 py-4 transition hover:bg-white/[0.06]"
          >
            <div className="flex items-center gap-4">
              {habit.done ? (
                <CheckCircle2
                  size={22}
                  className="text-emerald-400"
                />
              ) : (
                <Circle
                  size={22}
                  className="text-slate-500"
                />
              )}

              <div className="text-left">
                <h3
                  className={`font-medium ${
                    habit.done
                      ? "line-through text-slate-500"
                      : "text-white"
                  }`}
                >
                  {habit.title}
                </h3>

                <p className="text-xs text-slate-500">
                  {habit.streak}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Progress */}

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="text-slate-400">
            Today's Progress
          </span>

          <span className="font-medium text-white">
            {completed}/{habits.length}
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-orange-400 to-yellow-300 transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
    </GlassPanel>
  );
}