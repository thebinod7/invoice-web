import { PlusCircle } from 'lucide-react';
import React from 'react';

export default function AddInvoiceItem({
  addListItem,
}: {
  addListItem: () => void;
}) {
  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={addListItem}
        className="border-2 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50 text-slate-700 hover:text-blue-700 bg-transparent w-full sm:w-auto px-4 py-2 rounded-md font-medium flex items-center justify-center gap-2 transition-colors duration-150"
      >
        <PlusCircle className="h-4 w-4" />
        Add Item
      </button>
    </div>
  );
}
