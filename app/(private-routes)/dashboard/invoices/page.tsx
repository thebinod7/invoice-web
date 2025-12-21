'use client';
import { formatCurrency, formatDate } from '@/app/helpers';
import { useListMyInvoices } from '@/app/hooks/backend/invoice.hook';
import { InvoiceActionDropdown } from '@/ui/InvoiceActionDropdown';
import { TanstackTable } from '@/ui/TanstackTable';
import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';

export default function page() {
  const [page, setPage] = useState(1);

  const queryParams = useMemo(() => {
    const params: any = {
      search: '',
      page,
      perPage: 20,
    };

    return params;
  }, [page]);

  const { data, isLoading } = useListMyInvoices(queryParams);
  const result = data?.data?.result || null;
  console.log('Result: ', result);
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'invoiceNumber',
        id: 'invoiceNumber',
        header: '# Invoice Number',
        cell: ({ getValue }) => getValue() || '-',
      },
      {
        accessorKey: 'grandTotal',
        header: 'Total Amount',
        cell: ({ row, getValue }) => {
          const grandTotal = getValue() as number;
          const currency = row.original.currency;
          return formatCurrency(grandTotal, currency);
        },
      },
      {
        accessorKey: 'dueDate',
        header: 'Due Date',
        cell: ({ getValue }) => {
          const dueDate = getValue() as string;
          return formatDate(dueDate);
        },
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

  useEffect(() => {
    if (result?.meta.currentPage) {
      setPage(result.meta.currentPage);
    }
  }, []);

  return (
    <div className="p-8">
      <TanstackTable
        columns={columns}
        data={result?.rows || []}
        searchKey="invoiceNumber"
        searchPlaceholder="Search by invoice number..."
        isLoading={isLoading}
        loadingComponent={<div>Loading...</div>}
        emptyMessage="No data found."
        totalCount={result?.meta?.total}
        hasNextPage={result?.meta.lastPage !== result?.meta.currentPage}
        hasPreviousPage={result?.meta.currentPage !== 1}
        onNextPage={() => setPage(page + 1)}
        onPreviousPage={() => setPage(page - 1)}
        currentPage={result?.meta?.currentPage}
      />
    </div>
  );
}
