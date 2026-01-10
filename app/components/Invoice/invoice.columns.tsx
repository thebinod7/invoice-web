'use client';

import { INVOICE_STATUS } from '@/app/constants';
import { formatCurrency, formatDate, truncateString } from '@/app/helpers';
import { checkIsOverdue } from '@/app/helpers/date';
import { ICurrentUser } from '@/app/types';
import { Button } from '@/components/ui/button';
import { TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import EmailDrawer from '@/ui/EmailDrawer';
import { InvoiceActionDropdown } from '@/ui/InvoiceActionDropdown';
import { StatusBadge } from '@/ui/StatusBadge';
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

export const invoiceColumns = (
  cu: ICurrentUser | null
): ColumnDef<InvoiceRow>[] => [
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
    cell: ({ row }) => {
      const dueDate = row.original.dueDate;
      const status = row.original.status;
      if (!dueDate) return '-';

      const isOver = checkIsOverdue(new Date(dueDate));
      if (!isOver || status === INVOICE_STATUS.PAID) return formatDate(dueDate);

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
      return <StatusBadge value={row.original.status} />;
    },
  },
  {
    id: 'action',
    header: '',
    cell: ({ row }) => {
      const status = row.original.status;
      if (status === INVOICE_STATUS.PAID) {
        return (
          <div className="flex items-center gap-2">
            <Button disabled={true} variant={'outline'} size={'sm'}>
              Done
            </Button>
            <InvoiceActionDropdown rowId={row.original._id} status={status} />
          </div>
        );
      }

      return (
        <div className="flex items-center gap-2">
          {cu?.activeSubscription && (
            <EmailDrawer
              allowedFeatures={cu.activeSubscription.allowedFeatures}
              invoiceId={row.original._id}
            />
          )}

          <InvoiceActionDropdown rowId={row.original._id} />
        </div>
      );
    },
  },
];
