import { Bot } from "lucide-react";
import type { AssistantChat } from "@/features/assistant/assistantTypes";
import { ChatComposer } from "@/features/assistant/ChatComposer";

type ChatViewProps = { chat: AssistantChat; onSend: (content: string) => void };

export function ChatView({ chat, onSend }: ChatViewProps) {
  return <div className="flex min-w-0 flex-1 flex-col bg-sumi-bg"><div className="flex items-center border-b border-sumi-border bg-sumi-surface px-4 py-3"><p className="truncate text-sm font-medium text-sumi-text">{chat.title}</p></div><div className="mx-auto flex w-full max-w-3xl flex-1 flex-col space-y-4 overflow-y-auto p-4">{chat.messages.length === 0 && <div className="flex min-h-full flex-col items-center justify-center text-center"><div className="flex size-10 items-center justify-center rounded-xl bg-sumi-accent-soft text-sumi-accent"><Bot className="size-5" aria-hidden="true" /></div><p className="mt-4 text-sm font-medium text-sumi-text">Conversación preparada</p><p className="mt-1 max-w-[220px] text-xs leading-relaxed text-sumi-text-muted">Puedes escribir para probar la interfaz. OpenCode todavía no está conectado.</p></div>}{chat.messages.map((message) => <div key={message.id} className={message.role === "user" ? "ml-5" : "mr-5"}><p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-sumi-text-soft">{message.role === "user" ? "Tú" : "Agent"}</p><div className={`rounded-xl border px-3 py-2.5 text-sm leading-relaxed ${message.role === "user" ? "border-sumi-border-strong bg-sumi-surface-raised text-sumi-text" : "border-sumi-border bg-sumi-surface text-sumi-text-muted"}`}>{message.content}</div></div>)}</div><ChatComposer onSend={onSend} /></div>;
}
