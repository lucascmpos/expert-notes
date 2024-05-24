import { useEffect, useState } from "react";
import logo from "./assets/logo.svg";
import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";

interface Note {
  id: string;
  date: Date;
  content: string;
}

export function App() {
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const notesOnStorage = localStorage.getItem("notes");
    if (notesOnStorage) {
      const parsedNotes = JSON.parse(notesOnStorage);
      const notesWithDates = parsedNotes.map((note: any) => ({
        ...note,
        date: new Date(note.date),
      }));
      setNotes(notesWithDates);
    }
  }, []);

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    };

    const notesArray = [newNote, ...notes];

    setNotes(notesArray);

    localStorage.setItem("notes", JSON.stringify(notesArray));
  }
  return (
    <div className="mx-auto max-w-6xl md:p-5 sm:p-3 lg:p-0 my-12 space-y-4">
      <img src={logo} alt="NLW expert" />
      <form className="w-full">
        <input
          className="w-full outline-none bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500"
          type="text"
          placeholder="Busque em suas notas..."
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated} />
        {notes.map((note) => {
          return <NoteCard key={note.id} note={note} />;
        })}
      </div>
    </div>
  );
}
