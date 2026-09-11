import { useState } from "react";
import type { FormEvent } from "react";
import { API_URL } from "@/services/api";

interface Message {
  id: number;
  role: "user" | "jarvis";
  content: string;
}

export default function Coach() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "jarvis",
      content:
        "Good to see you. I'm JARVIS, your AI companion inside Odyssey. What's on your mind?",
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const sendMessage = async (event: FormEvent) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading) {
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: trimmedMessage,
    };

    setMessages((current) => [...current, userMessage]);
    setMessage("");
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/jarvis/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: trimmedMessage,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("JARVIS request failed");
      }

      const data = await response.json();

      const jarvisMessage: Message = {
        id: Date.now() + 1,
        role: "jarvis",
        content: data.reply,
      };

      setMessages((current) => [
        ...current,
        jarvisMessage,
      ]);
    } catch (error) {
      console.error("JARVIS frontend error:", error);

      const errorMessage: Message = {
        id: Date.now() + 1,
        role: "jarvis",
        content:
          "I couldn't reach my backend right now. Make sure the Odyssey backend is running.",
      };

      setMessages((current) => [
        ...current,
        errorMessage,
      ]);
      setError("JARVIS is temporarily unavailable.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl pb-24">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-300">
          JARVIS
        </p>

        <h1 className="mt-2 text-3xl font-bold text-white">
          Your AI companion
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Talk to JARVIS about your day, goals, or anything
          you're trying to figure out.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-300/10 bg-red-400/[0.04] px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <div className="min-h-[420px] space-y-4">
          {messages.map((item) => (
            <div
              key={item.id}
              className={`flex ${
                item.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  item.role === "user"
                    ? "bg-violet-600 text-white"
                    : "border border-white/10 bg-white/5 text-slate-200"
                }`}
              >
                {item.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-400">
                JARVIS is thinking...
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={sendMessage}
          className="mt-5 flex gap-3"
        >
          <input
            value={message}
            onChange={(event) =>
              setMessage(event.target.value)
            }
            placeholder="Ask JARVIS something..."
            disabled={isLoading}
            className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-violet-400/50"
          />

          <button
            type="submit"
            disabled={!message.trim() || isLoading}
            className="rounded-2xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}