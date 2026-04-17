import * as React from 'react'
import { cn } from '@ds/utils'

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-28 w-full resize-y border-2 border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] font-mono transition-all placeholder:text-[var(--foreground-muted)] focus-visible:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-[4px_4px_0px_0px_var(--shadow-accent)] disabled:cursor-not-allowed disabled:opacity-40',
        className,
      )}
      {...props}
    />
  ),
)

Textarea.displayName = 'Textarea'
