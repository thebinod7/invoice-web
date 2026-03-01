'use client'

import { Invoice } from './invoices'
import InvoiceCard from './InvoiceCard'
import { useAuthContext } from '@/app/context/useAuthContext'

interface InvoiceListProps {
    invoices: Invoice[]
}

export default function InvoiceList({ invoices }: InvoiceListProps) {
    const { currentUser } = useAuthContext()

    if (invoices.length === 0) {
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
