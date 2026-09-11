import { getDevelopmentUser } from "./services/userService.js";
import { db } from "./prisma/db.js";

async function testUser() {
  const user = await getDevelopmentUser();

  console.log("Development user:");
  console.log(user);
}

testUser()
  .catch((error) => {
    console.error("User test failed:");
    console.error(error);
  })
  .finally(async () => {
    await db.close();
  });