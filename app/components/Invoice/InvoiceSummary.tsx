import { calculatePercentAmountOfTotal, formatCurrency } from '@/app/helpers';
import React from 'react';

export default function InvoiceSummary({
  tax = 0,
  discount = 0,
  subTotal,
  grandTotal,
  currencySymbol,
  handleInputChange,
}: any) {
  return (
    <div className="mt-8 space-y-4">
      <div className="border-t-2 border-slate-200 pt-6">
        {/* Subtotal */}
        <div className="flex justify-between items-center py-2">
          <span className="font-medium text-slate-700">Subtotal:</span>
          <span className="font-semibold text-slate-900 text-lg">
            {formatCurrency(subTotal, currencySymbol)}
          </span>
        </div>

        {/* Discount */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-2">
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-600">Discount (%):</label>
            <input
              type="number"
              name="discount"
              value={discount}
              onChange={(e) => handleInputChange(e)}
              className="w-20 h-8 px-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
              min="0"
              step="0.1"
            />
          </div>
          <div className="flex justify-between sm:justify-end items-center gap-4">
            <span className="text-sm text-slate-700">Discount:</span>
            <span className="font-medium text-green-600">
              -
              {formatCurrency(
                calculatePercentAmountOfTotal(subTotal, discount || 0),
                currencySymbol
              )}
            </span>
          </div>
        </div>

        {/* Tax */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-2">
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-600">Tax Rate (%):</label>
            <input
              type="number"
              name="tax"
              value={tax}
              onChange={(e) => handleInputChange(e)}
              className="w-20 h-8 px-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
              min="0"
              step="0.1"
            />
          </div>
          <div className="flex justify-between sm:justify-end items-center gap-4">
            <span className="text-sm text-slate-700">Tax:</span>
            <span className="font-medium text-slate-900">
              {formatCurrency(
                calculatePercentAmountOfTotal(subTotal, tax || 0),
                currencySymbol
              )}
            </span>
          </div>
        </div>

        {/* Total */}
        <div className="border-t border-slate-200 pt-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-slate-800">Total:</span>
            <span className="text-2xl font-bold text-slate-900">
              {formatCurrency(grandTotal, currencySymbol)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
