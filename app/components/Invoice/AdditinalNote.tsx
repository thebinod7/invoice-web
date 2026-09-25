import { MessageSquare } from 'lucide-react'
import React from 'react'

export default function AdditinalNote({
    handleInputChange,
    value,
}: {
    handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    value: string
}) {
    return (
        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50/50 px-4 py-3.5 sm:px-6">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                    <MessageSquare className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="min-w-0">
                    <h2 className="text-sm font-semibold tracking-tight text-gray-900 sm:text-base">
                        Additional Notes
                    </h2>
                    <p className="mt-0.5 hidden text-xs text-gray-500 sm:block">
                        Optional note shown on the invoice PDF
                    </p>
                </div>
            </div>
            <div className="p-4 sm:p-6">
                <textarea
                    name="additionalNote"
                    value={value || ''}
                    onChange={(e) => handleInputChange(e)}
                    rows={3}
                    className="w-full resize-vertical rounded-lg border border-gray-200 bg-white px-3.5 py-3 text-sm leading-relaxed text-gray-900 placeholder:text-gray-400 transition-colors duration-150 hover:border-gray-300 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/20"
                    placeholder="Eg: Notes for the client (bank info, instructions, or thank you note.)"
                />
            </div>
        </section>
    )
}
