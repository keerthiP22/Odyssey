import {
  ArrowRight,
  Check,
  Clock3,
  Lightbulb,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface MorningSudokuProps {
  onClose: () => void;
}

type CellValue = number | null;

type CellPosition = {
  row: number;
  col: number;
};

const SOLUTION: number[][] = [
  [1, 2, 3, 4],
  [3, 4, 1, 2],
  [2, 1, 4, 3],
  [4, 3, 2, 1],
];

/*
 * Hard-coded puzzle.
 *
 * . = empty
 *
 * 1 . . 4
 * . 4 1 .
 * 2 . 4 .
 * . 3 . 1
 *
 * There are exactly 8 empty cells.
 *
 * The puzzle has one valid solution:
 *
 * 1 2 3 4
 * 3 4 1 2
 * 2 1 4 3
 * 4 3 2 1
 */
const INITIAL_PUZZLE: CellValue[][] = [
  [1, null, null, 4],
  [null, 4, 1, null],
  [2, null, 4, null],
  [null, 3, null, 1],
];

const REGION_SIZE = 2;
const GRID_SIZE = 4;
const MAX_HINTS = 2;

function isGivenCell(row: number, col: number) {
  return INITIAL_PUZZLE[row][col] !== null;
}

function isSameCell(
  first: CellPosition | null,
  second: CellPosition
) {
  return (
    first?.row === second.row &&
    first?.col === second.col
  );
}

export default function MorningSudoku({
  onClose,
}: MorningSudokuProps) {
  const [board, setBoard] =
    useState<CellValue[][]>(() =>
      INITIAL_PUZZLE.map((row) => [...row])
    );

  const [selectedCell, setSelectedCell] =
    useState<CellPosition | null>(null);

  const [hintsUsed, setHintsUsed] = useState(0);

  const [hintedCells, setHintedCells] = useState<
    CellPosition[]
  >([]);

  const [incorrectCells, setIncorrectCells] = useState<
    CellPosition[]
  >([]);

  const [feedback, setFeedback] = useState("");

  const [completed, setCompleted] = useState(false);

  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const filledCount = useMemo(() => {
    return board.reduce(
      (total, row) =>
        total +
        row.filter((value) => value !== null).length,
      0
    );
  }, [board]);

  const emptyCellCount =
    INITIAL_PUZZLE.flat().filter(
      (value) => value === null
    ).length;

  const playerFilledCells =
    filledCount -
    INITIAL_PUZZLE.flat().filter(
      (value) => value !== null
    ).length;

  const progress = Math.min(
    playerFilledCells,
    emptyCellCount
  );

  useEffect(() => {
    if (completed) {
      return;
    }

    const timer = window.setInterval(() => {
      setElapsedSeconds((current) => current + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [completed]);

  useEffect(() => {
    if (!feedback) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setFeedback("");
    }, 2600);

    return () => window.clearTimeout(timeout);
  }, [feedback]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remaining = seconds % 60;

    return `${minutes}:${String(remaining).padStart(2, "0")}`;
  };

  const isIncorrectCell = (row: number, col: number) => {
    return incorrectCells.some(
      (cell) =>
        cell.row === row && cell.col === col
    );
  };

  const isHintedCell = (row: number, col: number) => {
    return hintedCells.some(
      (cell) =>
        cell.row === row && cell.col === col
    );
  };

  const selectCell = (row: number, col: number) => {
    if (completed) {
      return;
    }

    if (isGivenCell(row, col)) {
      setSelectedCell(null);
      return;
    }

    if (isHintedCell(row, col)) {
      setSelectedCell({
        row,
        col,
      });
      return;
    }

    setSelectedCell({
      row,
      col,
    });

    setFeedback("");
    setIncorrectCells([]);
  };

  const selectNumber = (number: number) => {
    if (!selectedCell || completed) {
      return;
    }

    const { row, col } = selectedCell;

    if (isGivenCell(row, col)) {
      return;
    }

    if (isHintedCell(row, col)) {
      return;
    }

    setBoard((current) => {
      const next = current.map((line) => [...line]);

      next[row][col] = number;

      return next;
    });

    setIncorrectCells([]);
    setFeedback("");
  };

  const clearSelectedCell = () => {
    if (!selectedCell || completed) {
      return;
    }

    const { row, col } = selectedCell;

    if (isGivenCell(row, col)) {
      return;
    }

    if (isHintedCell(row, col)) {
      return;
    }

    setBoard((current) => {
      const next = current.map((line) => [...line]);

      next[row][col] = null;

      return next;
    });

    setIncorrectCells([]);
    setFeedback("");
  };

  const checkPuzzle = () => {
    if (completed) {
      return;
    }

    const emptyCells: CellPosition[] = [];
    const wrongCells: CellPosition[] = [];

    for (let row = 0; row < GRID_SIZE; row += 1) {
      for (let col = 0; col < GRID_SIZE; col += 1) {
        const value = board[row][col];

        if (value === null) {
          emptyCells.push({ row, col });
          continue;
        }

        if (value !== SOLUTION[row][col]) {
          wrongCells.push({ row, col });
        }
      }
    }

    if (emptyCells.length > 0) {
      setIncorrectCells(wrongCells);
      setFeedback(
        "You're almost there. A few cells are still empty."
      );
      return;
    }

    if (wrongCells.length > 0) {
      setIncorrectCells(wrongCells);
      setFeedback(
        "Not quite. Look at the pattern."
      );
      return;
    }

    setIncorrectCells([]);
    setSelectedCell(null);
    setFeedback("");
    setCompleted(true);
  };

  const requestHint = () => {
    if (completed || hintsUsed >= MAX_HINTS) {
      return;
    }

    const emptyCells: CellPosition[] = [];

    for (let row = 0; row < GRID_SIZE; row += 1) {
      for (let col = 0; col < GRID_SIZE; col += 1) {
        if (
          board[row][col] === null &&
          !isHintedCell(row, col)
        ) {
          emptyCells.push({
            row,
            col,
          });
        }
      }
    }

    if (emptyCells.length === 0) {
      return;
    }

    const cellToReveal = emptyCells[0];

    setBoard((current) => {
      const next = current.map((line) => [...line]);

      next[cellToReveal.row][cellToReveal.col] =
        SOLUTION[cellToReveal.row][cellToReveal.col];

      return next;
    });

    setHintedCells((current) => [
      ...current,
      cellToReveal,
    ]);

    setHintsUsed((current) => current + 1);

    setSelectedCell(cellToReveal);
    setIncorrectCells([]);
    setFeedback("Here's a little nudge.");
  };

  const numberOptions = [1, 2, 3, 4];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#070b18]/90 px-2 py-2 backdrop-blur-md sm:px-6 sm:py-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="morning-sudoku-title"
    >
      <div
        className="relative flex h-full max-h-[100dvh] w-full max-w-[620px] flex-col overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#111625] shadow-[0_30px_100px_rgba(0,0,0,0.45)] sm:h-auto sm:max-h-[calc(100vh-32px)] sm:rounded-[26px]"
        style={{
          paddingBottom:
            "env(safe-area-inset-bottom)",
        }}
      >
        {/* Header */}
        <div className="flex shrink-0 items-start justify-between gap-3 px-4 pb-3 pt-[calc(14px+env(safe-area-inset-top))] sm:px-7 sm:pb-4 sm:pt-6">
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
              id="morning-sudoku-title"
              className="mt-1 text-2xl font-semibold tracking-[-0.035em] text-[#F2F0F2]"
            >
              Morning Sudoku
            </h1>

            <p className="mt-1 text-xs leading-5 text-[#8F98AE] sm:text-sm">
              Let's wake up your logic.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Morning Sudoku"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-[#9CA5BA] transition hover:border-white/[0.12] hover:bg-white/[0.05] hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {!completed ? (
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            {/* Status */}
            <div className="mx-4 flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5 sm:mx-7 sm:px-4 sm:py-3">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#69738A]">
                  Puzzle progress
                </p>

                <p className="mt-0.5 text-sm font-semibold text-[#D9DCE5]">
                  {progress} / {emptyCellCount} cells
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-1.5 text-[10px] text-[#69738A] sm:flex">
                  <Clock3 size={11} />
                  {formatTime(elapsedSeconds)}
                </div>

                <div className="rounded-full bg-violet-400/[0.08] px-2.5 py-1 text-[10px] font-medium text-violet-200/75">
                  {hintsUsed} / {MAX_HINTS} hints
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="px-4 pt-3 sm:px-7">
              <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-violet-400/75 transition-all duration-200"
                  style={{
                    width: `${
                      (progress / emptyCellCount) * 100
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* Personality + hint */}
            <div className="flex items-center justify-between gap-3 px-4 pt-3 sm:px-7">
              <p className="min-h-5 text-xs text-[#858EA4]">
                {feedback || "Take your time."}
              </p>

              <button
                type="button"
                onClick={requestHint}
                disabled={hintsUsed >= MAX_HINTS}
                className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-lg border border-violet-300/10 bg-violet-400/[0.045] px-3 text-xs font-medium text-violet-200/80 transition hover:border-violet-300/20 hover:bg-violet-400/[0.08] disabled:cursor-default disabled:opacity-35"
              >
                <Lightbulb size={13} />
                Hint
              </button>
            </div>

            {/* Sudoku board */}
            <div className="px-4 pb-2 pt-4 sm:px-7 sm:pt-5">
              <div className="mx-auto w-full max-w-[360px]">
                <div
                  className="grid aspect-square w-full grid-cols-4 overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0D1321] shadow-[0_18px_55px_rgba(0,0,0,0.18)]"
                  role="grid"
                  aria-label="Morning Sudoku puzzle"
                >
                  {board.map((row, rowIndex) =>
                    row.map((value, colIndex) => {
                      const given = isGivenCell(
                        rowIndex,
                        colIndex
                      );

                      const selected = isSameCell(
                        selectedCell,
                        {
                          row: rowIndex,
                          col: colIndex,
                        }
                      );

                      const incorrect =
                        isIncorrectCell(
                          rowIndex,
                          colIndex
                        );

                      const hinted = isHintedCell(
                        rowIndex,
                        colIndex
                      );

                      const thickRight =
                        colIndex === REGION_SIZE - 1;

                      const thickBottom =
                        rowIndex === REGION_SIZE - 1;

                      return (
                        <button
                          key={`${rowIndex}-${colIndex}`}
                          type="button"
                          role="gridcell"
                          aria-label={
                            value === null
                              ? `Empty cell, row ${
                                  rowIndex + 1
                                }, column ${
                                  colIndex + 1
                                }`
                              : `Number ${value}, row ${
                                  rowIndex + 1
                                }, column ${
                                  colIndex + 1
                                }`
                          }
                          aria-selected={selected}
                          onClick={() =>
                            selectCell(
                              rowIndex,
                              colIndex
                            )
                          }
                          className={`relative flex aspect-square min-h-11 min-w-11 items-center justify-center text-xl font-semibold transition-colors duration-150 sm:text-2xl ${
                            thickRight
                              ? "border-r-2 border-r-[#59627A]/45"
                              : ""
                          } ${
                            thickBottom
                              ? "border-b-2 border-b-[#59627A]/45"
                              : ""
                          } ${
                            !thickRight &&
                            colIndex < GRID_SIZE - 1
                              ? "border-r border-r-white/[0.06]"
                              : ""
                          } ${
                            !thickBottom &&
                            rowIndex < GRID_SIZE - 1
                              ? "border-b border-b-white/[0.06]"
                              : ""
                          } ${
                            given
                              ? "cursor-default bg-[#171D2C] text-[#E2E4EB]"
                              : hinted
                                ? "bg-violet-400/[0.08] text-violet-200"
                                : incorrect
                                  ? "bg-orange-400/[0.08] text-orange-200"
                                  : selected
                                    ? "bg-violet-400/[0.14] text-white shadow-[inset_0_0_0_1px_rgba(167,139,250,0.35)]"
                                    : "bg-[#121927] text-violet-100/90 hover:bg-[#182033] active:bg-violet-400/[0.10]"
                          }`}
                        >
                          {value}

                          {hinted && (
                            <span
                              aria-hidden="true"
                              className="absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-violet-300/65"
                            />
                          )}
                        </button>
                      );
                    })
                  )}
                </div>

                <p className="mt-2 text-center text-[10px] leading-4 text-[#626C82]">
                  Select an empty cell, then choose a number.
                </p>
              </div>
            </div>

            {/* Number pad */}
            <div className="px-4 pt-2 sm:px-7">
              <p className="mb-2 text-center text-[9px] font-semibold uppercase tracking-[0.25em] text-[#626C82]">
                Choose a number
              </p>

              <div className="mx-auto grid max-w-[360px] grid-cols-4 gap-2">
                {numberOptions.map((number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() =>
                      selectNumber(number)
                    }
                    disabled={
                      !selectedCell ||
                      completed ||
                      isGivenCell(
                        selectedCell?.row ?? -1,
                        selectedCell?.col ?? -1
                      ) ||
                      isHintedCell(
                        selectedCell?.row ?? -1,
                        selectedCell?.col ?? -1
                      )
                    }
                    className="flex min-h-11 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-lg font-semibold text-[#D7DBE5] transition hover:border-violet-300/20 hover:bg-violet-400/[0.07] hover:text-white active:scale-[0.98] disabled:cursor-default disabled:opacity-35"
                  >
                    {number}
                  </button>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-2 px-4 pb-4 pt-3 sm:px-7">
              <button
                type="button"
                onClick={clearSelectedCell}
                disabled={
                  !selectedCell ||
                  isGivenCell(
                    selectedCell?.row ?? -1,
                    selectedCell?.col ?? -1
                  ) ||
                  isHintedCell(
                    selectedCell?.row ?? -1,
                    selectedCell?.col ?? -1
                  )
                }
                className="inline-flex min-h-11 min-w-[76px] items-center justify-center rounded-lg px-4 text-sm font-medium text-[#7E879B] transition hover:bg-white/[0.04] hover:text-[#C6CAD5] disabled:cursor-default disabled:opacity-30"
              >
                Clear
              </button>

              <button
                type="button"
                onClick={checkPuzzle}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-violet-500 px-4 text-sm font-medium text-white transition hover:bg-violet-400 active:bg-violet-400"
              >
                Check Puzzle
                <Check size={14} />
              </button>
            </div>

            {/* Hint note */}
            <div className="border-t border-white/[0.055] px-4 py-3 text-center sm:px-7">
              <p className="text-[10px] leading-4 text-[#626C82]">
                JARVIS can reveal up to two numbers if you need
                a little help.
              </p>
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
              <Check
                size={22}
                strokeWidth={2}
              />
            </div>

            <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-300/75">
              Complete
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#F2F0F2]">
              Perfect. Your brain is warmed up.
            </h2>

            <p className="mt-2 text-sm text-[#929AB2]">
              Ready for today's mission?
            </p>

            <div className="mt-4 flex items-center gap-4 text-[11px] text-[#6E778D]">
              <span>
                Time: {formatTime(elapsedSeconds)}
              </span>

              <span>
                Hints used: {hintsUsed}
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