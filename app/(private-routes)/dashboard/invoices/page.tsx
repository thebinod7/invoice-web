'use client';
import { invoiceColumns } from '@/app/components/Invoice/invoice.columns';
import { useListMyInvoices } from '@/app/hooks/backend/invoice.hook';
import { useDebounce } from '@/app/hooks/ui/debounce';
import { TanstackTable } from '@/ui/TanstackTable';
import { useEffect, useMemo, useState } from 'react';

const DEBOUNCE_DELAY = 1000;

export default function page() {
  const columns = useMemo(() => invoiceColumns(), []);

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const debouncedSearch = useDebounce(search, DEBOUNCE_DELAY);

  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    if (currentPage) params.set('page', currentPage.toString());
    if (debouncedSearch) params.set('search', debouncedSearch);
    return params.toString();
  }, [status, debouncedSearch, currentPage]);

  const { data, isLoading, refetch } = useListMyInvoices(queryParams);
  const result = data?.data?.result || null;

  useEffect(() => {
    refetch();
  }, [currentPage, search]);

  return (
    <div className="px-8">
      <TanstackTable
        columns={columns}
        data={result?.rows || []}
        globalFilter={search}
        onGlobalFilterChange={setSearch}
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
        handleStatusChange={(status) => setStatus(status)}
      />
    </div>
  );
}
