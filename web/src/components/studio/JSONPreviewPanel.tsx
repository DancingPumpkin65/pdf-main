import { Badge } from '@ds/components/Badge'
import { cn } from '@ds/utils'
import type { ProjectFile } from '@/lib/project-schema'

export function JSONPreviewPanel({
  project,
  selectedBlockId,
  onSelectBlock,
}: {
  project: ProjectFile
  selectedBlockId: string | null
  onSelectBlock: (blockId: string) => void
}) {
  return (
    <div className="overflow-hidden border-2 border-[var(--border)] bg-[var(--foreground)] text-[var(--foreground-inverse)] shadow-[8px_8px_0px_0px_var(--shadow-color)]">
      <div className="flex items-center justify-between border-b-2 border-[var(--foreground-inverse)]/15 px-4 py-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--foreground-inverse)]/70">
            Structure
          </p>
          <p className="mt-1 text-sm font-bold uppercase tracking-[0.18em]">Project JSON</p>
        </div>
        <Badge variant="outline">{project.blocks.length} blocks</Badge>
      </div>

      <div className="max-h-[28rem] overflow-auto p-3 font-mono text-xs leading-6">
        {project.blocks.map((block) => (
          <button
            key={block.id}
            type="button"
            onClick={() => onSelectBlock(block.id)}
            className={cn(
              'mb-2 flex w-full items-center justify-between border-2 px-3 py-2 text-left transition',
              selectedBlockId === block.id
                ? 'border-[var(--accent-light)] bg-[var(--accent)]/20'
                : 'border-[var(--foreground-inverse)]/15 bg-transparent hover:border-[var(--foreground-inverse)]/45',
            )}
          >
            <span className="font-bold uppercase tracking-[0.16em]">{block.label}</span>
            <span className="text-[10px] uppercase tracking-[0.16em] text-[var(--foreground-inverse)]/60">
              {block.type}
            </span>
          </button>
        ))}
        <pre className="overflow-x-auto whitespace-pre-wrap text-[11px] text-[var(--foreground-inverse)]/78">
          {JSON.stringify(project, null, 2)}
        </pre>
      </div>
    </div>
  )
}
