export const themeOptions = [
  { id: "parchment", label: "Pergamino", description: "Claro, cálido y sereno." },
  { id: "night", label: "Noche", description: "Oscuro y elegante para concentrarte." },
  { id: "forest", label: "Bosque", description: "Profundo, natural y mágico." },
  { id: "plum", label: "Ciruela", description: "Oscuro, íntimo y dramático." },
] as const;

export type ThemeId = (typeof themeOptions)[number]["id"];

const themeStorageKey = "sumi-theme";

export function getStoredTheme(): ThemeId {
  if (typeof window === "undefined") return "parchment";

  const storedTheme = window.localStorage.getItem(themeStorageKey);
  return themeOptions.some((theme) => theme.id === storedTheme) ? (storedTheme as ThemeId) : "parchment";
}

export function applyTheme(theme: ThemeId) {
  document.documentElement.dataset.theme = theme;
  window.localStorage.setItem(themeStorageKey, theme);
}
