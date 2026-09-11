import {
  ArrowRight,
  Check,
  Clock3,
  Lightbulb,
  Sparkles,
  X,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface WordHuntProps {
  onClose: () => void;
}

type Cell = {
  row: number;
  col: number;
};

type Clue = {
  id: string;
  word: string;
  text: string;
  hint1: string;
  direction: string;
};

const GRID = [
  ["S", "T", "A", "R", "T", "C"],
  ["F", "A", "L", "M", "P", "A"],
  ["X", "O", "E", "I", "N", "L"],
  ["T", "C", "C", "V", "B", "M"],
  ["C", "D", "U", "U", "O", "O"],
  ["A", "N", "C", "O", "S", "M"],
];

const CLUES: Clue[] = [
  {
    id: "start",
    word: "START",
    text: "What you do before beginning something.",
    hint1: "It means to begin or set something in motion.",
    direction: "5 letters • starts with S • horizontal",
  },
  {
    id: "calm",
    word: "CALM",
    text: "A state slow, intentional breathing can create.",
    hint1: "It is the feeling you are trying to create when you slow down.",
    direction: "4 letters • starts with C • vertical",
  },
  {
    id: "move",
    word: "MOVE",
    text: "Physical activity that wakes your body.",
    hint1: "Your body does this when it stops being still.",
    direction: "4 letters • starts with M • diagonal",
  },
  {
    id: "act",
    word: "ACT",
    text: "The opposite of hesitation.",
    hint1: "Instead of waiting, you decide to do this.",
    direction: "3 letters • starts with A • vertical",
  },
  {
    id: "focus",
    word: "FOCUS",
    text: "Where your attention should go.",
    hint1: "It helps you ignore distractions.",
    direction: "5 letters • starts with F • diagonal",
  },
];

const WORD_PATHS: Record<string, Cell[]> = {
  start: [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 },
    { row: 0, col: 3 },
    { row: 0, col: 4 },
  ],

  calm: [
    { row: 0, col: 5 },
    { row: 1, col: 5 },
    { row: 2, col: 5 },
    { row: 3, col: 5 },
  ],

  move: [
    { row: 5, col: 5 },
    { row: 4, col: 4 },
    { row: 3, col: 3 },
    { row: 2, col: 2 },
  ],

  act: [
    { row: 5, col: 0 },
    { row: 4, col: 0 },
    { row: 3, col: 0 },
  ],

  focus: [
    { row: 1, col: 0 },
    { row: 2, col: 1 },
    { row: 3, col: 2 },
    { row: 4, col: 3 },
    { row: 5, col: 4 },
  ],
};

function cellsEqual(a: Cell, b: Cell) {
  return a.row === b.row && a.col === b.col;
}

function areAdjacent(a: Cell, b: Cell) {
  return (
    Math.abs(a.row - b.row) <= 1 &&
    Math.abs(a.col - b.col) <= 1 &&
    !cellsEqual(a, b)
  );
}

function pathContains(path: Cell[], cell: Cell) {
  return path.some((item) => cellsEqual(item, cell));
}

function cellKey(cell: Cell) {
  return `${cell.row}-${cell.col}`;
}

