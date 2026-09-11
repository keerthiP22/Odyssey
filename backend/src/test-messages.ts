import { db } from "./prisma/db.js";
import { getDevelopmentUser } from "./services/userService.js";
import {
  saveJarvisMessage,
  getJarvisMessages,
} from "./services/jarvisMessageService.js";

async function testMessages() {
  // Get our development user
  const user = await getDevelopmentUser();

  console.log("Using user:");
  console.log(user);

  // Save a user message
  await saveJarvisMessage(
    user.id,
    "user",
    "I need to finish my Odyssey MVP."
  );

  // Save a JARVIS reply
  await saveJarvisMessage(
    user.id,
    "jarvis",
    "Okay. Let's focus on the MVP first."
  );

  // Read the conversation back
  const messages = await getJarvisMessages(user.id);

  console.log("\nConversation:");
  console.log(messages);
}

testMessages()
  .catch((error) => {
    console.error("Message test failed:");
    console.error(error);
  })
  .finally(async () => {
    await db.close();
  });