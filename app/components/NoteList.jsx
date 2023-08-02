import styles from './NoteList.css';

function NoteList({ notes }) {
  return (
    <ul id="note-list">
      {notes.map((note, index) => (
        <li key={note.id} className="note">
          <article>
            <header>
              <ul className="note-meta">
                <li>#{index + 1}</li>
                <li>
                  <time dateTime={note.id}>{note.createdAt}</time>
                </li>
              </ul>
              <h2>{note.title}</h2>
            </header>
            <p>{note.content}</p>
            <form method="post">
              <input type="hidden" name="intent" value="delete" />
              <input type="hidden" name="noteId" value={note.id} />
              <button>Delete Note</button>
            </form>
          </article>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
