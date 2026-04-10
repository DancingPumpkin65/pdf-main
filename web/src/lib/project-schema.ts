import { z } from 'zod'

export const PROJECT_FILE_VERSION = 1 as const

export const documentKindSchema = z.enum(['invoice', 'report'])
export const templateIdSchema = z.enum([
  'invoice-classic',
  'invoice-modern',
  'invoice-minimal',
])
export const themePresetSchema = z.enum(['professional', 'modern', 'minimal'])

export const invoiceBlockTypeSchema = z.enum([
  'invoice-header',
  'invoice-billing',
  'invoice-payment',
  'invoice-items',
  'invoice-totals',
  'invoice-notes',
  'invoice-footer',
])

const lineItemSchema = z.object({
  id: z.string().min(1),
  description: z.string().min(1),
  quantity: z.number().positive(),
  unitPrice: z.number().nonnegative(),
})

const clientDetailsSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  email: z.email(),
  phone: z.string().min(1),
})

const blockBaseSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  variant: z.string().min(1),
  hidden: z.boolean().optional().default(false),
  locked: z.boolean().optional().default(false),
  children: z.array(z.string().min(1)).optional(),
})

const invoiceHeaderBlockSchema = blockBaseSchema.extend({
  type: z.literal('invoice-header'),
  props: z.object({
    companyName: z.string().min(1),
    subtitle: z.string().min(1),
    companyAddress: z.string().min(1),
    companyEmail: z.email(),
    logo: z.string().min(1).optional(),
  }),
})

const invoiceBillingBlockSchema = blockBaseSchema.extend({
  type: z.literal('invoice-billing'),
  props: z.object({
    invoiceNumber: z.string().min(1),
    invoiceDate: z.string().min(1),
    dueDate: z.string().min(1),
    client: clientDetailsSchema,
  }),
})

const invoicePaymentBlockSchema = blockBaseSchema.extend({
  type: z.literal('invoice-payment'),
  props: z.object({
    dueDate: z.string().min(1),
    method: z.string().min(1),
    gst: z.string().min(1),
  }),
})

const invoiceItemsBlockSchema = blockBaseSchema.extend({
  type: z.literal('invoice-items'),
  props: z.object({
    items: z.array(lineItemSchema).min(1),
  }),
})

const invoiceTotalsBlockSchema = blockBaseSchema.extend({
  type: z.literal('invoice-totals'),
  props: z.object({
    subtotal: z.number().nonnegative(),
    tax: z.number().nonnegative(),
    total: z.number().nonnegative(),
    taxLabel: z.string().min(1).default('Tax'),
  }),
})

const invoiceNotesBlockSchema = blockBaseSchema.extend({
  type: z.literal('invoice-notes'),
  props: z.object({
    content: z.string().default(''),
  }),
})

const invoiceFooterBlockSchema = blockBaseSchema.extend({
  type: z.literal('invoice-footer'),
  props: z.object({
    leftText: z.string().default(''),
    rightText: z.string().default('Page 1 of 1'),
  }),
})

export const blockNodeSchema = z.discriminatedUnion('type', [
  invoiceHeaderBlockSchema,
  invoiceBillingBlockSchema,
  invoicePaymentBlockSchema,
  invoiceItemsBlockSchema,
  invoiceTotalsBlockSchema,
  invoiceNotesBlockSchema,
  invoiceFooterBlockSchema,
])

export const projectMetadataSchema = z.object({
  name: z.string().min(1),
  description: z.string().default(''),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
})

export const projectFileSchema = z.object({
  version: z.literal(PROJECT_FILE_VERSION),
  kind: documentKindSchema,
  templateId: templateIdSchema,
  themePreset: themePresetSchema,
  metadata: projectMetadataSchema,
  blocks: z.array(blockNodeSchema).min(1),
})

export type DocumentKind = z.infer<typeof documentKindSchema>
export type TemplateId = z.infer<typeof templateIdSchema>
export type ThemePreset = z.infer<typeof themePresetSchema>
export type InvoiceBlockType = z.infer<typeof invoiceBlockTypeSchema>
export type LineItem = z.infer<typeof lineItemSchema>
export type BlockNode = z.infer<typeof blockNodeSchema>
export type ProjectMetadata = z.infer<typeof projectMetadataSchema>
export type ProjectFile = z.infer<typeof projectFileSchema>

export function parseProjectFile(input: unknown): ProjectFile {
  return projectFileSchema.parse(input)
}

export function safeParseProjectFile(input: unknown) {
  return projectFileSchema.safeParse(input)
}

export function serializeProjectFile(project: ProjectFile): string {
  return JSON.stringify(projectFileSchema.parse(project), null, 2)
}
