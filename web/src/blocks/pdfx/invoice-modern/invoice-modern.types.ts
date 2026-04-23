export interface InvoiceModernData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  companyName: string;
  subtitle: string;
  companyAddress: string;
  companyEmail: string;
  billTo: {
    name: string;
    address: string;
    email: string;
    phone: string;
  };
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
  }[];
  summary: {
    subtotal: number;
    tax: number;
    total: number;
  };
  paymentTerms: {
    dueDate: string;
    method: string;
    gst: string;
  };
  notes?: string;
  footer: {
    leftText: string;
    rightText: string;
  };
  visibility: {
    "invoice-header": boolean;
    "invoice-billing": boolean;
    "invoice-payment": boolean;
    "invoice-items": boolean;
    "invoice-totals": boolean;
    "invoice-notes": boolean;
    "invoice-footer": boolean;
  };
}
