import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@ds/theme/ThemeProvider'
import { ProjectStoreProvider } from '@/lib/project-store'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ProjectStoreProvider>
        <App />
      </ProjectStoreProvider>
    </ThemeProvider>
  </StrictMode>,
)
