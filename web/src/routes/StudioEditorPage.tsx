import { InspectorPanel } from '@/components/studio/InspectorPanel'
import { LazyPDFPreviewSurface } from '@/components/studio/LazyPDFPreviewSurface'
import { StudioFrame } from '@/components/studio/StudioFrame'
import { useCompiledProject } from '@/hooks/useCompiledProject'
import { useProjectStore } from '@/lib/project-store'
import { invoiceBlockLibrary, themePresetLabels } from '@/lib/template-catalog'

export function StudioEditorPage() {
  const { project, selectedBlock, selectedBlockId, setSelectedBlockId, updateBlock, insertBlock, removeBlock, toggleBlockHidden, setThemePreset } = useProjectStore()
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
      <div className="grid gap-4 xl:grid-cols-[30rem_minmax(0,1fr)] xl:items-start">
        <InspectorPanel block={selectedBlock} onUpdateBlock={(updater) => { if (selectedBlockId) updateBlock(selectedBlockId, updater) }} onToggleHidden={() => { if (selectedBlockId) toggleBlockHidden(selectedBlockId) }} onRemoveBlock={() => { if (selectedBlockId) removeBlock(selectedBlockId) }} />
        <div>
          {error ? (
            <div className="border-2 border-[var(--border)] bg-[var(--surface)] p-5 text-sm leading-6 text-[var(--destructive)] shadow-[8px_8px_0px_0px_var(--shadow-color)]">
              {error}
            </div>
          ) : compiledProject ? (
            <LazyPDFPreviewSurface
              document={compiledProject.document}
              title={project.metadata.name}
              description="The editor keeps the preview visible while block order and properties change."
              modeLabel="Editor monitor"
              themeLabel={themePresetLabels[project.themePreset]}
              showPageRail
              themeOptions={(['professional', 'modern', 'minimal'] as const).map((preset) => ({
                preset,
                active: project.themePreset === preset,
                onSelect: () => setThemePreset(preset),
              }))}
              sectionOptions={invoiceBlockLibrary.map((section) => {
                const block = project.blocks.find((entry) => entry.type === section.type)
                return {
                  id: section.type,
                  label: section.title,
                  active: block?.id === selectedBlockId && !block.hidden,
                  muted: !block || block.hidden,
                  onSelect: () => {
                    if (!block || block.hidden) {
                      insertBlock(section.type, getInsertionIndex())
                      return
                    }

                    setSelectedBlockId(block.id)
                  },
                }
              })}
            />
          ) : (
            <div className="border-2 border-[var(--border)] bg-[var(--surface)] p-5 text-sm leading-6 shadow-[8px_8px_0px_0px_var(--shadow-color)]">
              {loading ? 'Compiling preview document for the selected template.' : 'Preparing preview document.'}
            </div>
          )}
        </div>
      </div>
    </StudioFrame>
  )
}
