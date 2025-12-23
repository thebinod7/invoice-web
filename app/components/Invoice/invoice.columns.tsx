'use client';

import { INVOICE_STATUS } from '@/app/constants';
import { formatCurrency, formatDate, truncateString } from '@/app/helpers';
import { InvoiceActionDropdown } from '@/ui/InvoiceActionDropdown';
import { InvoiceStatusSelect } from '@/ui/InvoiceStatusSelect';
import { ColumnDef } from '@tanstack/react-table';

export type InvoiceRow = {
  _id: string;
  receiverDetails: string;
  invoiceNumber: string;
  grandTotal: number;
  currency: string;
  dueDate: string;
  status: string;
};

const STATUS_OPTIONS = [
  {
    label: 'Created',
    value: INVOICE_STATUS.CREATED,
  },
  {
    label: 'Sent',
    value: INVOICE_STATUS.SENT,
  },
  {
    label: 'Paid',
    value: INVOICE_STATUS.PAID,
  },
  {
    label: 'Cancelled',
    value: INVOICE_STATUS.CANCELLED,
  },
];

export const invoiceColumns = (): ColumnDef<InvoiceRow>[] => [
  {
    accessorKey: 'receiverDetails',
    header: 'Client',
    cell: ({ getValue }) => truncateString(getValue<string>(), 15),
  },
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
    cell: ({ row }) => {
      return (
        <InvoiceStatusSelect
          invoiceId={row.original._id}
          selectLabel="select to update"
          value={row.original.status}
          options={STATUS_OPTIONS}
        />
      );
    },
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
