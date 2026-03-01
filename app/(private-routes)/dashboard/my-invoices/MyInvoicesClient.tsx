'use client'

import { PAZE_SIZE } from '@/app/constants'
import { useListMyInvoieHistory } from '@/app/hooks/backend/invoice.hook'
import { useDebounce } from '@/app/hooks/ui/debounce'
import { useMemo, useState } from 'react'
import FiltersSection from './FiltersSection'
import InvoiceList from './InvoiceList'
import { LoadMore } from '@/app/components/LoadMore'

const DEBOUNCE_DELAY = 1000

export default function MyInvoicesClient() {
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

    const totalCount = data?.pages[0]?.data?.result?.meta?.total ?? 0
    const shownCount = invoices.length
    // const currentPage = data?.pages.length ?? 0
    // const lastPage = data?.pages[0]?.data?.result?.meta?.lastPage ?? 0

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
                    <div className="text-center py-10">Loading...</div>
                ) : (
                    <InvoiceList invoices={invoices} isLoading={isLoading} />
                )}

                {!isLoading && (
                    <LoadMore
                        shownCount={shownCount}
                        totalCount={totalCount}
                        handleLoadMoreClick={handleLoadMore}
                        isLoading={isFetchingNextPage}
                    />
                )}
            </div>
        </div>
    )
}
