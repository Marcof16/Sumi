import { useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import type { AppSection } from "@/lib/navigation";
import { AssistantHeader } from "@/features/assistant/AssistantHeader";
import { ChatList } from "@/features/assistant/ChatList";
import { ChatView } from "@/features/assistant/ChatView";
import { CurrentContext } from "@/features/assistant/CurrentContext";
import { useAssistant } from "@/features/assistant/useAssistant";
import { clampFloatingBounds } from "@/features/assistant/assistantStorage";
import { cn } from "@/lib/utils";

type AssistantPanelProps = { activeSection: AppSection; sidebarCollapsed: boolean };

function PanelContent({ chatDrawerOpen, onCloseDrawer }: { chatDrawerOpen: boolean; onCloseDrawer: () => void }) {
  const { chats, activeChatId, setActiveChat, createChat, renameChat, deleteChat, sendMessage } = useAssistant();
  const activeChat = chats.find((chat) => chat.id === activeChatId) ?? chats[0];
  if (!activeChat) return null;
  return <div className="relative flex min-h-0 flex-1"><ChatView chat={activeChat} onSend={sendMessage} />{chatDrawerOpen && <><button type="button" aria-label="Cerrar conversaciones al hacer clic fuera" onClick={onCloseDrawer} className="absolute inset-0 z-20 bg-sumi-primary/10" /><div role="dialog" aria-label="Conversaciones" className="absolute inset-y-0 left-0 z-30 min-w-[220px] max-w-[80%] overflow-hidden border-r border-sumi-border bg-sumi-surface-muted shadow-xl" style={{ width: "clamp(220px, 72%, 300px)" }} onClick={(event) => event.stopPropagation()}><ChatList chats={chats} activeChatId={activeChat.id} onSelect={(id) => { setActiveChat(id); onCloseDrawer(); }} onCreate={() => { createChat(); onCloseDrawer(); }} onRename={renameChat} onDelete={deleteChat} /></div></>}</div>;
}

export function AssistantPanel({ activeSection, sidebarCollapsed }: AssistantPanelProps) {
  const { preferences, setMode, restoreMode, updateFloatingBounds } = useAssistant();
  const [chatDrawerOpen, setChatDrawerOpen] = useState(false);
  const [workspaceWidth, setWorkspaceWidth] = useState(typeof window === "undefined" ? 1200 : window.innerWidth);
  const sidebarWidth = sidebarCollapsed ? 76 : 256;
  const maxWidth = Math.max(320, Math.floor((workspaceWidth - sidebarWidth) * 0.75));
  const maxHeight = Math.max(380, Math.floor((typeof window === "undefined" ? 720 : window.innerHeight) * 0.9));
  useEffect(() => {
    function handleResize() { setWorkspaceWidth(window.innerWidth); updateFloatingBounds(clampFloatingBounds(preferences, window.innerWidth, window.innerHeight, sidebarWidth)); }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [preferences, sidebarWidth, updateFloatingBounds]);

  useEffect(() => {
    if (!chatDrawerOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !event.defaultPrevented) setChatDrawerOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [chatDrawerOpen]);

  if (preferences.mode === "HIDDEN") return null;

  function changeMode(mode: Parameters<typeof setMode>[0]) {
    setChatDrawerOpen(false);
    setMode(mode);
  }

  const panel = <section className="flex h-full min-h-0 flex-col overflow-hidden border border-sumi-border bg-sumi-surface-muted text-sumi-text shadow-xl"><AssistantHeader mode={preferences.mode} chatDrawerOpen={chatDrawerOpen} onChatDrawerToggle={() => setChatDrawerOpen((open) => !open)} onModeChange={changeMode} onRestore={() => { setChatDrawerOpen(false); restoreMode(); }} /><CurrentContext section={activeSection} /><PanelContent chatDrawerOpen={chatDrawerOpen} onCloseDrawer={() => setChatDrawerOpen(false)} /></section>;

  if (preferences.mode === "DOCKED") return <aside className="flex w-[300px] shrink-0 flex-col border-l border-sumi-border bg-sumi-surface-muted max-[1100px]:hidden xl:w-[340px]">{panel}</aside>;
  if (preferences.mode === "MAXIMIZED") return <div className={cn("absolute inset-y-0 right-0 z-40", sidebarCollapsed ? "left-[76px]" : "left-64")}>{panel}</div>;

  return <Rnd bounds="parent" minWidth={320} minHeight={380} maxWidth={maxWidth} maxHeight={maxHeight} size={{ width: preferences.floatingWidth, height: preferences.floatingHeight }} position={{ x: preferences.floatingX, y: preferences.floatingY }} onDragStop={(_event, data) => updateFloatingBounds(clampFloatingBounds({ ...preferences, floatingX: data.x, floatingY: data.y }, workspaceWidth, window.innerHeight, sidebarWidth))} onResizeStop={(_event, _direction, ref, _delta, position) => { const width = ref.offsetWidth; const height = ref.offsetHeight; updateFloatingBounds(clampFloatingBounds({ ...preferences, floatingWidth: width, floatingHeight: height, floatingX: position.x, floatingY: position.y }, workspaceWidth, window.innerHeight, sidebarWidth)); }} dragHandleClassName="assistant-drag-handle" cancel="textarea,button,input,[data-no-drag]" style={{ zIndex: 50 }}>{panel}</Rnd>;
}
