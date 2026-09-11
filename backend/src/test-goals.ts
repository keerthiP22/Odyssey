import { db } from "./prisma/db.js";
import { getDevelopmentUser } from "./services/userService.js";
import {
  createGoal,
  getUserGoals,
} from "./services/goalService.js";

async function testGoals() {
  const user = await getDevelopmentUser();

  console.log("Using user:", user.id);

  await createGoal(
    user.id,
    "Build Odyssey",
    "Turn Odyssey into my personal operating system."
  );

  await createGoal(
    user.id,
    "Get an AI/ML internship",
    "Build projects and apply for internships."
  );

  const goals = await getUserGoals(user.id);

  console.log("\nGoals:");
  console.log(goals);
}

testGoals()
  .catch((error) => {
    console.error("Goal test failed:");
    console.error(error);
  })
  .finally(async () => {
    await db.close();
  });