import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import type { Block, PartialBlock } from "@blocknote/core";
import { supabase } from "../lib/supabase";

const BUCKET = "Portfolio Bucket";
const MAX_BYTES = 50 * 1024 * 1024;

async function uploadFile(file: File): Promise<string> {
  if (file.size > MAX_BYTES) {
    throw new Error("Max file size is 50 MB");
  }
  const ext = file.name.includes(".") ? file.name.split(".").pop() : "bin";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file);
  if (error) throw error;
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

export default function PostBodyEditor({
  initialContent,
  onChange,
}: {
  initialContent?: PartialBlock[];
  onChange: (blocks: Block[]) => void;
}) {
  const editor = useCreateBlockNote({
    initialContent:
      initialContent && initialContent.length ? initialContent : undefined,
    uploadFile,
  });

  return (
    <BlockNoteView
      editor={editor}
      onChange={() => onChange(editor.document)}
      className="max-w-md rounded-md border border-line"
    />
  );
}
