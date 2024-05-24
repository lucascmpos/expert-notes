import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CheckCheck, Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface NoteCardProps {
  note: {
    id: string;
    date: Date;
    content: string;
  };
  onNoteDeleted: (id: string) => void;
  onNoteEdited: (id: string, updatedContent: string) => void;
}

export function NoteCard({ note, onNoteDeleted, onNoteEdited }: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(note.content);

  function handleSaveEdit() {
    onNoteEdited(note.id, updatedContent);
    setIsEditing(false);
    toast.success("Nota editada com sucesso!");
  }

  return (
    <Dialog.Root open={isEditing} onOpenChange={setIsEditing}>
      <Dialog.Trigger className="rounded-md text-left flex flex-col bg-slate-800 p-5 gap-3 overflow-hidden hover:ring-2 hover:ring-slate-600 relative focus-visible:ring-2 outline-none focus-visible:ring-purple-700">
        <div className="flex flex-row  justify-between w-full">
          <div className="flex flex-col justify-between w-full">
            <span className="text-sm font-medium text-slate-200">
              {formatDistanceToNow(note.date, {
                locale: ptBR,
                addSuffix: true,
              })}
            </span>

            <p className="text-sm leading-6 text-slate-400">{note.content}</p>
          </div>
          <div className="flex-row gap-5 flex">
            <Pencil
              className="hover:text-purple-800"
              onClick={() => setIsEditing(true)}
            />
            <Trash2
              className="hover:text-red-500"
              onClick={() => onNoteDeleted(note.id)}
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none " />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className="fixed overflow-hidden md:left-1/2 md:top-1/2 md:inset-auto inset-0 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[80vw] md:h-[60vh] w-full bg-slate-700 rounded-md flex flex-col outline-none">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-900">
            <X />
          </Dialog.Close>

          <div className="flex flex-1 flex-col gap-3 p-5">
            <div className="flex flex-row gap-3 items-center">
              <span className="text-sm font-medium text-slate-200">
                {formatDistanceToNow(note.date, {
                  locale: ptBR,
                  addSuffix: true,
                })}
              </span>
              <span className="text-xs text-gray-400">
                escreva algo novo para editar a nota...
              </span>
            </div>

            {isEditing ? (
              <textarea
                className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
              />
            ) : (
              <p className="text-sm leading-6 text-slate-400">{note.content}</p>
            )}
          </div>
          <div className="flex flex-row ">
            <button
              type="button"
              onClick={() => onNoteDeleted(note.id)}
              className="w-full flex rounded-sm flex-row items-center gap-3 justify-center font-medium bg-transparent border-2 border-transparent hover:border-red-500 py-4 text-center text-sm text-slate-300  outline-none group"
            >
              <Trash2 className="group-hover:text-red-500" size={25} />
              <div className="text-lg flex flex-row gap-1">
                <span className="text-red-500 ">Apagar</span>
                nota
              </div>
            </button>

            <button
              type="button"
              onClick={handleSaveEdit}
              className="w-full rounded-sm flex flex-row items-center gap-3 justify-center font-medium bg-purple-700 border-2 border-purple-700 hover:border-purple-800 hover:bg-purple-800 py-4 text-center text-sm text-slate-300  outline-none group"
            >
              <CheckCheck className="group-hover:text-purple-900" size={25} />
              <div className="text-lg flex flex-row gap-1">
                <span className=" ">Salvar</span>
                edição
              </div>
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
