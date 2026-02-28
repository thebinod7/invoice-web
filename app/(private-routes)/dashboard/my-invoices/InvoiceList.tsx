'use client'

import { Invoice } from './invoices'
import InvoiceCard from './InvoiceCard'

interface InvoiceListProps {
    invoices: Invoice[]
}

export default function InvoiceList({ invoices }: InvoiceListProps) {
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
                <InvoiceCard key={invoice.id} invoice={invoice} />
            ))}
        </div>
    )
}
