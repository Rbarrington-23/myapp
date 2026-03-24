function NoteList({ notes, deleteNote }) {

  return (

    <ul>

      {notes.map(note => (

        <li key={note.id}>
          {note.text}

          <button onClick={() => deleteNote(note.id)}>
            Delete
          </button>

        </li>

      ))}

    </ul>

  );

}

export default NoteList;