import { MoonStar, Sparkles } from "lucide-react";

import GlassPanel from "@/components/common/GlassPanel";
import PrimaryButton from "@/components/common/PrimaryButton";
import SkylineScene from "@/components/common/SkyLineScene";

export default function Hero() {
  return (
    <GlassPanel className="relative overflow-hidden px-10 py-10 lg:px-12 lg:py-12">
      {/* Background Scene */}
      <SkylineScene />

      {/* Content */}
      <div className="relative z-10 flex min-h-[360px] flex-col justify-center">
        {/* Greeting */}

        <div className="flex items-center gap-2 text-violet-300">
          <MoonStar size={18} />

          <span className="text-sm uppercase tracking-[0.3em]">
            Good Evening
          </span>
        </div>

        {/* Heading */}

        <div className="mt-8 max-w-2xl">
          <h1 className="text-5xl font-bold leading-tight text-white lg:text-6xl">
            Welcome back,
            <br />
            Keerthi.
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Every evening is another page in your journey.
            Build quietly.
            <br />
            Grow consistently.
          </p>

          <div className="mt-10">
            <PrimaryButton>
              Continue Tonight
            </PrimaryButton>
          </div>
        </div>

        {/* Quote */}

        <div className="mt-12 flex items-center gap-3 text-slate-400">
          <Sparkles size={18} />

          <p className="italic">
            Small steps become beautiful skylines.
          </p>
        </div>
      </div>
    </GlassPanel>
  );
}