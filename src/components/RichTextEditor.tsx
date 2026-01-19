import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import type { InputData } from "@/types/auth.types";

type Props = {
  input: InputData;
  setInput: React.Dispatch<React.SetStateAction<InputData>>;
};

export default function RichTextEditor({ input, setInput }: Props) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (!editorRef.current || quillRef.current) return;

    quillRef.current = new Quill(editorRef.current, {
      theme: "snow",
    });

    quillRef.current.on("text-change", () => {
      setInput((prev) => ({
        ...prev,
        description: quillRef.current!.root.innerHTML,
      }));
    });

    if (input.description) {
      quillRef.current.root.innerHTML = input.description;
    }
  }, [input.description, setInput]);

  return <div ref={editorRef} className="bg-white" />;
}
