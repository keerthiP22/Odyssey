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
  priority: number;
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
    priority: task.priority,
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

      const convertedTasks = databaseTasks.map(convertTask);

      setTasks(
        convertedTasks.sort((a, b) =>
          a.time.localeCompare(b.time)
        )
      );
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

  const activeTasks = useMemo(
    () =>
      tasks
        .filter((task) => !task.completed)
        .sort((a, b) => a.time.localeCompare(b.time)),
    [tasks]
  );

  const completedTasks = useMemo(
    () =>
      tasks
        .filter((task) => task.completed)
        .sort((a, b) => a.time.localeCompare(b.time)),
    [tasks]
  );

  const completedCount = completedTasks.length;
  const remainingCount = activeTasks.length;

  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completedCount / tasks.length) * 100);

  const nextTask = activeTasks[0] ?? null;

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
        priority: createdTask.priority,
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
    <div className="mx-auto w-full max-w-5xl space-y-5 pb-8">
      {/* ─────────────────────────────────────────────
          HEADER
      ───────────────────────────────────────────── */}

      <section className="glass relative overflow-hidden rounded-[26px] px-6 py-6 sm:px-8 sm:py-7">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 rounded-full bg-violet-400/[0.045] blur-3xl"
        />

        <div className="relative">
          <div className="flex items-center gap-2">
            <CalendarDays
              size={14}
              strokeWidth={1.8}
              className="text-violet-300/80"
            />

            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-violet-300/75">
              Planner
            </p>
          </div>

          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#F2F0F2] sm:text-[40px]">
            Today's plan
          </h1>

          <p className="mt-1.5 text-sm text-[#8992A7]">
            {getTodayLabel()}
          </p>

          <p className="mt-4 max-w-xl text-[15px] leading-6 text-[#AEB5C6]">
            Give your day some shape. You don't need to finish
            everything — just know what matters next.
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          ERROR
      ───────────────────────────────────────────── */}

      {error && (
        <div className="rounded-xl border border-red-300/10 bg-red-400/[0.04] px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* ─────────────────────────────────────────────
          PROGRESS
      ───────────────────────────────────────────── */}

      <section className="glass rounded-[22px] px-5 py-5 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-300/70">
              Day progress
            </p>

            <p className="mt-1.5 text-sm text-[#8992A7]">
              {tasks.length === 0
                ? "Nothing planned yet"
                : remainingCount === 0
                  ? "Everything planned is complete"
                  : `${remainingCount} ${
                      remainingCount === 1
                        ? "task"
                        : "tasks"
                    } left`}
            </p>
          </div>

          <div className="text-right">
            <span className="text-lg font-semibold tracking-tight text-[#D5D1EA]">
              {progress}%
            </span>

            <p className="mt-0.5 text-[10px] text-[#626C82]">
              {completedCount}/{tasks.length} complete
            </p>
          </div>
        </div>

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.055]">
          <div
            className="h-full rounded-full bg-violet-400/75 transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          WHAT'S NEXT
      ───────────────────────────────────────────── */}

      <section className="glass rounded-[24px] px-5 py-5 sm:px-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-300/70">
              Add to your day
            </p>

            <h2 className="mt-1.5 text-xl font-semibold tracking-[-0.025em] text-[#F2F0F2]">
              What's next?
            </h2>
          </div>

          {nextTask && (
            <div className="hidden rounded-full border border-violet-300/10 bg-violet-400/[0.045] px-3 py-1.5 sm:block">
              <span className="text-[10px] font-medium text-violet-200/75">
                Next · {nextTask.time}
              </span>
            </div>
          )}
        </div>

        <form
          onSubmit={addTask}
          className="mt-4 grid gap-2.5 sm:grid-cols-[1fr_125px_auto]"
        >
          <input
            type="text"
            value={taskName}
            onChange={(event) =>
              setTaskName(event.target.value)
            }
            placeholder="What needs your attention?"
            aria-label="Task name"
            className="min-h-11 rounded-xl border border-white/[0.07] bg-white/[0.022] px-4 text-sm text-white outline-none transition placeholder:text-[#626C82] focus:border-violet-300/25 focus:bg-white/[0.04]"
          />

          <input
            type="time"
            value={taskTime}
            onChange={(event) =>
              setTaskTime(event.target.value)
            }
            aria-label="Task time"
            className="min-h-11 rounded-xl border border-white/[0.07] bg-white/[0.022] px-4 text-sm text-[#B7BECE] outline-none transition focus:border-violet-300/25 focus:bg-white/[0.04]"
          />

          <button
            type="submit"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 text-sm font-medium text-white shadow-[0_8px_24px_rgba(124,92,255,0.15)] transition hover:bg-violet-400 active:scale-[0.99]"
          >
            <Plus size={16} />
            Add task
          </button>
        </form>
      </section>

      {/* ─────────────────────────────────────────────
          YOUR DAY
      ───────────────────────────────────────────── */}

      <section className="glass rounded-[24px] px-5 py-5 sm:px-7 sm:py-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-300/70">
              Schedule
            </p>

            <h2 className="mt-1.5 text-xl font-semibold tracking-[-0.025em] text-[#F2F0F2]">
              Your day
            </h2>
          </div>

          {activeTasks.length > 0 && (
            <p className="text-xs text-[#626C82]">
              {activeTasks.length} active
            </p>
          )}
        </div>

        <div className="mt-5">
          {isLoading ? (
            <div className="rounded-2xl border border-white/[0.06] px-5 py-12 text-center">
              <div className="mx-auto h-5 w-5 animate-pulse rounded-full bg-violet-400/20" />

              <p className="mt-3 text-sm text-[#69738A]">
                Loading your day...
              </p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/[0.08] px-5 py-12 text-center">
              <CalendarDays
                size={22}
                className="mx-auto text-[#626C82]"
                strokeWidth={1.5}
              />

              <p className="mt-3 text-sm font-medium text-[#AEB5C6]">
                Your day is open.
              </p>

              <p className="mt-1 text-xs text-[#626C82]">
                Add one small thing to give it shape.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {/* ACTIVE TASKS */}

              {activeTasks.length > 0 && (
                <div className="space-y-2">
                  {activeTasks.map((item, index) => (
                    <div
                      key={item.id}
                      className="group flex items-center gap-3 rounded-2xl border border-white/[0.065] bg-white/[0.018] px-3.5 py-3 transition-all hover:border-violet-300/[0.14] hover:bg-white/[0.03] sm:gap-4 sm:px-4"
                    >
                      {/* Completion button */}
                      <button
                        type="button"
                        onClick={() =>
                          toggleTask(item)
                        }
                        aria-label={`Complete ${item.task}`}
                        aria-pressed={false}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.025] text-transparent transition hover:border-violet-300/30 hover:bg-violet-400/[0.07] hover:text-violet-200"
                      >
                        <Check
                          size={17}
                          strokeWidth={2.3}
                        />
                      </button>

                      {/* Time */}
                      <div className="hidden w-[54px] shrink-0 sm:block">
                        <div className="flex items-center gap-1.5">
                          <Clock3
                            size={13}
                            className="text-violet-300/55"
                            strokeWidth={1.8}
                          />

                          <span className="text-[11px] font-medium tabular-nums text-[#737D93]">
                            {item.time}
                          </span>
                        </div>
                      </div>

                      {/* Task */}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-[#D9DCE5]">
                          {item.task}
                        </p>

                        <div className="mt-1 flex items-center gap-2 sm:hidden">
                          <Clock3
                            size={11}
                            className="text-violet-300/55"
                            strokeWidth={1.8}
                          />

                          <span className="text-[10px] tabular-nums text-[#69738A]">
                            {item.time}
                          </span>
                        </div>
                      </div>

                      {/* Current task indicator */}
                      {index === 0 && (
                        <span className="hidden rounded-full border border-violet-300/10 bg-violet-400/[0.045] px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-violet-200/65 md:block">
                          Next
                        </span>
                      )}

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteTask(item.id)
                        }
                        aria-label={`Delete ${item.task}`}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#4F586B] transition hover:bg-red-400/[0.07] hover:text-red-300 sm:opacity-0 sm:group-hover:opacity-100"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* NO ACTIVE TASKS */}

              {activeTasks.length === 0 && (
                <div className="rounded-2xl border border-violet-300/10 bg-violet-400/[0.035] px-5 py-8 text-center">
                  <CheckCircle2
                    size={22}
                    className="mx-auto text-violet-300/65"
                    strokeWidth={1.6}
                  />

                  <p className="mt-3 text-sm font-medium text-violet-100/85">
                    Your planned work is complete.
                  </p>

                  <p className="mt-1 text-xs text-[#69738A]">
                    You can let the rest of the day breathe.
                  </p>
                </div>
              )}

              {/* COMPLETED */}

              {completedTasks.length > 0 && (
                <div className="pt-5">
                  <div className="mb-2.5 flex items-center gap-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#626C82]">
                      Completed
                    </p>

                    <div className="h-px flex-1 bg-white/[0.045]" />

                    <span className="text-[10px] text-[#4F586B]">
                      {completedTasks.length}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {completedTasks.map((item) => (
                      <div
                        key={item.id}
                        className="group flex items-center gap-3 rounded-xl border border-white/[0.035] bg-white/[0.008] px-3.5 py-2.5 opacity-70 transition-opacity hover:opacity-100 sm:px-4"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            toggleTask(item)
                          }
                          aria-label={`Restore ${item.task}`}
                          aria-pressed={true}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-violet-400/20 bg-violet-400/[0.08] text-violet-200/80 transition hover:border-violet-300/35 hover:bg-violet-400/[0.12]"
                        >
                          <Check
                            size={14}
                            strokeWidth={2.4}
                          />
                        </button>

                        <Clock3
                          size={13}
                          className="hidden shrink-0 text-[#4F586B] sm:block"
                          strokeWidth={1.7}
                        />

                        <p className="min-w-0 flex-1 truncate text-xs text-[#626C82] line-through">
                          {item.task}
                        </p>

                        <span className="hidden shrink-0 text-[10px] tabular-nums text-[#4F586B] sm:block">
                          {item.time}
                        </span>

                        <CheckCircle2
                          size={15}
                          className="shrink-0 text-violet-300/30"
                          strokeWidth={1.7}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}