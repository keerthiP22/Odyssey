import { Check, Plus, Target } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";

import {
  createGoal,
  getGoals,
  setGoalCompleted,
  type Goal,
} from "@/services/goalService";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadGoals() {
      try {
        setError("");
        const loadedGoals = await getGoals();
        setGoals(
          [...loadedGoals].sort(
            (first, second) =>
              new Date(second.createdAt).getTime() -
              new Date(first.createdAt).getTime()
          )
        );
      } catch (loadError) {
        console.error("Could not load goals:", loadError);
        setError(
          "Could not load your goals. Make sure the Odyssey backend is running."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadGoals();
  }, []);

  const completedCount = useMemo(
    () => goals.filter((goal) => goal.completed).length,
    [goals]
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle || isSaving) {
      return;
    }

    try {
      setError("");
      setIsSaving(true);
      const goal = await createGoal(
        trimmedTitle,
        description.trim() || undefined
      );
      setGoals((current) => [goal, ...current]);
      setTitle("");
      setDescription("");
    } catch (saveError) {
      console.error("Could not create goal:", saveError);
      setError("Could not add that goal.");
    } finally {
      setIsSaving(false);
    }
  }

  async function toggleGoal(goal: Goal) {
    try {
      setError("");
      const updatedGoal = await setGoalCompleted(goal.id, !goal.completed);
      setGoals((current) =>
        current.map((item) => (item.id === goal.id ? updatedGoal : item))
      );
    } catch (updateError) {
      console.error("Could not update goal:", updateError);
      setError("Could not update that goal.");
    }
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-5 pb-6">
      <section className="relative overflow-hidden rounded-[26px] border border-white/[0.07] bg-[#141927] px-6 py-6 shadow-[0_18px_55px_rgba(0,0,0,0.16)] sm:px-8 sm:py-7">
        <div className="pointer-events-none absolute right-8 top-7 text-[13px] text-violet-300/25">
          ✦
        </div>
        <div className="relative">
          <div className="flex items-center gap-2">
            <Target size={14} strokeWidth={1.8} className="text-violet-300" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-violet-300/80">
              Direction
            </p>
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#F2F0F2] sm:text-[40px]">
            Your goals
          </h1>
          <p className="mt-1.5 text-sm text-[#929AB2]">
            Keep the longer path visible while you focus on what is next.
          </p>
        </div>
      </section>

      {error && (
        <div className="rounded-xl border border-red-300/10 bg-red-400/[0.04] px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <section className="rounded-[24px] border border-white/[0.07] bg-[#141927] px-5 py-5 sm:px-7">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-300/75">
              New direction
            </p>
            <h2 className="mt-1.5 text-xl font-semibold tracking-[-0.025em] text-[#F2F0F2]">
              What are you moving toward?
            </h2>
          </div>
          <p className="text-xs text-[#69738A]">
            {completedCount} of {goals.length} complete
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-2.5">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Add a goal..."
            aria-label="Goal title"
            className="min-h-11 w-full rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 text-sm text-white outline-none transition placeholder:text-[#626C82] focus:border-violet-300/25 focus:bg-white/[0.04]"
          />
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <input
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Optional note"
              aria-label="Goal description"
              className="min-h-11 min-w-0 flex-1 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 text-sm text-white outline-none transition placeholder:text-[#626C82] focus:border-violet-300/25 focus:bg-white/[0.04]"
            />
            <button
              type="submit"
              disabled={isSaving || !title.trim()}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 text-sm font-medium text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus size={16} />
              {isSaving ? "Saving..." : "Add goal"}
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-[24px] border border-white/[0.07] bg-[#121624] px-5 py-5 sm:px-7 sm:py-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-300/75">
          Your direction
        </p>
        <h2 className="mt-1.5 text-xl font-semibold tracking-[-0.025em] text-[#F2F0F2]">
          Goals in progress
        </h2>

        <div className="mt-5 space-y-2.5">
          {isLoading ? (
            <div className="rounded-xl border border-white/[0.06] px-5 py-10 text-center text-sm text-[#69738A]">
              Loading your goals...
            </div>
          ) : goals.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/[0.08] px-5 py-10 text-center">
              <Target size={22} className="mx-auto text-[#626C82]" />
              <p className="mt-3 text-sm font-medium text-[#AEB5C6]">
                Nothing here yet.
              </p>
              <p className="mt-1 text-xs text-[#626C82]">
                Add one meaningful direction to get started.
              </p>
            </div>
          ) : (
            goals.map((goal) => (
              <div
                key={goal.id}
                className={`flex items-start gap-3 rounded-xl border px-3.5 py-3.5 transition-colors sm:gap-4 sm:px-4 ${
                  goal.completed
                    ? "border-white/[0.045] bg-white/[0.012]"
                    : "border-white/[0.06] bg-white/[0.018] hover:border-white/[0.10] hover:bg-white/[0.03]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleGoal(goal)}
                  aria-label={
                    goal.completed
                      ? `Undo ${goal.title}`
                      : `Complete ${goal.title}`
                  }
                  aria-pressed={goal.completed}
                  className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition ${
                    goal.completed
                      ? "border-violet-400/40 bg-violet-400/[0.12] text-violet-200"
                      : "border-white/[0.09] bg-white/[0.025] text-transparent hover:border-violet-300/25 hover:bg-violet-400/[0.06]"
                  }`}
                >
                  <Check size={17} strokeWidth={2.3} />
                </button>
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-sm font-medium ${
                      goal.completed
                        ? "text-[#626C82] line-through"
                        : "text-[#D9DCE5]"
                    }`}
                  >
                    {goal.title}
                  </p>
                  {goal.description && (
                    <p className="mt-1 text-xs leading-5 text-[#858EA4]">
                      {goal.description}
                    </p>
                  )}
                  <p className="mt-1.5 text-[10px] text-[#626C82]">
                    Started {formatDate(goal.createdAt)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}