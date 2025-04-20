import React from 'react';
import DiscountCalculator from './DiscountCalculator';
import TaxCalculator from './TaxCalculator';

interface TableFooterProps {
  invoice: Record<string, any>;
  handleInputChange: (event: any) => void;
  grandTotal: number;
  currencySymbol: string;
}

export default function TableFooter({
  invoice,
  handleInputChange,
  grandTotal,
  currencySymbol,
}: TableFooterProps) {
  return (
    <>
      <tfoot>
        <tr className="bg-gray-50">
          <td
            colSpan={3}
            className="px-6 py-4 text-right text-xs font-medium text-gray-900"
          >
            Subtotal
          </td>
          <td className="px-6 py-2 text-right text-sm font-medium text-gray-900">
            {currencySymbol} {''}
            {invoice.subtotal}
          </td>
        </tr>
        <tr className="bg-gray-50">
          <td className="px-6 py-4 text-xs font-medium text-gray-900">
            <textarea
              className="p-2 rounded-md outline-none border border-gray-300"
              rows={1}
              value={invoice.notes}
              onChange={handleInputChange}
              placeholder="Any relevant notes"
              name="notes"
            />
          </td>
          <td
            colSpan={2}
            className="px-6 text-right text-xs font-medium text-gray-900"
          >
            Tax
          </td>
          <td className="px-4 text-right text-sm font-medium text-gray-900">
            <TaxCalculator
              taxRate={invoice.tax}
              handleTaxInputChange={handleInputChange}
            />
          </td>
        </tr>
        <tr className="bg-gray-50">
          <td
            colSpan={3}
            className="px-6 text-right text-xs font-medium text-gray-900"
          >
            Discount
          </td>
          <td className="px-4 text-right text-sm font-medium text-gray-900">
            <DiscountCalculator
              discount={invoice.discount}
              handleDiscountInputChange={handleInputChange}
            />
          </td>
        </tr>
        <tr className="bg-gray-50">
          <td
            colSpan={3}
            className="px-6 py-4 text-right text-xs font-medium text-gray-900"
          >
            Balance Due
          </td>
          <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
            {currencySymbol} {''}
            {grandTotal.toFixed(2)}
          </td>
        </tr>
      </tfoot>
    </>
  );
}
