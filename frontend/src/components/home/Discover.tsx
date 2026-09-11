import {
  Compass,
  ArrowRight,
  BookOpen,
} from "lucide-react";

export default function Discover() {
  return (
    <section className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-300">
          <Compass size={18} />
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">
            Discover
          </p>

          <h2 className="mt-1 text-2xl font-bold text-white">
            Learn Something New
          </h2>
        </div>

      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-300">
            <BookOpen size={18} />
          </div>

          <div>
            <h3 className="font-semibold text-white">
              Tiny AI Lesson
            </h3>

            <p className="text-sm text-slate-400">
              Neural networks learn patterns instead of rules.
            </p>
          </div>

        </div>

        <button className="mt-5 flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-medium text-white transition hover:bg-cyan-400">

          Read More

          <ArrowRight size={18} />

        </button>

      </div>

    </section>
  );
}