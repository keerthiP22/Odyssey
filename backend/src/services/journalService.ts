import { db } from "../prisma/db.js";

export async function createJournalEntry(
  userId: number,
  content: string
) {
  return db.orm.public.JournalEntry.create({
    userId,
    content,
  });
}

export async function getUserJournalEntries(userId: number) {
  return db.orm.public.JournalEntry
    .where((entry) => entry.userId.eq(userId))
    .all();
}