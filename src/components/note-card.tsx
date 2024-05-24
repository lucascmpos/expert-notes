import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Trash2, X } from "lucide-react";

interface NoteCardProps {
  note: {
    id: string;
    date: Date;
    content: string;
  };
  onNoteDeleted: (id: string) => void;
}

export function NoteCard({ note, onNoteDeleted }: NoteCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md text-left flex flex-col bg-slate-800 p-5 gap-3 overflow-hidden hover:ring-2 hover:ring-slate-600 relative focus-visible:ring-2 outline-none focus-visible:ring-purple-700">
        <span className="text-sm font-medium text-slate-200">
          {formatDistanceToNow(note.date, {
            locale: ptBR,
            addSuffix: true,
          })}
        </span>
        <p className="text-sm leading-6 text-slate-400">{note.content}</p>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none " />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className="fixed overflow-hidden md:left-1/2 md:top-1/2 md:inset-auto inset-0 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[80vw] md:h-[60vh] w-full bg-slate-700 rounded-md flex flex-col outline-none">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-900">
            <X />
          </Dialog.Close>
          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-sm font-medium text-slate-200">
              {formatDistanceToNow(note.date, {
                locale: ptBR,
                addSuffix: true,
              })}
            </span>
            <p className="text-sm leading-6 text-slate-400">{note.content}</p>
          </div>

          <button
            type="button"
            onClick={() => onNoteDeleted(note.id)}
            className="w-full flex flex-row items-center gap-3 justify-center font-medium bg-slate-800 py-4 text-center text-sm text-slate-300 hover:bg-slate-900 outline-none group"
          >
            <Trash2 className="group-hover:text-red-500" size={25} />
            <div className="text-lg flex flex-row gap-1">
              <span className="text-red-500 ">Apagar</span>
              nota
            </div>
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
