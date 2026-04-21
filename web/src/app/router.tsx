import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LandingPage } from '@/routes/LandingPage'
import { StudioEditorPage } from '@/routes/StudioEditorPage'
import { StudioPreviewPage } from '@/routes/StudioPreviewPage'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/studio/preview" element={<StudioPreviewPage />} />
        <Route path="/studio/editor" element={<StudioEditorPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
