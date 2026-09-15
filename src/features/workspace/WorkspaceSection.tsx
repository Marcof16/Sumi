import { useEffect, useMemo, useState } from "react";
import { WorkspaceHeader } from "@/features/workspace/components/WorkspaceHeader";
import { WorkspaceNavigator } from "@/features/workspace/components/WorkspaceNavigator";
import { WorkspaceStageTabs } from "@/features/workspace/components/WorkspaceStageTabs";
import { WorkspaceStart } from "@/features/workspace/components/WorkspaceStart";
import { ScenePlanSheet, WorkspaceToolsSheet } from "@/features/workspace/components/WorkspaceSheets";
import { WorkspaceStatusBar } from "@/features/workspace/components/WorkspaceStatusBar";
import { DraftStage } from "@/features/workspace/stages/DraftStage";
import { FinalStage } from "@/features/workspace/stages/FinalStage";
import { IdeaStage } from "@/features/workspace/stages/IdeaStage";
import { PlanningStage } from "@/features/workspace/stages/PlanningStage";
import { RevisionStage } from "@/features/workspace/stages/RevisionStage";
import { createWorkspaceBeat, createWorkspaceScene, countWordsFromHtml } from "@/features/workspace/workspaceUtils";
import { writingStages, type WritingStage, type WorkspaceScene } from "@/features/workspace/workspaceTypes";

type WorkspaceSectionProps = { onConcentrationChange: (active: boolean) => void };

export function WorkspaceSection({ onConcentrationChange }: WorkspaceSectionProps) {
  const [workspaceScenes, setWorkspaceScenes] = useState<WorkspaceScene[]>([]);
  const [activeSceneId, setActiveSceneId] = useState<string | null>(null);
  const [navigatorVisible, setNavigatorVisible] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [planOpen, setPlanOpen] = useState(false);
  const [concentration, setConcentration] = useState(false);
  const activeScene = workspaceScenes.find((scene) => scene.id === activeSceneId) ?? null;

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 900) setNavigatorVisible(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && concentration) setConcentrationState(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [concentration]);

  useEffect(() => () => onConcentrationChange(false), [onConcentrationChange]);

  function setConcentrationState(active: boolean) {
    setConcentration(active);
    onConcentrationChange(active);
  }

  function createScene(stage: WritingStage = "IDEA", closeNavigator = false) {
    const scene = { ...createWorkspaceScene(), stage };
    setWorkspaceScenes((current) => [...current, scene]);
    setActiveSceneId(scene.id);
    if (closeNavigator) setNavigatorVisible(false);
  }

  function updateActiveScene(update: (scene: WorkspaceScene) => WorkspaceScene) {
    if (!activeSceneId) return;
    setWorkspaceScenes((current) => current.map((scene) => scene.id === activeSceneId ? update(scene) : scene));
  }

  function updateIdea(update: Partial<WorkspaceScene["idea"]>) {
    updateActiveScene((scene) => ({ ...scene, idea: { ...scene.idea, ...update } }));
  }

  function updateBeat(beatId: string, text: string) {
    updateActiveScene((scene) => ({ ...scene, planning: { beats: scene.planning.beats.map((beat) => beat.id === beatId ? { ...beat, text } : beat) } }));
  }

  function deleteBeat(beatId: string) {
    updateActiveScene((scene) => ({ ...scene, planning: { beats: scene.planning.beats.filter((beat) => beat.id !== beatId) } }));
  }

  function toggleReviewCheck(item: string) {
    updateActiveScene((scene) => ({ ...scene, revision: { ...scene.revision, checks: { ...scene.revision.checks, [item]: !scene.revision.checks[item] } } }));
  }

  const wordCount = useMemo(() => countWordsFromHtml(activeScene?.draft.content ?? ""), [activeScene?.draft.content]);
  if (!activeScene) return <WorkspaceStart scenes={workspaceScenes} onCreateScene={(stage) => createScene(stage, true)} onSelectScene={setActiveSceneId} />;

  const stageLabel = writingStages.find((item) => item.id === activeScene.stage)?.label ?? "Idea";
  return (
    <section data-testid="workspace-root" className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-sumi-bg">
      <WorkspaceHeader scene={activeScene} stageLabel={stageLabel} navigatorVisible={navigatorVisible} concentration={concentration} onTitleChange={(title) => updateActiveScene((scene) => ({ ...scene, title }))} onToggleNavigator={() => setNavigatorVisible((visible) => !visible)} onBackToWorkspace={() => { setNavigatorVisible(false); setActiveSceneId(null); }} onTools={() => setToolsOpen(true)} onConcentration={() => setConcentrationState(!concentration)} />
      <WorkspaceStageTabs stage={activeScene.stage} onStageChange={(stage) => updateActiveScene((scene) => ({ ...scene, stage }))} />
      <div className="flex min-h-0 flex-1">
        {navigatorVisible && <WorkspaceNavigator scenes={workspaceScenes} activeSceneId={activeScene.id} onSelect={setActiveSceneId} onCreate={() => createScene()} />}
        <main data-testid="workspace-scroll-area" className="sumi-scrollbar min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain">
          <div className="min-w-0 px-4 py-5 sm:px-7 sm:py-7">
            {activeScene.stage === "IDEA" && <IdeaStage scene={activeScene} onUpdateIdea={updateIdea} />}
            {activeScene.stage === "PLANNING" && <PlanningStage scene={activeScene} onAddBeat={() => updateActiveScene((scene) => ({ ...scene, planning: { beats: [...scene.planning.beats, createWorkspaceBeat()] } }))} onUpdateBeat={updateBeat} onDeleteBeat={deleteBeat} />}
            {activeScene.stage === "DRAFT" && <DraftStage content={activeScene.draft.content} onContentChange={(content) => updateActiveScene((scene) => ({ ...scene, draft: { content } }))} onViewPlan={() => setPlanOpen(true)} />}
            {activeScene.stage === "REVISION" && <RevisionStage scene={activeScene} onToggleCheck={toggleReviewCheck} onNotesChange={(notes) => updateActiveScene((scene) => ({ ...scene, revision: { ...scene.revision, notes } }))} onViewPlan={() => setPlanOpen(true)} />}
            {activeScene.stage === "FINAL" && <FinalStage scene={activeScene} />}
          </div>
        </main>
      </div>
      <WorkspaceStatusBar wordCount={wordCount} stageLabel={stageLabel} />
      <WorkspaceToolsSheet scene={activeScene} open={toolsOpen} onOpenChange={setToolsOpen} />
      <ScenePlanSheet scene={activeScene} open={planOpen} onOpenChange={setPlanOpen} />
    </section>
  );
}
