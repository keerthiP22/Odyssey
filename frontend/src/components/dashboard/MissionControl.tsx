import {
  Brain,
  CheckCircle2,
  Clock3,
  Sparkles,
  ArrowRight,
  Target,
  Flame,
} from "lucide-react";

export default function MissionControl() {
  return (
    <section className="rounded-3xl border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-3">
            <Brain className="h-6 w-6 text-primary" />
          </div>

          <div>
            <h2 className="text-2xl font-bold">Mission Control</h2>
            <p className="text-sm text-muted-foreground">
              Your command center for today.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
          <Flame className="h-4 w-4 text-orange-500" />
          <span className="text-sm font-semibold">82% Focus</span>
        </div>
      </div>

      {/* Current Mission */}
      <div className="mt-8 rounded-2xl border bg-muted/30 p-6">
        <div className="mb-3 flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Current Mission</h3>
        </div>

        <h2 className="text-2xl font-bold">
          Finish Sprint 3 Dashboard
        </h2>

        <div className="mt-3 flex gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            High Priority
          </span>

          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-600 dark:bg-orange-500/20 dark:text-orange-300">
            Due Today
          </span>
        </div>
      </div>

      {/* Next Actions */}
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-semibold">
          Next Actions
        </h3>

        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-xl border p-4">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <span>Complete Habit Tracker</span>
          </div>

          <div className="flex items-center gap-3 rounded-xl border p-4">
            <Clock3 className="h-5 w-5 text-amber-500" />
            <span>Build Weekly Progress Chart</span>
          </div>

          <div className="flex items-center gap-3 rounded-xl border p-4">
            <Clock3 className="h-5 w-5 text-amber-500" />
            <span>Polish Dashboard UI</span>
          </div>
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border p-5">
          <p className="text-sm text-muted-foreground">
            Focus Time
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            2h 15m
          </h3>
        </div>

        <div className="rounded-2xl border p-5">
          <p className="text-sm text-muted-foreground">
            Progress
          </p>

          <h3 className="mt-2 text-3xl font-bold text-primary">
            65%
          </h3>
        </div>
      </div>

      {/* AI Copilot */}
      <div className="mt-8 rounded-2xl bg-primary/5 p-5">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">AI Copilot</h3>
        </div>

        <p className="text-sm leading-6 text-muted-foreground">
          You're making good progress today. Complete the Habit
          Tracker first because the Weekly Progress and AI
          Insights depend on today's habit data.
        </p>
      </div>

      {/* Button */}
      <button className="mt-8 flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-primary-foreground transition hover:scale-105">
        Continue Working
        <ArrowRight className="h-5 w-5" />
      </button>
    </section>
  );
}