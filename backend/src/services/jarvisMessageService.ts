import { db } from "../prisma/db.js";

type MessageRole = "user" | "jarvis";

export async function saveJarvisMessage(
  userId: number,
  role: MessageRole,
  content: string
) {
  return db.orm.public.JarvisMessage.create({
    userId,
    role,
    content,
  });
}

export async function getJarvisMessages(userId: number) {
  return db.orm.public.JarvisMessage
    .where((message) =>
      message.userId.eq(userId)
    )
    .orderBy((message) =>
      message.createdAt.asc()
    )
    .all();
}