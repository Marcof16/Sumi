import { createContext } from "react";
import type { AssistantChat, AssistantMode, AssistantPreferences } from "@/features/assistant/assistantTypes";

export type AssistantContextValue = {
  chats: AssistantChat[];
  activeChatId: string;
  preferences: AssistantPreferences;
  setMode: (mode: AssistantMode) => void;
  restoreMode: () => void;
  updateFloatingBounds: (bounds: Partial<AssistantPreferences>) => void;
  setActiveChat: (chatId: string) => void;
  createChat: () => void;
  renameChat: (chatId: string, title: string) => void;
  deleteChat: (chatId: string) => void;
  sendMessage: (content: string) => void;
};

export const AssistantContext = createContext<AssistantContextValue | null>(null);
