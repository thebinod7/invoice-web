'use client';

import { MAX_FILE_SIZE, MAX_FILE_SIZE_BYTES } from '@/app/constants';
import { API_ROUTES } from '@/app/constants/api-routes';
import { SUPPORTED_CURRENCIES } from '@/app/constants/currency';
import {
  calculateFileSizeInMB,
  formatCurrency,
  getCurrencySymbolByName,
} from '@/app/helpers';
import { postRequest } from '@/app/helpers/request';
import { IInvoiceDetails, IInvoiceItem } from '@/app/types';
import { useMutation } from '@tanstack/react-query';
import {
  Building,
  Download,
  FileText,
  Loader2,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { toast } from 'sonner';
import AddInvoiceItem from './AddInvoiceItem';
import AdditinalNote from './AdditinalNote';
import CompanyDetails from './CompanyDetails';
import InvoiceDetailsBox from './InvoiceDetailsBox';
import InvoiceSummary from './InvoiceSummary';
import ProgressDotIndicator from './ProgressDotIndicator';

export default function InvoiceGeneratorV3({
  currentInvoice,
  handleInputChange,
  updateListItem,
  removeListItem,
  addListItem,
}: {
  handleInputChange: (e: any) => void;
  currentInvoice: IInvoiceDetails;
  updateListItem: (index: number, field: string, value: string) => void;
  removeListItem: (index: number) => void;
  addListItem: () => void;
}) {
  //=====================================================
  const [logoPreview, setLogoPreview] = useState('');
  const [fileName, setFileName] = useState('');

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
        // setInvoice({ ...invoice, companyLogo: result });
      };
      reader.readAsDataURL(file);
    }
    setFileName(file?.name || '');
  };

  const clearUploadedLogo = () => {
    setLogoPreview('');
    setFileName('');
  };

  const generateInvoiceMutation = useMutation({
    mutationFn: (payload: any) => {
      return postRequest(API_ROUTES.GENERATE_INVOICE, payload, {
        responseType: 'blob',
      });
    },
    onError: (error: any) => {
      if (error.code === 'ERR_NETWORK') {
        return toast.error(
          'We are updating our servers! Please try again later.'
        );
      }
      toast.error(
        error.message || 'We are updating our servers! Please try again later.'
      );
    },
    onSuccess: (data: any) => {},
  });

  const downloadInvoice = () => {};

  const currencySymbol = getCurrencySymbolByName(currentInvoice?.currency);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden">
          {/* Header Section - Fully Responsive */}
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
                    value={currentInvoice?.currency}
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

                  <CompanyDetails
                    senderDetails={currentInvoice.senderDetails}
                    receiverDetails={currentInvoice.receiverDetails}
                    handleInputChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <InvoiceDetailsBox
              currentInvoice={currentInvoice}
              handleInputChange={handleInputChange}
            />

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
                      {currentInvoice.invoiceItems.map(
                        (item: IInvoiceItem, index) => (
                          <tr
                            key={index}
                            className="hover:bg-slate-50/50 transition-colors duration-150"
                          >
                            <td width={'50%'} className="px-2 py-4">
                              <input
                                type="text"
                                value={item.description}
                                onChange={(e) =>
                                  updateListItem(
                                    index,
                                    'description',
                                    e.target.value
                                  )
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
                                  updateListItem(
                                    index,
                                    'quantity',
                                    e.target.value
                                  )
                                }
                                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
                                placeholder="0"
                                step="1"
                              />
                            </td>
                            <td width={'15%'} className="px-2 py-4">
                              <input
                                type="number"
                                value={item.unitPrice || ''}
                                onChange={(e) =>
                                  updateListItem(
                                    index,
                                    'unitPrice',
                                    e.target.value
                                  )
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
                                    Number.parseFloat(item.unitPrice || '0')
                                  ).toFixed(2)}
                                </div>
                                <button
                                  onClick={() => removeListItem(index)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-md transition-colors duration-150"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Mobile/Tablet Card View */}
                <div className="lg:hidden space-y-4">
                  {currentInvoice?.invoiceItems.map(
                    (item: IInvoiceItem, index) => (
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
                              onClick={() => removeListItem(index)}
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
                                value={item.description}
                                onChange={(e) =>
                                  updateListItem(
                                    index,
                                    'description',
                                    e.target.value
                                  )
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
                                    updateListItem(
                                      index,
                                      'quantity',
                                      e.target.value
                                    )
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
                                  value={item.unitPrice || ''}
                                  onChange={(e) =>
                                    updateListItem(
                                      index,
                                      'unitPrice',
                                      e.target.value
                                    )
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
                                        Number.parseFloat(item.unitPrice || '0')
                                    ),
                                    currencySymbol)
                                  }
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>

                <AddInvoiceItem addListItem={addListItem} />

                <InvoiceSummary
                  tax={currentInvoice.tax || 0}
                  discount={currentInvoice.discount || 0}
                  subTotal={currentInvoice.subTotal}
                  grandTotal={currentInvoice.grandTotal}
                  currencySymbol={currencySymbol}
                  handleInputChange={handleInputChange}
                />
              </div>
            </div>

            <AdditinalNote
              value={currentInvoice.additionalNote || ''}
              handleInputChange={handleInputChange}
            />

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
                        <Loader2 className="h-5 w-5 animate-spin text-emerald-500" />
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

              {generateInvoiceMutation.isPending && <ProgressDotIndicator />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
