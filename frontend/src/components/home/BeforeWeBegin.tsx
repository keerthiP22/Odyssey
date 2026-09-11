import {
  ArrowRight,
  Brain,
  Compass,
  Lightbulb,
  Wind,
  X,
} from "lucide-react";
import { useState } from "react";

import MorningSudoku from "./MorningSudoku";
import WordHunt from "./WordHunt";

interface BeforeWeBeginProps {
  ritualsComplete: boolean;
}

type ActivityId =
  | "word-hunt"
  | "morning-sudoku"
  | "one-minute-reset"
  | "tiny-learning";

interface Activity {
  id: ActivityId;
  title: string;
  type: string;
  duration: string;
  description: string;
  icon: typeof Brain;
}

const activities: Activity[] = [
  {
    id: "word-hunt",
    title: "Word Hunt",
    type: "Word",
    duration: "3 min",
    description:
      "Find the hidden words around today's theme.",
    icon: Brain,
  },
  {
    id: "morning-sudoku",
    title: "Morning Sudoku",
    type: "Challenge",
    duration: "5 min",
    description:
      "A small logic puzzle to wake up your brain.",
    icon: Brain,
  },
  {
    id: "one-minute-reset",
    title: "One Minute Reset",
    type: "Reset",
    duration: "1 min",
    description:
      "Slow down, breathe, and arrive.",
    icon: Wind,
  },
  {
    id: "tiny-learning",
    title: "Tiny Learning",
    type: "Discovery",
    duration: "2 min",
    description:
      "Learn one interesting thing before the day begins.",
    icon: Lightbulb,
  },
];

export default function BeforeWeBegin({
  ritualsComplete,
}: BeforeWeBeginProps) {
  const [activeActivity, setActiveActivity] =
    useState<ActivityId | null>(null);

  const recommendedActivity = "word-hunt";

  const openActivity = (activityId: ActivityId) => {
    setActiveActivity(activityId);
  };

  const closeActivity = () => {
    setActiveActivity(null);
  };

  if (activeActivity === "word-hunt") {
    return <WordHunt onClose={closeActivity} />;
  }

  if (activeActivity === "morning-sudoku") {
    return <MorningSudoku onClose={closeActivity} />;
  }

  const activePlaceholder = activities.find(
    (activity) => activity.id === activeActivity
  );

  return (
    <>
      <section className="rounded-[24px] border border-white/[0.07] bg-[#121624] px-6 py-5 sm:px-7 sm:py-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <Compass
                size={14}
                strokeWidth={1.8}
                className="text-violet-300"
              />

              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-300/75">
                JARVIS
              </p>
            </div>

            <h2 className="mt-1.5 text-xl font-semibold tracking-[-0.025em] text-[#F2F0F2]">
              Before we begin
            </h2>

            <p className="mt-1.5 text-sm text-[#8992A7]">
              A short warm-up to wake up your mind.
            </p>
          </div>
        </div>

        {/* Warm-ups */}
        <div className="mt-5">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-[#626C82]">
            Choose a warm-up
          </p>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {activities.map((activity) => {
              const Icon = activity.icon;

              const isRecommended =
                activity.id === recommendedActivity;

              return (
                <button
                  key={activity.id}
                  type="button"
                  onClick={() =>
                    openActivity(activity.id)
                  }
                  aria-label={`Start ${activity.title}`}
                  className={`group relative flex w-full items-start gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-200 hover:-translate-y-px hover:border-white/[0.13] hover:bg-white/[0.035] ${
                    isRecommended
                      ? "border-violet-300/20 bg-violet-400/[0.055]"
                      : "border-white/[0.06] bg-white/[0.018]"
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                      isRecommended
                        ? "bg-violet-400/[0.12] text-violet-200"
                        : "bg-white/[0.035] text-[#858EA4]"
                    }`}
                  >
                    <Icon
                      size={17}
                      strokeWidth={1.7}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium text-[#D9DCE5]">
                        {activity.title}
                      </h3>

                      {isRecommended && (
                        <span className="rounded-full bg-violet-400/[0.10] px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.18em] text-violet-200/80">
                          JARVIS pick
                        </span>
                      )}
                    </div>

                    <div className="mt-0.5 flex items-center gap-2 text-[10px] text-[#69738A]">
                      <span>{activity.type}</span>

                      <span className="h-0.5 w-0.5 rounded-full bg-[#4F586B]" />

                      <span>{activity.duration}</span>
                    </div>

                    <p className="mt-1.5 text-xs leading-5 text-[#858EA4]">
                      {activity.description}
                    </p>
                  </div>

                  <ArrowRight
                    size={15}
                    className="mt-2 shrink-0 text-[#596278] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-violet-200"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Quiet JARVIS context */}
        <p className="mt-4 text-[11px] text-[#626C82]">
          {ritualsComplete
            ? "You're ready. Let's wake your mind up."
            : "Your ritual isn't finished yet, but a short warm-up is always available."}
        </p>
      </section>

      {/* Placeholder for activities that are not playable yet */}
      {activePlaceholder &&
        activePlaceholder.id !== "word-hunt" &&
        activePlaceholder.id !== "morning-sudoku" && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#070b18]/75 px-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="activity-placeholder-title"
          >
            <div className="w-full max-w-md rounded-[24px] border border-white/[0.08] bg-[#111625] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-300/75">
                    JARVIS
                  </p>

                  <h2
                    id="activity-placeholder-title"
                    className="mt-1.5 text-xl font-semibold tracking-[-0.025em] text-[#F2F0F2]"
                  >
                    {activePlaceholder.title}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={closeActivity}
                  aria-label="Close activity"
                  className="rounded-lg p-2 text-[#7E879B] transition hover:bg-white/[0.05] hover:text-white"
                >
                  <X size={17} />
                </button>
              </div>

              <p className="mt-5 text-sm leading-6 text-[#929AB2]">
                This warm-up is coming next. For now,
                Word Hunt and Morning Sudoku are ready to
                play.
              </p>

              <button
                type="button"
                onClick={closeActivity}
                className="mt-6 inline-flex items-center gap-2 rounded-lg border border-violet-300/15 bg-violet-400/[0.07] px-4 py-2.5 text-sm font-medium text-violet-200 transition hover:border-violet-300/25 hover:bg-violet-400/[0.11]"
              >
                Back to warm-ups
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}
    </>
  );
}