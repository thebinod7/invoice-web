'use client'

import { capitalizeFirstLetter, formatCurrency, formatDate } from '@/app/helpers'
import InvoiceActionMenu from './InvoiceActionMenu'
import { Invoice, getStatusStyles } from './invoices'
import { INVOICE_STATUS } from '@/app/constants'
import { ICurrentUser } from '@/app/types'
import EmailDrawer from '@/ui/EmailDrawer'

interface InvoiceCardProps {
    invoice: Invoice
    cu: ICurrentUser | null
}

export default function InvoiceCard({ invoice, cu }: InvoiceCardProps) {
    const statusKey = invoice.status
    const styles = getStatusStyles(
        statusKey as 'PAID' | 'SENT' | 'CREATED' | 'OVERDUE' | 'CANCELLED',
    )

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
                    {capitalizeFirstLetter(invoice?.status.toLowerCase() || 'NA')}
                </div>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-2">
                {invoice.status === INVOICE_STATUS.PAID ? (
                    <button
                        disabled={true}
                        className="px-3 py-1.5 text-xs font-medium bg-white text-slate-600 border border-slate-200 rounded-lg transition-colors whitespace-nowrap"
                    >
                        Done
                    </button>
                ) : (
                    cu?.activeSubscription && (
                        <EmailDrawer
                            allowedFeatures={cu.activeSubscription.allowedFeatures}
                            invoiceId={invoice._id}
                        />
                    )
                )}

                <InvoiceActionMenu rowId={invoice._id} />
            </div>
        </div>
    )
}
