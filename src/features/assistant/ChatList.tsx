import { MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import type { AssistantChat } from "@/features/assistant/assistantTypes";
import { useState } from "react";
import { cn } from "@/lib/utils";

type ChatListProps = { chats: AssistantChat[]; activeChatId: string; onSelect: (id: string) => void; onCreate: () => void; onRename: (id: string, title: string) => void; onDelete: (id: string) => void; className?: string };

export function ChatList({ chats, activeChatId, onSelect, onCreate, onRename, onDelete, className }: ChatListProps) {
  const [renameId, setRenameId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [deleteChat, setDeleteChat] = useState<AssistantChat | null>(null);
  const renameTarget = chats.find((chat) => chat.id === renameId);

  function beginRename(chat: AssistantChat) {
    setRenameId(chat.id);
    setRenameValue(chat.title);
  }

  return (
    <div className={cn("flex h-full w-full flex-col bg-sumi-surface-muted", className)}>
      <div className="flex items-center justify-between border-b border-sumi-border px-4 py-3"><p className="text-sm font-semibold text-sumi-text">Conversaciones</p><Button type="button" aria-label="Nueva conversación" onClick={onCreate} className="size-7 rounded-md bg-transparent p-0 text-sumi-text-muted shadow-none hover:bg-sumi-surface hover:text-sumi-text"><Plus className="size-4" aria-hidden="true" /></Button></div>
      <div className="flex-1 space-y-1 overflow-y-auto p-2">{chats.map((chat) => <div key={chat.id} className={cn("group flex items-center gap-1 rounded-lg", activeChatId === chat.id ? "bg-sumi-accent-soft text-sumi-text" : "text-sumi-text-muted hover:bg-sumi-surface hover:text-sumi-text")}><button type="button" onClick={() => onSelect(chat.id)} className="min-w-0 flex-1 truncate px-2 py-2 text-left text-xs font-medium">{chat.title}</button><DropdownMenu><DropdownMenuTrigger asChild><button type="button" aria-label={`Opciones de ${chat.title}`} className="mr-1 flex size-6 shrink-0 items-center justify-center rounded text-sumi-text-soft opacity-0 hover:bg-sumi-surface group-hover:opacity-100 focus:opacity-100"><MoreHorizontal className="size-3.5" aria-hidden="true" /></button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem onSelect={() => beginRename(chat)}><Pencil className="mr-2 size-3.5" aria-hidden="true" />Renombrar</DropdownMenuItem><DropdownMenuItem onSelect={() => setDeleteChat(chat)} className="text-red-700"><Trash2 className="mr-2 size-3.5" aria-hidden="true" />Eliminar</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div>)}</div>
      <Dialog open={renameId !== null} onOpenChange={(open) => { if (!open) setRenameId(null); }}><DialogContent className="border border-sumi-border bg-sumi-surface text-sumi-text"><h2 className="font-serif text-2xl">Renombrar conversación</h2><p className="mt-1 text-sm text-sumi-text-muted">{renameTarget?.title}</p><Input aria-label="Nombre de la conversación" value={renameValue} onChange={(event) => setRenameValue(event.target.value)} className="mt-5" /><div className="mt-5 flex justify-end gap-2"><Button type="button" onClick={() => setRenameId(null)} className="bg-transparent text-sumi-text-muted hover:bg-sumi-surface-muted">Cancelar</Button><Button type="button" onClick={() => { if (renameId) onRename(renameId, renameValue); setRenameId(null); }}>Guardar</Button></div></DialogContent></Dialog>
      <Dialog open={deleteChat !== null} onOpenChange={(open) => { if (!open) setDeleteChat(null); }}><DialogContent className="border border-sumi-border bg-sumi-surface text-sumi-text"><h2 className="font-serif text-2xl">Eliminar conversación</h2><p className="mt-2 text-sm leading-relaxed text-sumi-text-muted">{deleteChat?.messages.length ? "Esta conversación contiene mensajes. ¿Quieres eliminarla?" : "¿Quieres eliminar esta conversación?"}</p><div className="mt-6 flex justify-end gap-2"><Button type="button" onClick={() => setDeleteChat(null)} className="bg-transparent text-sumi-text-muted hover:bg-sumi-surface-muted">Cancelar</Button><Button type="button" onClick={() => { if (deleteChat) onDelete(deleteChat.id); setDeleteChat(null); }} className="bg-red-700 hover:bg-red-800">Eliminar</Button></div></DialogContent></Dialog>
    </div>
  );
}
