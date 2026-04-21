import { FileJson2, Layers3, PanelTopClose, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@ds/components/Badge'
import { Button } from '@ds/components/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ds/components/Card'
import { MarketingNavbar } from '@ds/components/MarketingNavbar'
import { ThemeIconButton } from '@ds/components/ThemeIconButton'
import { useTheme } from '@ds/theme/ThemeProvider'
import { TemplateTile } from '@/components/studio/TemplateTile'
import { ThemeSwatch } from '@/components/studio/ThemeSwatch'
import { useProjectStore } from '@/lib/project-store'
import { themePresetLabels } from '@/lib/template-catalog'

const rails = [
  { title: 'PDF blocks', copy: 'Installed local source for classic, modern, and minimal invoice templates.', icon: Layers3 },
  { title: 'Theme tokens', copy: 'Professional, modern, and minimal presets are ready for routed studio flows.', icon: Sparkles },
  { title: 'Structure export', copy: 'A typed project file now drives template selection, compilation, and editor state.', icon: FileJson2 },
] as const

export function LandingPage() {
  const { theme, toggleTheme } = useTheme()
  const { project, compiledProject, templates, selectTemplate, setThemePreset, selectedBlock } =
    useProjectStore()

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <MarketingNavbar
        brand="PDFX/STUDIO"
        brandHref="/"
        items={[{ label: 'Templates', href: '#templates' }, { label: 'Workspace', href: '#workspace' }]}
        utilitySlot={<ThemeIconButton theme={theme} onToggle={toggleTheme} />}
        ctaLabel="Open Preview"
        ctaHref="/studio/preview"
      />
      <main id="top" className="px-4 pb-10 pt-28 sm:px-6 sm:pt-32">
        <section className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <Card className="overflow-hidden">
            <CardHeader className="gap-6 border-b-2 border-[var(--border)] bg-[var(--surface-alt)]">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary">Invoice Studio</Badge>
                <Badge variant="outline">Preview flow</Badge>
              </div>
              <div className="space-y-4">
                <CardTitle className="text-4xl sm:text-6xl">Build branded invoice PDFs from a local PDFx catalog.</CardTitle>
                <CardDescription className="max-w-2xl text-base leading-7 text-[var(--foreground)]">
                  Start from a seeded template, tune the theme direction, then move straight into preview or editor mode without leaving the project model.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 pt-6 sm:grid-cols-3">
              <div className="border-2 border-[var(--border)] bg-[var(--surface)] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--foreground-muted)]">Template</p>
                <p className="mt-3 text-lg font-black uppercase tracking-tight">{compiledProject.template.title}</p>
              </div>
              <div className="border-2 border-[var(--border)] bg-[var(--surface)] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--foreground-muted)]">Theme</p>
                <p className="mt-3 text-lg font-black uppercase tracking-tight">{themePresetLabels[project.themePreset]}</p>
              </div>
              <div className="border-2 border-[var(--border)] bg-[var(--surface)] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--foreground-muted)]">Output</p>
                <p className="mt-3 text-lg font-black uppercase tracking-tight">Structured JSON</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[var(--foreground)] text-[var(--foreground-inverse)] shadow-[12px_12px_0px_0px_var(--accent)]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="success">Catalog</Badge>
                <PanelTopClose className="h-5 w-5" />
              </div>
              <CardTitle className="text-3xl text-[var(--foreground-inverse)]">Three invoice directions loaded.</CardTitle>
              <CardDescription className="text-[var(--foreground-inverse)]/80">Each template is installed as local source under `src/blocks/pdfx`.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              {templates.map((template) => (
                <div key={template.id} className={`border-2 p-4 ${project.templateId === template.id ? 'border-[var(--accent-light)] bg-[var(--accent)]/25' : 'border-[var(--foreground-inverse)]/70 bg-[var(--foreground-inverse)]/8'}`}>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--foreground-inverse)]/70">{template.id}</p>
                  <p className="mt-2 text-lg font-black uppercase tracking-tight">{template.title}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section id="templates" className="mx-auto mt-8 max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--foreground-muted)]">Installed templates</p>
              <h2 className="mt-2 text-3xl font-black uppercase tracking-tight sm:text-4xl">Start from the invoice block that matches the client tone.</h2>
            </div>
            <Link to="/studio/preview">
              <Button asChild variant="primary">
                <span>Open Preview</span>
              </Button>
            </Link>
          </div>
          <div className="mt-6 grid gap-6 xl:grid-cols-3">
            {templates.map((template) => (
              <TemplateTile key={template.id} template={template} active={project.templateId === template.id} onSelect={() => selectTemplate(template.id)} ctaLabel="Choose Template" />
            ))}
          </div>
        </section>

        <section id="workspace" className="mx-auto mt-8 max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Card>
              <CardHeader className="border-b-2 border-[var(--border)] bg-[var(--surface-alt)]">
                <Badge variant="warning">Workspace</Badge>
                <CardTitle className="text-3xl">Shared shell, local PDF source.</CardTitle>
                <CardDescription className="text-sm leading-6 text-[var(--foreground)]">Product chrome comes from the shared design system while invoice blocks and theme tokens stay editable in the app workspace.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid gap-2 sm:grid-cols-3">
                  {compiledProject.template.supportedThemePresets.map((preset) => (
                    <ThemeSwatch key={preset} preset={preset} active={project.themePreset === preset} onClick={() => setThemePreset(preset)} />
                  ))}
                </div>
                <div className="border-2 border-[var(--border)] bg-[var(--surface)] p-4 text-sm">
                  <p className="font-bold uppercase tracking-[0.18em] text-[var(--foreground-muted)]">Project</p>
                  <p className="mt-3 text-lg font-black uppercase tracking-tight">{project.metadata.name}</p>
                  <p className="mt-2 leading-6 text-[var(--foreground)]">{project.metadata.description}</p>
                </div>
                <div className="border-2 border-[var(--border)] bg-[var(--surface)] p-4 text-sm">
                  <p className="font-bold uppercase tracking-[0.18em] text-[var(--foreground-muted)]">Current focus</p>
                  <p className="mt-3 text-lg font-black uppercase tracking-tight">{selectedBlock?.label ?? 'Header'}</p>
                  <p className="mt-2 leading-6 text-[var(--foreground)]">{compiledProject.visibleBlocks.length} visible blocks currently feed the PDF compiler and the editor timeline.</p>
                </div>
              </CardContent>
            </Card>
            <div className="grid gap-4 sm:grid-cols-3">
              {rails.map((rail) => {
                const Icon = rail.icon
                return (
                  <Card key={rail.title} className="h-full">
                    <CardHeader className="gap-4">
                      <div className="flex h-12 w-12 items-center justify-center border-2 border-[var(--border)] bg-[var(--surface-alt)]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-2xl">{rail.title}</CardTitle>
                      <CardDescription className="text-sm leading-6 text-[var(--foreground)]">{rail.copy}</CardDescription>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
