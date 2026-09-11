import { db } from "../prisma/db.js";

export async function createGoal(
  userId: number,
  title: string,
  description?: string
) {
  return db.orm.public.Goal.create({
    userId,
    title,
    description,
    completed: false,
  });
}

export async function getUserGoals(userId: number) {
  return db.orm.public.Goal
    .where((goal) => goal.userId.eq(userId))
    .all();
}

export async function setGoalCompleted(
  userId: number,
  goalId: number,
  completed: boolean
) {
  const goal = await db.orm.public.Goal
    .where((goal) => goal.id.eq(goalId))
    .first();

  if (!goal) {
    throw new Error("Goal not found.");
  }

  if (goal.userId !== userId) {
    throw new Error("Goal does not belong to this user.");
  }

  return db.orm.public.Goal
    .where((goal) => goal.id.eq(goalId))
    .update({ completed });
}