import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export interface Habit {
  id: number;
  title: string;
  streak: string;
  done: boolean;
}

interface HabitContextType {
  habits: Habit[];
  toggleHabit: (id: number) => void;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

// Same seed data HabitPreview used to hold locally.
const initialHabits: Habit[] = [
  { id: 1, title: "Drink Water", streak: "18 days", done: true },
  { id: 2, title: "Morning Workout", streak: "9 days", done: true },
  { id: 3, title: "Read 20 Minutes", streak: "4 days", done: false },
  { id: 4, title: "Journal", streak: "12 days", done: true },
];

export function HabitProvider({ children }: { children: ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);

  function toggleHabit(id: number) {
    setHabits((prev) =>
      prev.map((habit) => (habit.id === id ? { ...habit, done: !habit.done } : habit))
    );
  }

  return (
    <HabitContext.Provider value={{ habits, toggleHabit }}>{children}</HabitContext.Provider>
  );
}

export function useHabits(): HabitContextType {
  const ctx = useContext(HabitContext);
  if (!ctx) {
    throw new Error("useHabits must be used inside a HabitProvider");
  }
  return ctx;
}
