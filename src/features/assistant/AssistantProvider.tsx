import { useEffect, useState, type ReactNode } from "react";
import { AssistantContext } from "@/features/assistant/assistantContext";
import type { AssistantChat, AssistantMode, AssistantPreferences } from "@/features/assistant/assistantTypes";
import { createGeneralChat, loadAssistantChats, loadAssistantPreferences, saveAssistantChats, saveAssistantPreferences } from "@/features/assistant/assistantStorage";

const systemMessage = "OpenCode todavía no está conectado a SUMI.";

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function AssistantProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<AssistantChat[]>(loadAssistantChats);
  const [activeChatId, setActiveChatId] = useState("general");
  const [preferences, setPreferences] = useState<AssistantPreferences>(loadAssistantPreferences);

  useEffect(() => saveAssistantChats(chats), [chats]);
  useEffect(() => saveAssistantPreferences(preferences), [preferences]);
  useEffect(() => {
    if (!chats.some((chat) => chat.id === activeChatId)) setActiveChatId(chats[0]?.id ?? "general");
  }, [activeChatId, chats]);

  function setMode(mode: AssistantMode) {
    setPreferences((current) => {
      if (mode === "HIDDEN") return { ...current, mode, lastVisibleMode: current.mode === "FLOATING" || current.mode === "DOCKED" ? current.mode : current.lastVisibleMode };
      if (mode === "MAXIMIZED") return { ...current, mode, lastVisibleMode: current.mode === "FLOATING" || current.mode === "DOCKED" ? current.mode : current.lastVisibleMode };
      return { ...current, mode, lastVisibleMode: mode };
    });
  }

  function restoreMode() {
    setPreferences((current) => ({ ...current, mode: current.lastVisibleMode }));
  }

  function updateFloatingBounds(bounds: Partial<AssistantPreferences>) {
    setPreferences((current) => ({ ...current, ...bounds }));
  }

  function createChat() {
    const now = new Date().toISOString();
    const chat: AssistantChat = { id: makeId("chat"), title: "Nueva conversación", createdAt: now, updatedAt: now, messages: [] };
    setChats((current) => [...current, chat]);
    setActiveChatId(chat.id);
  }

  function renameChat(chatId: string, title: string) {
    const cleanTitle = title.trim();
    if (!cleanTitle) return;
    setChats((current) => current.map((chat) => chat.id === chatId ? { ...chat, title: cleanTitle, updatedAt: new Date().toISOString() } : chat));
  }

  function deleteChat(chatId: string) {
    const remaining = chats.filter((chat) => chat.id !== chatId);
    if (remaining.length > 0) {
      if (chatId === activeChatId) setActiveChatId(remaining[0].id);
      setChats(remaining);
      return;
    }
    const general = createGeneralChat();
    setActiveChatId(general.id);
    setChats([general]);
  }

  function sendMessage(content: string) {
    const cleanContent = content.trim();
    if (!cleanContent) return;
    const now = new Date().toISOString();
    setChats((current) => current.map((chat) => {
      if (chat.id !== activeChatId) return chat;
      return { ...chat, updatedAt: now, messages: [...chat.messages, { id: makeId("message"), role: "user", content: cleanContent, createdAt: now }, { id: makeId("message"), role: "assistant", content: systemMessage, createdAt: new Date().toISOString() }] };
    }));
  }

  const value = { chats, activeChatId, preferences, setMode, restoreMode, updateFloatingBounds, setActiveChat: setActiveChatId, createChat, renameChat, deleteChat, sendMessage };
  return <AssistantContext.Provider value={value}>{children}</AssistantContext.Provider>;
}