export default function WordHunt({ onClose }: WordHuntProps) {
  const [selectedCells, setSelectedCells] = useState<Cell[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [activeClueId, setActiveClueId] = useState<string>("start");
  const [hintsUsed, setHintsUsed] = useState<Record<string, number>>({});
  const [revealedWords, setRevealedWords] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const activePointerId = useRef<number | null>(null);

  const completed = foundWords.length === CLUES.length;

  const activeClue = useMemo(
    () => CLUES.find((clue) => clue.id === activeClueId) ?? CLUES[0],
    [activeClueId]
  );

  const currentWord = selectedCells
    .map((cell) => GRID[cell.row][cell.col])
    .join("");

  const currentWordSpaced = selectedCells
    .map((cell) => GRID[cell.row][cell.col])
    .join(" ");

  useEffect(() => {
    if (completed) return;

    const timer = window.setInterval(() => {
      setElapsedSeconds((value) => value + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [completed]);

  useEffect(() => {
    if (!feedback) return;

    const timeout = window.setTimeout(() => {
      setFeedback("");
    }, 2200);

    return () => window.clearTimeout(timeout);
  }, [feedback]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  /*
   * Add a cell to the current path.
   *
   * This is shared by:
   * - tap selection
   * - touch dragging
   * - mouse dragging
   * - trackpad interaction
   *
   * It intentionally only allows adjacent, non-repeated cells.
   */
  const addCellToSelection = useCallback((cell: Cell) => {
    if (completed) return;

    setFeedback("");

    setSelectedCells((current) => {
      if (current.length === 0) {
        return [cell];
      }

      const lastCell = current[current.length - 1];

      if (cellsEqual(lastCell, cell)) {
        return current;
      }

      if (!areAdjacent(lastCell, cell)) {
        return current;
      }

      if (pathContains(current, cell)) {
        return current;
      }

      return [...current, cell];
    });
  }, [completed]);

  /*
   * Start a pointer interaction.
   *
   * We deliberately do not use pointer capture here.
   * The document-level pointermove handler below needs to know
   * which grid cell is physically underneath the finger/cursor.
   */
  const handlePointerDown = (
    event: React.PointerEvent<HTMLButtonElement>,
    cell: Cell
  ) => {
    if (completed) return;

    event.preventDefault();

    activePointerId.current = event.pointerId;
    setIsDragging(true);

    addCellToSelection(cell);
  };

  /*
   * During a drag, find the grid cell underneath the pointer.
   *
   * This is more reliable for touch than depending only on
   * mouse-style hover/enter events.
   */
  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (event: PointerEvent) => {
      if (activePointerId.current !== event.pointerId) {
        return;
      }

      event.preventDefault();

      const element = document.elementFromPoint(
        event.clientX,
        event.clientY
      );

      const cellElement =
        element?.closest<HTMLElement>(
          "[data-word-hunt-cell]"
        );

      if (!cellElement) {
        return;
      }

      const row = Number(cellElement.dataset.row);
      const col = Number(cellElement.dataset.col);

      if (!Number.isInteger(row) || !Number.isInteger(col)) {
        return;
      }

      addCellToSelection({ row, col });
    };

    const finishPointer = (event: PointerEvent) => {
      if (activePointerId.current !== event.pointerId) {
        return;
      }

      activePointerId.current = null;
      setIsDragging(false);
    };

    document.addEventListener(
      "pointermove",
      handlePointerMove,
      { passive: false }
    );

    document.addEventListener(
      "pointerup",
      finishPointer
    );

    document.addEventListener(
      "pointercancel",
      finishPointer
    );

    return () => {
      document.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      document.removeEventListener(
        "pointerup",
        finishPointer
      );

      document.removeEventListener(
        "pointercancel",
        finishPointer
      );
    };
  }, [isDragging, addCellToSelection]);

  /*
   * Accessible tap fallback.
   *
   * A normal tap builds the same progressive path:
   *
   * F → O → C → U → S
   *
   * Invalid/non-adjacent cells are ignored.
   */
  const handleCellClick = (cell: Cell) => {
    if (isDragging) return;

    addCellToSelection(cell);
  };

  const clearSelection = () => {
    setSelectedCells([]);
    setFeedback("");
  };

  const checkWord = () => {
    if (selectedCells.length === 0) return;

    const selected = currentWord.toUpperCase();

    const matchingClue = CLUES.find(
      (clue) =>
        clue.word === selected &&
        !foundWords.includes(clue.id)
    );

    if (!matchingClue) {
      setFeedback("Not quite. Look again.");
      setSelectedCells([]);
      return;
    }

    setFoundWords((current) => {
      if (current.includes(matchingClue.id)) {
        return current;
      }

      return [...current, matchingClue.id];
    });

    setSelectedCells([]);

    const newFoundCount = foundWords.length + 1;

    if (newFoundCount === CLUES.length) {
      setFeedback("");
      return;
    }

    if ((hintsUsed[matchingClue.id] ?? 0) > 0) {
      setFeedback("Sometimes a nudge is all you need.");
    } else if (foundWords.length === 0) {
      setFeedback("Good. Stay with it.");
    } else if (newFoundCount === 3) {
      setFeedback("You're getting into the rhythm.");
    } else {
      setFeedback("Good. Stay with it.");
    }

    const nextClue = CLUES.find(
      (clue) =>
        clue.id !== matchingClue.id &&
        !foundWords.includes(clue.id)
    );

    if (nextClue) {
      setActiveClueId(nextClue.id);
    }
  };

  const requestHint = (clue: Clue) => {
    if (foundWords.includes(clue.id)) return;

    const currentHint = hintsUsed[clue.id] ?? 0;

    if (currentHint >= 3) return;

    const nextHint = currentHint + 1;

    setHintsUsed((current) => ({
      ...current,
      [clue.id]: nextHint,
    }));

    if (nextHint === 3) {
      setRevealedWords((current) =>
        current.includes(clue.id)
          ? current
          : [...current, clue.id]
      );
    }

    setActiveClueId(clue.id);
    setFeedback("Here's a little nudge.");
  };

  const isFoundCell = (cell: Cell) =>
    foundWords.some((wordId) =>
      pathContains(WORD_PATHS[wordId], cell)
    );

  const isRevealedCell = (cell: Cell) =>
    revealedWords.some((wordId) =>
      pathContains(WORD_PATHS[wordId], cell)
    );

  const isSelectedCell = (cell: Cell) =>
    pathContains(selectedCells, cell);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#070b18]/90 px-2 py-2 backdrop-blur-md sm:px-6 sm:py-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="word-hunt-title"
    >
      <div
        className="relative flex h-full max-h-[100dvh] w-full max-w-[760px] flex-col overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#111625] shadow-[0_30px_100px_rgba(0,0,0,0.45)] sm:h-auto sm:max-h-[calc(100vh-32px)] sm:rounded-[26px]"
        style={{
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        {/* Header */}
        <div className="flex shrink-0 items-start justify-between gap-3 px-4 pb-3 pt-[calc(14px+env(safe-area-inset-top))] sm:px-7 sm:pb-3 sm:pt-6">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <Sparkles
                size={14}
                strokeWidth={1.8}
                className="text-violet-300"
              />

              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-violet-300/80">
                JARVIS
              </p>
            </div>

            <h1
              id="word-hunt-title"
              className="mt-1 text-2xl font-semibold tracking-[-0.035em] text-[#F2F0F2]"
            >
              Word Hunt
            </h1>

            <p className="mt-1 max-w-[280px] text-xs leading-5 text-[#8F98AE] sm:text-sm">
              Let's wake up your pattern recognition.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Word Hunt"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-[#9CA5BA] transition hover:border-white/[0.12] hover:bg-white/[0.05] hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {!completed ? (
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            {/* Theme + progress */}
            <div className="mx-4 flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5 sm:mx-7 sm:px-4 sm:py-3">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#69738A]">
                  Theme
                </p>

                <p className="mt-0.5 text-sm font-medium text-[#D9DCE5]">
                  Start Strong
                </p>
              </div>

              <div className="text-right">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-violet-300/60">
                  Found
                </p>

                <p className="mt-0.5 text-sm font-semibold text-[#E4E1F1]">
                  {foundWords.length} / {CLUES.length}
                </p>
              </div>
            </div>

            {/* Compact current clue */}
            <div className="px-4 pt-3 sm:px-7">
              <div className="rounded-xl border border-violet-300/[0.08] bg-violet-400/[0.025] px-3.5 py-2.5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-violet-300/60">
                    Clue
                  </p>

                  <div className="flex shrink-0 items-center gap-1 text-[10px] text-[#626C82]">
                    <Clock3 size={11} />
                    {formatTime(elapsedSeconds)}
                  </div>
                </div>

                <p className="mt-1 text-sm leading-5 text-[#C1C6D3]">
                  {activeClue.text}
                </p>

                <button
                  type="button"
                  onClick={() => requestHint(activeClue)}
                  disabled={
                    foundWords.includes(activeClue.id) ||
                    (hintsUsed[activeClue.id] ?? 0) >= 3
                  }
                  className="mt-2 inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-violet-300/10 bg-violet-400/[0.045] px-2.5 text-[11px] font-medium text-violet-200/80 transition hover:border-violet-300/20 hover:bg-violet-400/[0.08] disabled:cursor-default disabled:opacity-40"
                >
                  <Lightbulb size={12} />

                  {(hintsUsed[activeClue.id] ?? 0) > 0
                    ? `Hint ${hintsUsed[activeClue.id]}`
                    : "Hint"}
                </button>

                {(hintsUsed[activeClue.id] ?? 0) > 0 && (
                  <div className="mt-2 text-[11px] leading-4 text-violet-200/65">
                    {hintsUsed[activeClue.id] === 1 &&
                      activeClue.hint1}

                    {hintsUsed[activeClue.id] === 2 &&
                      activeClue.direction}

                    {hintsUsed[activeClue.id] === 3 && (
                      <span className="font-semibold tracking-[0.12em] text-violet-200">
                        {activeClue.word}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Progress + current word */}
            <div className="px-4 pt-3 sm:px-7">
              <div className="flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#69738A]">
                    Current word
                  </p>

                  <div
                    aria-live="polite"
                    className="mt-1 min-h-[25px] truncate text-base font-semibold tracking-[0.13em] text-[#EEEAF7] sm:text-lg"
                  >
                    {currentWordSpaced || "Select letters"}
                  </div>

                  <div className="mt-0.5 min-h-[18px] text-xs font-medium tracking-[0.18em] text-violet-200/75">
                    {currentWord || "—"}
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-violet-300/60">
                    Found
                  </p>

                  <p className="mt-0.5 text-sm font-semibold text-[#E4E1F1]">
                    {foundWords.length} / {CLUES.length}
                  </p>
                </div>
              </div>

              {feedback && (
                <p
                  aria-live="polite"
                  className="mt-1.5 text-xs font-medium text-violet-200/75"
                >
                  {feedback}
                </p>
              )}
            </div>

            {/* Grid */}
            <div className="px-4 pb-1 pt-3 sm:px-7">
              <div className="mx-auto w-full max-w-[360px]">
                <div
                  className="relative aspect-square w-full select-none"
                  style={{
                    touchAction: "none",
                  }}
                >
                  {/* Connecting path */}
                  {selectedCells.length > 1 && (
                    <svg
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
                      viewBox="0 0 600 600"
                      preserveAspectRatio="none"
                    >
                      {selectedCells.slice(1).map(
                        (cell, index) => {
                          const previous =
                            selectedCells[index];

                          const x1 =
                            ((previous.col + 0.5) / 6) *
                            600;
                          const y1 =
                            ((previous.row + 0.5) / 6) *
                            600;
                          const x2 =
                            ((cell.col + 0.5) / 6) *
                            600;
                          const y2 =
                            ((cell.row + 0.5) / 6) *
                            600;

                          return (
                            <line
                              key={`${cellKey(
                                previous
                              )}-${cellKey(cell)}`}
                              x1={x1}
                              y1={y1}
                              x2={x2}
                              y2={y2}
                              stroke="rgba(167,139,250,0.58)"
                              strokeWidth="9"
                              strokeLinecap="round"
                            />
                          );
                        }
                      )}
                    </svg>
                  )}

                  <div
                    className="relative z-20 grid h-full w-full grid-cols-6 gap-1.5 sm:gap-2"
                    role="grid"
                    aria-label="Word Hunt letter grid"
                  >
                    {GRID.map((row, rowIndex) =>
                      row.map((letter, colIndex) => {
                        const cell = {
                          row: rowIndex,
                          col: colIndex,
                        };

                        const selected =
                          isSelectedCell(cell);
                        const found =
                          isFoundCell(cell);
                        const revealed =
                          isRevealedCell(cell);

                        return (
                          <button
                            key={`${rowIndex}-${colIndex}`}
                            type="button"
                            role="gridcell"
                            data-word-hunt-cell
                            data-row={rowIndex}
                            data-col={colIndex}
                            aria-label={`Row ${
                              rowIndex + 1
                            }, column ${
                              colIndex + 1
                            }, letter ${letter}`}
                            onPointerDown={(event) =>
                              handlePointerDown(
                                event,
                                cell
                              )
                            }
                            onClick={() =>
                              handleCellClick(cell)
                            }
                            className={`relative flex aspect-square min-h-0 min-w-0 items-center justify-center rounded-lg border text-lg font-semibold transition-all duration-100 touch-none select-none sm:rounded-xl sm:text-xl ${
                              selected
                                ? "z-30 scale-[1.035] border-violet-300/80 bg-violet-400/30 text-white shadow-[0_0_0_2px_rgba(167,139,250,0.18),0_8px_22px_rgba(124,92,220,0.2)]"
                                : found
                                  ? "border-violet-300/15 bg-violet-400/[0.11] text-violet-200"
                                  : revealed
                                    ? "border-violet-300/30 bg-violet-300/[0.07] text-violet-200"
                                    : "border-white/[0.055] bg-[#171D2D] text-[#B5BDCE] hover:border-white/[0.12] hover:bg-[#1B2234] hover:text-white active:scale-[0.97]"
                            }`}
                          >
                            {letter}

                            {found && (
                              <span
                                aria-hidden="true"
                                className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-violet-300/70"
                              />
                            )}

                            {revealed && !found && (
                              <span
                                aria-hidden="true"
                                className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-violet-300/45"
                              />
                            )}
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>

                <p className="mt-2 text-center text-[10px] leading-4 text-[#626C82]">
                  Drag across connected letters, or tap them one
                  at a time.
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-2 px-4 pb-3 pt-2 sm:px-7">
              <button
                type="button"
                onClick={clearSelection}
                disabled={selectedCells.length === 0}
                className="inline-flex min-h-11 min-w-[76px] items-center justify-center rounded-lg px-4 text-sm font-medium text-[#7E879B] transition hover:bg-white/[0.04] hover:text-[#C6CAD5] active:bg-white/[0.06] disabled:cursor-default disabled:opacity-35"
              >
                Clear
              </button>

              <button
                type="button"
                onClick={checkWord}
                disabled={selectedCells.length === 0}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-violet-500 px-4 text-sm font-medium text-white transition hover:bg-violet-400 active:bg-violet-400 disabled:cursor-default disabled:bg-violet-500/25 disabled:text-violet-100/40"
              >
                Check Word
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Found words */}
            <div className="border-t border-white/[0.055] px-4 py-3.5 sm:px-7">
              <div className="flex flex-wrap items-center gap-2">
                <p className="mr-1 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#69738A]">
                  Found
                </p>

                {foundWords.length === 0 ? (
                  <span className="text-xs text-[#5F687D]">
                    Your discoveries will appear here.
                  </span>
                ) : (
                  foundWords.map((wordId) => {
                    const clue = CLUES.find(
                      (item) => item.id === wordId
                    );

                    return (
                      <span
                        key={wordId}
                        className="inline-flex items-center gap-1 rounded-full bg-violet-400/[0.08] px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-violet-200/80"
                      >
                        <Check size={10} />
                        {clue?.word}
                      </span>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Completion */
          <div
            className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center sm:px-10 sm:py-14"
            style={{
              paddingBottom:
                "calc(2.5rem + env(safe-area-inset-bottom))",
            }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-400/[0.10] text-violet-200">
              <Check size={22} strokeWidth={2} />
            </div>

            <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-300/75">
              {foundWords.length} / {CLUES.length} Found
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#F2F0F2]">
              Nice. Your mind is awake.
            </h2>

            <p className="mt-2 text-sm text-[#929AB2]">
              Ready for today's mission?
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-1 text-[11px] text-[#6E778D]">
              <span>
                Time: {formatTime(elapsedSeconds)}
              </span>

              <span>
                Hints used:{" "}
                {Object.values(hintsUsed).reduce(
                  (total, count) => total + count,
                  0
                )}
              </span>
            </div>

            <div className="mt-7 flex flex-col-reverse items-center gap-2 sm:flex-row">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/[0.07] px-4 text-sm font-medium text-[#8992A7] transition hover:bg-white/[0.04] hover:text-[#D7DAE3]"
              >
                Close
              </button>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-violet-500 px-4 text-sm font-medium text-white transition hover:bg-violet-400"
              >
                Continue to Mission
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}