import { isoToDateInput } from '@/app/helpers';
import { IInvoiceDetails } from '@/app/types';
import { Calendar, CreditCard, FileText, Hash } from 'lucide-react';
import React from 'react';

export default function InvoiceDetailsBox({
  currentInvoice,
  handleInputChange,
}: {
  currentInvoice: IInvoiceDetails;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b border-slate-200">
        <h3 className="flex items-center gap-2 text-slate-800 text-lg sm:text-xl font-semibold">
          <FileText className="h-5 w-5 text-purple-600" />
          Invoice Details
        </h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
          {' '}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Hash className="h-4 w-4 text-purple-600" />
              Invoice Number
            </label>
            <input
              type="text"
              name="invoiceNumber"
              value={currentInvoice.invoiceNumber || ''}
              onChange={(e) => handleInputChange(e)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-10 sm:h-11"
              placeholder="INV-001"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-red-600" />
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={
                currentInvoice.dueDate
                  ? isoToDateInput(currentInvoice.dueDate)
                  : ''
              }
              onChange={(e) => handleInputChange(e)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-10 sm:h-11"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Hash className="h-4 w-4 text-orange-600" />
              PO Number
            </label>
            <input
              type="text"
              name="poNumber"
              value={currentInvoice.poNumber || ''}
              onChange={(e) => handleInputChange(e)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-10 sm:h-11"
              placeholder="PO-12345"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-orange-600" />
              Payment Terms
            </label>
            <input
              type="text"
              name="paymentTerms"
              value={currentInvoice.paymentTerms || ''}
              onChange={(e) => handleInputChange(e)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-10 sm:h-11"
              placeholder="Net 30 days"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
