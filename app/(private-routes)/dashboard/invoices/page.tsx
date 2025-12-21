'use client';
import { Button } from '@/components/ui/button';
import { InvoiceActionDropdown } from '@/ui/InvoiceActionDropdown';
import { TanstackTable } from '@/ui/TanstackTable';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

const rows = [
  {
    id: 1,
    invoiceId: 'INV-123',
    totalAmount: 1000,
    poNumber: 'PO-123',
    createdAt: '2022-01-01',
    dueDate: '2022-01-15',
    status: 'Paid',
  },
  {
    id: 2,
    invoiceId: 'INV-456',
    totalAmount: 2000,
    poNumber: 'PO-456',
    createdAt: '2022-02-01',
    dueDate: '2022-02-15',
    status: 'Pending',
  },
  {
    id: 3,
    invoiceId: 'INV-789',
    totalAmount: 3000,
    poNumber: 'PO-789',
    createdAt: '2022-03-01',
    dueDate: '2022-03-15',
    status: 'Overdue',
  },
];

export default function page() {
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorFn: (row) => row.invoiceId,
        id: 'invoiceId',
        header: '# Invoice Number',
        cell: ({ getValue }) => getValue() || '-',
      },
      {
        accessorKey: 'totalAmount',
        header: 'Total Amount',
        cell: ({ row, getValue }) => `$ ${getValue()}`,
      },
      {
        accessorKey: 'poNumber',
        id: 'poNumber',
        header: '# PO Number',
        cell: ({ getValue }) => getValue() || '-',
      },
      {
        accessorKey: 'createdAt',
        header: 'Created Date',
        cell: ({ getValue }) => getValue() || '-',
      },
      {
        accessorKey: 'dueDate',
        header: 'Due Date',
        cell: ({ getValue }) => getValue() || '-',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
          const status = getValue() as string;
          return status;
        },
      },
      {
        id: 'action',
        header: '',
        cell: ({ row }) => {
          return <InvoiceActionDropdown />;
        },
      },
    ],
    []
  );
  return (
    <div className="p-8">
      <TanstackTable
        columns={columns}
        data={rows || []}
        searchKey="invoiceId"
        searchPlaceholder="Search by invoice number..."
        isLoading={false}
        loadingComponent={<div>Loading...</div>}
        emptyMessage="No data found."
        totalCount={rows.length}
        hasNextPage={true}
        hasPreviousPage={true}
        onNextPage={() => {}}
        onPreviousPage={() => {}}
        currentPage={1}
      />
    </div>
  );
}
