import type { ProjectFile, TemplateId, ThemePreset } from './project-schema'

const defaultThemeByTemplate: Record<TemplateId, ThemePreset> = {
  'invoice-classic': 'professional',
  'invoice-modern': 'modern',
  'invoice-minimal': 'minimal',
}

type TemplateSeed = {
  title: string
  label: string
  description: string
  metadata: {
    name: string
    description: string
  }
  header: {
    companyName: string
    subtitle: string
    companyAddress: string
    companyEmail: string
    logo?: string
  }
  billing: {
    invoiceNumber: string
    invoiceDate: string
    dueDate: string
    client: {
      name: string
      address: string
      email: string
      phone: string
    }
  }
  payment: {
    dueDate: string
    method: string
    gst: string
  }
  items: Array<{
    id: string
    description: string
    quantity: number
    unitPrice: number
  }>
  notes: string
  footer: {
    leftText: string
    rightText: string
  }
}

export type TemplateCatalogItem = {
  id: TemplateId
  title: string
  label: string
  description: string
  defaultThemePreset: ThemePreset
  supportedThemePresets: ThemePreset[]
  blockLabels: string[]
  createProject: () => ProjectFile
}

const templateSeeds: Record<TemplateId, TemplateSeed> = {
  'invoice-classic': {
    title: 'Classic',
    label: 'Professional',
    description:
      'Structured billing bands with a logo-left header and a formal line item table.',
    metadata: {
      name: 'Northline Studio / April invoice',
      description: 'Monthly product design retainer invoice for Aster Labs.',
    },
    header: {
      companyName: 'Northline Studio',
      subtitle: 'Product design retainer',
      companyAddress: '49 Cedar Street, Lisbon, Portugal',
      companyEmail: 'finance@northlinestudio.com',
      logo: '/favicon.png',
    },
    billing: {
      invoiceNumber: 'INV-2026-041',
      invoiceDate: 'April 22, 2026',
      dueDate: 'May 6, 2026',
      client: {
        name: 'Aster Labs',
        address: '18 Mercer Yard, Brooklyn, NY',
        email: 'ap@asterlabs.com',
        phone: '+1 (718) 555-0142',
      },
    },
    payment: {
      dueDate: 'May 6, 2026',
      method: 'Wire transfer / Visa',
      gst: 'VAT PT508-291-200',
    },
    items: [
      { id: 'classic-1', description: 'Product design sprint', quantity: 1, unitPrice: 9800 },
      { id: 'classic-2', description: 'Design system maintenance', quantity: 1, unitPrice: 4200 },
      { id: 'classic-3', description: 'Stakeholder review sessions', quantity: 3, unitPrice: 650 },
    ],
    notes: 'Thank you for the continued partnership. Payment terms are net 14.',
    footer: {
      leftText: 'Northline Studio · Lisbon · finance@northlinestudio.com',
      rightText: 'Page 1 of 1',
    },
  },
  'invoice-modern': {
    title: 'Modern',
    label: 'Branded',
    description:
      'A banner-forward invoice with higher contrast and a clearer client-facing summary.',
    metadata: {
      name: 'Frameforge / launch invoice',
      description: 'Branded launch package invoice for a growth team.',
    },
    header: {
      companyName: 'Frameforge',
      subtitle: 'Launch systems and growth ops',
      companyAddress: '204 Orchard Row, Manchester, UK',
      companyEmail: 'hello@frameforge.studio',
    },
    billing: {
      invoiceNumber: 'INV-2026-118',
      invoiceDate: 'April 24, 2026',
      dueDate: 'May 14, 2026',
      client: {
        name: 'Beacon Commerce',
        address: '92 Atlantic Avenue, Boston, MA',
        email: 'billing@beaconcommerce.com',
        phone: '+1 (617) 555-0189',
      },
    },
    payment: {
      dueDate: 'May 14, 2026',
      method: 'ACH / Corporate card',
      gst: 'VAT GB902-884-710',
    },
    items: [
      { id: 'modern-1', description: 'Launch landing page system', quantity: 1, unitPrice: 12500 },
      { id: 'modern-2', description: 'Lifecycle email buildout', quantity: 2, unitPrice: 3400 },
      { id: 'modern-3', description: 'Analytics instrumentation', quantity: 1, unitPrice: 2950 },
    ],
    notes: 'Includes post-launch QA and implementation review.',
    footer: {
      leftText: 'Frameforge · hello@frameforge.studio',
      rightText: 'Page 1 of 1',
    },
  },
  'invoice-minimal': {
    title: 'Minimal',
    label: 'Editorial',
    description:
      'Low-noise layout with compact spacing for retainers, proposals, and lean operations work.',
    metadata: {
      name: 'Monotone Office / advisory invoice',
      description: 'Minimal advisory invoice for recurring strategy support.',
    },
    header: {
      companyName: 'Monotone Office',
      subtitle: 'Strategy and systems advisory',
      companyAddress: '11 Rue du Temple, Paris, France',
      companyEmail: 'accounts@monotone.office',
    },
    billing: {
      invoiceNumber: 'INV-2026-207',
      invoiceDate: 'April 26, 2026',
      dueDate: 'May 10, 2026',
      client: {
        name: 'Juniper Health',
        address: '51 Canal Street, New York, NY',
        email: 'finance@juniperhealth.io',
        phone: '+1 (212) 555-0117',
      },
    },
    payment: {
      dueDate: 'May 10, 2026',
      method: 'ACH transfer',
      gst: 'VAT FR772-044-119',
    },
    items: [
      { id: 'minimal-1', description: 'Operating model advisory', quantity: 1, unitPrice: 8200 },
      { id: 'minimal-2', description: 'Workflow teardown', quantity: 1, unitPrice: 2600 },
      { id: 'minimal-3', description: 'Leadership office hours', quantity: 4, unitPrice: 450 },
    ],
    notes: 'Please reference the invoice number on payment remittance.',
    footer: {
      leftText: 'Monotone Office · accounts@monotone.office',
      rightText: 'Page 1 of 1',
    },
  },
}

