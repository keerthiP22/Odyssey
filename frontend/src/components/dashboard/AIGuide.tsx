import {
  ArrowRight,
  Sparkles,
  Brain,
  Clock3,
} from "lucide-react";

import GlassPanel from "@/components/common/GlassPanel";
import PrimaryButton from "@/components/common/PrimaryButton";

export default function AIGuide() {
  return (
    <GlassPanel className="overflow-hidden">
      <div className="grid gap-10 p-8 lg:grid-cols-[1.4fr_.8fr]">
        {/* Left */}

        <div>
          <div className="flex items-center gap-2 text-violet-300">
            <Sparkles size={18} />

            <span className="text-sm uppercase tracking-[0.25em]">
              Odyssey Guide
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-semibold text-white">
            Your AI Companion
          </h2>

          <p className="mt-5 max-w-2xl leading-8 text-slate-400">
            You're making consistent progress this week.
            Based on your recent activity, your highest focus
            period is usually before noon.
          </p>

          <div className="mt-8">
            <PrimaryButton>
              Start Focus Session
            </PrimaryButton>
          </div>
        </div>

        {/* Right */}

        <div className="space-y-4">
          <div className="rounded-2xl bg-white/[0.03] p-5">
            <div className="flex items-center gap-3">
              <Brain className="text-violet-300" size={20} />

              <h3 className="font-semibold text-white">
                Today's Insight
              </h3>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-400">
              Continue working on Odyssey before switching
              to DSA. Your completion rate is highest when
              you finish creative work first.
            </p>
          </div>

          <div className="rounded-2xl bg-white/[0.03] p-5">
            <div className="flex items-center gap-3">
              <Clock3 className="text-cyan-300" size={20} />

              <h3 className="font-semibold text-white">
                Recommended Focus
              </h3>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-400">
              45 minutes of uninterrupted work followed by a
              10 minute break.
            </p>
          </div>

          <button className="group flex items-center gap-2 text-sm font-medium text-violet-300 transition hover:gap-3">
            View Detailed Insights

            <ArrowRight
              size={16}
              className="transition group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </GlassPanel>
  );
}