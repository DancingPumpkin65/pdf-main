import { Badge } from '@ds/components/Badge'
import { Button } from '@ds/components/Button'
import { Input } from '@ds/components/Input'
import type { BlockNode } from '@/lib/project-schema'
import { isRemovableInvoiceBlockType } from '@/lib/template-catalog'
import { Textarea } from './Textarea'

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (value: number) => void
}) {
  return (
    <label className="space-y-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--foreground-muted)]">
      <span>{label}</span>
      <Input type="number" value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  )
}

export function InspectorPanel({
  block,
  onUpdateBlock,
  onRemoveBlock,
  onToggleHidden,
}: {
  block: BlockNode | null
  onUpdateBlock: (updater: (block: BlockNode) => BlockNode) => void
  onRemoveBlock: () => void
  onToggleHidden: () => void
}) {
  if (!block) {
    return (
      <div className="border-2 border-[var(--border)] bg-[var(--surface)] p-5 shadow-[8px_8px_0px_0px_var(--shadow-color)]">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--foreground-muted)]">
          Inspector
        </p>
        <p className="mt-4 text-sm leading-6">Select a block to inspect and edit its content.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 border-2 border-[var(--border)] bg-[var(--surface)] p-5 shadow-[8px_8px_0px_0px_var(--shadow-color)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--foreground-muted)]">
            Inspector
          </p>
          <p className="mt-2 text-xl font-black uppercase tracking-tight">{block.label}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={block.hidden ? 'warning' : 'success'}>
            {block.hidden ? 'Hidden' : 'Visible'}
          </Badge>
          <Badge variant="outline">{block.type}</Badge>
        </div>
      </div>

      {block.type === 'invoice-header' ? (
        <div className="space-y-3">
          <Input value={block.props.companyName} onChange={(event) => onUpdateBlock((current) => current.type === 'invoice-header' ? { ...current, props: { ...current.props, companyName: event.target.value } } : current)} />
          <Input value={block.props.subtitle} onChange={(event) => onUpdateBlock((current) => current.type === 'invoice-header' ? { ...current, props: { ...current.props, subtitle: event.target.value } } : current)} />
          <Input value={block.props.companyEmail} onChange={(event) => onUpdateBlock((current) => current.type === 'invoice-header' ? { ...current, props: { ...current.props, companyEmail: event.target.value } } : current)} />
        </div>
      ) : null}

      {block.type === 'invoice-billing' ? (
        <div className="space-y-3">
          <Input value={block.props.invoiceNumber} onChange={(event) => onUpdateBlock((current) => current.type === 'invoice-billing' ? { ...current, props: { ...current.props, invoiceNumber: event.target.value } } : current)} />
          <Input value={block.props.client.name} onChange={(event) => onUpdateBlock((current) => current.type === 'invoice-billing' ? { ...current, props: { ...current.props, client: { ...current.props.client, name: event.target.value } } } : current)} />
          <Input value={block.props.client.email} onChange={(event) => onUpdateBlock((current) => current.type === 'invoice-billing' ? { ...current, props: { ...current.props, client: { ...current.props.client, email: event.target.value } } } : current)} />
        </div>
      ) : null}

      {block.type === 'invoice-payment' ? (
        <div className="space-y-3">
          <Input value={block.props.method} onChange={(event) => onUpdateBlock((current) => current.type === 'invoice-payment' ? { ...current, props: { ...current.props, method: event.target.value } } : current)} />
          <Input value={block.props.gst} onChange={(event) => onUpdateBlock((current) => current.type === 'invoice-payment' ? { ...current, props: { ...current.props, gst: event.target.value } } : current)} />
        </div>
      ) : null}

      {block.type === 'invoice-items' ? (
        <div className="space-y-3">
          {block.props.items.slice(0, 3).map((item, index) => (
            <div key={item.id} className="space-y-2 border-2 border-[var(--border)] p-3">
              <Input value={item.description} onChange={(event) => onUpdateBlock((current) => current.type === 'invoice-items' ? { ...current, props: { ...current.props, items: current.props.items.map((entry, entryIndex) => entryIndex === index ? { ...entry, description: event.target.value } : entry) } } : current)} />
              <div className="grid grid-cols-2 gap-2">
                <NumberField label="Quantity" value={item.quantity} onChange={(value) => onUpdateBlock((current) => current.type === 'invoice-items' ? { ...current, props: { ...current.props, items: current.props.items.map((entry, entryIndex) => entryIndex === index ? { ...entry, quantity: value } : entry) } } : current)} />
                <NumberField label="Unit price" value={item.unitPrice} onChange={(value) => onUpdateBlock((current) => current.type === 'invoice-items' ? { ...current, props: { ...current.props, items: current.props.items.map((entry, entryIndex) => entryIndex === index ? { ...entry, unitPrice: value } : entry) } } : current)} />
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {block.type === 'invoice-totals' ? (
        <div className="grid gap-3">
          <NumberField label="Subtotal" value={block.props.subtotal} onChange={(value) => onUpdateBlock((current) => current.type === 'invoice-totals' ? { ...current, props: { ...current.props, subtotal: value } } : current)} />
          <NumberField label="Tax" value={block.props.tax} onChange={(value) => onUpdateBlock((current) => current.type === 'invoice-totals' ? { ...current, props: { ...current.props, tax: value } } : current)} />
          <NumberField label="Total" value={block.props.total} onChange={(value) => onUpdateBlock((current) => current.type === 'invoice-totals' ? { ...current, props: { ...current.props, total: value } } : current)} />
        </div>
      ) : null}

      {block.type === 'invoice-notes' ? (
        <Textarea value={block.props.content} onChange={(event) => onUpdateBlock((current) => current.type === 'invoice-notes' ? { ...current, props: { ...current.props, content: event.target.value } } : current)} />
      ) : null}

      {block.type === 'invoice-footer' ? (
        <div className="space-y-3">
          <Input value={block.props.leftText} onChange={(event) => onUpdateBlock((current) => current.type === 'invoice-footer' ? { ...current, props: { ...current.props, leftText: event.target.value } } : current)} />
          <Input value={block.props.rightText} onChange={(event) => onUpdateBlock((current) => current.type === 'invoice-footer' ? { ...current, props: { ...current.props, rightText: event.target.value } } : current)} />
        </div>
      ) : null}

      <div className="flex gap-2 border-t-2 border-[var(--border)] pt-4">
        <Button variant="outline" size="sm" onClick={onToggleHidden}>
          {block.hidden ? 'Show section' : 'Hide section'}
        </Button>
        <Button variant="destructive" size="sm" onClick={onRemoveBlock} disabled={!isRemovableInvoiceBlockType(block.type)}>
          Remove
        </Button>
      </div>
      {!isRemovableInvoiceBlockType(block.type) ? (
        <p className="text-xs leading-5 text-[var(--foreground-muted)]">
          Core invoice sections stay in the project structure. Hide them when you need them out of the PDF.
        </p>
      ) : null}
    </div>
  )
}
