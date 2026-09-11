import { db } from "./prisma/db.js";

async function testDatabase() {
  const users = await db.orm.public.User
    .select("id", "email", "name")
    .all();

  console.log("Users in database:");
  console.log(users);
}

testDatabase()
  .catch((error) => {
    console.error("Database test failed:");
    console.error(error);
  })
  .finally(async () => {
    await db.close();
  });