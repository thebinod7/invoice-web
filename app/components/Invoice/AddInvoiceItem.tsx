import { PlusCircle } from 'lucide-react'
import React from 'react'

export default function AddInvoiceItem({ addListItem }: { addListItem: () => void }) {
    return (
        <div className="mt-3">
            <button
                type="button"
                onClick={addListItem}
                className="
          border border-dashed border-stone-200 hover:border-stone-300
          bg-transparent hover:bg-stone-50
          text-stone-700 hover:text-stone-800
          w-full px-4 py-2.5 rounded-md
          text-[11px] font-medium tracking-widest uppercase
          flex items-center justify-center gap-2
          transition-colors duration-150
        "
            >
                <PlusCircle className="h-3.5 w-3.5" />
                Add Item
            </button>
        </div>
    )
}
