import { BookOpen, CircleHelp, FileText, Lightbulb, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { AppSection } from "@/lib/navigation";
import type { HomeStats } from "@/features/home/HomeSection";

type StoryOverviewProps = { stats: HomeStats; onNavigate: (section: AppSection) => void };

const statCards = [
  { label: "Ideas", key: "ideas" as const, icon: Lightbulb, section: "ideas" as AppSection },
  { label: "Personajes", key: "characters" as const, icon: Users, section: "characters" as AppSection },
  { label: "Capítulos", key: "chapters" as const, icon: FileText, section: "manuscript" as AppSection },
  { label: "Preguntas abiertas", key: "openQuestions" as const, icon: CircleHelp, section: "review" as AppSection },
];

export function StoryOverview({ stats, onNavigate }: StoryOverviewProps) {
  return (
    <Card className="border-sumi-border bg-sumi-surface-raised shadow-none">
      <CardContent className="p-6">
        <div className="flex items-center gap-3"><BookOpen className="size-4 text-sumi-accent" aria-hidden="true" /><h2 className="font-serif text-2xl text-sumi-text">Estado de la historia</h2></div>
        <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4">
          {statCards.map((stat) => { const Icon = stat.icon; return <button key={stat.label} type="button" onClick={() => onNavigate(stat.section)} aria-label={`${stat.label}: ${stats[stat.key]}`} className="flex items-center justify-between border-b border-sumi-border py-2 text-left hover:text-sumi-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sumi-accent"><span className="flex min-w-0 items-center gap-2 text-xs text-sumi-text-muted"><Icon className="size-3.5 shrink-0 text-sumi-text-soft" aria-hidden="true" />{stat.label}</span><span className="font-serif text-xl text-sumi-text">{stats[stat.key]}</span></button>; })}
        </div>
      </CardContent>
    </Card>
  );
}
