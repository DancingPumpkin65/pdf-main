import { useEffect, useState, type ReactElement } from 'react'
import { PDFDownloadLink, PDFViewer, type DocumentProps } from '@react-pdf/renderer'
import { Badge } from '@ds/components/Badge'
import { Button } from '@ds/components/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ds/components/Card'

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

export function PDFPreviewSurface({
  document,
  title,
  description,
}: {
  document: ReactElement
  title: string
  description: string
}) {
  const compact = useCompactPreview()
  const pdfDocument = document as ReactElement<DocumentProps>

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b-2 border-[var(--border)] bg-[var(--surface-alt)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <Badge variant="secondary">Live PDF</Badge>
            <CardTitle className="mt-3 text-3xl">{title}</CardTitle>
            <CardDescription className="mt-2 max-w-2xl text-sm leading-6 text-[var(--foreground)]">
              {description}
            </CardDescription>
          </div>
          {compact ? (
            <PDFDownloadLink document={pdfDocument} fileName="pdfx-studio-preview.pdf">
              {({ loading }) => (
                <Button variant="primary">{loading ? 'Preparing PDF' : 'Download PDF'}</Button>
              )}
            </PDFDownloadLink>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="bg-[var(--surface-alt)] p-4">
        {compact ? (
          <div className="flex min-h-[32rem] items-center justify-center border-2 border-dashed border-[var(--border)] bg-[var(--surface)] p-6 text-center">
            <div className="max-w-sm space-y-3">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[var(--foreground-muted)]">
                Compact preview mode
              </p>
              <p className="text-base leading-7">
                Embedded PDF viewing is replaced with direct download on narrower screens so the
                workspace stays usable.
              </p>
            </div>
          </div>
        ) : (
          <div className="h-[calc(100vh-15rem)] min-h-[42rem] overflow-hidden border-2 border-[var(--border)] bg-white shadow-[10px_10px_0px_0px_var(--shadow-color)]">
            <PDFViewer width="100%" height="100%" showToolbar>
              {pdfDocument}
            </PDFViewer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
