import type { AssistantBounds, AssistantChat, AssistantPreferences } from "@/features/assistant/assistantTypes";

const chatsKey = "sumi-assistant-chats";
const preferencesKey = "sumi-assistant-preferences";

export const defaultAssistantPreferences: AssistantPreferences = {
  mode: "DOCKED",
  lastVisibleMode: "DOCKED",
  floatingWidth: 520,
  floatingHeight: 620,
  floatingX: 300,
  floatingY: 40,
};

export function createGeneralChat(): AssistantChat {
  const now = new Date().toISOString();
  return { id: "general", title: "General", createdAt: now, updatedAt: now, messages: [] };
}

function isChat(value: unknown): value is AssistantChat {
  if (typeof value !== "object" || value === null) return false;
  const chat = value as Record<string, unknown>;
  return typeof chat.id === "string" && typeof chat.title === "string" && typeof chat.createdAt === "string" && typeof chat.updatedAt === "string" && Array.isArray(chat.messages);
}

export function loadAssistantChats(): AssistantChat[] {
  if (typeof window === "undefined") return [createGeneralChat()];
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(chatsKey) ?? "null");
    const chats = Array.isArray(parsed) ? parsed.filter(isChat) : [];
    return chats.length > 0 ? chats : [createGeneralChat()];
  } catch {
    return [createGeneralChat()];
  }
}

export function saveAssistantChats(chats: AssistantChat[]) {
  if (typeof window !== "undefined") window.localStorage.setItem(chatsKey, JSON.stringify(chats));
}

export function loadAssistantPreferences(): AssistantPreferences {
  if (typeof window === "undefined") return defaultAssistantPreferences;
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(preferencesKey) ?? "null");
    if (typeof parsed !== "object" || parsed === null) return defaultAssistantPreferences;
    const value = parsed as Record<string, unknown>;
    const validMode = value.mode === "DOCKED" || value.mode === "FLOATING" || value.mode === "MAXIMIZED" || value.mode === "HIDDEN";
    const validLastMode = value.lastVisibleMode === "DOCKED" || value.lastVisibleMode === "FLOATING";
    const numbers = [value.floatingWidth, value.floatingHeight, value.floatingX, value.floatingY];
    if (!validMode || !validLastMode || numbers.some((number) => typeof number !== "number" || !Number.isFinite(number)) || Number(value.floatingWidth) < 320 || Number(value.floatingHeight) < 380) return defaultAssistantPreferences;
    return { mode: value.mode, lastVisibleMode: value.lastVisibleMode, floatingWidth: value.floatingWidth, floatingHeight: value.floatingHeight, floatingX: value.floatingX, floatingY: value.floatingY } as AssistantPreferences;
  } catch {
    return defaultAssistantPreferences;
  }
}

export function saveAssistantPreferences(preferences: AssistantPreferences) {
  if (typeof window !== "undefined") window.localStorage.setItem(preferencesKey, JSON.stringify(preferences));
}

export function clampFloatingBounds(bounds: AssistantBounds & Partial<AssistantPreferences>, workspaceWidth: number, workspaceHeight: number, sidebarWidth: number): AssistantPreferences {
  const maxWidth = Math.max(320, Math.floor((workspaceWidth - sidebarWidth) * 0.75));
  const maxHeight = Math.max(380, Math.floor(workspaceHeight * 0.9));
  const floatingWidth = Math.min(Math.max(bounds.floatingWidth, 320), maxWidth);
  const floatingHeight = Math.min(Math.max(bounds.floatingHeight, 380), maxHeight);
  const minimumX = Math.min(sidebarWidth, Math.max(0, workspaceWidth - floatingWidth));
  const floatingX = Math.min(Math.max(bounds.floatingX, minimumX), Math.max(minimumX, workspaceWidth - floatingWidth));
  const floatingY = Math.min(Math.max(bounds.floatingY, 0), Math.max(0, workspaceHeight - floatingHeight));
  return { ...defaultAssistantPreferences, ...bounds, floatingWidth, floatingHeight, floatingX, floatingY };
}
