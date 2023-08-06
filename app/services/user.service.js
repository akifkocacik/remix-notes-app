import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

export async function findUser(username) {
  const user = await db.user.findFirst({
    where: {
      username,
    },
  });
  return user;
}

export async function createUser({ username, password }) {
  await db.user.create({
    data: {
      username,
      password,
    },
  });
}
