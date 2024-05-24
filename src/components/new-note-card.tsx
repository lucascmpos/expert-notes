import * as Dialog from "@radix-ui/react-dialog";
import { CirclePlus, Keyboard, Mic, X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void;
}

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
  const [shouldShownOnboarding, setShouldShownOnboarding] = useState(true);
  const [content, setContent] = useState("");

  function handleStartWriting() {
    setShouldShownOnboarding(false);
  }

  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
    if (event.target.value === "") {
      setShouldShownOnboarding(true);
    }
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault();

    onNoteCreated(content);

    setContent("");
    setShouldShownOnboarding(true);

    toast.success("Nota adicionada com sucesso!");
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md flex flex-col  bg-slate-700 p-5 gap-3 text-left ">
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto
          automaticamente.
        </p>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className="fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[80vw] h-[60vh] w-full bg-slate-700 rounded-md flex flex-col outline-none">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-900">
            <X />
          </Dialog.Close>
          <form onSubmit={handleSaveNote} className="flex-1 flex flex-col">
            <span className="text-sm ml-5 mt-6  font-medium text-slate-200">
              Adicionar nota
            </span>
            {shouldShownOnboarding ? (
              <div className="flex flex-1 flex-col justify-center items-center  gap-5 p-5">
                <button className="text-sm font-semibold leading-6 rounded-xl py-5 hover:bg-purple-900 text-slate-100 flex flex-row bg-purple-700 w-3/4 items-center gap-2 justify-center">
                  <Mic />
                  Grave uma nota em áudio que será convertida para texto
                </button>
                <button
                  onClick={handleStartWriting}
                  className="text-sm font-semibold leading-6 rounded-xl py-5  hover:bg-slate-300    text-slate-900 flex flex-row bg-slate-100  w-3/4 items-center gap-2 justify-center"
                >
                  <Keyboard />
                  Escrever nota
                </button>
              </div>
            ) : (
              <div className="flex flex-1 flex-col gap-5 p-5">
                <textarea
                  autoFocus
                  className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                  onChange={handleContentChanged}
                  value={content}
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full  flex flex-row items-center gap-3 justify-center font-medium bg-slate-800 py-4 text-center text-sm text-slate-300 hover:bg-slate-900 outline-none group"
            >
              <CirclePlus className="group-hover:text-purple-700" size={25} />

              <div className="text-lg flex i flex-row gap-1">
                <span className="text-purple-700 ">Adicionar</span>
                nota
              </div>
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
