import type { ReactNode } from 'react'
import { cn } from '@ds/utils'

export function SplitPane({
  left,
  center,
  right,
  className,
}: {
  left: ReactNode
  center: ReactNode
  right: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'grid gap-4 xl:grid-cols-[20rem_minmax(0,1fr)_22rem] xl:items-start',
        className,
      )}
    >
      {left}
      {center}
      {right}
    </div>
  )
}
