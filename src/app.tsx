import { ChangeEvent, useEffect, useState } from "react";
import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";
import { toast } from "sonner";
import { Notebook } from "lucide-react";

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

  function onNoteDeleted(id: string) {
    const notesArray = notes.filter((note) => {
      return note.id !== id;
    });

    setNotes(notesArray);

    localStorage.setItem("notes", JSON.stringify(notesArray));

    toast.success("Nota deletada!");
  }

  function onNoteEdited(id: string, updatedContent: string) {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, content: updatedContent, date: new Date() };
      }
      return note;
    });

    setNotes(updatedNotes);

    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;

    setSearch(query);
  }

  const filteredNotes =
    search !== ""
      ? notes.filter((note) =>
          note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : notes;

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-5 lg:px-0 my-12 space-y-4">
      <h1 className="font-bold italic flex flex-row items-center justify-center gap-1 text-xl text-slate-500">
        <Notebook className="mt-1" size={20} /> expert notes
      </h1>
      <form className="w-full">
        <input
          className="w-full outline-none bg-transparent text-2xl font-semibold tracking-tight placeholder:text-slate-600"
          type="text"
          placeholder="Busque suas notas..."
          onChange={handleSearch}
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated} />
        {filteredNotes.map((note) => {
          return (
            <NoteCard
              key={note.id}
              note={note}
              onNoteDeleted={onNoteDeleted}
              onNoteEdited={onNoteEdited}
            />
          );
        })}
      </div>
    </div>
  );
}
