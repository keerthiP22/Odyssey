import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { useState } from "react";

import GlassPanel from "@/components/common/GlassPanel";

interface Task {
  id: number;
  time: string;
  title: string;
  tag: string;
  completed: boolean;
}

export default function PlannerPreview() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      time: "09:00",
      title: "Morning Workout",
      tag: "Health",
      completed: true,
    },
    {
      id: 2,
      time: "11:00",
      title: "Continue Odyssey",
      tag: "Project",
      completed: false,
    },
    {
      id: 3,
      time: "14:00",
      title: "Practice DSA",
      tag: "Study",
      completed: false,
    },
    {
      id: 4,
      time: "18:00",
      title: "Dance Practice",
      tag: "Personal",
      completed: false,
    },
  ]);

  function toggleTask(id: number) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  return (
    <GlassPanel className="p-8">
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-violet-300">
            <CalendarDays size={18} />

            <span className="text-sm uppercase tracking-[0.25em]">
              Today
            </span>
          </div>

          <h2 className="mt-3 text-2xl font-semibold text-white">
            Today's Journey
          </h2>
        </div>

        <button className="flex items-center gap-2 text-sm text-violet-300 transition hover:gap-3">
          View All

          <ArrowRight size={16} />
        </button>
      </div>

      {/* Timeline */}

      <div className="space-y-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-start gap-5"
          >
            {/* Time */}

            <div className="w-20 pt-1 text-sm font-medium text-slate-500">
              {task.time}
            </div>

            {/* Line */}

            <div className="flex flex-col items-center">
              <button
                onClick={() => toggleTask(task.id)}
              >
                {task.completed ? (
                  <CheckCircle2
                    size={22}
                    className="text-emerald-400"
                  />
                ) : (
                  <Circle
                    size={22}
                    className="text-slate-500 hover:text-violet-400 transition"
                  />
                )}
              </button>

              {task.id !== tasks.length && (
                <div className="mt-2 h-10 w-px bg-white/10" />
              )}
            </div>

            {/* Content */}

            <div className="flex-1 pb-4">
              <div className="flex items-center gap-3">
                <h3
                  className={`text-lg font-medium ${
                    task.completed
                      ? "text-slate-500 line-through"
                      : "text-white"
                  }`}
                >
                  {task.title}
                </h3>

                <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
                  {task.tag}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}