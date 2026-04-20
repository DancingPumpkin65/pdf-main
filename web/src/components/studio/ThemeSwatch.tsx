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
}: {
  preset: ThemePreset
  active: boolean
  onClick: () => void
}) {
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
