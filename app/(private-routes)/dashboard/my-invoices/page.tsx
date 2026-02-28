'use client'

import { useState, useMemo } from 'react'
import FiltersSection from './FiltersSection'
import InvoiceList from './InvoiceList'
import { invoices } from './invoices'

export default function InvoicesPage() {
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('')

    const filtered = useMemo(() => {
        return invoices.filter((invoice) => {
            const q = search.toLowerCase()
            const matchesSearch =
                !search ||
                invoice.invoiceNumber.toLowerCase().includes(q) ||
                invoice.client.toLowerCase().includes(q)

            const matchesStatus =
                !status ||
                status === 'All' ||
                invoice.status === status ||
                (status === 'OVERDUE' && invoice.isOverdue)

            return matchesSearch && matchesStatus
        })
    }, [search, status])

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="mx-auto px-4 md:px-6 py-6 md:py-10">
                {/* Header */}
                <div className="mb-6 md:mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Invoices</h1>
                    <p className="text-sm md:text-base text-slate-600 mt-1">
                        Manage and track your invoices
                    </p>
                </div>

                {/* Filters */}
                <FiltersSection
                    search={search}
                    onSearchChange={setSearch}
                    status={status}
                    onStatusChange={setStatus}
                />

                {/* Invoice List */}
                <InvoiceList invoices={filtered} />
            </div>
        </div>
    )
}
