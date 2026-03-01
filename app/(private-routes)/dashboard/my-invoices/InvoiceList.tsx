'use client'

import { useAuthContext } from '@/app/context/useAuthContext'
import InvoiceCard from './InvoiceCard'
import { Invoice } from './invoices'

interface InvoiceListProps {
    invoices: Invoice[]
    isLoading: boolean
}

export default function InvoiceList({ invoices, isLoading }: InvoiceListProps) {
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
        </div>
    )
}
