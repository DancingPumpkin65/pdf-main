import { FileJson2, Layers3, PanelTopClose, Sparkles } from 'lucide-react'
import { Badge } from '@ds/components/Badge'
import { Button } from '@ds/components/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@ds/components/Card'
import { MarketingNavbar } from '@ds/components/MarketingNavbar'
import { ThemeIconButton } from '@ds/components/ThemeIconButton'
import { useTheme } from '@ds/theme/ThemeProvider'

const templates = [
  {
    slug: 'invoice-classic',
    title: 'Classic',
    label: 'Professional',
    description:
      'Logo-left header, structured billing bands, and a zebra-striped line item table.',
    blocks: ['Header', 'Billing', 'Items', 'Totals'],
  },
  {
    slug: 'invoice-modern',
    title: 'Modern',
    label: 'Branded',
    description:
      'Full-width banner header with a sharper hierarchy for client-facing branded invoices.',
    blocks: ['Banner', 'Meta strip', 'Table', 'Summary'],
  },
  {
    slug: 'invoice-minimal',
    title: 'Minimal',
    label: 'Editorial',
    description:
      'Compact spacing and lean typography tuned for low-noise proposals and retainers.',
    blocks: ['Stamp', 'Client info', 'Compact items', 'Notes'],
  },
] as const

const rails = [
  {
    title: 'PDF blocks',
    copy: 'Installed local source for classic, modern, and minimal invoice templates.',
    icon: Layers3,
  },
  {
    title: 'Theme tokens',
    copy: 'Professional PDF theme scaffolded and ready to branch into modern and minimal presets.',
    icon: Sparkles,
  },
  {
    title: 'Structure export',
    copy: 'App shell prepared for the JSON-first project model that will drive preview and editor modes.',
    icon: FileJson2,
  },
] as const

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <MarketingNavbar
        brand="PDFX/STUDIO"
        brandHref="#top"
        items={[
          { label: 'Templates', href: '#templates' },
          { label: 'Workspace', href: '#workspace' },
        ]}
        utilitySlot={<ThemeIconButton theme={theme} onToggle={toggleTheme} />}
        ctaLabel="Open Studio"
        ctaHref="#templates"
      />

      <main id="top" className="px-4 pb-10 pt-28 sm:px-6 sm:pt-32">
        <section className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <Card className="overflow-hidden">
            <CardHeader className="gap-6 border-b-2 border-[var(--border)] bg-[var(--surface-alt)]">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary">Invoice Studio</Badge>
                <Badge variant="outline">Live preview next</Badge>
              </div>
              <div className="space-y-4">
                <CardTitle className="text-4xl sm:text-6xl">
                  Build branded invoice PDFs from a local PDFx catalog.
                </CardTitle>
                <CardDescription className="max-w-2xl text-base leading-7 text-[var(--foreground)]">
                  Choose a base invoice direction, keep the product chrome consistent with the
                  shared design system, and prepare the workspace for preview and editing flows.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 pt-6 sm:grid-cols-3">
              <div className="border-2 border-[var(--border)] bg-[var(--surface)] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--foreground-muted)]">
                  Source
                </p>
                <p className="mt-3 text-lg font-black uppercase tracking-tight">Copy-paste PDFx</p>
              </div>
              <div className="border-2 border-[var(--border)] bg-[var(--surface)] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--foreground-muted)]">
                  Mode
                </p>
                <p className="mt-3 text-lg font-black uppercase tracking-tight">Preview first</p>
              </div>
              <div className="border-2 border-[var(--border)] bg-[var(--surface)] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--foreground-muted)]">
                  Output
                </p>
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
              <CardTitle className="text-3xl text-[var(--foreground-inverse)]">
                Three invoice directions loaded.
              </CardTitle>
              <CardDescription className="text-[var(--foreground-inverse)]/80">
                Each template is installed as local source under `src/blocks/pdfx`.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              {templates.map((template) => (
                <div
                  key={template.slug}
                  className="border-2 border-[var(--foreground-inverse)]/70 bg-[var(--foreground-inverse)]/8 p-4"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--foreground-inverse)]/70">
                    {template.slug}
                  </p>
                  <p className="mt-2 text-lg font-black uppercase tracking-tight">{template.title}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section id="templates" className="mx-auto mt-8 max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--foreground-muted)]">
                Installed templates
              </p>
              <h2 className="mt-2 text-3xl font-black uppercase tracking-tight sm:text-4xl">
                Start from the invoice block that matches the client tone.
              </h2>
            </div>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-3">
            {templates.map((template) => (
              <Card key={template.slug} className="flex h-full flex-col">
                <CardHeader className="border-b-2 border-[var(--border)]">
                  <div className="flex items-center justify-between gap-3">
                    <Badge variant="outline">{template.label}</Badge>
                    <span className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--foreground-muted)]">
                      {template.slug}
                    </span>
                  </div>
                  <CardTitle className="text-3xl">{template.title}</CardTitle>
                  <CardDescription className="text-sm leading-6 text-[var(--foreground)]">
                    {template.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pt-6">
                  <div className="flex flex-wrap gap-2">
                    {template.blocks.map((block) => (
                      <Badge key={block} variant="secondary">
                        {block}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" className="w-full">
                    Select Template
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section id="workspace" className="mx-auto mt-8 max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Card>
              <CardHeader className="border-b-2 border-[var(--border)] bg-[var(--surface-alt)]">
                <Badge variant="warning">Workspace</Badge>
                <CardTitle className="text-3xl">Shared shell, local PDF source.</CardTitle>
                <CardDescription className="text-sm leading-6 text-[var(--foreground)]">
                  Product chrome comes from the shared design system while invoice blocks and
                  theme tokens stay editable in the app workspace.
                </CardDescription>
              </CardHeader>
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
                      <CardDescription className="text-sm leading-6 text-[var(--foreground)]">
                        {rail.copy}
                      </CardDescription>
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

export default App
