import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Calendar,
} from "lucide-react";
import { useState } from "react";

export default function PlannerPreview() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      time: "09:00",
      title: "Morning Workout",
      completed: true,
    },
    {
      id: 2,
      time: "11:00",
      title: "Continue Odyssey",
      completed: false,
    },
    {
      id: 3,
      time: "14:00",
      title: "Practice DSA",
      completed: false,
    },
    {
      id: 4,
      time: "18:00",
      title: "Dance Practice",
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
    <section className="rounded-3xl border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">
            Today's Planner
          </h2>
        </div>

        <button className="flex items-center gap-2 text-sm font-medium text-primary">
          View
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <button
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className="flex w-full items-center justify-between rounded-xl border p-3 text-left transition hover:bg-muted"
          >
            <div>
              <p className="text-xs text-muted-foreground">
                {task.time}
              </p>

              <h3
                className={`font-medium ${
                  task.completed
                    ? "line-through text-muted-foreground"
                    : ""
                }`}
              >
                {task.title}
              </h3>
            </div>

            {task.completed ? (
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            ) : (
              <Circle className="h-6 w-6 text-muted-foreground" />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}