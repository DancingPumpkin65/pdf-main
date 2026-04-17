import { GripHorizontal } from 'lucide-react'
import { Badge } from '@ds/components/Badge'
import { Button } from '@ds/components/Button'
import { cn } from '@ds/utils'
import type { BlockNode } from '@/lib/project-schema'

export function TimelineTrack({
  blocks,
  selectedBlockId,
  onSelectBlock,
  onMoveBlock,
}: {
  blocks: BlockNode[]
  selectedBlockId: string | null
  onSelectBlock: (blockId: string) => void
  onMoveBlock: (blockId: string, delta: -1 | 1) => void
}) {
  return (
    <div className="overflow-hidden border-2 border-[var(--border)] bg-[var(--surface)] shadow-[8px_8px_0px_0px_var(--shadow-color)]">
      <div className="border-b-2 border-[var(--border)] bg-[var(--surface-alt)] px-4 py-3">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--foreground-muted)]">
          Timeline
        </p>
      </div>
      <div className="flex gap-3 overflow-x-auto px-4 py-4">
        {blocks.map((block, index) => (
          <div
            key={block.id}
            className={cn(
              'min-w-52 border-2 p-3 transition',
              selectedBlockId === block.id
                ? 'border-[var(--accent)] bg-[var(--accent-light)]/20'
                : 'border-[var(--border)] bg-[var(--surface-alt)]',
            )}
          >
            <button type="button" className="w-full text-left" onClick={() => onSelectBlock(block.id)}>
              <div className="flex items-center justify-between gap-3">
                <GripHorizontal className="h-4 w-4" />
                <Badge variant="outline">{index + 1}</Badge>
              </div>
              <p className="mt-4 text-base font-black uppercase tracking-tight">{block.label}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--foreground-muted)]">
                {block.type}
              </p>
            </button>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline" onClick={() => onMoveBlock(block.id, -1)}>
                Left
              </Button>
              <Button size="sm" variant="outline" onClick={() => onMoveBlock(block.id, 1)}>
                Right
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
