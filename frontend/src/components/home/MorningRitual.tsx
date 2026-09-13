import {
  Check,
  Coffee,
  Dumbbell,
  GlassWater,
  Moon,
  Sparkles,
  Sun,
} from "lucide-react";

interface MorningRitualProps {
  rituals: boolean[];
  onToggle: (index: number) => void;
}

type RitualItem = {
  label: string;
  icon: typeof GlassWater;
};

function getRitualContent() {
  const hour = new Date().getHours();

  // Morning
  if (hour < 12) {
    return {
      eyebrow: "Morning ritual",
      title: "Prepare yourself",
      description: "Start gently.",
      footer: "Take it one step at a time",
      items: [
        {
          label: "Drink water",
          icon: GlassWater,
        },
        {
          label: "Freshen up",
          icon: Coffee,
        },
        {
          label: "Move your body",
          icon: Dumbbell,
        },
        {
          label: "Breakfast",
          icon: Check,
        },
      ] satisfies RitualItem[],
    };
  }

  // Afternoon
  if (hour < 17) {
    return {
      eyebrow: "Midday reset",
      title: "Regain your momentum",
      description: "Pause, reset, and continue.",
      footer: "Keep it simple",
      items: [
        {
          label: "Drink water",
          icon: GlassWater,
        },
        {
          label: "Take a short break",
          icon: Coffee,
        },
        {
          label: "Move your body",
          icon: Dumbbell,
        },
        {
          label: "Review priorities",
          icon: Sun,
        },
      ] satisfies RitualItem[],
    };
  }

  // Evening
  if (hour < 21) {
    return {
      eyebrow: "Evening reset",
      title: "Close the day gently",
      description: "Slow down without losing momentum.",
      footer: "Leave some room to breathe",
      items: [
        {
          label: "Hydrate",
          icon: GlassWater,
        },
        {
          label: "Tidy your space",
          icon: Sparkles,
        },
        {
          label: "Move or stretch",
          icon: Dumbbell,
        },
        {
          label: "Reflect on today",
          icon: Sun,
        },
      ] satisfies RitualItem[],
    };
  }

  // Night
  return {
    eyebrow: "Night wind-down",
    title: "Let the day settle",
    description: "Nothing more needs to be rushed.",
    footer: "Tomorrow can wait",
    items: [
      {
        label: "Put your phone away",
        icon: Moon,
      },
      {
        label: "Wind down",
        icon: Coffee,
      },
      {
        label: "Reflect on today",
        icon: Sparkles,
      },
      {
        label: "Get ready for sleep",
        icon: Moon,
      },
    ] satisfies RitualItem[],
  };
}

export default function MorningRitual({
  rituals,
  onToggle,
}: MorningRitualProps) {
  const ritualContent = getRitualContent();

  const completedCount = rituals.filter(Boolean).length;

  return (
    <section className="rounded-[22px] border border-white/[0.07] bg-[#141927] px-5 py-5 sm:rounded-[24px] sm:px-7 sm:py-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-300/80 sm:tracking-[0.3em]">
            {ritualContent.eyebrow}
          </p>

          <h2 className="mt-1.5 text-xl font-semibold tracking-[-0.03em] text-[#F2F0F2]">
            {ritualContent.title}
          </h2>

          <p className="mt-1 text-sm text-[#929AB2]">
            {ritualContent.description}
          </p>
        </div>

        <div className="shrink-0 rounded-full bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-[#929AB2]">
          {completedCount} / 4
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2.5">
        {ritualContent.items.map((item, index) => {
          const Icon = item.icon;
          const completed = rituals[index];

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => onToggle(index)}
              aria-pressed={completed}
              className={`group flex min-h-[52px] w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left transition-colors duration-200 sm:min-h-[56px] sm:px-3.5 ${
                completed
                  ? "border-violet-400/25 bg-violet-400/[0.08]"
                  : "border-white/[0.06] bg-white/[0.015] hover:border-white/[0.11] hover:bg-white/[0.035]"
              }`}
            >
              <span className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    completed
                      ? "bg-violet-500/20 text-violet-300"
                      : "bg-white/[0.045] text-[#7F899F] group-hover:text-[#AEB5C6]"
                  }`}
                >
                  <Icon size={16} strokeWidth={1.8} />
                </span>

                <span
                  className={`min-w-0 truncate text-[13px] font-medium transition-colors sm:text-sm ${
                    completed
                      ? "text-[#E8E3F3]"
                      : "text-[#B7BECE]"
                  }`}
                >
                  {item.label}
                </span>
              </span>

              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                  completed ? "text-white" : "text-transparent"
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                    completed
                      ? "border-violet-400 bg-violet-500"
                      : "border-[#4A5870] bg-transparent"
                  }`}
                >
                  {completed && (
                    <Check size={12} strokeWidth={2.5} />
                  )}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        aria-hidden="true"
        className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-violet-300/30"
      >
        <Sparkles size={11} />
        <span>{ritualContent.footer}</span>
      </div>
    </section>
  );
}