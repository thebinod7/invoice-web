'use client';
import { invoiceColumns } from '@/app/components/Invoice/invoice.columns';
import { PAZE_SIZE } from '@/app/constants';
import { useAuthContext } from '@/app/context/useAuthContext';
import { useListMyInvoices } from '@/app/hooks/backend/invoice.hook';
import { useDebounce } from '@/app/hooks/ui/debounce';
import { TanstackTable } from '@/ui/TanstackTable';
import { useEffect, useMemo, useState } from 'react';

const DEBOUNCE_DELAY = 1000;

export default function InvoiceClient() {
  const { currentUser } = useAuthContext();
  console.log('CURRENT USER', currentUser);
  const columns = useMemo(() => invoiceColumns(currentUser), [currentUser]);

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const debouncedSearch = useDebounce(search, DEBOUNCE_DELAY);

  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    params.set('perPage', PAZE_SIZE.toString());
    if (status) params.set('status', status);
    if (currentPage) params.set('page', currentPage.toString());
    if (debouncedSearch) params.set('search', debouncedSearch);
    return params.toString();
  }, [status, debouncedSearch, currentPage]);

  const { data, isLoading, refetch } = useListMyInvoices(queryParams);
  const result = data?.data?.result || null;

  const clearFilter = () => {
    setStatus('');
    setSearch('');
    setCurrentPage(1);
  };

  useEffect(() => {
    refetch();
  }, [currentPage, search]);

  return (
    <div className="flex-1 overflow-auto p-6">
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
        clearFilter={clearFilter}
        status={status}
      />
    </div>
  );
}
