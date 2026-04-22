import { Button } from '@ds/components/Button'
import { TemplateTile } from '@/components/studio/TemplateTile'
import { InspectorPanel } from '@/components/studio/InspectorPanel'
import { PDFPreviewSurface } from '@/components/studio/PDFPreviewSurface'
import { StudioFrame } from '@/components/studio/StudioFrame'
import { TimelineTrack } from '@/components/studio/TimelineTrack'
import { compileProject } from '@/lib/project-compiler'
import { useProjectStore } from '@/lib/project-store'

export function StudioEditorPage() {
  const { project, templates, selectTemplate, selectedBlock, selectedBlockId, setSelectedBlockId, updateBlock, duplicateBlock, removeBlock, reorderBlocks } = useProjectStore()
  const compiledProject = compileProject(project)

  return (
    <StudioFrame title="Editor">
      <div className="grid gap-4 xl:grid-cols-[18rem_minmax(0,1fr)_22rem]">
        <div className="space-y-4">
          {templates.map((template) => (
            <TemplateTile key={template.id} template={template} active={project.templateId === template.id} onSelect={() => selectTemplate(template.id)} ctaLabel="Load" />
          ))}
        </div>
        <div className="space-y-4">
          <PDFPreviewSurface document={compiledProject.document} title={project.metadata.name} description="The editor keeps the preview visible while block order and properties change." />
          <TimelineTrack blocks={project.blocks} selectedBlockId={selectedBlockId} onSelectBlock={setSelectedBlockId} onMoveBlock={(blockId, delta) => { const currentIndex = project.blocks.findIndex((block) => block.id === blockId); if (currentIndex >= 0) reorderBlocks(blockId, currentIndex + delta) }} />
        </div>
        <InspectorPanel block={selectedBlock} onUpdateBlock={(updater) => { if (selectedBlockId) updateBlock(selectedBlockId, updater) }} onDuplicateBlock={() => { if (selectedBlockId) duplicateBlock(selectedBlockId) }} onRemoveBlock={() => { if (selectedBlockId) removeBlock(selectedBlockId) }} />
      </div>
      <div className="mt-4 flex justify-end">
        <Button variant="outline" onClick={() => setSelectedBlockId(project.blocks[0]?.id ?? null)}>Focus first block</Button>
      </div>
    </StudioFrame>
  )
}
