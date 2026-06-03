import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import type { PartialBlock } from "@blocknote/core";

export default function PostBody({ content }: { content: PartialBlock[] }) {
  const editor = useCreateBlockNote({ initialContent: content });
  return (
    <div className="post-body">
      <BlockNoteView editor={editor} editable={false} />
    </div>
  );
}
