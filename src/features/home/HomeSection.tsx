import type { AppSection } from "@/lib/navigation";
import { HomeHero } from "@/features/home/HomeHero";
import { QuickCapture } from "@/features/home/QuickCapture";
import { StoryOverview } from "@/features/home/StoryOverview";
import { NeedsAttention } from "@/features/home/NeedsAttention";
import { RecentActivity } from "@/features/home/RecentActivity";

export type HomeStats = {
  ideas: number;
  characters: number;
  chapters: number;
  openQuestions: number;
};

type HomeSectionProps = {
  projectName: string;
  onNavigate: (section: AppSection) => void;
  onOpenWorkspace: () => void;
  stats?: HomeStats;
};

const emptyStats: HomeStats = { ideas: 0, characters: 0, chapters: 0, openQuestions: 0 };

export function HomeSection({ projectName, onNavigate, onOpenWorkspace, stats: providedStats }: HomeSectionProps) {
  const stats = providedStats ?? emptyStats;

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-10 lg:py-12">
      <HomeHero projectName={projectName} onOpenWorkspace={onOpenWorkspace} />
      <QuickCapture onNavigate={onNavigate} />
      <div className="mt-8 grid gap-4 xl:grid-cols-2">
        <StoryOverview stats={stats} onNavigate={onNavigate} />
        <NeedsAttention onNavigate={onNavigate} />
      </div>
      <RecentActivity />
    </section>
  );
}
