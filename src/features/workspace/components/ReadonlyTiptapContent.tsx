import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type ReadonlyTiptapContentProps = { content: string };

export function ReadonlyTiptapContent({ content }: ReadonlyTiptapContentProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    immediatelyRender: false,
    editable: false,
    editorProps: {
      attributes: {
        role: "document",
      },
    },
  });

  useEffect(() => {
    if (!editor || editor.getHTML() === content) return;
    editor.commands.setContent(content || "", { emitUpdate: false });
  }, [content, editor]);

  if (!editor || editor.isEmpty) return null;

  return <EditorContent editor={editor} />;
}
