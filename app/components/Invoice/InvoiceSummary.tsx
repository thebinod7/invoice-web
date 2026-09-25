import { calculatePercentAmountOfTotal, formatCurrency } from '@/app/helpers'
import React from 'react'

const inputClass =
    'w-16 h-8 px-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg transition-colors duration-150 hover:border-gray-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20'

export default function InvoiceSummary({
    tax,
    discount,
    subTotal,
    grandTotal,
    currencySymbol,
    handleInputChange,
}: any) {
    return (
        <div className="mt-6 sm:mt-8">
            <div className="ml-auto w-full space-y-1 rounded-xl border border-gray-100 bg-gray-50/50 p-4 sm:max-w-sm sm:p-5">
                <div className="flex items-center justify-between py-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Subtotal
                    </span>
                    <span className="text-sm font-medium tabular-nums text-gray-900">
                        {formatCurrency(subTotal, currencySymbol)}
                    </span>
                </div>

                <div className="flex flex-col gap-2 border-t border-gray-100 py-2.5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                        <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Discount %
                        </label>
                        <input
                            type="number"
                            name="discount"
                            value={discount}
                            onChange={(e) => handleInputChange(e)}
                            className={inputClass}
                            placeholder="0"
                            min="0"
                            step="0.1"
                        />
                    </div>
                    <span className="text-sm font-medium tabular-nums text-emerald-700">
                        -
                        {formatCurrency(
                            calculatePercentAmountOfTotal(subTotal, discount || 0),
                            currencySymbol,
                        )}
                    </span>
                </div>

                <div className="flex flex-col gap-2 border-t border-gray-100 py-2.5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                        <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Tax %
                        </label>
                        <input
                            type="number"
                            name="tax"
                            value={tax}
                            onChange={(e) => handleInputChange(e)}
                            className={inputClass}
                            placeholder="0"
                            min="0"
                            step="0.1"
                        />
                    </div>
                    <span className="text-sm font-medium tabular-nums text-gray-900">
                        {formatCurrency(
                            calculatePercentAmountOfTotal(subTotal, tax || 0),
                            currencySymbol,
                        )}
                    </span>
                </div>

                <div className="mt-1 border-t border-gray-200 pt-3">
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Total
                        </span>
                        <span className="text-xl font-semibold tabular-nums tracking-tight text-gray-900">
                            {formatCurrency(grandTotal, currencySymbol)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
