import { db } from "./prisma/db.js";
import { getDevelopmentUser } from "./services/userService.js";
import {
  createJournalEntry,
  getUserJournalEntries,
} from "./services/journalService.js";

async function testJournal() {
  const user = await getDevelopmentUser();

  console.log("Using user:", user.id);

  await createJournalEntry(
    user.id,
    "Today I want to make real progress on Odyssey instead of getting stuck polishing small things."
  );

  await createJournalEntry(
    user.id,
    "I need to stay focused on the MVP and avoid adding unnecessary features."
  );

  const entries = await getUserJournalEntries(user.id);

  console.log("\nJournal entries:");
  console.log(entries);
}

testJournal()
  .catch((error) => {
    console.error("Journal test failed:", error);
  })
  .finally(async () => {
    await db.close();
  });