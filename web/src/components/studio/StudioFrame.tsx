import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { DashboardNavbar } from '@ds/components/DashboardNavbar'
import { Button } from '@ds/components/Button'
import { ThemeIconButton } from '@ds/components/ThemeIconButton'
import { useTheme } from '@ds/theme/ThemeProvider'

export function StudioFrame({
  title,
  actionSlot,
  children,
}: {
  title: string
  actionSlot?: ReactNode
  children: ReactNode
}) {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <DashboardNavbar
        brand="PDFX/STUDIO"
        brandHref="/"
        paths={[{ label: 'Studio', href: '/studio/preview' }, { label: title }]}
        utilitySlot={<ThemeIconButton theme={theme} onToggle={toggleTheme} />}
        actionSlot={
          <div className="flex flex-wrap items-center gap-2">
            <NavLink to="/studio/preview">
              {({ isActive }) => (
                <Button asChild variant={isActive ? 'primary' : 'outline'} size="sm">
                  <span>Preview</span>
                </Button>
              )}
            </NavLink>
            <NavLink to="/studio/editor">
              {({ isActive }) => (
                <Button asChild variant={isActive ? 'primary' : 'outline'} size="sm">
                  <span>Editor</span>
                </Button>
              )}
            </NavLink>
            {actionSlot}
          </div>
        }
      />
      <main className="px-4 py-6 sm:px-6">{children}</main>
    </div>
  )
}
