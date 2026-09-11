interface GreetingProps {
  userName: string;
}

export default function Greeting({ userName }: GreetingProps) {
  const now = new Date();
  const hour = now.getHours();

  const greeting =
    hour < 12
      ? "Good morning"
      : hour < 17
        ? "Good afternoon"
        : hour < 21
          ? "Good evening"
          : "Good night";

  const formattedDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const gentleMessage =
    hour < 12
      ? "Start gently. The rest can wait."
      : hour < 17
        ? "One clear step is enough for now."
        : hour < 21
          ? "One clear step is enough for today."
          : "You can let the day settle.";

  return (
    <section className="relative overflow-hidden rounded-[22px] border border-white/[0.07] bg-[#141927] px-5 py-5 shadow-[0_18px_55px_rgba(0,0,0,0.16)] sm:rounded-[26px] sm:px-8 sm:py-6">
      {/* One quiet Odyssey detail */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-5 top-5 text-[12px] text-violet-300/25 sm:right-8 sm:top-7 sm:text-[13px]"
      >
        ✦
      </div>

      <div className="relative">
        <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-violet-300/80 sm:tracking-[0.3em]">
          {greeting}
        </p>

        <h1 className="mt-1.5 text-[38px] font-semibold leading-none tracking-[-0.045em] text-[#F2F0F2] sm:text-[46px]">
          {userName}
        </h1>

        <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px] text-[#929AB2] sm:gap-x-3 sm:text-sm">
          <span>{formattedDate}</span>

          <span
            aria-hidden="true"
            className="h-1 w-1 rounded-full bg-slate-600"
          />

          <span className="text-violet-300/80">
            The Builder
          </span>
        </div>

        <p className="mt-3 max-w-xl text-sm leading-6 text-[#AEB5C6] sm:mt-3.5 sm:text-[15px]">
          {gentleMessage}
        </p>
      </div>
    </section>
  );
}