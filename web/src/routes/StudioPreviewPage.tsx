import { useDeferredValue, useState } from 'react'
import { Button } from '@ds/components/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@ds/components/Card'
import { LazyPDFPreviewSurface } from '@/components/studio/LazyPDFPreviewSurface'
import { StudioFrame } from '@/components/studio/StudioFrame'
import { Textarea } from '@/components/studio/Textarea'
import { useCompiledProject } from '@/hooks/useCompiledProject'
import { useProjectStore } from '@/lib/project-store'
import { themePresetLabels } from '@/lib/template-catalog'

export function StudioPreviewPage() {
  const { project, setThemePreset, importProjectJson, exportProjectJson } = useProjectStore()
  const { compiledProject, base, loading, error } = useCompiledProject(project)
  const deferredDocument = useDeferredValue(compiledProject?.document ?? null)
  const [importValue, setImportValue] = useState('')
  const [importError, setImportError] = useState<string | null>(null)

  return (
    <StudioFrame title="Preview">
      <div className="grid gap-4 xl:grid-cols-[30rem_minmax(0,1fr)] xl:items-start">
        <div>
          <Card>
            <CardHeader className="border-b-2 border-[var(--border)] bg-[var(--surface-alt)]">
              <CardTitle className="text-2xl">Project file</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-5">
              <p className="text-sm leading-6 text-[var(--foreground-muted)]">
                Export the current project state or paste a saved file to resume the session.
              </p>
              <Button variant="outline" onClick={async () => { await navigator.clipboard.writeText(exportProjectJson()) }}>
                Copy project JSON
              </Button>
              <Textarea className="min-h-32" value={importValue} onChange={(event) => setImportValue(event.target.value)} placeholder="Paste project JSON to import" />
              {importError ? <p className="text-sm text-[var(--destructive)]">{importError}</p> : null}
              <Button variant="primary" onClick={() => { const result = importProjectJson(importValue); setImportError(result.ok ? null : result.error) }}>Import JSON</Button>
            </CardContent>
          </Card>
        </div>
        <div>
          {error ? (
            <Card>
              <CardHeader className="border-b-2 border-[var(--border)] bg-[var(--surface-alt)]">
                <CardTitle className="text-2xl">Preview error</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 text-sm leading-6 text-[var(--destructive)]">{error}</CardContent>
            </Card>
          ) : deferredDocument ? (
            <LazyPDFPreviewSurface
              document={deferredDocument}
              title={project.metadata.name}
              description="Editing the project model updates the compiled PDF document rendered from the local PDFx blocks."
              modeLabel="Preview deck"
              themeLabel={themePresetLabels[project.themePreset]}
              themeOptions={base.template.supportedThemePresets.map((preset) => ({
                preset,
                active: project.themePreset === preset,
                onSelect: () => setThemePreset(preset),
              }))}
            />
          ) : (
            <Card>
              <CardHeader className="border-b-2 border-[var(--border)] bg-[var(--surface-alt)]">
                <CardTitle className="text-2xl">{loading ? 'Compiling preview' : 'Preparing preview'}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 text-sm leading-6">The PDF document is loading for the selected template.</CardContent>
            </Card>
          )}
        </div>
      </div>
    </StudioFrame>
  )
}
