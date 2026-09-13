import {
  ArrowRight,
  Check,
  Target,
} from "lucide-react";

import type { Task } from "@/services/taskService";

interface IdentityCardProps {
  task?: Task;
  progress: number;
  loading: boolean;
  error: boolean;
}

export default function IdentityCard({
  task,
  progress,
  loading,
  error,
}: IdentityCardProps) {
  const isComplete = progress >= 100;

  return (
    <section className="relative w-full overflow-hidden rounded-[22px] border border-white/[0.07] bg-[#141927] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.16)] sm:rounded-[24px] sm:p-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-full bg-violet-400/[0.045] blur-3xl sm:h-32 sm:w-32"
      />

      <div className="relative">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-400/[0.10] text-violet-300">
            <Target size={18} strokeWidth={1.8} />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-violet-300/80 sm:tracking-[0.28em]">
              Today's mission
            </p>

            <h2 className="mt-1.5 text-lg font-semibold leading-6 tracking-[-0.025em] text-[#F2F0F2] sm:text-xl">
              {loading
                ? "Finding your next step..."
                : error
                  ? "Your mission is unavailable"
                  : task
                    ? task.title
                    : "All caught up"}
            </h2>
          </div>
        </div>

        <p className="mt-4 max-w-lg text-sm leading-6 text-[#929AB2]">
          {loading
            ? "Checking your tasks."
            : error
              ? "We couldn't load your tasks right now."
              : task
                ? "One thing matters most right now. Everything else can wait."
                : "You've completed everything on your list. Take a breath."}
        </p>

        {loading ? (
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="text-[#737D93]">
                Progress
              </span>

              <span className="font-medium text-[#AEB5C6]">
                Loading...
              </span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
              <div className="h-full w-1/3 animate-pulse rounded-full bg-violet-400/50" />
            </div>
          </div>
        ) : error ? (
          <div className="mt-5 inline-flex min-h-11 items-center rounded-lg bg-white/[0.05] px-4 py-2 text-sm font-medium text-[#AEB5C6]">
            Try again later
          </div>
        ) : !task ? (
          <div className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg bg-violet-400/[0.12] px-4 py-2 text-sm font-medium text-violet-200">
            <Check size={14} />
            You're all caught up
          </div>
        ) : (
          <>
            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="text-[#737D93]">
                  Progress
                </span>

                <span className="font-medium text-[#AEB5C6]">
                  {progress}%
                </span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                <div
                  className="h-full rounded-full bg-violet-400/80 transition-all duration-300"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            </div>

            {isComplete ? (
              <div className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg bg-violet-400/[0.12] px-4 py-2 text-sm font-medium text-violet-200">
                <Check size={14} />
                Mission complete
              </div>
            ) : (
              <div className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg bg-violet-500 px-4 py-2 text-sm font-medium text-white">
                Continue mission
                <ArrowRight size={14} />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}