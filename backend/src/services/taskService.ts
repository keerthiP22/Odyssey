import { db } from "../prisma/db.js";

export async function createTask(
  userId: number,
  title: string,
  priority = 0,
  dueDate?: string
) {
  return db.orm.public.Task.create({
    userId,
    title,
    priority,
    completed: false,
    dueDate,
  });
}

export async function getUserTasks(userId: number) {
  return db.orm.public.Task
    .where((task) => task.userId.eq(userId))
    .all();
}

export async function completeTask(
  userId: number,
  taskId: number
) {
  return setTaskCompleted(userId, taskId, true);
}

export async function setTaskCompleted(
  userId: number,
  taskId: number,
  completed: boolean
) {
  const task = await db.orm.public.Task
    .where((task) => task.id.eq(taskId))
    .first();

  if (!task) {
    throw new Error("Task not found.");
  }

  if (task.userId !== userId) {
    throw new Error("Task does not belong to this user.");
  }

  return db.orm.public.Task
    .where((task) => task.id.eq(taskId))
    .update({
      completed,
    });
}

export async function deleteTask(
  userId: number,
  taskId: number
) {
  const task = await db.orm.public.Task
    .where((task) => task.id.eq(taskId))
    .first();

  if (!task) {
    throw new Error("Task not found.");
  }

  if (task.userId !== userId) {
    throw new Error("Task does not belong to this user.");
  }

  return db.orm.public.Task
    .where((task) => task.id.eq(taskId))
    .delete();
}