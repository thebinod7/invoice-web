'use client';

import { MAX_FILE_SIZE, MAX_FILE_SIZE_BYTES } from '@/app/constants';
import { API_ROUTES } from '@/app/constants/api-routes';
import { SUPPORTED_CURRENCIES } from '@/app/constants/currency';
import {
  calculateFileSizeInMB,
  calculatePercentAmountOfTotal,
  formatCurrency,
  getCurrencySymbolByName,
} from '@/app/helpers';
import {
  getInvoiceDetails,
  saveInvoiceDetails,
} from '@/app/helpers/local-storage';
import { postRequest } from '@/app/helpers/request';
import { calculateGrandTotal } from '@/app/hooks/useGrandTotal';
import { ILineItem } from '@/app/types';
import { useMutation } from '@tanstack/react-query';
import {
  Building,
  Calendar,
  CreditCard,
  Download,
  FileText,
  Hash,
  Loader2,
  MessageSquare,
  PlusCircle,
  Trash2,
  Upload,
  User,
  X,
} from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const DEFAULT_CURRENCY = 'USD';

const invoiceInitial = {
  companyLogo: '',
  currency: DEFAULT_CURRENCY,
  senderDetails: '',
  receiverDetails: '',
  clientEmail: '',
  invoiceNumber: '',
  invoiceDate: '',
  dueDate: '',
  poNumber: '',
  paymentTerms: '',
  notes: '',
  tax: 0,
  discount: 0,
  subtotal: 0,
};

const initialLineItems = [{ title: '', quantity: '', rate: '' }];

