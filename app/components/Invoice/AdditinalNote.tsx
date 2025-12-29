import { MessageSquare } from 'lucide-react';
import React from 'react';

export default function AdditinalNote({
  handleInputChange,
  value,
}: {
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
      <div className="px-4 py-3 border-b border-slate-200">
        <h3 className="flex items-center gap-2 text-slate-800 text-base font-semibold">
          <MessageSquare className="h-4 w-4 text-indigo-600" />
          Additional Notes
        </h3>
      </div>
      <div className="p-4">
        <textarea
          name="additionalNote"
          value={value || ''}
          onChange={(e) => handleInputChange(e)}
          rows={3}
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical text-sm"
          placeholder="Add any additional notes, terms, or payment instructions..."
        />
      </div>
    </div>
  );
}
