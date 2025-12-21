'use client';
import { invoiceColumns } from '@/app/components/Invoice/invoice.columns';
import { PAZE_SIZE } from '@/app/constants';
import { useListMyInvoices } from '@/app/hooks/backend/invoice.hook';
import { TanstackTable } from '@/ui/TanstackTable';
import { useEffect, useMemo, useState } from 'react';

export default function page() {
  const columns = useMemo(() => invoiceColumns(), []);

  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, refetch } = useListMyInvoices({
    page: currentPage,
    perPage: PAZE_SIZE,
  });
  const result = data?.data?.result || null;

  useEffect(() => {
    refetch();
  }, [currentPage]);

  return (
    <div className="px-8">
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
        onNextPage={() => setCurrentPage(currentPage + 1)}
        onPreviousPage={() => setCurrentPage(currentPage - 1)}
        currentPage={result?.meta?.currentPage}
      />
    </div>
  );
}
