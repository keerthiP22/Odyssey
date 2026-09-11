import {
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Plus,
  Trash2,
} from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";

import {
  setTaskCompleted,
  createTask,
  deleteTask,
  getTasks,
  type Task,
} from "@/services/taskService";

interface PlannerTask {
  id: number;
  time: string;
  task: string;
  completed: boolean;
}

function getTodayLabel() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function convertTask(task: Task): PlannerTask {
  const date = task.dueDate
    ? new Date(task.dueDate)
    : new Date(task.createdAt);

  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return {
    id: task.id,
    time,
    task: task.title,
    completed: task.completed,
  };
}

function getTodayDateTime(time: string) {
  const today = new Date();
  const [hours, minutes] = time.split(":").map(Number);

  today.setHours(hours, minutes, 0, 0);
  return today.toISOString();
}

export default function DailyPlan() {
  const [tasks, setTasks] = useState<PlannerTask[]>([]);
  const [taskName, setTaskName] = useState("");
  const [taskTime, setTaskTime] = useState("17:00");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTasks() {
    try {
      setError("");

      const databaseTasks = await getTasks();

      setTasks(databaseTasks.map(convertTask));
    } catch (error) {
      console.error("Could not load Planner tasks:", error);

      setError(
        "Could not load your tasks. Make sure the Odyssey backend is running."
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  const completedCount = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks]
  );

  const remainingCount = tasks.length - completedCount;

  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completedCount / tasks.length) * 100);


 const toggleTask = async (task: PlannerTask) => {
  try {
    setError("");

    const updatedTask = await setTaskCompleted(
      task.id,
      !task.completed
    );

    setTasks((current) =>
      current.map((item) =>
        item.id === task.id
          ? {
              ...item,
              completed: updatedTask.completed,
            }
          : item
      )
    );
  } catch (error) {
    console.error("Could not update task:", error);

    setError("Could not update that task.");
  }
}; 

  const handleDeleteTask = async (id: number) => {
    try {
      setError("");

      await deleteTask(id);

      setTasks((current) =>
        current.filter((task) => task.id !== id)
      );
    } catch (error) {
      console.error("Could not delete task:", error);

      setError("Could not delete that task.");
    }
  };

  const addTask = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const trimmedName = taskName.trim();

    if (!trimmedName) {
      return;
    }

    try {
      setError("");

      const createdTask = await createTask(
        trimmedName,
        0,
        getTodayDateTime(taskTime)
      );

      const plannerTask: PlannerTask = {
        id: createdTask.id,
        time: taskTime,
        task: createdTask.title,
        completed: createdTask.completed,
      };

      setTasks((current) =>
        [...current, plannerTask].sort((a, b) =>
          a.time.localeCompare(b.time)
        )
      );

      setTaskName("");
    } catch (error) {
      console.error("Could not create task:", error);

      setError("Could not add that task.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-5 pb-6">
      {/* Header */}
      <section className="relative overflow-hidden rounded-[26px] border border-white/[0.07] bg-[#141927] px-6 py-6 shadow-[0_18px_55px_rgba(0,0,0,0.16)] sm:px-8 sm:py-7">
        <div className="pointer-events-none absolute right-8 top-7 text-[13px] text-violet-300/25">
          ✦
        </div>

        <div className="relative">
          <div className="flex items-center gap-2">
            <CalendarDays
              size={14}
              strokeWidth={1.8}
              className="text-violet-300"
            />

            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-violet-300/80">
              Planner
            </p>
          </div>

          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#F2F0F2] sm:text-[40px]">
            Today's plan
          </h1>

          <p className="mt-1.5 text-sm text-[#929AB2]">
            {getTodayLabel()}
          </p>

          <p className="mt-4 max-w-xl text-[15px] leading-6 text-[#AEB5C6]">
            Give your day some shape. You don't need to finish
            everything — just know what matters next.
          </p>
        </div>
      </section>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-300/10 bg-red-400/[0.04] px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Progress */}
      <section className="rounded-[24px] border border-white/[0.07] bg-[#141927] px-5 py-5 sm:px-7">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-300/75">
              Day progress
            </p>

            <p className="mt-1.5 text-sm text-[#929AB2]">
              {completedCount} of {tasks.length} tasks complete
            </p>
          </div>

          <span className="text-sm font-semibold text-[#C9C4E8]">
            {progress}%
          </span>
        </div>

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-violet-400/80 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </section>

      {/* Add task */}
      <section className="rounded-[24px] border border-white/[0.07] bg-[#141927] px-5 py-5 sm:px-7">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-300/75">
            Add to your day
          </p>

          <h2 className="mt-1.5 text-xl font-semibold tracking-[-0.025em] text-[#F2F0F2]">
            What's next?
          </h2>
        </div>

        <form
          onSubmit={addTask}
          className="mt-4 grid gap-2.5 sm:grid-cols-[1fr_130px_auto]"
        >
          <input
            type="text"
            value={taskName}
            onChange={(event) =>
              setTaskName(event.target.value)
            }
            placeholder="Add a task..."
            aria-label="Task name"
            className="min-h-11 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 text-sm text-white outline-none transition placeholder:text-[#626C82] focus:border-violet-300/25 focus:bg-white/[0.04]"
          />

          <input
            type="time"
            value={taskTime}
            onChange={(event) =>
              setTaskTime(event.target.value)
            }
            aria-label="Task time"
            className="min-h-11 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 text-sm text-[#B7BECE] outline-none transition focus:border-violet-300/25"
          />

          <button
            type="submit"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 text-sm font-medium text-white transition hover:bg-violet-400 active:bg-violet-400"
          >
            <Plus size={16} />
            Add task
          </button>
        </form>
      </section>

      {/* Schedule */}
      <section className="rounded-[24px] border border-white/[0.07] bg-[#121624] px-5 py-5 sm:px-7 sm:py-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-300/75">
              Schedule
            </p>

            <h2 className="mt-1.5 text-xl font-semibold tracking-[-0.025em] text-[#F2F0F2]">
              Your day
            </h2>
          </div>

        </div>

        <div className="mt-5 space-y-2.5">
          {isLoading ? (
            <div className="rounded-xl border border-white/[0.06] px-5 py-10 text-center text-sm text-[#69738A]">
              Loading your tasks...
            </div>
          ) : tasks.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/[0.08] px-5 py-10 text-center">
              <CalendarDays
                size={22}
                className="mx-auto text-[#626C82]"
              />

              <p className="mt-3 text-sm font-medium text-[#AEB5C6]">
                Your schedule is clear.
              </p>

              <p className="mt-1 text-xs text-[#626C82]">
                Add something small to get started.
              </p>
            </div>
          ) : (
            tasks.map((item) => (
              <div
                key={item.id}
                className={`group flex items-center gap-3 rounded-xl border px-3.5 py-3 transition-colors sm:gap-4 sm:px-4 ${
                  item.completed
                    ? "border-white/[0.045] bg-white/[0.012]"
                    : "border-white/[0.06] bg-white/[0.018] hover:border-white/[0.10] hover:bg-white/[0.03]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleTask(item)}
                  aria-label={
                    item.completed
                      ? `Completed ${item.task}`
                      : `Complete ${item.task}`
                  }
                  aria-pressed={item.completed}
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition ${
                    item.completed
                      ? "border-violet-400/40 bg-violet-400/[0.12] text-violet-200"
                      : "border-white/[0.09] bg-white/[0.025] text-transparent hover:border-violet-300/25 hover:bg-violet-400/[0.06]"
                  }`}
                >
                  <Check
                    size={17}
                    strokeWidth={2.3}
                  />
                </button>

                <Clock3
                  size={16}
                  className={`hidden shrink-0 sm:block ${
                    item.completed
                      ? "text-[#4F586B]"
                      : "text-violet-300/65"
                  }`}
                />

                <div className="min-w-0 flex-1">
                  <p
                    className={`text-xs font-medium sm:text-sm ${
                      item.completed
                        ? "text-[#626C82] line-through"
                        : "text-[#D9DCE5]"
                    }`}
                  >
                    {item.task}
                  </p>

                  <p
                    className={`mt-0.5 text-[10px] ${
                      item.completed
                        ? "text-[#4F586B]"
                        : "text-[#69738A]"
                    }`}
                  >
                    {item.time}
                  </p>
                </div>

                {item.completed ? (
                  <CheckCircle2
                    size={17}
                    className="shrink-0 text-violet-300/45"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteTask(item.id)
                    }
                    aria-label={`Delete ${item.task}`}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[#4F586B] opacity-100 transition hover:bg-red-400/[0.07] hover:text-red-300 sm:opacity-0 sm:group-hover:opacity-100"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        {tasks.length > 0 && remainingCount === 0 && (
          <div className="mt-4 rounded-xl border border-violet-300/10 bg-violet-400/[0.045] px-4 py-3 text-center">
            <p className="text-xs font-medium text-violet-200">
              Everything planned for today is complete.
            </p>

            <p className="mt-1 text-[10px] text-[#727C91]">
              Nice work. You can let the rest of the day breathe.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}