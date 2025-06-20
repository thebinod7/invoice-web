'use client';

import type React from 'react';

import { MAX_FILE_SIZE } from '@/app/constants';
import { API_ROUTES } from '@/app/constants/api-routes';
import {
  calculateFileSizeInMB,
  generateRandomNumber,
  getCurrencySymbolByName,
} from '@/app/helpers';
import { postRequest } from '@/app/helpers/request';
import { calculateGrandTotal } from '@/app/hooks/useGrandTotal';
import { ILineItem } from '@/app/types';
import { useMutation } from '@tanstack/react-query';
import { PlusCircle, Trash } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import CompanyLogo from '../CompanyLogo';
import InvoiceHeader from '../InvoiceHeader';
import TableFooter from '../TableFooter';
import LineItemsTableHead from './LineItemsTableHead';
import { useRouter } from 'next/navigation';

const DEFAULT_CURRENCY = 'USD';

export default function InvoiceGenerator() {
  const router = useRouter();

  const [lineItems, setLineItems] = useState<ILineItem[]>([
    {
      id: generateRandomNumber(),
      title: '',
      quantity: '',
      rate: '',
    },
  ]);
  const [invoice, setInvoice] = useState({
    companyLogo: '',
    currency: DEFAULT_CURRENCY,
    billFromName: '',
    billFromAddress: '',
    billToName: '',
    billToAddress: '',
    senderEmail: '',
    clientEmail: '',
    invoiceNumber: '',
    invoiceDate: '',
    dueDate: '',
    poNumber: '',
    paymentTerms: '',
    notes: '',
    tax: '',
    discount: '',
    subtotal: 0,
  });

  const [logoPreview, setLogoPreview] = useState('');

  const clearUploadedLogo = () => {
    setLogoPreview('');
    setInvoice({ ...invoice, companyLogo: '' });
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const fileSize = +calculateFileSizeInMB(file?.size || 0);
    if (fileSize > MAX_FILE_SIZE) {
      return toast.error(`File size must be less than ${MAX_FILE_SIZE} MB.`);
    }
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
    setLineItems([
      ...lineItems,
      {
        id: generateRandomNumber(),
        title: '',
        rate: '',
        quantity: '1',
      },
    ]);
  };

  const removeItem = (index: number) => {
    const updatedItems = lineItems.filter((_, i) => i !== index);
    setLineItems(updatedItems);
    calculateSubtotal(updatedItems);
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    const updatedItems = [...lineItems];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]:
        field === 'price' ? Number.parseFloat(value as string) || 0 : value,
    };
    setLineItems(updatedItems);
    calculateSubtotal(updatedItems);
  };

  const calculateSubtotal = (items: ILineItem[]) => {
    let subTotal = 0;

    items.forEach((item: any) => {
      item.total =
        parseFloat(item.rate || '0') * parseInt(item.quantity || '1');
      subTotal += item.total;
    });
    setInvoice({
      ...invoice,
      subtotal: +subTotal.toFixed(2),
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
  };

  const generateInvoiceMutation = useMutation({
    mutationFn: (payload: any) => {
      return postRequest(API_ROUTES.GENERATE_INVOICE, payload, {
        responseType: 'blob',
      });
    },
    onError: (error) => {
      toast.error(error.message || 'Something went wrong!');
    },
    onSuccess: (data: any) => {
      const blob = new Blob([data.data], { type: 'application/pdf' });
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'invoice.pdf';
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(link.href);
      document.body.removeChild(link);
      // toast.success('Invoice downloaded successfully!', {
      //   position: 'top-center',
      // });
      router.push('/thanks');
    },
  });

  const downloadInvoice = () => {
    if (
      !invoice.billFromName ||
      !invoice.billToName ||
      !invoice.billFromAddress ||
      !invoice.billToAddress
    ) {
      return toast.error('Please enter required fields!');
    }
    const dueAmount = calculateGrandTotal({
      items: lineItems,
      tax: parseFloat(invoice.tax) || 0,
      discount: parseFloat(invoice.discount) || 0,
    });
    const payload = {
      ...invoice,
      invoiceItems: lineItems,
      subTotal: +invoice.subtotal,
      dueAmount: dueAmount.toFixed(2),
      currency: getCurrencySymbolByName(invoice.currency),
    };
    generateInvoiceMutation.mutate(payload);
  };

  const grandTotal = calculateGrandTotal({
    items: lineItems,
    tax: parseFloat(invoice.tax) || 0,
    discount: parseFloat(invoice.discount) || 0,
  });

  const currencySymbol = getCurrencySymbolByName(invoice.currency);

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden px-8">
          <InvoiceHeader
            invoice={invoice}
            handleInputChange={handleInputChange}
            handleDownloadClick={downloadInvoice}
            pending={generateInvoiceMutation.isPending}
          />

          <div className="border-t border-gray-200 my-4" />

          {/* Company Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="col-span-1">
              <CompanyLogo
                logoPreview={logoPreview}
                handleLogoChange={handleLogoChange}
                clearUploadedLogo={clearUploadedLogo}
              />
            </div>

            <div className="col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    <strong>
                      Sending Bill From{' '}
                      <span className="text-red-700">(Required)</span>
                    </strong>
                  </label>
                  <input
                    type="text"
                    name="billFromName"
                    value={invoice.billFromName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    <strong>
                      Sender Address
                      <span className="text-red-700"> (Required)</span>
                    </strong>
                  </label>
                  <input
                    type="text"
                    name="billFromAddress"
                    value={invoice.billFromAddress}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter address"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    <strong>
                      {' '}
                      Sending Bill To{' '}
                      <span className="text-red-700">(Required)</span>
                    </strong>
                  </label>
                  <input
                    type="text"
                    name="billToName"
                    value={invoice.billToName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    <strong>
                      Receiver Address
                      <span className="text-red-700"> (Required)</span>
                    </strong>
                  </label>
                  <input
                    type="text"
                    name="billToAddress"
                    value={invoice.billToAddress}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter address"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Bill Sender Email
                  </label>
                  <input
                    type="email"
                    name="senderEmail"
                    value={invoice.senderEmail}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter email"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Bill Receiver Email
                  </label>
                  <input
                    type="email"
                    name="clientEmail"
                    value={invoice.clientEmail}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter email"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Invoice Number
              </label>
              <input
                type="text"
                name="invoiceNumber"
                value={invoice.invoiceNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Eg: 1"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
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
              <label className="block text-xs font-medium text-gray-700 mb-1">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                PO Number
              </label>
              <input
                type="text"
                name="poNumber"
                value={invoice.poNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter PO Number"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Payment Terms
              </label>
              <input
                type="text"
                name="paymentTerms"
                value={invoice.paymentTerms}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter payment terms"
              />
            </div>
          </div>

          {/* Line Items */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-700">
                Invoice Items
              </h2>
              {/* <button
                type="button"
                onClick={addItem}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-stone-500 hover:bg-stone-600 focus:outline-none"
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                <span className="hidden sm:block">Add Item</span>
              </button> */}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-gray-200">
                <LineItemsTableHead />
                <tbody className="bg-white divide-y divide-gray-200">
                  {lineItems.map((item, index) => (
                    <tr key={index}>
                      {/* Title column */}
                      <td width={'50%'} className="px-2 py-4">
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) =>
                            updateItem(index, 'title', e.target.value)
                          }
                          className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Item description"
                        />
                      </td>

                      {/* Quantity column */}
                      <td width={'5%'} className="px-4 py-4">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateItem(index, 'quantity', e.target.value)
                          }
                          className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="0"
                          step="1"
                        />
                      </td>

                      {/* Rate column */}
                      <td width={'20%'} className="px-2 py-4">
                        <input
                          type="number"
                          value={item.rate || ''}
                          onChange={(e) =>
                            updateItem(index, 'rate', e.target.value)
                          }
                          className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="0.00"
                          min="0"
                          step="1"
                        />
                      </td>

                      {/* Amount column */}
                      <td width={'25%'} className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-8 items-center">
                          <p>
                            <span className="text-xs">{currencySymbol}</span>{' '}
                            {parseInt(item.quantity || '0') *
                              parseFloat(item.rate || '0')}
                          </p>
                          <Trash
                            className="cursor-pointer"
                            size={16}
                            color="red"
                            onClick={() => removeItem(index)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}

                  <tr>
                    <td className="pl-2" colSpan={4}>
                      <button
                        type="button"
                        onClick={addItem}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-stone-500 hover:bg-stone-600 focus:outline-none"
                      >
                        <PlusCircle className="h-4 w-4 mr-1" />
                        <span className="hidden sm:block">Add Item</span>
                      </button>
                    </td>
                  </tr>
                </tbody>

                <TableFooter
                  invoice={invoice}
                  grandTotal={grandTotal}
                  handleInputChange={handleInputChange}
                  currencySymbol={currencySymbol}
                />
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
