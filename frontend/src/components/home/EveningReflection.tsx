import { Moon, Heart } from "lucide-react";
import { useState } from "react";

export default function EveningReflection() {
  const [journal, setJournal] = useState("");
  const [gratitude, setGratitude] = useState("");

  return (
    <section className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-300">
          <Moon size={18} />
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-indigo-300">
            Evening Reflection
          </p>

          <h2 className="mt-1 text-2xl font-bold text-white">
            Slow Down
          </h2>
        </div>

      </div>

      <p className="mt-4 text-slate-400">
        Before tomorrow begins, leave today's thoughts here.
      </p>

      <div className="mt-6 space-y-5">

        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            Journal
          </label>

          <textarea
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            placeholder="What happened today?"
            className="h-28 w-full resize-none rounded-2xl border border-white/10 bg-black/20 p-4 text-white placeholder:text-slate-500 outline-none focus:border-indigo-400"
          />
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
            <Heart
              size={16}
              className="text-pink-400"
            />

            Gratitude
          </label>

          <textarea
            value={gratitude}
            onChange={(e) => setGratitude(e.target.value)}
            placeholder="Three things you're grateful for..."
            className="h-24 w-full resize-none rounded-2xl border border-white/10 bg-black/20 p-4 text-white placeholder:text-slate-500 outline-none focus:border-pink-400"
          />
        </div>

      </div>

      <div className="mt-6 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-5">

        <p className="text-sm text-indigo-300">
          Odyssey Reflection
        </p>

        <p className="mt-2 leading-7 text-slate-300">
          Every day doesn't have to be perfect. Showing up again
          tomorrow is what matters.
        </p>

      </div>

    </section>
  );
}