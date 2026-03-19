import { DEFAULT_CURRENCY } from '@/app/constants'
import { SUPPORTED_CURRENCIES } from '@/app/constants/currency'
import React from 'react'

export default function InvoiceHeaderSection({
    currency = DEFAULT_CURRENCY,
    handleInputChange,
}: {
    currency: string
    handleInputChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) {
    return (
        <div className="bg-white border-b border-stone-100 px-6 sm:px-10 py-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
                {/* Brand / Title */}
                <div className="flex items-center gap-3.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-stone-900 flex-shrink-0" />
                    <h1 className="text-xs font-medium tracking-[0.12em] text-stone-900 uppercase">
                        Invoice Generator
                    </h1>
                    <div className="w-px h-4 bg-stone-200" />
                    <p className="text-xs text-stone-400">Create professional invoices</p>
                </div>

                {/* Currency Selector */}
                <div className="flex items-center gap-2.5">
                    <span className="text-[11px] tracking-widest text-stone-400 uppercase hidden sm:block">
                        Currency
                    </span>
                    <div className="relative">
                        <select
                            name="currency"
                            value={currency}
                            onChange={handleInputChange}
                            className="
                appearance-none
                bg-transparent hover:bg-stone-50
                text-stone-800 text-xs font-medium
                border border-stone-200
                rounded-full
                pl-3.5 pr-7 py-1.5
                cursor-pointer
                transition-colors duration-150
                focus:outline-none focus:border-stone-400
              "
                        >
                            {SUPPORTED_CURRENCIES.map((item) => (
                                <option key={item.value} value={item.value}>
                                    {item.label} ({item.symbol})
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center">
                            <svg
                                className="w-2.5 h-2.5 text-stone-400"
                                viewBox="0 0 10 6"
                                fill="none"
                            >
                                <path
                                    d="M1 1L5 5L9 1"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
