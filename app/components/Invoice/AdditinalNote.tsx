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
        <div className="bg-white border border-stone-100 rounded-xl">
            <div className="px-6 py-3.5 border-b border-stone-100 flex items-center gap-2">
                <MessageSquare className="h-3.5 w-3.5 text-stone-400" />
                <h3 className="text-[11px] font-medium tracking-widest text-stone-500 uppercase">
                    Additional Notes
                </h3>
            </div>
            <div className="p-6">
                <textarea
                    name="additionalNote"
                    value={value || ''}
                    onChange={(e) => handleInputChange(e)}
                    rows={3}
                    className="
            w-full px-3.5 py-3
            bg-stone-50 hover:bg-white
            border border-stone-200
            rounded-md
            text-xs text-stone-800 leading-relaxed
            placeholder:text-stone-500
            resize-vertical
            transition-colors duration-150
            focus:outline-none focus:bg-white focus:border-stone-400
          "
                    placeholder="e.g. Notes for the client (bank info, instructions, or thank you note.)"
                />
            </div>
        </div>
    )
}
