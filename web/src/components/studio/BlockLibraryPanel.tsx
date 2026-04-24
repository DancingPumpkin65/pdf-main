import { Badge } from '@ds/components/Badge'
import { Button } from '@ds/components/Button'
import { cn } from '@ds/utils'
import type { BlockNode, InvoiceBlockType } from '@/lib/project-schema'
import { invoiceBlockLibrary } from '@/lib/template-catalog'

function getBlockStatus(block: BlockNode | undefined) {
  if (!block) {
    return {
      label: 'Missing',
      badgeVariant: 'destructive' as const,
      actionLabel: 'Insert',
    }
  }

  if (block.hidden) {
    return {
      label: 'Hidden',
      badgeVariant: 'warning' as const,
      actionLabel: 'Reveal',
    }
  }

  return {
    label: 'Live',
    badgeVariant: 'success' as const,
    actionLabel: 'Focus',
  }
}

export function BlockLibraryPanel({
  blocks,
  selectedBlockId,
  onInsertBlock,
  onSelectBlock,
}: {
  blocks: BlockNode[]
  selectedBlockId: string | null
  onInsertBlock: (blockType: InvoiceBlockType) => void
  onSelectBlock: (blockId: string) => void
}) {
  return (
    <div className="overflow-hidden border-2 border-[var(--border)] bg-[var(--surface)] shadow-[8px_8px_0px_0px_var(--shadow-color)]">
      <div className="border-b-2 border-[var(--border)] bg-[var(--surface-alt)] px-4 py-3">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--foreground-muted)]">
          Section library
        </p>
      </div>
      <div className="space-y-3 p-4">
        {invoiceBlockLibrary.map((entry) => {
          const block = blocks.find((item) => item.type === entry.type)
          const status = getBlockStatus(block)
          const isSelected = block?.id === selectedBlockId && !block.hidden

          return (
            <div
              key={entry.type}
              className={cn(
                'border-2 p-3 transition-colors',
                isSelected
                  ? 'border-[var(--accent)] bg-[var(--accent-light)]/20'
                  : 'border-[var(--border)] bg-[var(--surface)]',
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.16em]">{entry.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                    {entry.description}
                  </p>
                </div>
                <Badge variant={status.badgeVariant}>{status.label}</Badge>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--foreground-muted)]">
                  {block ? block.id : 'Not in the current timeline'}
                </span>
                <Button
                  size="sm"
                  variant={block && !block.hidden ? 'outline' : 'primary'}
                  onClick={() => (block && !block.hidden ? onSelectBlock(block.id) : onInsertBlock(entry.type))}
                >
                  {status.actionLabel}
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
