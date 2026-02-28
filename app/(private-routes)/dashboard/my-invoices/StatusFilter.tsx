'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

interface StatusFilterProps {
    value: string
    onChange: (value: string) => void
}

const statuses = ['All', 'PAID', 'SENT', 'OVERDUE']

export default function StatusFilter({ value, onChange }: StatusFilterProps) {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSelect = (status: string) => {
        onChange(status === 'All' ? '' : status)
        setIsOpen(false)
    }

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 md:px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors whitespace-nowrap"
            >
                <span>{value || 'Status'}</span>
                <ChevronDown
                    size={14}
                    className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-36 bg-white border border-slate-200 rounded-lg shadow-lg z-50 overflow-hidden py-1">
                    {statuses.map((status) => {
                        const isActive = value === status || (!value && status === 'All')
                        return (
                            <button
                                key={status}
                                onClick={() => handleSelect(status)}
                                className={`w-full text-left px-3.5 py-2 text-sm transition-colors ${
                                    isActive
                                        ? 'font-semibold text-slate-900 bg-slate-50'
                                        : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                {status}
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
