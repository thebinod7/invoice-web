import { DEFAULT_CURRENCY } from '@/app/constants';
import { SUPPORTED_CURRENCIES } from '@/app/constants/currency';
import React from 'react';

export default function InvoiceHeaderSection({
  currency = DEFAULT_CURRENCY,
  handleInputChange,
}: {
  currency: string;
  handleInputChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div className="bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 px-4 sm:px-8 py-4 sm:py-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center md:gap-8 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Invoice Generator
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm">
              Create professional invoices instantly
            </p>
          </div>

          <div className="md:ml-auto">
            <label className="block text-lg font-bold text-white mb-1">
              Select Currency
            </label>
            <select
              name="currency"
              value={currency}
              onChange={handleInputChange}
              className="min-w-44 px-3 text-xs py-2 border border-gray-300 rounded-md focus:outline-none"
            >
              {SUPPORTED_CURRENCIES.map((item) => (
                <option className="text-xs" key={item.value} value={item.value}>
                  {item.label} ({item.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
