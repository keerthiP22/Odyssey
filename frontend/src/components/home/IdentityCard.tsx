import { ArrowRight, Check, Target } from "lucide-react";

interface IdentityCardProps {
  progress: number;
  onContinue: () => void;
}

export default function IdentityCard({
  progress,
  onContinue,
}: IdentityCardProps) {
  const isComplete = progress >= 100;

  return (
    <section className="relative w-full overflow-hidden rounded-[22px] border border-orange-300/[0.12] bg-[#171A27] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.17)] sm:rounded-[24px] sm:p-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-full bg-orange-400/[0.045] blur-3xl sm:h-32 sm:w-32"
      />

      <div className="relative">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-400/[0.10] text-orange-300">
            <Target size={18} strokeWidth={1.8} />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-orange-300/85 sm:tracking-[0.28em]">
              Today's mission
            </p>

            <h2 className="mt-1.5 text-lg font-semibold leading-6 tracking-[-0.025em] text-[#F2F0F2] sm:text-xl">
              Finish Odyssey MVP Home
            </h2>
          </div>
        </div>

        <p className="mt-4 max-w-lg text-sm leading-6 text-[#929AB2]">
          One thing matters most today. Everything else can wait.
        </p>

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
              className="h-full rounded-full bg-orange-300/90 transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {isComplete ? (
          <div className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg bg-orange-300/[0.12] px-4 py-2 text-sm font-medium text-orange-200">
            <Check size={14} />
            Mission complete
          </div>
        ) : (
          <button
            type="button"
            onClick={onContinue}
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg bg-orange-300 px-4 py-2 text-sm font-medium text-[#251B12] transition-colors duration-200 hover:bg-orange-200 active:bg-orange-200"
          >
            Continue mission
            <ArrowRight size={14} />
          </button>
        )}
      </div>
    </section>
  );
}