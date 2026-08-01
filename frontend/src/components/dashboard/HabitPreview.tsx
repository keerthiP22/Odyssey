import {
  CheckCircle2,
  Circle,
  Flame,
} from "lucide-react";
import { useState } from "react";

export default function HabitPreview() {
  const [habits, setHabits] = useState([
    {
      id: 1,
      title: "Drink Water",
      done: true,
    },
    {
      id: 2,
      title: "Workout",
      done: true,
    },
    {
      id: 3,
      title: "Read 20 mins",
      done: false,
    },
    {
      id: 4,
      title: "Journal",
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

  const completed = habits.filter((habit) => habit.done).length;

  const progress = (completed / habits.length) * 100;

  return (
    <section className="rounded-3xl border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="mb-6 flex items-center gap-2">
        <Flame className="h-5 w-5 text-orange-500" />

        <h2 className="text-xl font-semibold">
          Today's Habits
        </h2>
      </div>

      <div className="space-y-3">
        {habits.map((habit) => (
          <button
            key={habit.id}
            onClick={() => toggleHabit(habit.id)}
            className="flex w-full items-center justify-between rounded-xl border p-3 text-left transition hover:bg-muted"
          >
            <span
              className={
                habit.done
                  ? "line-through text-muted-foreground"
                  : ""
              }
            >
              {habit.title}
            </span>

            {habit.done ? (
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            ) : (
              <Circle className="h-6 w-6 text-muted-foreground" />
            )}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <div className="mb-2 flex justify-between text-sm">
          <span>Progress</span>

          <span>
            {completed}/{habits.length}
          </span>
        </div>

        <div className="h-2 rounded-full bg-muted">
          <div
            className="h-2 rounded-full bg-primary transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
    </section>
  );
}