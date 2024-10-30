import React from "react";

export default function Sidebar(props) {
  function timeConverter(note) {
    const date = note.updatedAt.toDate();
    const formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

    return `Last updated: ${formattedDate}`;
  }

  const noteElements = props.notes.map((note, index) => (
    <div key={note.id}>
      <div
        className={`title ${
          note.id === props.currentNote.id ? "selected-note" : ""
        }`}
        onClick={() => props.setCurrentNoteId(note.id)}
      >
        <div className="sidbar-display">
          <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
          <h6 className="text-snippet-time">{timeConverter(note)}</h6>
        </div>
        <button
          className="delete-btn"
          onClick={(event) => props.deleteNote(note.id)}
        >
          <i className="gg-trash trash-icon"></i>
        </button>
      </div>
      <hr />
    </div>
  ));

  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>Notes</h3>
        <button className="new-note" onClick={props.newNote}>
          +
        </button>
      </div>
      {noteElements}
    </section>
  );
}