export default function InvoiceGeneratorV2() {
  const [invoice, setInvoice] = useState(invoiceInitial);
  const [lineItems, setLineItems] = useState(initialLineItems);
  const [logoPreview, setLogoPreview] = useState('');
  const [fileName, setFileName] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setInvoice((prev) => ({ ...prev, [name]: value }));
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
    setFileName(file?.name || '');
  };

  const clearUploadedLogo = () => {
    setLogoPreview('');
    setFileName('');
  };

  const addItem = () => {
    setLineItems([...lineItems, { title: '', quantity: '', rate: '' }]);
  };

  const removeItem = (index: number) => {
    setLineItems(lineItems.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: string, value: string) => {
    const updated = lineItems.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setLineItems(updated);
    calculateSubtotal(updated);
  };

  const generateInvoiceMutation = useMutation({
    mutationFn: (payload: any) => {
      return postRequest(API_ROUTES.GENERATE_INVOICE, payload, {
        responseType: 'blob',
      });
    },
    onError: (error: any) => {
      if (error.code === 'ERR_NETWORK') {
        return toast.error('Website is too busy! Please try again later.');
      }
      toast.error(
        error.message || 'Website is too busy! Please try again later.'
      );
    },
    onSuccess: (data: any) => {
      saveInvoiceDetails({
        senderDetails: invoice.senderDetails,
        receiverDetails: invoice.receiverDetails,
        currency: invoice.currency,
        companyLogo: invoice.companyLogo,
      });
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      console.log({ isMobile });

      const blob = new Blob([data.data], { type: 'application/pdf' });
      const blobUrl = window.URL.createObjectURL(blob);

      if (isMobile) {
        window.open(blobUrl, '_blank'); // Open instead of download
      } else {
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'invoice.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      window.URL.revokeObjectURL(blobUrl);
      window.location.replace('/thanks');
    },
  });

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

  const finalTotal = calculateGrandTotal({
    items: lineItems,
    tax: invoice.tax,
    discount: invoice.discount,
  });

  const downloadInvoice = () => {
    if (!invoice.senderDetails || !invoice.receiverDetails) {
      return toast.error('Please enter sender and reciever details!');
    }
    const payload = {
      ...invoice,
      invoiceItems: lineItems,
      subTotal: +invoice.subtotal,
      dueAmount: finalTotal,
      tax: calculatePercentAmountOfTotal(invoice.subtotal, invoice.tax),
      discount: calculatePercentAmountOfTotal(
        invoice.subtotal,
        invoice.discount
      ),
      currency: getCurrencySymbolByName(invoice.currency),
    };
    generateInvoiceMutation.mutate(payload);
  };

  useEffect(() => {
    const storedInvoice = getInvoiceDetails();
    if (!storedInvoice) return;
    const { companyLogo, ...rest } = storedInvoice;
    if (rest) setInvoice({ ...invoice, ...rest, companyLogo });
    if (companyLogo) setLogoPreview(companyLogo);
  }, []);

  const currencySymbol = getCurrencySymbolByName(invoice.currency);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden">
          {/* Header Section - Fully Responsive */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-4 sm:px-8 py-4 sm:py-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row md:items-center md:gap-8 gap-4">
                {/* <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm w-fit">
                  <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div> */}

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
                    value={invoice.currency}
                    onChange={handleInputChange}
                    className="min-w-44 px-3 text-xs py-2 border border-gray-300 rounded-md focus:outline-none"
                  >
                    {SUPPORTED_CURRENCIES.map((item) => (
                      <option
                        className="text-xs"
                        key={item.value}
                        value={item.value}
                      >
                        {item.label} ({item.symbol})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
            {/* Company Information Section - Responsive Grid */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-slate-200">
                <h3 className="flex items-center gap-2 text-slate-800 text-lg sm:text-xl font-semibold">
                  <Building className="h-5 w-5 text-blue-600" />
                  Basic Information
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                  {/* Logo Upload - Full width on mobile */}
                  <div className="lg:col-span-1">
                    <label className="text-sm font-medium text-slate-700 mb-3 block">
                      Company Logo
                    </label>
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 sm:p-6 text-center hover:border-blue-400 transition-colors duration-200">
                      {logoPreview ? (
                        <div className="relative">
                          <img
                            src={logoPreview || '/placeholder.svg'}
                            alt="Logo preview"
                            className="max-h-20 sm:max-h-24 mx-auto rounded-lg"
                          />
                          <button
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center"
                            onClick={clearUploadedLogo}
                          >
                            <X className="h-3 w-3" />
                          </button>
                          {fileName && (
                            <p className="text-xs text-slate-600 mt-2 truncate">
                              {fileName}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="h-6 w-6 sm:h-8 sm:w-8 text-slate-400 mx-auto" />
                          <div>
                            <button className="relative bg-transparent border border-slate-300 hover:bg-slate-50 px-4 py-2 rounded-md text-xs sm:text-sm font-medium text-slate-700">
                              <input
                                max={MAX_FILE_SIZE_BYTES}
                                type="file"
                                onChange={handleLogoChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                accept="image/png, image/jpeg, image/jpg"
                              />
                              Choose File
                            </button>
                          </div>
                          <p className="text-xs text-slate-500">
                            PNG, JPG up to {MAX_FILE_SIZE} MB
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Company Details - Responsive Grid */}
                  <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 flex items-center gap-2 flex-wrap">
                          <User className="h-4 w-4 text-blue-600" />
                          <span>Sender Details</span>
                          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                            Required
                          </span>
                        </label>
                        <textarea
                          name="senderDetails"
                          value={invoice.senderDetails || ''}
                          onChange={handleInputChange}
                          rows={7}
                          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical text-sm"
                          placeholder={`Eg: XYZ Corporation\n123 Main Street, Suite 400 \n(555) 123-4567 \nbilling@xyz.com\nmore details...`}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 flex items-center gap-2 flex-wrap">
                          <Building className="h-4 w-4 text-blue-600" />
                          <span>Receiver Details</span>
                          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                            Required
                          </span>
                        </label>
                        <textarea
                          name="receiverDetails"
                          value={invoice.receiverDetails || ''}
                          onChange={handleInputChange}
                          rows={7}
                          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical text-sm"
                          placeholder={`Eg: ABC Inc\n123 Main Street, Suite 400 \n(555) 123-5678 \nbilling@abc.com\nmore details...`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice Details Section - Responsive Grid */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-slate-200">
                <h3 className="flex items-center gap-2 text-slate-800 text-lg sm:text-xl font-semibold">
                  <FileText className="h-5 w-5 text-purple-600" />
                  Invoice Details
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <Hash className="h-4 w-4 text-purple-600" />
                      Invoice Number
                    </label>
                    <input
                      type="text"
                      name="invoiceNumber"
                      value={invoice.invoiceNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-10 sm:h-11"
                      placeholder="INV-001"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-purple-600" />
                      Invoice Date
                    </label>
                    <input
                      type="date"
                      name="invoiceDate"
                      value={invoice.invoiceDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-10 sm:h-11"
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-red-600" />
                      Due Date
                    </label>
                    <input
                      type="date"
                      name="dueDate"
                      value={invoice.dueDate}
                      onChange={handleInputChange}
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
                      value={invoice.poNumber}
                      onChange={handleInputChange}
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
                      value={invoice.paymentTerms}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-10 sm:h-11"
                      placeholder="Net 30 days"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Line Items Section - Fully Responsive Table */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-slate-200">
                <h3 className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-800 text-lg sm:text-xl font-semibold">
                    <FileText className="h-5 w-5 text-emerald-600" />
                    Invoice Items
                  </span>
                </h3>
              </div>
              <div className="p-6">
                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-2 text-sm font-semibold text-slate-700">
                          Description
                        </th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-slate-700">
                          Qty
                        </th>
                        <th className="text-center py-3 px-2 text-sm font-semibold text-slate-700">
                          Rate
                        </th>
                        <th className="text-right py-3 px-6 text-sm font-semibold text-slate-700">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {lineItems.map((item, index) => (
                        <tr
                          key={index}
                          className="hover:bg-slate-50/50 transition-colors duration-150"
                        >
                          <td width={'50%'} className="px-2 py-4">
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) =>
                                updateItem(index, 'title', e.target.value)
                              }
                              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Item description"
                            />
                          </td>
                          <td width={'15%'} className="px-4 py-4">
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                updateItem(index, 'quantity', e.target.value)
                              }
                              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
                              placeholder="0"
                              step="1"
                            />
                          </td>
                          <td width={'15%'} className="px-2 py-4">
                            <input
                              type="number"
                              value={item.rate || ''}
                              onChange={(e) =>
                                updateItem(index, 'rate', e.target.value)
                              }
                              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
                              placeholder="0.00"
                              min="0"
                              step="1"
                            />
                          </td>
                          <td width={'20%'} className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-4 items-center">
                              <div className="font-medium text-slate-900">
                                <span className="text-sm text-slate-600">
                                  {currencySymbol}
                                </span>
                                {(
                                  Number.parseInt(item.quantity || '0') *
                                  Number.parseFloat(item.rate || '0')
                                ).toFixed(2)}
                              </div>
                              <button
                                onClick={() => removeItem(index)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-md transition-colors duration-150"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile/Tablet Card View */}
                <div className="lg:hidden space-y-4">
                  {lineItems.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white border border-slate-200 rounded-lg shadow-sm"
                    >
                      <div className="p-4 space-y-4">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-slate-900">
                            Item #{index + 1}
                          </h4>
                          <button
                            onClick={() => removeItem(index)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-md transition-colors duration-150"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="text-sm font-medium text-slate-700 mb-1 block">
                              Description
                            </label>
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) =>
                                updateItem(index, 'title', e.target.value)
                              }
                              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-10"
                              placeholder="Item description"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-sm font-medium text-slate-700 mb-1 block">
                                Quantity
                              </label>
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) =>
                                  updateItem(index, 'quantity', e.target.value)
                                }
                                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-10"
                                placeholder="0"
                                step="1"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium text-slate-700 mb-1 block">
                                Rate
                              </label>
                              <input
                                type="number"
                                value={item.rate || ''}
                                onChange={(e) =>
                                  updateItem(index, 'rate', e.target.value)
                                }
                                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-10"
                                placeholder="0.00"
                                min="0"
                                step="1"
                              />
                            </div>
                          </div>

                          <div className="pt-2 border-t border-slate-200">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-slate-700">
                                Amount:
                              </span>
                              <span className="text-lg font-bold text-slate-900">
                                {
                                  (formatCurrency(
                                    Number.parseInt(item.quantity || '0') *
                                      Number.parseFloat(item.rate || '0')
                                  ),
                                  currencySymbol)
                                }
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Item Button */}
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={addItem}
                    className="border-2 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50 text-slate-700 hover:text-blue-700 bg-transparent w-full sm:w-auto px-4 py-2 rounded-md font-medium flex items-center justify-center gap-2 transition-colors duration-150"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Add Item
                  </button>
                </div>

                {/* Totals Section - Responsive */}
                <div className="mt-8 space-y-4">
                  <div className="border-t-2 border-slate-200 pt-6">
                    {/* Subtotal */}
                    <div className="flex justify-between items-center py-2">
                      <span className="font-medium text-slate-700">
                        Subtotal:
                      </span>
                      <span className="font-semibold text-slate-900 text-lg">
                        {formatCurrency(invoice.subtotal, currencySymbol)}
                      </span>
                    </div>

                    {/* Discount */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-2">
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-slate-600">
                          Discount (%):
                        </label>
                        <input
                          type="number"
                          name="discount"
                          value={invoice.discount}
                          onChange={handleInputChange}
                          className="w-20 h-8 px-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="0"
                          min="0"
                          step="0.1"
                        />
                      </div>
                      <div className="flex justify-between sm:justify-end items-center gap-4">
                        <span className="text-sm text-slate-700">
                          Discount:
                        </span>
                        <span className="font-medium text-green-600">
                          -
                          {formatCurrency(
                            calculatePercentAmountOfTotal(
                              invoice.subtotal,
                              invoice.discount
                            ),
                            currencySymbol
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Tax */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-2">
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-slate-600">
                          Tax Rate (%):
                        </label>
                        <input
                          type="number"
                          name="tax"
                          value={invoice.tax}
                          onChange={handleInputChange}
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
                            calculatePercentAmountOfTotal(
                              invoice.subtotal,
                              invoice.tax
                            ),
                            currencySymbol
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="border-t border-slate-200 pt-4 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-slate-800">
                          Total:
                        </span>
                        <span className="text-2xl font-bold text-slate-900">
                          {formatCurrency(finalTotal, currencySymbol)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes Section - Compact */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
              <div className="px-4 py-3 border-b border-slate-200">
                <h3 className="flex items-center gap-2 text-slate-800 text-base font-semibold">
                  <MessageSquare className="h-4 w-4 text-indigo-600" />
                  Additional Notes
                </h3>
              </div>
              <div className="p-4">
                <textarea
                  name="notes"
                  value={invoice.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical text-sm"
                  placeholder="Add any additional notes, terms, or payment instructions..."
                />
              </div>
            </div>

            {/* Generate Invoice Button - Compact */}

            <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-600 rounded-xl shadow-lg p-6">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-violet-400/20 animate-pulse"></div>

              <div className="relative flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="text-center sm:text-left">
                  <p className="text-white font-semibold text-base">
                    Ready to generate your invoice?
                  </p>
                  <p className="text-purple-100 text-sm mt-1">
                    Review all information before generating
                  </p>
                </div>

                <button
                  onClick={downloadInvoice}
                  disabled={generateInvoiceMutation.isPending}
                  className={`
         group relative w-full sm:w-auto min-w-[180px] font-semibold py-3 px-8 rounded-lg 
        transition-all duration-300 transform hover:scale-105 active:scale-95
        flex items-center justify-center gap-3 text-base
        ${
          generateInvoiceMutation.isPending
            ? 'bg-white/90 text-emerald-600 cursor-not-allowed'
            : 'bg-white hover:bg-emerald-50 text-emerald-600 shadow-lg hover:shadow-xl'
        }
      `}
                >
                  {/* Loading overlay */}
                  {generateInvoiceMutation.isPending && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg animate-pulse"></div>
                  )}

                  {/* Button content */}
                  <div className="relative flex items-center gap-3">
                    {generateInvoiceMutation.isPending ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin text-emerald-600" />
                        <span className="font-medium">
                          Generating Invoice...
                        </span>
                      </>
                    ) : (
                      <>
                        <Download className="h-5 w-5 transition-transform group-hover:translate-y-[-2px]" />
                        <span>Generate Invoice</span>
                      </>
                    )}
                  </div>
                </button>
              </div>

              {/* Progress dots indicator */}
              {generateInvoiceMutation.isPending && (
                <div className="flex justify-center mt-4 gap-1">
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
