'use client';

import type React from 'react';

import { Download, PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import CompanyLogo from '../CompanyLogo';
import InvoicePreview from './InvoicePreview';
import { SUPPORTED_CURRENCIES } from '@/app/constants';
import LineItemsTableHead from './LineItemsTableHead';
import { time } from 'console';
import { title } from 'process';

export default function DemoInvoiceGenerator() {
  const [lineItems, setLineItems] = useState([
    {
      title: '',
      quantity: '',
      rate: '',
      amount: '',
    },
  ]);
  const [invoice, setInvoice] = useState({
    companyLogo: '',
    currency: 'USD',
    companyName: '',
    invoiceNumber: '',
    invoiceDate: new Date().toISOString().slice(0, 10),
    dueDate: new Date().toISOString().slice(0, 10),
    clientName: '',
    clientAddress: '',
    companyEmail: '',
    companyPhone: '',
    total: 0,
  });

  const [logoPreview, setLogoPreview] = useState('');

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setLogoPreview(result);
        setInvoice({ ...invoice, companyLogo: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const addItem = () => {
    // setInvoice({
    //   ...lineItems,
    //   items: [...lineItems, { title: '', rate: '', quantity: '', amount: '' }],
    // });
  };

  const removeItem = (index: number) => {
    // const updatedItems = lineItems.filter((_, i) => i !== index);
    // setInvoice({
    //   ...invoice,
    //   items: updatedItems,
    // });
    // calculateTotal(updatedItems);
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    // const updatedItems = [...lineItems];
    // updatedItems[index] = {
    //   ...updatedItems[index],
    //   [field]:
    //     field === 'price' ? Number.parseFloat(value as string) || 0 : value,
    // };
    // setInvoice({
    //   ...invoice,
    //   items: updatedItems,
    // });
    // calculateTotal(updatedItems);
  };

  const calculateTotal = (items: { description: string; price: number }[]) => {
    const total = items.reduce((sum, item) => sum + (item.price || 0), 0);
    setInvoice((prev) => ({ ...prev, total }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: invoice.currency,
    }).format(amount);
  };

  // This would be connected to a real PDF generation library in production
  const downloadInvoice = () => {
    alert('In a real application, this would generate a PDF for download.');
    console.log('Invoice Data:', invoice);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-0 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Invoice Generator
          </h1>

          {/* Company Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="col-span-1">
              <CompanyLogo
                logoPreview={logoPreview}
                handleLogoChange={handleLogoChange}
              />
            </div>

            <div className="col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={invoice.companyName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Currency
                  </label>
                  <select
                    name="currency"
                    value={invoice.currency}
                    onChange={(e) =>
                      setInvoice({
                        ...invoice,
                        currency: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Email
                  </label>
                  <input
                    type="email"
                    name="companyEmail"
                    value={invoice.companyEmail}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter company email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Phone
                  </label>
                  <input
                    type="tel"
                    name="companyPhone"
                    value={invoice.companyPhone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter company phone"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Invoice Number
              </label>
              <input
                type="text"
                name="invoiceNumber"
                value={invoice.invoiceNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter invoice number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Invoice Date
              </label>
              <input
                type="date"
                name="invoiceDate"
                value={invoice.invoiceDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                value={invoice.dueDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Client Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client Name
              </label>
              <input
                type="text"
                name="clientName"
                value={invoice.clientName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter client name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client Address
              </label>
              <input
                type="text"
                name="clientAddress"
                value={invoice.clientAddress}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter client address"
              />
            </div>
          </div>

          {/* Line Items */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-700">
                Invoice Items
              </h2>
              <button
                type="button"
                onClick={addItem}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                Add Item
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <LineItemsTableHead />
                <tbody className="bg-white divide-y divide-gray-200">
                  {lineItems.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) =>
                            updateItem(index, 'description', e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Item description"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <input
                            type="number"
                            value={item.quantity || ''}
                            onChange={(e) =>
                              updateItem(index, 'price', e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0"
                            min="0"
                            step="1"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-gray-500 mr-2">
                            {invoice.currency}
                          </span>
                          <input
                            type="number"
                            value={item.rate || ''}
                            onChange={(e) =>
                              updateItem(index, 'price', e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-gray-500 mr-2">
                            {invoice.currency}
                          </span>
                          <p>100</p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                      Total:
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                      {formatCurrency(invoice.total)}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <InvoicePreview
            lineItems={lineItems}
            invoice={invoice}
            logoPreview={logoPreview}
          />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={downloadInvoice}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