function getNowIso() {
  return new Date().toISOString()
}

function sumSubtotal(items: TemplateSeed['items']) {
  return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
}

function getTaxAmount(subtotal: number) {
  return Number((subtotal * 0.07).toFixed(2))
}

function createProjectFromSeed(templateId: TemplateId, seed: TemplateSeed): ProjectFile {
  const timestamp = getNowIso()
  const subtotal = sumSubtotal(seed.items)
  const tax = getTaxAmount(subtotal)
  const total = Number((subtotal + tax).toFixed(2))

  return {
    version: 1,
    kind: 'invoice',
    templateId,
    themePreset: defaultThemeByTemplate[templateId],
    metadata: {
      name: seed.metadata.name,
      description: seed.metadata.description,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
    blocks: [
      {
        id: `${templateId}-header`,
        type: 'invoice-header',
        label: 'Header',
        variant: templateId,
        hidden: false,
        locked: true,
        props: seed.header,
      },
      {
        id: `${templateId}-billing`,
        type: 'invoice-billing',
        label: 'Billing',
        variant: templateId,
        hidden: false,
        locked: false,
        props: seed.billing,
      },
      {
        id: `${templateId}-payment`,
        type: 'invoice-payment',
        label: 'Payment',
        variant: templateId,
        hidden: false,
        locked: false,
        props: seed.payment,
      },
      {
        id: `${templateId}-items`,
        type: 'invoice-items',
        label: 'Items',
        variant: templateId,
        hidden: false,
        locked: false,
        props: {
          items: seed.items,
        },
      },
      {
        id: `${templateId}-totals`,
        type: 'invoice-totals',
        label: 'Totals',
        variant: templateId,
        hidden: false,
        locked: false,
        props: {
          subtotal,
          tax,
          total,
          taxLabel: 'Tax (7%)',
        },
      },
      {
        id: `${templateId}-notes`,
        type: 'invoice-notes',
        label: 'Notes',
        variant: templateId,
        hidden: false,
        locked: false,
        props: {
          content: seed.notes,
        },
      },
      {
        id: `${templateId}-footer`,
        type: 'invoice-footer',
        label: 'Footer',
        variant: templateId,
        hidden: false,
        locked: false,
        props: seed.footer,
      },
    ],
  }
}

export const templateCatalog: TemplateCatalogItem[] = (
  Object.entries(templateSeeds) as Array<[TemplateId, TemplateSeed]>
).map(([id, seed]) => ({
  id,
  title: seed.title,
  label: seed.label,
  description: seed.description,
  defaultThemePreset: defaultThemeByTemplate[id],
  supportedThemePresets: ['professional', 'modern', 'minimal'],
  blockLabels: ['Header', 'Billing', 'Payment', 'Items', 'Totals', 'Notes', 'Footer'],
  createProject: () => createProjectFromSeed(id, seed),
}))

export const templateCatalogById: Record<TemplateId, TemplateCatalogItem> = templateCatalog.reduce(
  (accumulator, template) => {
    accumulator[template.id] = template
    return accumulator
  },
  {} as Record<TemplateId, TemplateCatalogItem>,
)

export function createDefaultProject(templateId: TemplateId): ProjectFile {
  return templateCatalogById[templateId].createProject()
}

export const themePresetLabels: Record<ThemePreset, string> = {
  professional: 'Professional',
  modern: 'Modern',
  minimal: 'Minimal',
}
