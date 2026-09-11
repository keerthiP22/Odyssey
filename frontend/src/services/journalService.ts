import { API_URL } from "./api";

export type JournalEntry = {
  id: number;
  content: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

export async function getJournalEntries(): Promise<JournalEntry[]> {
  const response = await fetch(`${API_URL}/api/journal`);

  if (!response.ok) {
    throw new Error("Could not load journal entries.");
  }

  const data = await response.json();
  return data.entries;
}

export async function createJournalEntry(
  content: string
): Promise<JournalEntry> {
  const response = await fetch(`${API_URL}/api/journal`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    throw new Error("Could not create journal entry.");
  }

  const data = await response.json();
  return data.entry;
}