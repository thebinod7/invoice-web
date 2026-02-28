'use client'

import { Search, X } from 'lucide-react'
import { useCallback } from 'react'

interface SearchBarProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

export default function SearchBar({
    value,
    onChange,
    placeholder = 'Search invoices...',
}: SearchBarProps) {
    const handleClear = useCallback(() => {
        onChange('')
    }, [onChange])

    return (
        <div className="relative flex-1">
            <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-10 pr-10 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {value && (
                <button
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    aria-label="Clear search"
                >
                    <X size={16} />
                </button>
            )}
        </div>
    )
}
