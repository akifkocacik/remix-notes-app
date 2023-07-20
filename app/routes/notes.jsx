import NewNote, { links as newNoteLinks } from '~/components/NewNote';
import { getStoredNotes, storeNotes } from '~/data/notes';
import { redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import NoteList, { links as noteListLinks } from '../components/NoteList';
import { getCurrentUser } from '../session.server';
import { deleteNote } from '../data/notes';
import { unauthorizedRedirect } from '../utils';

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
  const notes = await getStoredNotes();
  return notes;
}

export async function action({ request }) {
  const formData = await request.formData();
  const intent = await formData.get('intent');

  if (intent === 'add') {
    const noteData = Object.fromEntries(formData);
    // Add validation
    const existingNotes = await getStoredNotes();
    noteData.id = new Date().toISOString();
    const updatedNotes = existingNotes.concat(noteData);
    await storeNotes(updatedNotes);
    return redirect('/notes');
  } else if (intent === 'delete') {
    const noteId = await formData.get('noteId');
    await deleteNote(noteId);
    return redirect('/notes');
  } else {
    return null;
  }
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}
