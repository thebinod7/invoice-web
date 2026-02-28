'use client'

import { AlarmClock, CheckCheck, Download, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const actionItems = [
    { icon: CheckCheck, label: 'Mark as Paid' },
    { icon: Download, label: 'Download' },
    { icon: AlarmClock, label: 'Send Reminder' },
    { icon: Pencil, label: 'Edit Invoice' },
]

export default function InvoiceActionMenu() {
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

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="More options"
            >
                <MoreHorizontal size={16} />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-40 bg-white border border-slate-200 rounded-lg shadow-lg z-50 overflow-hidden py-1">
                    {actionItems.map(({ icon: Icon, label }) => (
                        <button
                            key={label}
                            onClick={() => setIsOpen(false)}
                            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors text-left"
                        >
                            <Icon size={14} className="text-slate-400" />
                            <span>{label}</span>
                        </button>
                    ))}
                    <div className="h-px bg-slate-100 my-1" />
                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                        <Trash2 size={14} className="text-red-500" />
                        <span>Delete</span>
                    </button>
                </div>
            )}
        </div>
    )
}
