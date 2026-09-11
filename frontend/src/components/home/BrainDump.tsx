import { Brain, Trash2 } from "lucide-react";
import { useState } from "react";

export default function BrainDump() {
  const [text, setText] = useState("");

  return (
    <section className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-300">
          <Brain size={18} />
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">
            Brain Dump
          </p>

          <h2 className="mt-1 text-2xl font-bold text-white">
            Empty Your Mind
          </h2>
        </div>

      </div>

      <p className="mt-4 text-slate-400">
        Write everything that's on your mind before you begin.
      </p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's distracting you today?"
        className="mt-5 h-48 w-full resize-none rounded-2xl border border-white/10 bg-black/20 p-4 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400"
      />

      <div className="mt-5 flex justify-end">

        <button
          onClick={() => setText("")}
          className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-slate-300 transition hover:bg-white/10"
        >
          <Trash2 size={16} />
          Clear
        </button>

      </div>

    </section>
  );
}