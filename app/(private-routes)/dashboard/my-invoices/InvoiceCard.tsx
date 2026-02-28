'use client'

import { capitalizeFirstLetter, formatCurrency, formatDate } from '@/app/helpers'
import InvoiceActionMenu from './InvoiceActionMenu'
import { Invoice, getStatusStyles } from './invoices'

interface InvoiceCardProps {
    invoice: Invoice
}

export default function InvoiceCard({ invoice }: InvoiceCardProps) {
    const statusKey = invoice.status
    const styles = getStatusStyles(statusKey as 'PAID' | 'SENT' | 'CREATED' | 'OVERDUE')

    return (
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 p-3.5 md:p-4 bg-white border border-slate-200 rounded-xl hover:shadow-md transition-shadow">
            {/* Left: Client + Invoice Number */}
            <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-slate-900 truncate">
                    {invoice.receiverDetails}
                </div>
                <div className="text-xs text-slate-400 font-mono mt-1">{invoice.invoiceNumber}</div>
            </div>

            {/* Center: Amount + Due Date */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <div className="sm:text-right">
                    <div className="text-sm md:text-base font-bold text-slate-900">
                        {formatCurrency(invoice.grandTotal, invoice.currency)}
                    </div>
                    <div
                        className={`text-xs mt-1 ${
                            invoice.grandTotal ? 'text-red-500' : 'text-slate-400'
                        }`}
                    >
                        {invoice.dueDate ? formatDate(invoice.dueDate) : 'No due date'}
                    </div>
                </div>

                {/* Status Badge */}
                <div
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold w-fit ${styles.bg} ${styles.text}`}
                >
                    <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
                    {capitalizeFirstLetter(invoice.status.toLowerCase())}
                </div>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-2">
                {invoice.status === 'SENT' && (
                    <button className="px-3 py-1.5 text-xs font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap">
                        Send
                    </button>
                )}
                {invoice.status === 'PAID' && (
                    <button className="px-3 py-1.5 text-xs font-medium bg-white text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap">
                        Done
                    </button>
                )}

                <InvoiceActionMenu />
            </div>
        </div>
    )
}
