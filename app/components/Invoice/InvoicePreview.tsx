import Image from 'next/image';
import React from 'react';

export default function InvoicePreview({ invoice, logoPreview, lineItems }) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium text-gray-700 mb-4">
        Invoice Preview
      </h2>
      <div className="border border-gray-200 rounded-lg p-8 bg-white">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between mb-10">
          <div className="mb-6 md:mb-0">
            {logoPreview && (
              <div className="h-16 w-40 relative mb-4">
                <Image
                  src={logoPreview || '/placeholder.svg'}
                  alt="Company logo"
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <h3 className="text-xl font-bold text-gray-800">
              {invoice.companyName}
            </h3>
            {invoice.companyEmail && (
              <p className="text-gray-600">{invoice.companyEmail}</p>
            )}
            {invoice.companyPhone && (
              <p className="text-gray-600">{invoice.companyPhone}</p>
            )}
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">INVOICE</h2>
            <p className="text-gray-600">#{invoice.invoiceNumber}</p>
            <div className="mt-4">
              <div className="grid grid-cols-2 gap-1 text-sm">
                <span className="text-gray-600 text-right">Issue Date:</span>
                <span className="font-medium">
                  {new Date(invoice.invoiceDate).toLocaleDateString()}
                </span>
                <span className="text-gray-600 text-right">Due Date:</span>
                <span className="font-medium">
                  {new Date(invoice.dueDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Client Info */}
        <div className="mb-10">
          <h3 className="text-gray-600 font-medium mb-2">Bill To:</h3>
          <p className="font-medium">{invoice.clientName || 'Client Name'}</p>
          <p className="text-gray-600">
            {invoice.clientAddress || 'Client Address'}
          </p>
        </div>

        {/* Items Table */}
        <div className="mb-8">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {lineItems.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {item.description || 'Item description'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-right">
                    {item.price > 0 ? item.price : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-300">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800 text-right">
                  Total:
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-gray-800 text-right">
                  {invoice.total}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Notes & Terms */}
        <div className="border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-600 mb-1">
            Payment Terms: Due on receipt
          </p>
          <p className="text-sm text-gray-600">Thank you for your business!</p>
        </div>
      </div>
    </div>
  );
}
