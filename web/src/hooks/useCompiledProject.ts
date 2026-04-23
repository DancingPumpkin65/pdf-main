import { useEffect, useState } from 'react'
import { compileProject, compileProjectBase, type CompiledProject } from '@/lib/project-compiler'
import type { ProjectFile } from '@/lib/project-schema'

type CompiledProjectState = {
  compiledProject: CompiledProject | null
  loading: boolean
  error: string | null
  base: ReturnType<typeof compileProjectBase>
}

export function useCompiledProject(project: ProjectFile): CompiledProjectState {
  const [state, setState] = useState<{
    key: string
    compiledProject: CompiledProject | null
    error: string | null
  }>({
    key: '',
    compiledProject: null,
    error: null,
  })
  const base = compileProjectBase(project)
  const key = `${project.templateId}:${project.themePreset}:${project.metadata.updatedAt}:${project.blocks.map((block) => block.id).join(',')}`

  useEffect(() => {
    let cancelled = false

    void compileProject(project)
      .then((result) => {
        if (cancelled) {
          return
        }

        setState({
          key,
          compiledProject: result,
          error: null,
        })
      })
      .catch((caughtError: unknown) => {
        if (cancelled) {
          return
        }

        setState({
          key,
          compiledProject: null,
          error: caughtError instanceof Error ? caughtError.message : 'Failed to compile project',
        })
      })

    return () => {
      cancelled = true
    }
  }, [key, project])

  const isResolvedForCurrentProject = state.key === key
  const compiledProject = isResolvedForCurrentProject ? state.compiledProject : null
  const error = isResolvedForCurrentProject ? state.error : null
  const loading = !isResolvedForCurrentProject || (!compiledProject && !error)

  return {
    compiledProject,
    loading,
    error,
    base,
  }
}
