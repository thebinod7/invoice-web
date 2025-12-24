export interface ILineItem {
  id?: string | number;
  title: string;
  quantity: string;
  rate: string;
}

export interface ICurrentUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IInvoiceDetails {
  companyLogo?: string;
  senderDetails: string;
  receiverDetails: string;
  currency: string;
  invoiceNumber: string;
  invoiceItems: [];
  subTotal: number;
  grandTotal: number;
  dueDate?: string;
  poNumber?: string;
  paymentTerms?: string;
  tax?: number;
  discount?: number;
  additionalNote?: string;
}

export interface IInvoiceItem {
  description: string;
  quantity: string;
  unitPrice: string;
}
