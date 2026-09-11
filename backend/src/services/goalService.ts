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