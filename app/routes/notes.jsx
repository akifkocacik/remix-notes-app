import NewNote, { links as newNoteLinks } from '~/components/NewNote';

import { redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import NoteList, { links as noteListLinks } from '../components/NoteList';
import { getCurrentUser } from '../session.server';

import { unauthorizedRedirect } from '../utils';
import { getNotes, addNote, deleteNote } from '../services/note.service';

export default function NotesPage() {
  const notes = useLoaderData();

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export async function loader({ request }) {
  const currentUser = await getCurrentUser(request);
  if (!currentUser) unauthorizedRedirect(request);
  const notes = await getNotes();
  return notes;
}

export async function action({ request }) {
  const formData = await request.formData();
  const intent = await formData.get('intent');

  if (intent === 'add') {
    const noteData = Object.fromEntries(formData);
    // Add validation
    await addNote({
      title: noteData.title,
      content: noteData.content,
    });
    return redirect('/notes');
  } else if (intent === 'delete') {
    const noteId = await formData.get('noteId');
    await deleteNote({ id: parseInt(noteId) });
    return redirect('/notes');
  } else {
    return null;
  }
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}
