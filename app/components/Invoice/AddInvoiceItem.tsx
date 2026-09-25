import { Plus } from 'lucide-react'
import React from 'react'

export default function AddInvoiceItem({ addListItem }: { addListItem: () => void }) {
    return (
        <div className="mt-4">
            <button
                type="button"
                onClick={addListItem}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors duration-150 hover:border-emerald-300 hover:bg-emerald-50/40 hover:text-emerald-700"
            >
                <Plus className="h-4 w-4" />
                Add Item
            </button>
        </div>
    )
}
