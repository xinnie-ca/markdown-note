import React from "react";
import Sidebar from "./components/Sidebar.jsx";
import Editor from "./components/Editor.jsx";
import Split from "react-split";
import {
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db, notesCollection } from "./firebase.js";

export default function App() {
  const [notes, setNotes] = React.useState([]);
  const [currentNoteId, setCurrentNoteId] = React.useState("");
  const currentNote =
    notes.find((note) => note.id === currentNoteId) || notes[0];
  const sorted_notes = notes.sort((a, b) => b.updatedAt - a.updatedAt);

  const cursorRef = React.useRef({ start: 0, end: 0 });

  // sync to firebase
  React.useEffect(() => {
    const unsubscribe = onSnapshot(notesCollection, function (snapshot) {
      //sync notes with snapshot data
      const notesArr = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setNotes(notesArr);
    });
    return unsubscribe;
  }, []);

  // Handle the empty currentNoteId after refresh
  React.useEffect(() => {
    if (!currentNoteId) {
      setCurrentNoteId(notes[0]?.id);
    }
    const textarea = document.querySelector(".mde-text");
    console.log(textarea);
    if (textarea) {
      textarea.selectionStart = cursorRef.current.start;
      textarea.selectionEnd = cursorRef.current.end;
      textarea.focus(); // Ensure the textarea is focused
    }
  }, [notes]);

  async function createNewNote() {
    const newNote = {
      body: "# Type your markdown note's title here",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
    const newNoteref = await addDoc(notesCollection, newNote);
    setCurrentNoteId(newNoteref.id);
  }

  async function updateNote(text) {
    const textarea = document.querySelector(".mde-text"); // Select textarea
    console.log(textarea);
    if (textarea) {
      cursorRef.current.start = textarea.selectionStart;
      cursorRef.current.end = textarea.selectionEnd;
    }

    const docRef = doc(db, "notes", currentNoteId);
    await setDoc(
      docRef,
      { body: text, updatedAt: Timestamp.now() },
      { merge: true }
    );
  }

  async function deleteNote(noteId) {
    const docRef = doc(db, "notes", noteId);
    await deleteDoc(docRef);
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={sorted_notes}
            currentNote={currentNote}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />

          <Editor currentNote={currentNote} updateNote={updateNote} />
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}
