import { DEFAULT_CURRENCY } from '@/app/constants'
import { SUPPORTED_CURRENCIES } from '@/app/constants/currency'
import { ChevronDown, Coins } from 'lucide-react'
import React from 'react'

export default function InvoiceHeaderSection({
    currency = DEFAULT_CURRENCY,
    handleInputChange,
}: {
    currency: string
    handleInputChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) {
    return (
        <div className="border-b border-gray-100 bg-white px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
                <div className="min-w-0">
                    <h1 className="text-base font-semibold tracking-tight text-gray-900 sm:text-lg">
                        Invoice Generator
                    </h1>
                    <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                        Create and download a professional PDF invoice
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <span className="hidden text-xs font-semibold uppercase tracking-wide text-gray-500 sm:inline">
                        Currency
                    </span>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center">
                            <Coins className="h-4 w-4 text-gray-400" />
                        </div>
                        <select
                            name="currency"
                            value={currency}
                            onChange={handleInputChange}
                            aria-label="Currency"
                            className="appearance-none cursor-pointer rounded-lg border border-gray-200 bg-white py-2 pl-8 pr-8 text-sm font-medium text-gray-800 transition-colors hover:border-gray-300 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/20"
                        >
                            {SUPPORTED_CURRENCIES.map((item) => (
                                <option key={item.value} value={item.value}>
                                    {item.label} ({item.symbol})
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center">
                            <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
