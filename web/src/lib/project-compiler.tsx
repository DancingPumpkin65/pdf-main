import type { ReactElement } from 'react'
import { theme as professionalTheme, type PdfxTheme } from '@/lib/pdfx-theme'
import {
  parseProjectFile,
  type BlockNode,
  type InvoiceBlockType,
  type ProjectFile,
  type TemplateId,
  type ThemePreset,
} from './project-schema'
import { templateCatalogById } from './template-catalog'

export type CompiledInvoiceData = {
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  companyName: string
  subtitle: string
  companyAddress: string
  companyEmail: string
  logo?: string
  billTo: {
    name: string
    address: string
    email: string
    phone: string
  }
  items: Array<{
    description: string
    quantity: number
    unitPrice: number
  }>
  summary: {
    subtotal: number
    tax: number
    total: number
  }
  paymentTerms: {
    dueDate: string
    method: string
    gst: string
  }
  notes?: string
  footer: {
    leftText: string
    rightText: string
  }
  visibility: Record<InvoiceBlockType, boolean>
}

export type CompiledProjectBase = {
  project: ProjectFile
  template: (typeof templateCatalogById)[ProjectFile['templateId']]
  theme: PdfxTheme
  data: CompiledInvoiceData
  visibleBlocks: BlockNode[]
}

export type CompiledProject = CompiledProjectBase & {
  document: ReactElement
}

type DocumentRenderer = (input: {
  theme: PdfxTheme
  data: CompiledInvoiceData
}) => ReactElement

function cloneTheme(theme: PdfxTheme): PdfxTheme {
  return {
    ...theme,
    primitives: {
      ...theme.primitives,
      typography: { ...theme.primitives.typography },
      spacing: { ...theme.primitives.spacing },
      fontWeights: { ...theme.primitives.fontWeights },
      lineHeights: { ...theme.primitives.lineHeights },
      borderRadius: { ...theme.primitives.borderRadius },
      letterSpacing: { ...theme.primitives.letterSpacing },
    },
    colors: { ...theme.colors },
    typography: {
      body: { ...theme.typography.body },
      heading: {
        ...theme.typography.heading,
        fontSize: { ...theme.typography.heading.fontSize },
      },
    },
    spacing: {
      ...theme.spacing,
      page: { ...theme.spacing.page },
    },
    page: { ...theme.page },
  }
}

function createThemeFromPreset(preset: ThemePreset): PdfxTheme {
  const base = cloneTheme(professionalTheme)

  if (preset === 'modern') {
    base.name = 'modern'
    base.colors = {
      ...base.colors,
      foreground: '#132238',
      primary: '#0f2d4f',
      primaryForeground: '#f5f7fb',
      accent: '#0f766e',
      border: '#bfd2de',
      muted: '#e8f0f4',
      mutedForeground: '#587089',
      info: '#1d4ed8',
    }
    base.typography.heading.fontFamily = 'Helvetica-Bold'
    base.typography.heading.fontSize.h1 = 30
    base.spacing.sectionGap = 24
    return base
  }

  if (preset === 'minimal') {
    base.name = 'minimal'
    base.colors = {
      ...base.colors,
      foreground: '#101010',
      primary: '#101010',
      primaryForeground: '#faf7f2',
      accent: '#525252',
      border: '#d0d0d0',
      muted: '#f6f4ef',
      mutedForeground: '#6b6b6b',
      warning: '#8c6b2f',
    }
    base.typography.heading.fontFamily = 'Helvetica'
    base.typography.heading.fontWeight = 600
    base.typography.heading.fontSize.h1 = 26
    base.typography.body.fontSize = 10
    base.spacing.sectionGap = 22
    base.spacing.componentGap = 10
  }

  return base
}

function findBlock(project: ProjectFile, type: BlockNode['type']) {
  return project.blocks.find((block) => block.type === type)
}

