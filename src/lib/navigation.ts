import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Clock3,
  Globe2,
  House,
  Lightbulb,
  SearchCheck,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";

export type AppSection =
  | "home"
  | "ideas"
  | "characters"
  | "world"
  | "magic"
  | "timeline"
  | "plot"
  | "manuscript"
  | "review";

export type NavigationItem = {
  id: AppSection;
  label: string;
  icon: LucideIcon;
  description: string;
};

export const navigationItems: NavigationItem[] = [
  { id: "home", label: "Inicio", icon: House, description: "Una vista general de tu novela." },
  { id: "ideas", label: "Ideas", icon: Lightbulb, description: "Captura ideas sin perder el ritmo." },
  { id: "characters", label: "Personajes", icon: Users, description: "Organiza los personajes de tu novela." },
  { id: "world", label: "Mundo", icon: Globe2, description: "Construye el mundo donde ocurre tu historia." },
  { id: "magic", label: "Magia", icon: Sparkles, description: "Define las reglas extraordinarias de tu mundo." },
  { id: "timeline", label: "Cronología", icon: Clock3, description: "Mantén los acontecimientos en orden." },
  { id: "plot", label: "Trama", icon: Workflow, description: "Da forma al recorrido de tu historia." },
  { id: "manuscript", label: "Manuscrito", icon: BookOpen, description: "El espacio para escribir tu novela." },
  { id: "review", label: "Revisión", icon: SearchCheck, description: "Revisa y pule cada parte del proyecto." },
];

export function getNavigationItem(section: AppSection) {
  return navigationItems.find((item) => item.id === section) ?? navigationItems[0];
}
