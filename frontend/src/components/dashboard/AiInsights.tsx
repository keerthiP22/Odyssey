import { ArrowRight, Sparkles } from "lucide-react";

export default function AIInsight() {
  return (
    <section className="rounded-3xl border bg-primary/5 p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />

        <h2 className="text-xl font-semibold">
          AI Copilot
        </h2>
      </div>

      <p className="leading-7 text-muted-foreground">
        You're making steady progress today.
        Complete your Habit Tracker before moving
        to the Weekly Review because your analytics
        depend on today's habit data.
      </p>

      <button className="mt-6 flex items-center gap-2 font-medium text-primary transition hover:gap-3">
        Learn More

        <ArrowRight className="h-4 w-4" />
      </button>
    </section>
  );
}