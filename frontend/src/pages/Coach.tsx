import { Send, Sparkle } from "lucide-react";
import type { FormEvent, KeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";

const API_URL = "http://localhost:5001";

interface Message {
  id: number;
  role: "user" | "jarvis";
  content: string;
}

const SUGGESTIONS = [
  "What should I focus on today?",
  "Help me plan my day",
  "Show me what needs attention",
  "Add something to my tasks",
];

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 5) return "Still up, Keerthi.";
  if (hour < 12) return "Good morning, Keerthi.";
  if (hour < 17) return "Good afternoon, Keerthi.";
  if (hour < 21) return "Good evening, Keerthi.";

  return "Winding down, Keerthi.";
}

export default function Coach() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);

  const scrollAnchorRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  /*
   * Load the saved JARVIS conversation from PostgreSQL
   * when the page opens.
   */
  useEffect(() => {
    let isMounted = true;

    async function loadMessages() {
      try {
        const response = await fetch(
          `${API_URL}/api/jarvis/messages`
        );

        if (!response.ok) {
          throw new Error("Could not load JARVIS history.");
        }

        const data = await response.json();

        if (!isMounted) {
          return;
        }

        if (
          Array.isArray(data.messages) &&
          data.messages.length > 0
        ) {
          const loadedMessages: Message[] = data.messages.map(
            (item: {
              id: number;
              role: string;
              content: string;
            }) => ({
              id: item.id,
              role:
                item.role === "user"
                  ? "user"
                  : "jarvis",
              content: item.content,
            })
          );

          setMessages(loadedMessages);
        } else {
          setMessages([
            {
              id: 1,
              role: "jarvis",
              content: `${getGreeting()} I'm here whenever you want to think something through, plan your day, or just check in.`,
            },
          ]);
        }
      } catch (error) {
        console.error(
          "JARVIS history loading error:",
          error
        );

        if (isMounted) {
          setMessages([
            {
              id: 1,
              role: "jarvis",
              content: `${getGreeting()} I'm here whenever you want to think something through, plan your day, or just check in.`,
            },
          ]);
        }
      } finally {
        if (isMounted) {
          setIsHistoryLoading(false);
        }
      }
    }

    loadMessages();

    return () => {
      isMounted = false;
    };
  }, []);

  /*
   * Keep the latest message visible.
   */
  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isLoading]);

  const sendMessage = async (rawMessage: string) => {
    const trimmedMessage = rawMessage.trim();

    if (!trimmedMessage || isLoading) {
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: trimmedMessage,
    };

    setMessages((current) => [
      ...current,
      userMessage,
    ]);

    setMessage("");
    setIsLoading(true);

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
      console.error(
        "JARVIS frontend error:",
        error
      );

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
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    sendMessage(message);
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      sendMessage(message);
    }
  };

  const handleSuggestion = (
    suggestion: string
  ) => {
    sendMessage(suggestion);

    textareaRef.current?.focus();
  };

  const showSuggestions =
    !isHistoryLoading &&
    messages.length <= 1;

  const lastMessage =
    messages[messages.length - 1];

  const loadingIsGroupStart =
    !lastMessage ||
    lastMessage.role !== "jarvis";

  return (
    <div className="flex h-[calc(100dvh-236px)] min-h-[480px] flex-col sm:h-[calc(100dvh-200px)]">
      {/* Identity strip */}
      <div className="mb-4 flex shrink-0 items-center gap-3">
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
          <span className="absolute inset-0 animate-pulse rounded-full bg-violet-400/15 blur-md" />

          <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04]">
            <Sparkle
              size={15}
              strokeWidth={1.6}
              className="text-violet-200"
            />
          </span>
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-violet-300/80">
            JARVIS
          </p>

          <p className="truncate text-xs text-[#69738A]">
            Quietly here whenever you need to think something through.
          </p>
        </div>
      </div>

      {/* Chat card */}
      <div className="glass flex min-h-0 flex-1 flex-col rounded-[28px]">
        {/* Messages */}
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
          <div>
            {isHistoryLoading ? (
              <div className="flex items-end gap-2.5">
                <span className="mb-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04]">
                  <Sparkle
                    size={11}
                    strokeWidth={1.6}
                    className="text-violet-200/80"
                  />
                </span>

                <div className="flex items-center gap-1.5 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-3.5">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-300/70 [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-300/70 [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-300/70" />
                </div>
              </div>
            ) : (
              <>
                {messages.map((item, index) => {
                  const previous =
                    messages[index - 1];

                  const isGroupStart =
                    !previous ||
                    previous.role !== item.role;

                  return (
                    <div
                      key={item.id}
                      className={`flex items-end gap-2.5 ${
                        item.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      } ${
                        index === 0
                          ? ""
                          : isGroupStart
                            ? "mt-4"
                            : "mt-1.5"
                      }`}
                    >
                      {item.role === "jarvis" &&
                        (isGroupStart ? (
                          <span className="mb-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04]">
                            <Sparkle
                              size={11}
                              strokeWidth={1.6}
                              className="text-violet-200/80"
                            />
                          </span>
                        ) : (
                          <span
                            aria-hidden="true"
                            className="h-6 w-6 shrink-0"
                          />
                        ))}

                      <div
                        className={`max-w-[78%] rounded-2xl px-4 py-3 text-[15px] leading-6 sm:max-w-[65%] ${
                          item.role === "user"
                            ? "bg-violet-500/90 text-white"
                            : "border border-white/[0.06] bg-white/[0.03] text-[#D9DCE5]"
                        }`}
                      >
                        {item.content}
                      </div>
                    </div>
                  );
                })}

                {isLoading && (
                  <div
                    className={`flex items-end gap-2.5 ${
                      messages.length === 0
                        ? ""
                        : loadingIsGroupStart
                          ? "mt-4"
                          : "mt-1.5"
                    }`}
                  >
                    {loadingIsGroupStart ? (
                      <span className="mb-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04]">
                        <Sparkle
                          size={11}
                          strokeWidth={1.6}
                          className="text-violet-200/80"
                        />
                      </span>
                    ) : (
                      <span
                        aria-hidden="true"
                        className="h-6 w-6 shrink-0"
                      />
                    )}

                    <div className="flex items-center gap-1.5 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-3.5">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-300/70 [animation-delay:-0.3s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-300/70 [animation-delay:-0.15s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-300/70" />
                    </div>
                  </div>
                )}
              </>
            )}

            <div ref={scrollAnchorRef} />
          </div>
        </div>

        {/* Suggestion chips */}
        {showSuggestions && (
          <div className="shrink-0 border-t border-white/[0.06] px-4 py-3 sm:px-6">
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() =>
                    handleSuggestion(suggestion)
                  }
                  disabled={isLoading}
                  className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3.5 py-2 text-xs font-medium text-[#AEB5C6] transition-colors hover:border-violet-300/25 hover:bg-violet-400/[0.06] hover:text-violet-200 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Composer */}
        <form
          onSubmit={handleSubmit}
          className="shrink-0 border-t border-white/[0.06] px-3 py-3 sm:px-4 sm:py-4"
        >
          <div className="flex items-end gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.025] px-3.5 py-2.5 transition-colors focus-within:border-violet-300/30 focus-within:bg-white/[0.04]">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Talk to JARVIS..."
              aria-label="Message JARVIS"
              rows={1}
              disabled={isLoading}
              className="max-h-32 min-h-9 flex-1 resize-none bg-transparent py-1 text-sm text-white outline-none placeholder:text-[#626C82] disabled:opacity-60"
            />

            <button
              type="submit"
              disabled={
                !message.trim() || isLoading
              }
              aria-label="Send message"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500 text-white transition-colors hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send
                size={15}
                strokeWidth={2}
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}