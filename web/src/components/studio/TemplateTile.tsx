import { Badge } from '@ds/components/Badge'
import { Button } from '@ds/components/Button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@ds/components/Card'
import type { TemplateCatalogItem } from '@/lib/template-catalog'

export function TemplateTile({
  template,
  active,
  onSelect,
  ctaLabel = 'Select',
}: {
  template: TemplateCatalogItem
  active: boolean
  onSelect: () => void
  ctaLabel?: string
}) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="border-b-2 border-[var(--border)]">
        <div className="flex items-center justify-between gap-3">
          <Badge variant="outline">{template.label}</Badge>
          <span className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--foreground-muted)]">
            {template.id}
          </span>
        </div>
        <CardTitle className="text-3xl">{template.title}</CardTitle>
        <p className="text-sm leading-6 text-[var(--foreground)]">{template.description}</p>
      </CardHeader>
      <CardContent className="flex-1 pt-6">
        <div className="flex flex-wrap gap-2">
          {template.blockLabels.map((block) => (
            <Badge key={block} variant="secondary">
              {block}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant={active ? 'primary' : 'outline'} className="w-full" onClick={onSelect}>
          {active ? 'Selected' : ctaLabel}
        </Button>
      </CardFooter>
    </Card>
  )
}
