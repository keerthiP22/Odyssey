import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export interface Task {
  id: number;
  time: string;
  title: string;
  tag: string;
  completed: boolean;
}

interface PlannerContextType {
  tasks: Task[];
  toggleTask: (id: number) => void;
  addTask: (task: Omit<Task, "id">) => void;
}

const PlannerContext = createContext<PlannerContextType | undefined>(undefined);

// Same seed data PlannerPreview used to hold locally — now the single
// source of truth instead of being trapped inside one component.
const initialTasks: Task[] = [
  { id: 1, time: "09:00", title: "Morning Workout", tag: "Health", completed: true },
  { id: 2, time: "11:00", title: "Continue Odyssey", tag: "Project", completed: false },
  { id: 3, time: "14:00", title: "Practice DSA", tag: "Study", completed: false },
  { id: 4, time: "18:00", title: "Dance Practice", tag: "Personal", completed: false },
];

export function PlannerProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  function toggleTask(id: number) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  }

  function addTask(task: Omit<Task, "id">) {
    setTasks((prev) => {
      const nextId = prev.reduce((max, t) => Math.max(max, t.id), 0) + 1;
      return [...prev, { ...task, id: nextId }];
    });
  }

  return (
    <PlannerContext.Provider value={{ tasks, toggleTask, addTask }}>
      {children}
    </PlannerContext.Provider>
  );
}

export function usePlanner(): PlannerContextType {
  const ctx = useContext(PlannerContext);
  if (!ctx) {
    throw new Error("usePlanner must be used inside a PlannerProvider");
  }
  return ctx;
}
