import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

export async function getNotes() {
  const notes = await db.note.findMany();
  return notes;
}

export async function addNote({ title, content }) {
  await db.note.create({
    data: {
      title,
      content,
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
