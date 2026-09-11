import { BookOpen, Send } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";

import {
  createJournalEntry,
  getJournalEntries,
  type JournalEntry,
} from "@/services/journalService";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEntries() {
      try {
        setError("");
        const loadedEntries = await getJournalEntries();
        setEntries(
          [...loadedEntries].sort(
            (first, second) =>
              new Date(second.createdAt).getTime() -
              new Date(first.createdAt).getTime()
          )
        );
      } catch (loadError) {
        console.error("Could not load journal entries:", loadError);
        setError(
          "Could not load your journal. Make sure the Odyssey backend is running."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadEntries();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedContent = content.trim();

    if (!trimmedContent || isSaving) {
      return;
    }

    try {
      setError("");
      setIsSaving(true);
      const entry = await createJournalEntry(trimmedContent);
      setEntries((current) => [entry, ...current]);
      setContent("");
    } catch (saveError) {
      console.error("Could not create journal entry:", saveError);
      setError("Could not save that entry.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-5 pb-6">
      <section className="relative overflow-hidden rounded-[26px] border border-white/[0.07] bg-[#141927] px-6 py-6 shadow-[0_18px_55px_rgba(0,0,0,0.16)] sm:px-8 sm:py-7">
        <div className="pointer-events-none absolute right-8 top-7 text-[13px] text-violet-300/25">
          ✦
        </div>
        <div className="relative">
          <div className="flex items-center gap-2">
            <BookOpen size={14} strokeWidth={1.8} className="text-violet-300" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-violet-300/80">
              Reflection
            </p>
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#F2F0F2] sm:text-[40px]">
            Journal
          </h1>
          <p className="mt-1.5 text-sm text-[#929AB2]">
            Put the day somewhere outside your head.
          </p>
        </div>
      </section>

      {error && (
        <div className="rounded-xl border border-red-300/10 bg-red-400/[0.04] px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <section className="rounded-[24px] border border-white/[0.07] bg-[#141927] px-5 py-5 sm:px-7">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-300/75">
          New entry
        </p>
        <h2 className="mt-1.5 text-xl font-semibold tracking-[-0.025em] text-[#F2F0F2]">
          What is present for you today?
        </h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Write a few honest lines..."
            aria-label="Journal entry"
            rows={5}
            className="w-full resize-y rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-[#626C82] focus:border-violet-300/25 focus:bg-white/[0.04]"
          />
          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              disabled={isSaving || !content.trim()}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 text-sm font-medium text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send size={15} />
              {isSaving ? "Saving..." : "Save entry"}
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-[24px] border border-white/[0.07] bg-[#121624] px-5 py-5 sm:px-7 sm:py-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-300/75">
          Recent entries
        </p>
        <div className="mt-5 space-y-2.5">
          {isLoading ? (
            <div className="rounded-xl border border-white/[0.06] px-5 py-10 text-center text-sm text-[#69738A]">
              Loading your journal...
            </div>
          ) : entries.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/[0.08] px-5 py-10 text-center">
              <BookOpen size={22} className="mx-auto text-[#626C82]" />
              <p className="mt-3 text-sm font-medium text-[#AEB5C6]">
                Your journal is waiting.
              </p>
              <p className="mt-1 text-xs text-[#626C82]">
                Start with one sentence.
              </p>
            </div>
          ) : (
            entries.map((entry) => (
              <article
                key={entry.id}
                className="rounded-xl border border-white/[0.06] bg-white/[0.018] px-4 py-4"
              >
                <p className="whitespace-pre-wrap text-sm leading-6 text-[#D9DCE5]">
                  {entry.content}
                </p>
                <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-[#626C82]">
                  {formatDate(entry.createdAt)}
                </p>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}