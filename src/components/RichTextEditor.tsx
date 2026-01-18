import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import type { InputData } from "@/types/auth.types";

type RichTextEditorProps = {
  input: InputData;
  setInput: React.Dispatch<React.SetStateAction<InputData>>;
};

export default function RichTextEditor({
  input,
  setInput,
}: RichTextEditorProps) {
  const { quill, quillRef } = useQuill({
    theme: "snow",
  });

  useEffect(() => {
    if (quill && input.description) {
      quill.clipboard.dangerouslyPasteHTML(input.description);
    }
  }, [quill, input.description]);

  useEffect(() => {
    if (!quill) return;

    const handler = () => {
      setInput((prev) => ({
        ...prev,
        description: quill.root.innerHTML,
      }));
    };

    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [quill, setInput]);

  return <div ref={quillRef} className="bg-white" />;
}
