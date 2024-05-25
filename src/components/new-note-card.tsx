import * as Dialog from "@radix-ui/react-dialog";
import { CirclePlus, Keyboard, Mic, X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void;
}

let speechRecognition: SpeechRecognition | null = null;

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
  const [shouldShownOnboarding, setShouldShownOnboarding] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
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

    if (content === "") {
      return toast.error("Escreva algo para salvar!");
    }

    onNoteCreated(content);

    setContent("");
    setShouldShownOnboarding(true);

    toast.success("Nota adicionada com sucesso!");
  }

  function handleStartRecording() {
    setIsRecording(true);

    const isSpeechRecognitionAPIAvailable =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

    if (!isSpeechRecognitionAPIAvailable) {
      toast.error(
        "Infelizmente seu navegador não suporta gravar a função de gravar seu aúdio!"
      );
      return;
    }

    setIsRecording(true);
    setShouldShownOnboarding(false);

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    speechRecognition = new SpeechRecognitionAPI();

    speechRecognition.lang = "pt-BR";

    speechRecognition.maxAlternatives = 1;

    speechRecognition.continuous = true;

    speechRecognition.interimResults = true;

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript);
      }, "");

      setContent(transcription);
    };

    speechRecognition.onerror = () => {
      toast.error(
        "A API de Reconhecimento de fala não está disponível no seu navegador."
      );

      setShouldShownOnboarding(true);
      setIsRecording(false);
    };

    speechRecognition.start();
  }

  function handleStopRecording() {
    setIsRecording(false);

    if (speechRecognition !== null) {
      speechRecognition.stop();
    }
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md flex flex-col  bg-slate-700 hover:ring-2 hover:ring-slate-600 p-5 gap-3 text-left ">
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto automaticamente
          ou escreva uma nota normalmente.
        </p>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className="fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[65vw] md:h-[75vh] w-full bg-slate-700 md:rounded-md flex flex-col outline-none">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-900">
            <X />
          </Dialog.Close>
          <form className="flex-1 flex flex-col">
            <span className="text-sm ml-5 mt-6  font-medium text-slate-200">
              Adicionar nota
            </span>
            {shouldShownOnboarding ? (
              <div className="flex flex-1 flex-col justify-center items-center  gap-5 p-5">
                <button
                  type="button"
                  onClick={handleStartRecording}
                  className="text-sm font-semibold leading-6 rounded-xl py-5 px-2  hover:bg-purple-900 text-slate-100 flex flex-row bg-purple-700 w-3/4 md:w-1/2 items-center gap-2 justify-center"
                >
                  <Mic />
                  Grave uma nota em áudio
                </button>
                <button
                  type="button"
                  onClick={handleStartWriting}
                  className="text-sm font-semibold leading-6 rounded-xl py-5 px-2  hover:bg-slate-300    text-slate-900 flex flex-row bg-slate-100 w-3/4 md:w-1/2 items-center gap-2 justify-center"
                >
                  <Keyboard />
                  Escrever uma nota
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

            {isRecording ? (
              <button
                type="button"
                onClick={handleStopRecording}
                className="w-full flex flex-row items-center gap-3 justify-center font-medium bg-slate-800 py-4 text-center text-sm text-slate-300 hover:bg-slate-900 outline-none group"
              >
                <div className="flex items-center gap-2 justify-center">
                  <div className="size-3 text-lg rounded-full bg-red-500 animate-pulse" />
                  Gravando! (clique p/ interromper)
                </div>
              </button>
            ) : (
              <button
                onClick={handleSaveNote}
                type="button"
                className="w-full  flex flex-row items-center gap-3 justify-center font-medium bg-slate-800 py-4 text-center text-sm text-slate-300 hover:bg-slate-900 outline-none group"
              >
                <CirclePlus className="group-hover:text-purple-700" size={25} />

                <div className="text-lg flex i flex-row gap-1">
                  <span className="text-purple-700 ">Adicionar</span>
                  nota
                </div>
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
