'use client'

import { Invoice } from './invoices'
import InvoiceCard from './InvoiceCard'
import { useAuthContext } from '@/app/context/useAuthContext'
import { LoadMore } from '@/app/components/LoadMore'

interface InvoiceListProps {
    invoices: Invoice[]
    isLoading: boolean
    handleLoadMore: () => void
}

export default function InvoiceList({ invoices, isLoading, handleLoadMore }: InvoiceListProps) {
    const { currentUser } = useAuthContext()

    if (invoices.length === 0 && !isLoading) {
        return (
            <div className="py-12 text-center">
                <p className="text-slate-400 text-sm">No invoices found</p>
            </div>
        )
    }

    return (
        <div className="space-y-2">
            {invoices.map((invoice) => (
                <InvoiceCard key={invoice._id} invoice={invoice} cu={currentUser} />
            ))}

            <LoadMore handleLoadMoreClick={handleLoadMore} isLoading={isLoading} />
        </div>
    )
}
