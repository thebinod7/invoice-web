import React from 'react';
import { SUPPORTED_CURRENCIES } from '../constants';
import { Download } from 'lucide-react';

interface InvoiceHeaderProps {
  invoice: Record<string, any>;
  handleInputChange: any;
  handleDownloadClick: () => void;
  pending: boolean;
}

export default function InvoiceHeader({
  pending,
  invoice,
  handleInputChange,
  handleDownloadClick,
}: InvoiceHeaderProps) {
  return (
    <div className="flex mt-6 justify-between flex-col md:flex-row gap-4 items-center mb-4">
      <div>
        <div className="w-full">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Select Currency
          </label>
          <select
            name="currency"
            value={invoice.currency}
            onChange={handleInputChange}
            className="min-w-44 px-3 text-xs py-2 border border-gray-300 rounded-md focus:outline-none"
          >
            {SUPPORTED_CURRENCIES.map((item) => {
              return (
                <option className="text-xs" key={item.value} value={item.value}>
                  {item.label} ({item.symbol})
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div>
        <button
          disabled={pending}
          type="button"
          onClick={handleDownloadClick}
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-greyish hover:text-white bg-darkish hover:bg-darkish focus:outline-none"
        >
          <Download className="h-5 w-5 mr-2" />
          {pending ? 'Generating...' : 'Generate Invoice'}
        </button>
      </div>
    </div>
  );
}
