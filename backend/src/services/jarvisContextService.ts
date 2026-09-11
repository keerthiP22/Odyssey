import { getUserTasks } from "./taskService.js";
import { getUserGoals } from "./goalService.js";
import { getUserJournalEntries } from "./journalService.js";

export async function getJarvisContext(userId: number) {
  const [tasks, goals, journalEntries] = await Promise.all([
    getUserTasks(userId),
    getUserGoals(userId),
    getUserJournalEntries(userId),
  ]);

  const incompleteTasks = tasks.filter(
    (task) => !task.completed
  );

  const incompleteGoals = goals.filter(
    (goal) => !goal.completed
  );

  const recentJournalEntries = journalEntries.slice(-5);

  return {
    tasks: incompleteTasks,
    goals: incompleteGoals,
    journalEntries: recentJournalEntries,
  };
}