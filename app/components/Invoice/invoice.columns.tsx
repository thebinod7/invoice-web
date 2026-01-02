'use client';

import { INVOICE_STATUS } from '@/app/constants';
import { formatCurrency, formatDate, truncateString } from '@/app/helpers';
import { checkIsOverdue } from '@/app/helpers/date';
import { Button } from '@/components/ui/button';
import { TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import EmailDrawer from '@/ui/EmailDrawer';
import { InvoiceActionDropdown } from '@/ui/InvoiceActionDropdown';
import { InvoiceStatusSelect } from '@/ui/InvoiceStatusSelect';
import { TooltipBox } from '@/ui/TooltipBox';
import { ColumnDef } from '@tanstack/react-table';
import { Info } from 'lucide-react';

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
    cell: ({ getValue }) => {
      const client = getValue<string>();
      if (client.length < 20) return client;
      return (
        <TooltipBox>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2">
              {truncateString(client, 20)}
              <Info color="oklch(70.7% 0.165 254.624)" size={16} />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{client}</p>
          </TooltipContent>
        </TooltipBox>
      );
    },
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
      if (!dueDate) return '-';

      const isOver = checkIsOverdue(new Date(dueDate));
      if (!isOver) return formatDate(dueDate);

      return (
        <TooltipBox>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2">
              {formatDate(dueDate)}
              <Info color="red" size={16} />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Invoice is overdue</p>
          </TooltipContent>
        </TooltipBox>
      );
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
      <div className="flex items-center gap-2">
        <EmailDrawer />

        <InvoiceActionDropdown
          rowId={row.original._id}
          invoiceNumber={row.original.invoiceNumber}
        />
      </div>
    ),
  },
];
