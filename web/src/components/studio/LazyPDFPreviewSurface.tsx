import { Suspense, lazy, type ReactElement } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@ds/components/Card'

const PDFPreviewSurface = lazy(async () => {
  const module = await import('./PDFPreviewSurface')
  return { default: module.PDFPreviewSurface }
})

function PreviewFallback({ title }: { title: string }) {
  return (
    <Card>
      <CardHeader className="border-b-2 border-[var(--border)] bg-[var(--surface-alt)]">
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 text-sm leading-6">
        Loading the PDF runtime and viewer surface.
      </CardContent>
    </Card>
  )
}

export function LazyPDFPreviewSurface({
  document,
  title,
  description,
}: {
  document: ReactElement
  title: string
  description: string
}) {
  return (
    <Suspense fallback={<PreviewFallback title={title} />}>
      <PDFPreviewSurface document={document} title={title} description={description} />
    </Suspense>
  )
}
