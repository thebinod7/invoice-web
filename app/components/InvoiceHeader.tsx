import React from 'react';
import { SUPPORTED_CURRENCIES } from '../constants';
import { Download } from 'lucide-react';

interface InvoiceHeaderProps {
  invoice: Record<string, any>;
  handleInputChange: any;
  handleDownloadClick: () => void;
}

export default function InvoiceHeader({
  invoice,
  handleInputChange,
  handleDownloadClick,
}: InvoiceHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Currency
          </label>
          <select
            name="currency"
            value={invoice.currency}
            onChange={handleInputChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {SUPPORTED_CURRENCIES.map((item) => {
              return (
                <option key={item.value} value={item.value}>
                  {item.label} ({item.symbol})
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div>
        <button
          type="button"
          onClick={handleDownloadClick}
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
        >
          <Download className="h-5 w-5 mr-2" />
          Download Invoice
        </button>
      </div>
    </div>
  );
}
