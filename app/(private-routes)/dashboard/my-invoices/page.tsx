'use client'

import { useState, useMemo } from 'react'
import FiltersSection from './FiltersSection'
import InvoiceList from './InvoiceList'
import { invoices } from './invoices'
import { useListMyInvoices } from '@/app/hooks/backend/invoice.hook'
import { PAZE_SIZE } from '@/app/constants'
import { useDebounce } from '@/app/hooks/ui/debounce'

const DEBOUNCE_DELAY = 1000

export default function InvoicesPage() {
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('')
    const debouncedSearch = useDebounce(search, DEBOUNCE_DELAY)

    const queryParams = useMemo(() => {
        const params = new URLSearchParams()
        params.set('perPage', PAZE_SIZE.toString())
        if (status) params.set('status', status)
        if (currentPage) params.set('page', currentPage.toString())
        if (debouncedSearch) params.set('search', debouncedSearch)
        return params.toString()
    }, [status, debouncedSearch, currentPage])

    const { data, isLoading, refetch } = useListMyInvoices(queryParams)
    const result = data?.data?.result || null

    console.log('RESULT: ', result)

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="mx-auto px-4 md:px-6 py-6 md:py-10">
                {/* Header */}
                {/* <div className="mb-6 md:mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Invoices</h1>
                    <p className="text-sm md:text-base text-slate-600 mt-1">
                        Manage and track your invoices
                    </p>
                </div> */}

                {/* Filters */}
                <FiltersSection
                    search={search}
                    onSearchChange={setSearch}
                    status={status}
                    onStatusChange={setStatus}
                />

                {/* Invoice List */}
                {isLoading ? (
                    <div className="text-center py-10">Loading invoices...</div>
                ) : (
                    <InvoiceList invoices={result?.rows || []} />
                )}
            </div>
        </div>
    )
}
