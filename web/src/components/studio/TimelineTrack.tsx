import { Eye, EyeOff, GripHorizontal } from 'lucide-react'
import { Badge } from '@ds/components/Badge'
import { Button } from '@ds/components/Button'
import { cn } from '@ds/utils'
import type { BlockNode } from '@/lib/project-schema'

export function TimelineTrack({
  blocks,
  selectedBlockId,
  onSelectBlock,
  onMoveBlock,
  onToggleHidden,
}: {
  blocks: BlockNode[]
  selectedBlockId: string | null
  onSelectBlock: (blockId: string) => void
  onMoveBlock: (blockId: string, delta: -1 | 1) => void
  onToggleHidden: (blockId: string) => void
}) {
  return (
    <div className="overflow-hidden border-2 border-[var(--border)] bg-[var(--surface)] shadow-[8px_8px_0px_0px_var(--shadow-color)]">
      <div className="border-b-2 border-[var(--border)] bg-[var(--surface-alt)] px-4 py-3">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--foreground-muted)]">
          Timeline
        </p>
      </div>
      <div className="flex min-w-max gap-3 overflow-x-auto px-4 py-4">
        {blocks.map((block, index) => (
          <div
            key={block.id}
            className={cn(
              'min-w-56 border-2 transition',
              selectedBlockId === block.id
                ? 'border-[var(--accent)] bg-[var(--accent-light)]/20'
                : 'border-[var(--border)] bg-[var(--surface-alt)]',
              block.hidden ? 'opacity-70' : '',
            )}
          >
            <div className="flex items-center justify-between border-b-2 border-[var(--border)] px-3 py-2">
              <div className="flex items-center gap-2 text-[var(--foreground-muted)]">
                <GripHorizontal className="h-4 w-4" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
                  Clip {index + 1}
                </span>
              </div>
              <Badge variant={block.hidden ? 'warning' : 'outline'}>
                {block.hidden ? 'Hidden' : 'Live'}
              </Badge>
            </div>
            <button type="button" className="w-full px-3 py-3 text-left" onClick={() => onSelectBlock(block.id)}>
              <p className="mt-4 text-base font-black uppercase tracking-tight">{block.label}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--foreground-muted)]">
                {block.type}
              </p>
            </button>
            <div className="grid grid-cols-3 gap-2 border-t-2 border-[var(--border)] px-3 py-3">
              <Button size="sm" variant="outline" onClick={() => onMoveBlock(block.id, -1)}>
                Left
              </Button>
              <Button size="sm" variant="outline" onClick={() => onMoveBlock(block.id, 1)}>
                Right
              </Button>
              <Button size="sm" variant="outline" onClick={() => onToggleHidden(block.id)}>
                {block.hidden ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                {block.hidden ? 'Show' : 'Hide'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
