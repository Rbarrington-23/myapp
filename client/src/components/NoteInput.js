import { useState } from "react";

function NoteInput({ addNote }) {

  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text) return;

    addNote(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Write a note..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button type="submit">Add Note</button>

    </form>
  );
}

export default NoteInput;