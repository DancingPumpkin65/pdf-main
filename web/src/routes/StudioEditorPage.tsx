import { Button } from '@ds/components/Button'
import { BlockLibraryPanel } from '@/components/studio/BlockLibraryPanel'
import { TemplateTile } from '@/components/studio/TemplateTile'
import { InspectorPanel } from '@/components/studio/InspectorPanel'
import { LazyPDFPreviewSurface } from '@/components/studio/LazyPDFPreviewSurface'
import { StudioFrame } from '@/components/studio/StudioFrame'
import { TimelineTrack } from '@/components/studio/TimelineTrack'
import { useCompiledProject } from '@/hooks/useCompiledProject'
import { useProjectStore } from '@/lib/project-store'

export function StudioEditorPage() {
  const { project, templates, selectTemplate, selectedBlock, selectedBlockId, setSelectedBlockId, updateBlock, insertBlock, removeBlock, reorderBlocks, toggleBlockHidden } = useProjectStore()
  const { compiledProject, loading, error } = useCompiledProject(project)

  const getInsertionIndex = () => {
    if (!selectedBlockId) {
      return project.blocks.length
    }

    const selectedIndex = project.blocks.findIndex((block) => block.id === selectedBlockId)
    return selectedIndex >= 0 ? selectedIndex + 1 : project.blocks.length
  }

  return (
    <StudioFrame title="Editor">
      <div className="grid gap-4 xl:grid-cols-[18rem_minmax(0,1fr)_22rem]">
        <div className="space-y-4">
          {templates.map((template) => (
            <TemplateTile key={template.id} template={template} active={project.templateId === template.id} onSelect={() => selectTemplate(template.id)} ctaLabel="Load" />
          ))}
          <BlockLibraryPanel
            templateId={project.templateId}
            blocks={project.blocks}
            selectedBlockId={selectedBlockId}
            onSelectBlock={setSelectedBlockId}
            onInsertBlock={(blockType) => insertBlock(blockType, getInsertionIndex())}
          />
        </div>
        <div className="space-y-4">
          {error ? (
            <div className="border-2 border-[var(--border)] bg-[var(--surface)] p-5 text-sm leading-6 text-[var(--destructive)] shadow-[8px_8px_0px_0px_var(--shadow-color)]">
              {error}
            </div>
          ) : compiledProject ? (
            <LazyPDFPreviewSurface document={compiledProject.document} title={project.metadata.name} description="The editor keeps the preview visible while block order and properties change." />
          ) : (
            <div className="border-2 border-[var(--border)] bg-[var(--surface)] p-5 text-sm leading-6 shadow-[8px_8px_0px_0px_var(--shadow-color)]">
              {loading ? 'Compiling preview document for the selected template.' : 'Preparing preview document.'}
            </div>
          )}
          <TimelineTrack blocks={project.blocks} selectedBlockId={selectedBlockId} onSelectBlock={setSelectedBlockId} onMoveBlock={(blockId, delta) => { const currentIndex = project.blocks.findIndex((block) => block.id === blockId); if (currentIndex >= 0) reorderBlocks(blockId, currentIndex + delta) }} onToggleHidden={toggleBlockHidden} />
        </div>
        <InspectorPanel block={selectedBlock} onUpdateBlock={(updater) => { if (selectedBlockId) updateBlock(selectedBlockId, updater) }} onToggleHidden={() => { if (selectedBlockId) toggleBlockHidden(selectedBlockId) }} onRemoveBlock={() => { if (selectedBlockId) removeBlock(selectedBlockId) }} />
      </div>
      <div className="mt-4 flex justify-end">
        <Button variant="outline" onClick={() => setSelectedBlockId(project.blocks[0]?.id ?? null)}>Focus first block</Button>
      </div>
    </StudioFrame>
  )
}
