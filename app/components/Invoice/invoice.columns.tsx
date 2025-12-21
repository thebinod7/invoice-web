'use client';

import { ColumnDef } from '@tanstack/react-table';
import { formatCurrency, formatDate } from '@/app/helpers';
import { InvoiceActionDropdown } from '@/ui/InvoiceActionDropdown';

export type InvoiceRow = {
  _id: string;
  invoiceNumber: string;
  grandTotal: number;
  currency: string;
  dueDate: string;
  status: string;
};

export const invoiceColumns = (): ColumnDef<InvoiceRow>[] => [
  {
    accessorKey: 'invoiceNumber',
    header: '# Invoice Number',
    cell: ({ getValue }) => getValue() || '-',
  },
  {
    accessorKey: 'grandTotal',
    header: 'Total Amount',
    cell: ({ row, getValue }) => {
      const grandTotal = getValue<number>();
      return formatCurrency(grandTotal, row.original.currency);
    },
  },
  {
    accessorKey: 'dueDate',
    header: 'Due Date',
    cell: ({ getValue }) => {
      const dueDate = getValue<string>();
      return formatDate(dueDate);
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    id: 'action',
    header: '',
    cell: ({ row }) => (
      <InvoiceActionDropdown
        rowId={row.original._id}
        invoiceNumber={row.original.invoiceNumber}
      />
    ),
  },
];
