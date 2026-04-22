/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  parseProjectFile,
  safeParseProjectFile,
  serializeProjectFile,
  type BlockNode,
  type ProjectFile,
  type ProjectMetadata,
  type TemplateId,
  type ThemePreset,
} from './project-schema'
import { createDefaultProject, templateCatalog } from './template-catalog'

const STORAGE_KEY = 'pdfx-studio.project'

type ProjectContextValue = {
  project: ProjectFile
  templates: typeof templateCatalog
  selectedBlockId: string | null
  selectedBlock: BlockNode | null
  selectTemplate: (templateId: TemplateId) => void
  setThemePreset: (preset: ThemePreset) => void
  setSelectedBlockId: (blockId: string | null) => void
  updateProject: (updater: ProjectFile | ((current: ProjectFile) => ProjectFile)) => void
  updateMetadata: (metadata: Partial<ProjectMetadata>) => void
  updateBlock: (blockId: string, updater: (block: BlockNode) => BlockNode) => void
  reorderBlocks: (blockId: string, targetIndex: number) => void
  duplicateBlock: (blockId: string) => void
  removeBlock: (blockId: string) => void
  resetProject: (templateId?: TemplateId) => void
  importProjectJson: (json: string) => { ok: true } | { ok: false; error: string }
  exportProjectJson: () => string
}

const ProjectStoreContext = createContext<ProjectContextValue | null>(null)

function getFirstBlockId(project: ProjectFile) {
  return project.blocks[0]?.id ?? null
}

function readStoredProject() {
  if (typeof window === 'undefined') {
    return null
  }

  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return null
  }

  try {
    const parsed = JSON.parse(raw)
    const result = safeParseProjectFile(parsed)
    return result.success ? result.data : null
  } catch {
    return null
  }
}

function touchProject(project: ProjectFile): ProjectFile {
  return {
    ...project,
    metadata: {
      ...project.metadata,
      updatedAt: new Date().toISOString(),
    },
  }
}

function cloneBlock(block: BlockNode, nextId: string): BlockNode {
  const cloned = JSON.parse(JSON.stringify(block)) as BlockNode
  return {
    ...cloned,
    id: nextId,
    label: `${cloned.label} Copy`,
  }
}

function createBlockId(blockId: string) {
  return `${blockId}-copy-${Date.now()}`
}

export function ProjectStoreProvider({ children }: { children: ReactNode }) {
  const [project, setProject] = useState<ProjectFile>(
    () => readStoredProject() ?? createDefaultProject('invoice-classic'),
  )
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(() => getFirstBlockId(project))

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem(STORAGE_KEY, serializeProjectFile(project))
  }, [project])

  const resolvedSelectedBlockId = project.blocks.some((block) => block.id === selectedBlockId)
    ? selectedBlockId
    : getFirstBlockId(project)
  const selectedBlock = project.blocks.find((block) => block.id === resolvedSelectedBlockId) ?? null

  const updateProject: ProjectContextValue['updateProject'] = (updater) => {
    setProject((current) => {
      const next = typeof updater === 'function' ? updater(current) : updater
      return touchProject(parseProjectFile(next))
    })
  }

  const value = useMemo<ProjectContextValue>(
    () => ({
      project,
      templates: templateCatalog,
      selectedBlockId: resolvedSelectedBlockId,
      selectedBlock,
      selectTemplate: (templateId) => {
        startTransition(() => {
          const nextProject = createDefaultProject(templateId)
          setProject(nextProject)
          setSelectedBlockId(getFirstBlockId(nextProject))
        })
      },
      setThemePreset: (preset) => {
        updateProject((current) => ({
          ...current,
          themePreset: preset,
        }))
      },
      setSelectedBlockId,
      updateProject,
      updateMetadata: (metadata) => {
        updateProject((current) => ({
          ...current,
          metadata: {
            ...current.metadata,
            ...metadata,
          },
        }))
      },
      updateBlock: (blockId, updater) => {
        updateProject((current) => ({
          ...current,
          blocks: current.blocks.map((block) => (block.id === blockId ? updater(block) : block)),
        }))
      },
      reorderBlocks: (blockId, targetIndex) => {
        updateProject((current) => {
          const sourceIndex = current.blocks.findIndex((block) => block.id === blockId)
          if (sourceIndex < 0) {
            return current
          }

          const clampedIndex = Math.max(0, Math.min(targetIndex, current.blocks.length - 1))
          const nextBlocks = [...current.blocks]
          const [moved] = nextBlocks.splice(sourceIndex, 1)
          nextBlocks.splice(clampedIndex, 0, moved)

          return {
            ...current,
            blocks: nextBlocks,
          }
        })
      },
      duplicateBlock: (blockId) => {
        updateProject((current) => {
          const sourceIndex = current.blocks.findIndex((block) => block.id === blockId)
          if (sourceIndex < 0) {
            return current
          }

          const nextBlocks = [...current.blocks]
          const duplicate = cloneBlock(nextBlocks[sourceIndex], createBlockId(blockId))
          nextBlocks.splice(sourceIndex + 1, 0, duplicate)

          return {
            ...current,
            blocks: nextBlocks,
          }
        })
      },
      removeBlock: (blockId) => {
        updateProject((current) => ({
          ...current,
          blocks: current.blocks.filter((block) => block.id !== blockId),
        }))
      },
      resetProject: (templateId) => {
        const nextTemplate = templateId ?? project.templateId
        const nextProject = createDefaultProject(nextTemplate)
        setProject(nextProject)
        setSelectedBlockId(getFirstBlockId(nextProject))
      },
      importProjectJson: (json) => {
        try {
          const nextProject = parseProjectFile(JSON.parse(json))
          setProject(nextProject)
          setSelectedBlockId(getFirstBlockId(nextProject))
          return { ok: true }
        } catch (error) {
          return {
            ok: false,
            error: error instanceof Error ? error.message : 'Invalid project file',
          }
        }
      },
      exportProjectJson: () => serializeProjectFile(project),
    }),
    [project, resolvedSelectedBlockId, selectedBlock],
  )

  return <ProjectStoreContext.Provider value={value}>{children}</ProjectStoreContext.Provider>
}

export function useProjectStore() {
  const context = useContext(ProjectStoreContext)
  if (!context) {
    throw new Error('useProjectStore must be used within ProjectStoreProvider')
  }

  return context
}
