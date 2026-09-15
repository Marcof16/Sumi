import { useEffect, type ReactNode } from "react";
import { Bold, Heading2, Italic, Redo2, Undo2 } from "lucide-react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { cn } from "@/lib/utils";

type WorkspaceEditorProps = {
  content: string;
  editable: boolean;
  onContentChange: (content: string) => void;
};

export function WorkspaceEditor({ content, editable, onContentChange }: WorkspaceEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    immediatelyRender: false,
    editable,
    onUpdate: ({ editor: currentEditor }) => onContentChange(currentEditor.getHTML()),
    editorProps: {
      attributes: {
        class: "workspace-editor min-h-[52vh] outline-none",
        "aria-label": "Editor del borrador",
        role: "textbox",
      },
    },
  });

  useEffect(() => {
    if (!editor || editor.getHTML() === content) return;
    editor.commands.setContent(content || "", { emitUpdate: false });
  }, [content, editor]);

  if (!editor) return <div className="min-h-[52vh]" aria-label="Editor del borrador" />;

  return (
    <div className="overflow-hidden rounded-xl bg-sumi-surface-raised shadow-sm ring-1 ring-sumi-border/70">
      <div className="flex flex-wrap items-center gap-1 border-b border-sumi-border/70 bg-sumi-surface px-3 py-2" aria-label="Herramientas de texto" role="toolbar">
        <EditorButton label="Negrita" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><Bold className="size-4" aria-hidden="true" /></EditorButton>
        <EditorButton label="Cursiva" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic className="size-4" aria-hidden="true" /></EditorButton>
        <EditorButton label="Encabezado" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 className="size-4" aria-hidden="true" /></EditorButton>
        <span className="mx-1 h-5 w-px bg-sumi-border" aria-hidden="true" />
        <EditorButton label="Deshacer" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}><Undo2 className="size-4" aria-hidden="true" /></EditorButton>
        <EditorButton label="Rehacer" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}><Redo2 className="size-4" aria-hidden="true" /></EditorButton>
      </div>
      <div className="relative mx-auto max-w-3xl px-6 py-10 sm:px-12 sm:py-14">
        {editable && <p className="pointer-events-none absolute mt-1 text-sm italic text-sumi-text-soft">{editor.isEmpty ? "Empieza a escribir... No tiene que salir perfecto." : ""}</p>}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

function EditorButton({ label, active, disabled, onClick, children }: { label: string; active?: boolean; disabled?: boolean; onClick: () => void; children: ReactNode }) {
  return <button type="button" aria-label={label} aria-pressed={active} disabled={disabled} onClick={onClick} className={cn("flex size-8 items-center justify-center rounded-md text-sumi-text-muted hover:bg-sumi-surface-muted hover:text-sumi-text disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sumi-accent", active && "bg-sumi-accent-soft text-sumi-text")}>
    {children}
  </button>;
}
