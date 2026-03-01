'use client'

import { PAZE_SIZE } from '@/app/constants'
import { useListMyInvoieHistory } from '@/app/hooks/backend/invoice.hook'
import { useDebounce } from '@/app/hooks/ui/debounce'
import { useMemo, useState } from 'react'
import FiltersSection from './FiltersSection'
import InvoiceList from './InvoiceList'

const DEBOUNCE_DELAY = 1000

export default function InvoicesPage() {
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('')
    const debouncedSearch = useDebounce(search, DEBOUNCE_DELAY)

    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage }: any =
        useListMyInvoieHistory({
            status,
            search: debouncedSearch,
            perPage: PAZE_SIZE,
        })

    const invoices = useMemo(() => {
        return data?.pages.flatMap((page: any) => page?.data?.result?.rows) ?? []
    }, [data])

    const handleLoadMore = () => {
        if (hasNextPage) fetchNextPage()
    }

    console.table('Invoices=> ', invoices)

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="mx-auto px-4 md:px-6 py-6 md:py-10">
                {/* Filters */}
                <FiltersSection
                    search={search}
                    onSearchChange={setSearch}
                    status={status}
                    onStatusChange={setStatus}
                />

                {/* Invoice List */}
                {isLoading ? (
                    <div className="text-center py-10">...</div>
                ) : (
                    <InvoiceList
                        invoices={invoices}
                        isLoading={isFetchingNextPage}
                        handleLoadMore={handleLoadMore}
                    />
                )}
            </div>
        </div>
    )
}
