import { Suspense, lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

const LandingPage = lazy(async () => {
  const module = await import('@/routes/LandingPage')
  return { default: module.LandingPage }
})

const StudioPreviewPage = lazy(async () => {
  const module = await import('@/routes/StudioPreviewPage')
  return { default: module.StudioPreviewPage }
})

const StudioEditorPage = lazy(async () => {
  const module = await import('@/routes/StudioEditorPage')
  return { default: module.StudioEditorPage }
})

function RouteFallback() {
  return (
    <div className="min-h-screen bg-[var(--background)] px-4 py-8 text-[var(--foreground)] sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center border-2 border-[var(--border)] bg-[var(--surface)] shadow-[10px_10px_0px_0px_var(--shadow-color)]">
        <div className="space-y-3 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--foreground-muted)]">
            Loading route
          </p>
          <p className="text-2xl font-black uppercase tracking-tight">Preparing studio surface</p>
        </div>
      </div>
    </div>
  )
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/studio/preview" element={<StudioPreviewPage />} />
          <Route path="/studio/editor" element={<StudioEditorPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
