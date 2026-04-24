import { useEffect, useState, type ReactElement } from 'react'
import { PDFDownloadLink, PDFViewer, type DocumentProps } from '@react-pdf/renderer'
import { Badge } from '@ds/components/Badge'
import { Button } from '@ds/components/Button'
import { cn } from '@ds/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ds/components/Card'
import type { ThemePreset } from '@/lib/project-schema'
import { ThemeSwatch } from './ThemeSwatch'

function useCompactPreview() {
  const [compact, setCompact] = useState<boolean>(() =>
    typeof window === 'undefined' ? false : window.innerWidth < 1100,
  )

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const media = window.matchMedia('(max-width: 1100px)')
    const onChange = () => setCompact(media.matches)
    onChange()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return compact
}

type ThemeOption = {
  preset: ThemePreset
  active: boolean
  onSelect: () => void
}

type SectionOption = {
  id: string
  label: string
  active: boolean
  muted?: boolean
  onSelect: () => void
}

function PageRail({ sectionOptions }: { sectionOptions: SectionOption[] }) {
  const liveSections = sectionOptions.filter((option) => !option.muted)

  return (
    <aside className="border-2 border-[var(--border)] bg-[var(--foreground)] p-3 text-[var(--foreground-inverse)] ">
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--foreground-inverse)]/65">
        Page rail
      </p>
      <button
        type="button"
        className="mt-3 w-full rounded border-2 border-[var(--foreground-inverse)] bg-[#f8f7f2] p-3 text-left text-[var(--foreground)]"
      >
        <div className="aspect-[1/1.35] border-2 border-[var(--border)] bg-white p-3 ">
          <div className="flex h-full flex-col gap-2">
            <div className="h-4 w-16 bg-[var(--foreground)]/85" />
            <div className="h-2 w-10 bg-[var(--accent)]/60" />
            <div className="mt-2 grid gap-1">
              {liveSections.slice(0, 6).map((section) => (
                <div
                  key={section.id}
                  className={cn(
                    'h-2 bg-[var(--border)]/35',
                    section.active ? 'bg-[var(--accent)]/55' : '',
                  )}
                />
              ))}
            </div>
            <div className="mt-auto flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--foreground-muted)]">
              <span>P01</span>
              <span>{liveSections.length} clips</span>
            </div>
          </div>
        </div>
        <p className="mt-3 text-xs font-black uppercase tracking-[0.16em]">Page 01</p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[var(--foreground-muted)]">
          Invoice board
        </p>
      </button>
      <div className="mt-4 border-t border-[var(--foreground-inverse)]/15 pt-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--foreground-inverse)]/65">
          Operator notes
        </p>
        <p className="mt-2 text-xs leading-6 text-[var(--foreground-inverse)]/85">
          Use the native toolbar for zoom and print. Use the section controls above to jump back into a section edit.
        </p>
      </div>
    </aside>
  )
}

export function PDFPreviewSurface({
  document,
  title,
  description,
  modeLabel = 'Studio monitor',
  themeLabel,
  themeOptions = [],
  sectionOptions = [],
  showPageRail = false,
}: {
  document: ReactElement
  title: string
  description: string
  modeLabel?: string
  themeLabel?: string
  themeOptions?: ThemeOption[]
  sectionOptions?: SectionOption[]
  showPageRail?: boolean
}) {
  const compact = useCompactPreview()
  const pdfDocument = document as ReactElement<DocumentProps>

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b-2 border-[var(--border)] bg-[var(--surface-alt)] p-5">
        <div className="flex flex-row items-start justify-between gap-3">
          {compact ? (
            <PDFDownloadLink document={pdfDocument} fileName="pdfx-studio-preview.pdf">
              {({ loading }) => (
                <Button variant="primary">{loading ? 'Preparing PDF' : 'Download PDF'}</Button>
              )}
            </PDFDownloadLink>
          ) : null}

          {themeOptions.length ? (
            <div className="mt-5">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--foreground-muted)]">
                Theme
              </p>
              <div className="flex flex-wrap gap-2">
                {themeOptions.map((option) => (
                  <ThemeSwatch
                    key={option.preset}
                    preset={option.preset}
                    active={option.active}
                    onClick={option.onSelect}
                    compact
                  />
                ))}
              </div>
            </div>
          ) : null}

          {sectionOptions.length ? (
            <div className="mt-4">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--foreground-muted)]">
                Sections
              </p>
              <div className="flex flex-wrap gap-2">
                {sectionOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={option.onSelect}
                    className={cn(
                      'min-h-11 border-2 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] transition-colors',
                      option.active
                        ? 'border-[var(--accent)] bg-[var(--accent-light)]/20 text-[var(--foreground)]'
                        : option.muted
                          ? 'border-[var(--border-subtle)] bg-[var(--surface)] text-[var(--foreground-muted)] hover:border-[var(--border)] hover:text-[var(--foreground)]'
                          : 'border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-alt)]',
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="bg-[var(--surface-alt)] p-4">
        {compact ? (
          <div className="flex min-h-[28rem] items-center justify-center border-2 border-dashed border-[var(--border)] bg-[var(--surface)] p-6 text-center">
            <div className="max-w-sm space-y-3">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[var(--foreground-muted)]">
                Compact preview mode
              </p>
              <p className="text-base leading-7">
                Embedded viewing is replaced with direct export on narrower screens so the workspace keeps its shape.
              </p>
            </div>
          </div>
        ) : (
          <div className={cn('grid gap-4', showPageRail ? 'xl:grid-cols-[12rem_minmax(0,1fr)]' : '')}>
            {showPageRail ? <PageRail sectionOptions={sectionOptions} /> : null}
            <div className="h-[calc(100vh-13.5rem)] min-h-[44rem] overflow-hidden border-2 border-[var(--border)] bg-white">
              <PDFViewer width="100%" height="100%" showToolbar>
                {pdfDocument}
              </PDFViewer>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
