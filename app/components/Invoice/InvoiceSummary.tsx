import { calculatePercentAmountOfTotal, formatCurrency } from '@/app/helpers'
import React from 'react'

export default function InvoiceSummary({
    tax,
    discount,
    subTotal,
    grandTotal,
    currencySymbol,
    handleInputChange,
}: any) {
    return (
        <div className="mt-8">
            <div className="border-t border-stone-100 pt-5 space-y-1">
                {/* Subtotal */}
                <div className="flex justify-between items-center py-2">
                    <span className="text-[11px] font-medium tracking-widest text-stone-500 uppercase">
                        Subtotal
                    </span>
                    <span className="text-sm font-medium text-stone-800">
                        {formatCurrency(subTotal, currencySymbol)}
                    </span>
                </div>

                {/* Discount */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-2">
                    <div className="flex items-center gap-2">
                        <label className="text-[11px] tracking-widest text-stone-400 uppercase">
                            Discount %
                        </label>
                        <input
                            type="number"
                            name="discount"
                            value={discount}
                            onChange={(e) => handleInputChange(e)}
                            className="w-16 h-8 px-2 text-xs text-stone-800 bg-stone-50 hover:bg-white border border-stone-200 rounded-md transition-colors duration-150 focus:outline-none focus:bg-white focus:border-stone-400"
                            placeholder="0"
                            min="0"
                            step="0.1"
                        />
                    </div>
                    <div className="flex justify-between sm:justify-end items-center gap-4">
                        <span className="text-[11px] font-medium tracking-widest text-stone-500 uppercase">
                            Discount
                        </span>
                        <span className="text-xs font-medium text-emerald-700">
                            -
                            {formatCurrency(
                                calculatePercentAmountOfTotal(subTotal, discount || 0),
                                currencySymbol,
                            )}
                        </span>
                    </div>
                </div>

                {/* Tax */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-2">
                    <div className="flex items-center gap-2">
                        <label className="text-[11px] tracking-widest text-stone-400 uppercase">
                            Tax %
                        </label>
                        <input
                            type="number"
                            name="tax"
                            value={tax}
                            onChange={(e) => handleInputChange(e)}
                            className="w-16 h-8 px-2 text-xs text-stone-800 bg-stone-50 hover:bg-white border border-stone-200 rounded-md transition-colors duration-150 focus:outline-none focus:bg-white focus:border-stone-400"
                            placeholder="0"
                            min="0"
                            step="0.1"
                        />
                    </div>
                    <div className="flex justify-between sm:justify-end items-center gap-4">
                        <span className="text-[11px] font-medium tracking-widest text-stone-500 uppercase">
                            Tax
                        </span>
                        <span className="text-xs font-medium text-stone-800">
                            {formatCurrency(
                                calculatePercentAmountOfTotal(subTotal, tax || 0),
                                currencySymbol,
                            )}
                        </span>
                    </div>
                </div>

                {/* Total */}
                <div className="border-t border-stone-100 pt-4 mt-2">
                    <div className="flex justify-between items-center">
                        <span className="text-[11px] font-medium tracking-widest text-stone-500 uppercase">
                            Total
                        </span>
                        <span className="text-xl font-medium text-stone-900 tracking-tight">
                            {formatCurrency(grandTotal, currencySymbol)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
