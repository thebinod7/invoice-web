'use client';

import { INVOICE_STATUS } from '@/app/constants';
import { API_ROUTES } from '@/app/constants/api-routes';
import {
  formatCurrency,
  formatDate,
  sanitizeError,
  truncateString,
} from '@/app/helpers';
import { API_BASE_URL } from '@/app/helpers/config';
import { patchRequest } from '@/app/helpers/request';
import { InvoiceActionDropdown } from '@/ui/InvoiceActionDropdown';
import { ShadSelect } from '@/ui/ShadSelect';
import { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';

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

const handleStatusChange = async (rowId: string, status: string) => {
  try {
    await patchRequest(
      `${API_BASE_URL}${API_ROUTES.INVOICES}/${rowId}/status`,
      {
        status,
      }
    );
    toast.success('Status updated successfully!');
  } catch (err) {
    toast.error(sanitizeError(err));
  }
};

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
        <ShadSelect
          selectLabel="select to update"
          value={row.original.status}
          handleChange={(status) =>
            handleStatusChange(row.original._id, status)
          }
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
