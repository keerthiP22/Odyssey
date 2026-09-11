import { db } from "../prisma/db.js";

const DEVELOPMENT_USER_EMAIL = "dev@odyssey.local";

export async function getDevelopmentUser() {
  const existingUser = await db.orm.public.User
    .where((user) =>
      user.email.eq(DEVELOPMENT_USER_EMAIL)
    )
    .first();

  if (existingUser) {
    return existingUser;
  }

  const newUser = await db.orm.public.User.create({
    email: DEVELOPMENT_USER_EMAIL,
    name: "Keerthi",
  });

  return newUser;
}