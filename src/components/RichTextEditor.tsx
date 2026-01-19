import { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import type { InputData } from "@/types/auth.types";

type RichTextEditorProps = {
  input: InputData;
  setInput: React.Dispatch<React.SetStateAction<InputData>>;
};

export default function RichTextEditor({
  input,
  setInput,
}: RichTextEditorProps) {
  useEffect(() => {
    // nothing else needed here
  }, []);

  return (
    <ReactQuill
      theme="snow"
      value={input.description}
      onChange={(value) =>
        setInput((prev) => ({
          ...prev,
          description: value,
        }))
      }
      className="bg-white"
    />
  );
}
