import { isoToDateInput } from '@/app/helpers'
import { IInvoiceDetails } from '@/app/types'
import { Calendar, CreditCard, FileText, Hash } from 'lucide-react'
import React from 'react'

const inputClass =
    'w-full h-9 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 transition-colors duration-150 hover:border-gray-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20'

const labelClass =
    'flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500'

export default function InvoiceDetailsBox({
    currentInvoice,
    handleInputChange,
}: {
    currentInvoice: IInvoiceDetails
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
    return (
        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50/50 px-4 py-3.5 sm:px-6">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                    <FileText className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="min-w-0">
                    <h2 className="text-sm font-semibold tracking-tight text-gray-900 sm:text-base">
                        Invoice Details
                    </h2>
                    <p className="mt-0.5 hidden text-xs text-gray-500 sm:block">
                        Number, due date, and payment terms
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-4 p-4 sm:gap-5 sm:p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                    <div className="flex flex-col gap-1.5">
                        <label className={labelClass}>
                            <Hash className="h-3 w-3 text-gray-400" />
                            Invoice Number
                        </label>
                        <input
                            type="text"
                            name="invoiceNumber"
                            value={currentInvoice.invoiceNumber || ''}
                            onChange={(e) => handleInputChange(e)}
                            className={inputClass}
                            placeholder="Eg: INV-001"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className={labelClass}>
                            <Calendar className="h-3 w-3 text-gray-400" />
                            Due Date
                        </label>
                        <input
                            type="date"
                            name="dueDate"
                            value={isoToDateInput(currentInvoice.dueDate)}
                            onChange={(e) => handleInputChange(e)}
                            className={inputClass}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                    <div className="flex flex-col gap-1.5">
                        <label className={labelClass}>
                            <Hash className="h-3 w-3 text-gray-400" />
                            PO Number
                        </label>
                        <input
                            type="text"
                            name="poNumber"
                            value={currentInvoice.poNumber || ''}
                            onChange={(e) => handleInputChange(e)}
                            className={inputClass}
                            placeholder="Eg: PO-12345"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className={labelClass}>
                            <CreditCard className="h-3 w-3 text-gray-400" />
                            Payment Terms
                        </label>
                        <input
                            type="text"
                            name="paymentTerms"
                            value={currentInvoice.paymentTerms || ''}
                            onChange={(e) => handleInputChange(e)}
                            className={inputClass}
                            placeholder="Eg: Payment due within 7 days"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
