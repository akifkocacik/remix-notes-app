import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

export async function getNotes() {
  const notes = await db.note.findMany();
  return notes;
}

export async function getNotesByUsername(username) {
  const notes = await db.note.findMany({
    where: {
      user: {
        username,
      },
    },
  });
  return notes;
}

export async function addNote({ title, content, username }) {
  await db.note.create({
    data: {
      title,
      content,
      user: {
        connect: {
          username,
        },
      },
    },
  });
}

export async function deleteNote({ id }) {
  await db.note.delete({
    where: {
      id,
    },
  });
}
