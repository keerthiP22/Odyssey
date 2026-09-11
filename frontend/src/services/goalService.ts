import { API_URL } from "./api";

export type Goal = {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

export async function getGoals(): Promise<Goal[]> {
  const response = await fetch(`${API_URL}/api/goals`);

  if (!response.ok) {
    throw new Error("Could not load goals.");
  }

  const data = await response.json();
  return data.goals;
}

export async function createGoal(
  title: string,
  description?: string
): Promise<Goal> {
  const response = await fetch(`${API_URL}/api/goals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });

  if (!response.ok) {
    throw new Error("Could not create goal.");
  }

  const data = await response.json();
  return data.goal;
}

export async function setGoalCompleted(
  goalId: number,
  completed: boolean
): Promise<Goal> {
  const response = await fetch(`${API_URL}/api/goals/${goalId}/complete`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed }),
  });

  if (!response.ok) {
    throw new Error("Could not update goal.");
  }

  const data = await response.json();
  return data.goal;
}