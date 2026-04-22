import { useDeferredValue, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@ds/components/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@ds/components/Card'
import { Input } from '@ds/components/Input'
import { JSONPreviewPanel } from '@/components/studio/JSONPreviewPanel'
import { PDFPreviewSurface } from '@/components/studio/PDFPreviewSurface'
import { SplitPane } from '@/components/studio/SplitPane'
import { StudioFrame } from '@/components/studio/StudioFrame'
import { Textarea } from '@/components/studio/Textarea'
import { ThemeSwatch } from '@/components/studio/ThemeSwatch'
import { compileProject } from '@/lib/project-compiler'
import { useProjectStore } from '@/lib/project-store'

export function StudioPreviewPage() {
  const { project, selectedBlockId, setSelectedBlockId, updateMetadata, setThemePreset, importProjectJson, exportProjectJson } = useProjectStore()
  const compiledProject = compileProject(project)
  const deferredDocument = useDeferredValue(compiledProject.document)
  const [importValue, setImportValue] = useState('')
  const [importError, setImportError] = useState<string | null>(null)

  return (
    <StudioFrame title="Preview" actionSlot={<Link to="/studio/editor"><Button asChild size="sm" variant="primary"><span>Open editor</span></Button></Link>}>
      <SplitPane
        left={
          <div className="space-y-4">
            <Card>
              <CardHeader className="border-b-2 border-[var(--border)] bg-[var(--surface-alt)]">
                <CardTitle className="text-2xl">Document controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-6">
                <Input value={project.metadata.name} onChange={(event) => updateMetadata({ name: event.target.value })} placeholder="Project name" />
                <Textarea className="min-h-24" value={project.metadata.description} onChange={(event) => updateMetadata({ description: event.target.value })} placeholder="Describe the invoice project" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="border-b-2 border-[var(--border)] bg-[var(--surface-alt)]">
                <CardTitle className="text-2xl">Theme</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 pt-6">
                {compiledProject.template.supportedThemePresets.map((preset) => (
                  <ThemeSwatch key={preset} preset={preset} active={project.themePreset === preset} onClick={() => setThemePreset(preset)} />
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="border-b-2 border-[var(--border)] bg-[var(--surface-alt)]">
                <CardTitle className="text-2xl">Import / export</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-6">
                <Button variant="outline" onClick={async () => { await navigator.clipboard.writeText(exportProjectJson()) }}>Copy project JSON</Button>
                <Textarea className="min-h-32" value={importValue} onChange={(event) => setImportValue(event.target.value)} placeholder="Paste project JSON to import" />
                {importError ? <p className="text-sm text-[var(--destructive)]">{importError}</p> : null}
                <Button variant="primary" onClick={() => { const result = importProjectJson(importValue); setImportError(result.ok ? null : result.error) }}>Import JSON</Button>
              </CardContent>
            </Card>
          </div>
        }
        center={<PDFPreviewSurface document={deferredDocument} title={project.metadata.name} description="Editing the project model updates the compiled PDF document rendered from the local PDFx blocks." />}
        right={<JSONPreviewPanel project={project} selectedBlockId={selectedBlockId} onSelectBlock={setSelectedBlockId} />}
      />
    </StudioFrame>
  )
}