function assertBlock<TType extends BlockNode['type']>(
  project: ProjectFile,
  type: TType,
): Extract<BlockNode, { type: TType }> {
  const block = findBlock(project, type)
  if (!block) {
    throw new Error(`Missing required block: ${type}`)
  }

  return block as Extract<BlockNode, { type: TType }>
}

function compileInvoiceData(project: ProjectFile): CompiledInvoiceData {
  const header = assertBlock(project, 'invoice-header')
  const billing = assertBlock(project, 'invoice-billing')
  const payment = assertBlock(project, 'invoice-payment')
  const items = assertBlock(project, 'invoice-items')
  const totals = assertBlock(project, 'invoice-totals')
  const notes = findBlock(project, 'invoice-notes') as Extract<
    BlockNode,
    { type: 'invoice-notes' }
  > | null
  const footer = findBlock(project, 'invoice-footer') as Extract<
    BlockNode,
    { type: 'invoice-footer' }
  > | null

  return {
    invoiceNumber: billing.props.invoiceNumber,
    invoiceDate: billing.props.invoiceDate,
    dueDate: billing.props.dueDate,
    companyName: header.props.companyName,
    subtitle: header.props.subtitle,
    companyAddress: header.props.companyAddress,
    companyEmail: header.props.companyEmail,
    logo: header.props.logo,
    billTo: billing.props.client,
    items: items.props.items.map((item) => ({
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    })),
    summary: {
      subtotal: totals.props.subtotal,
      tax: totals.props.tax,
      total: totals.props.total,
    },
    paymentTerms: {
      dueDate: payment.props.dueDate,
      method: payment.props.method,
      gst: payment.props.gst,
    },
    notes: notes?.props.content || undefined,
    footer: {
      leftText: footer?.props.leftText ?? '',
      rightText: footer?.props.rightText ?? 'Page 1 of 1',
    },
    visibility: {
      'invoice-header': !header.hidden,
      'invoice-billing': !billing.hidden,
      'invoice-payment': !payment.hidden,
      'invoice-items': !items.hidden,
      'invoice-totals': !totals.hidden,
      'invoice-notes': notes ? !notes.hidden : false,
      'invoice-footer': footer ? !footer.hidden : false,
    },
  }
}

async function getDocumentRenderer(templateId: TemplateId): Promise<DocumentRenderer> {
  switch (templateId) {
    case 'invoice-classic': {
      const module = await import('@/blocks/pdfx/invoice-classic/invoice-classic')
      return ({ theme, data }) => <module.InvoiceClassicDocument theme={theme} data={data} />
    }
    case 'invoice-modern': {
      const module = await import('@/blocks/pdfx/invoice-modern/invoice-modern')
      return ({ theme, data }) => <module.InvoiceModernDocument theme={theme} data={data} />
    }
    case 'invoice-minimal': {
      const module = await import('@/blocks/pdfx/invoice-minimal/invoice-minimal')
      return ({ theme, data }) => <module.InvoiceMinimalDocument theme={theme} data={data} />
    }
    default:
      throw new Error(`Unsupported template: ${templateId satisfies never}`)
  }
}

export function compileProjectBase(input: ProjectFile): CompiledProjectBase {
  const project = parseProjectFile(input)
  const data = compileInvoiceData(project)
  const theme = createThemeFromPreset(project.themePreset)

  return {
    project,
    template: templateCatalogById[project.templateId],
    theme,
    data,
    visibleBlocks: project.blocks.filter((block) => !block.hidden),
  }
}

export async function compileProject(input: ProjectFile): Promise<CompiledProject> {
  const base = compileProjectBase(input)
  const renderDocument = await getDocumentRenderer(base.project.templateId)

  return {
    ...base,
    document: renderDocument({
      theme: base.theme,
      data: base.data,
    }),
  }
}

export function getThemeForPreset(preset: ThemePreset): PdfxTheme {
  return createThemeFromPreset(preset)
}
