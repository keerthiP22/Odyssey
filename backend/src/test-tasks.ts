import { db } from "./prisma/db.js";
import { getDevelopmentUser } from "./services/userService.js";
import {
  createTask,
  getUserTasks,
} from "./services/taskService.js";

async function testTasks() {
  const user = await getDevelopmentUser();

  console.log("Using user:", user.id);

  await createTask(
    user.id,
    "Finish Odyssey backend",
    3
  );

  await createTask(
    user.id,
    "Study DSA",
    1
  );

  await createTask(
    user.id,
    "Work on AI/ML project",
    2
  );

  const tasks = await getUserTasks(user.id);

  console.log("\nTasks:");
  console.log(tasks);
}

testTasks()
  .catch((error) => {
    console.error("Task test failed:");
    console.error(error);
  })
  .finally(async () => {
    await db.close();
  });