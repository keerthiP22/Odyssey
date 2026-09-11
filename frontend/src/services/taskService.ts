import { API_URL } from "./api";

export type Task = {
  id: number;
  title: string;
  completed: boolean;
  priority: number;
  dueDate: string | null;
  userId: number;
  createdAt: string;
  updatedAt: string;
};


// ------------------------------------
// GET TASKS
// ------------------------------------

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(
    `${API_URL}/api/tasks`
  );

  if (!response.ok) {
    throw new Error("Could not load tasks.");
  }

  const data = await response.json();

  return data.tasks;
}


// ------------------------------------
// CREATE TASK
// ------------------------------------

export async function createTask(
  title: string,
  priority = 0,
  dueDate?: string
): Promise<Task> {
  const response = await fetch(
    `${API_URL}/api/tasks`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        priority,
        dueDate,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Could not create task.");
  }

  const data = await response.json();

  return data.task;
}


// ------------------------------------
// COMPLETE / UNCOMPLETE TASK
// ------------------------------------

export async function setTaskCompleted(
  taskId: number,
  completed: boolean
): Promise<Task> {
  const response = await fetch(
    `${API_URL}/api/tasks/${taskId}/complete`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Could not update task.");
  }

  const data = await response.json();

  return data.task;
}


// ------------------------------------
// DELETE TASK
// ------------------------------------

export async function deleteTask(
  taskId: number
): Promise<void> {
  const response = await fetch(
    `${API_URL}/api/tasks/${taskId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Could not delete task.");
  }
}