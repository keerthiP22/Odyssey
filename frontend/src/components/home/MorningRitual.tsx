import {
  Check,
  Coffee,
  Dumbbell,
  GlassWater,
  Sparkles,
} from "lucide-react";

interface MorningRitualProps {
  rituals: boolean[];
  onToggle: (index: number) => void;
}

const ritualItems = [
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
];

export default function MorningRitual({
  rituals,
  onToggle,
}: MorningRitualProps) {
  const completedCount = rituals.filter(Boolean).length;

  return (
    <section className="rounded-[22px] border border-white/[0.07] bg-[#141927] px-5 py-5 sm:rounded-[24px] sm:px-7 sm:py-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-300/80 sm:tracking-[0.3em]">
            Morning ritual
          </p>

          <h2 className="mt-1.5 text-xl font-semibold tracking-[-0.03em] text-[#F2F0F2]">
            Prepare yourself
          </h2>

          <p className="mt-1 text-sm text-[#929AB2]">
            Start gently.
          </p>
        </div>

        <div className="shrink-0 rounded-full bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-[#929AB2]">
          {completedCount} / 4
        </div>
      </div>

      {/* 2 × 2 on mobile, 2 × 2 on larger screens as well */}
      <div className="mt-5 grid grid-cols-2 gap-2.5">
        {ritualItems.map((item, index) => {
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
                  <Icon
                    size={16}
                    strokeWidth={1.8}
                  />
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

              {/* 44px touch area around the small visual check */}
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                  completed
                    ? "text-white"
                    : "text-transparent"
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
                    <Check
                      size={12}
                      strokeWidth={2.5}
                    />
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
        <span>Take it one step at a time</span>
      </div>
    </section>
  );
}