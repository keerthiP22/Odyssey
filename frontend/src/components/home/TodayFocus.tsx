import {
  Flame,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { useState } from "react";

const initialTasks = [
  "Finish Odyssey Home UI",
  "Workout",
  "Read 10 Pages",
];

export default function TodayFocus() {
  const [tasks, setTasks] = useState(
    initialTasks.map((title) => ({
      title,
      completed: false,
    }))
  );

  const toggleTask = (index: number) => {
    const updated = [...tasks];
    updated[index].completed =
      !updated[index].completed;
    setTasks(updated);
  };

  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  const progress =
    (completed / tasks.length) * 100;

  return (
    <section className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-orange-500/10 p-3 text-orange-300">
          <Flame size={18} />
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-orange-300">
            Today's Focus
          </p>

          <h2 className="mt-1 text-2xl font-bold text-white">
            One Thing At A Time
          </h2>
        </div>

      </div>

      <p className="mt-4 text-slate-400">
        Complete these before adding anything new.
      </p>

      <div className="mt-6 space-y-3">

        {tasks.map((task, index) => (
          <button
            key={task.title}
            onClick={() => toggleTask(index)}
            className="flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10"
          >
            {task.completed ? (
              <CheckCircle2
                size={22}
                className="text-green-400"
              />
            ) : (
              <Circle
                size={22}
                className="text-slate-500"
              />
            )}

            <span
              className={`flex-1 ${
                task.completed
                  ? "text-slate-500 line-through"
                  : "text-white"
              }`}
            >
              {task.title}
            </span>

          </button>
        ))}

      </div>

      <div className="mt-6">

        <div className="mb-2 flex justify-between text-sm text-slate-400">
          <span>Progress</span>
          <span>
            {completed}/{tasks.length}
          </span>
        </div>

        <div className="h-2 rounded-full bg-white/10">

          <div
            className="h-full rounded-full bg-gradient-to-r from-orange-400 to-pink-500 transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

    </section>
  );
}