import { Badge } from '@ds/components/Badge'
import { Button } from '@ds/components/Button'
import { cn } from '@ds/utils'
import type { ThemePreset } from '@/lib/project-schema'
import { themePresetLabels } from '@/lib/template-catalog'

const toneClasses: Record<ThemePreset, string> = {
  professional: 'bg-[#18181b]',
  modern: 'bg-[#0f2d4f]',
  minimal: 'bg-[#101010]',
}

export function ThemeSwatch({
  preset,
  active,
  onClick,
  compact = false,
}: {
  preset: ThemePreset
  active: boolean
  onClick: () => void
  compact?: boolean
}) {
  if (compact) {
    return (
      <Button
        variant="outline"
        onClick={onClick}
        className={cn(
          'inline-flex min-h-11 items-center gap-2 border-2 px-3 py-2 text-left text-xs font-bold uppercase tracking-[0.16em] transition-all shadow-[4px_4px_0px_0px_var(--shadow-color)] cursor-pointer',
          active
            ? 'border-[var(--accent)] bg-[var(--accent-light)]/20 text-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--shadow-accent)]'
            : '',
        )}
      >
        <span>{themePresetLabels[preset]}</span>
      </Button>
    )
  }

  return (
    <Button
      variant={active ? 'primary' : 'outline'}
      className="h-auto w-full items-start justify-start px-3 py-3"
      onClick={onClick}
    >
      <div className="flex w-full items-center gap-3">
        <span
          className={cn(
            'h-5 w-5 border-2 border-[var(--border)] shadow-[2px_2px_0px_0px_var(--shadow-color)]',
            toneClasses[preset],
          )}
        />
        <span className="flex flex-col items-start text-left">
          <span>{themePresetLabels[preset]}</span>
          {active ? <Badge variant="secondary">Active</Badge> : null}
        </span>
      </div>
    </Button>
  )
}
