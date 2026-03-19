import { isoToDateInput } from '@/app/helpers'
import { IInvoiceDetails } from '@/app/types'
import { Calendar, CreditCard, FileText, Hash } from 'lucide-react'
import React from 'react'

export default function InvoiceDetailsBox({
    currentInvoice,
    handleInputChange,
}: {
    currentInvoice: IInvoiceDetails
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
    return (
        <div className="bg-white border border-stone-100 rounded-xl">
            <div className="px-6 py-3.5 border-b border-stone-100 flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-stone-400" />
                <h3 className="text-[11px] font-medium tracking-widest text-stone-500 uppercase">
                    Invoice Details
                </h3>
            </div>

            <div className="p-6 flex flex-col gap-4 sm:gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-medium tracking-widest text-stone-500 uppercase flex items-center gap-1.5">
                            <Hash className="h-3 w-3 text-stone-400" />
                            Invoice Number
                        </label>
                        <input
                            type="text"
                            name="invoiceNumber"
                            value={currentInvoice.invoiceNumber || ''}
                            onChange={(e) => handleInputChange(e)}
                            className="w-full px-3 py-2 bg-stone-50 hover:bg-white border border-stone-200 rounded-md text-xs text-stone-800 placeholder:text-stone-500 h-9 transition-colors duration-150 focus:outline-none focus:bg-white focus:border-stone-400"
                            placeholder="INV-001"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-medium tracking-widest text-stone-500 uppercase flex items-center gap-1.5">
                            <Calendar className="h-3 w-3 text-stone-400" />
                            Due Date
                        </label>
                        <input
                            type="date"
                            name="dueDate"
                            value={
                                currentInvoice.dueDate ? isoToDateInput(currentInvoice.dueDate) : ''
                            }
                            onChange={(e) => handleInputChange(e)}
                            className="w-full px-3 py-2 bg-stone-50 hover:bg-white border border-stone-200 rounded-md text-xs text-stone-800 h-9 transition-colors duration-150 focus:outline-none focus:bg-white focus:border-stone-400"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-medium tracking-widest text-stone-500 uppercase flex items-center gap-1.5">
                            <Hash className="h-3 w-3 text-stone-400" />
                            PO Number
                        </label>
                        <input
                            type="text"
                            name="poNumber"
                            value={currentInvoice.poNumber || ''}
                            onChange={(e) => handleInputChange(e)}
                            className="w-full px-3 py-2 bg-stone-50 hover:bg-white border border-stone-200 rounded-md text-xs text-stone-800 placeholder:text-stone-500 h-9 transition-colors duration-150 focus:outline-none focus:bg-white focus:border-stone-400"
                            placeholder="PO-12345"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-medium tracking-widest text-stone-500 uppercase flex items-center gap-1.5">
                            <CreditCard className="h-3 w-3 text-stone-400" />
                            Payment Terms
                        </label>
                        <input
                            type="text"
                            name="paymentTerms"
                            value={currentInvoice.paymentTerms || ''}
                            onChange={(e) => handleInputChange(e)}
                            className="w-full px-3 py-2 bg-stone-50 hover:bg-white border border-stone-200 rounded-md text-xs text-stone-800 placeholder:text-stone-500 h-9 transition-colors duration-150 focus:outline-none focus:bg-white focus:border-stone-400"
                            placeholder="Payment due within 7 days"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
