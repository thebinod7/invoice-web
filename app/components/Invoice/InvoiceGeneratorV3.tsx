'use client';

import { MAX_FILE_SIZE, MAX_FILE_SIZE_PRO } from '@/app/constants';
import { API_ROUTES } from '@/app/constants/api-routes';
import { useAppContext } from '@/app/context/useAppContext';
import { useAuthContext } from '@/app/context/useAuthContext';
import {
  calculateFileSizeInMB,
  formatCurrency,
  getCurrencySymbolByName,
  isMobile,
  sanitizeError,
} from '@/app/helpers';
import {
  calculateInvoiceTotals,
  getFilenameFromS3Url,
  getMaxFileSizeInBytes,
} from '@/app/helpers/helper';
import {
  getS3SignedUrl,
  postRequest,
  uploadUsingSignedUrl,
} from '@/app/helpers/request';
import { IInvoiceDetails, InvoiceItemInput } from '@/app/types';
import MiniLoader from '@/ui/MiniLoader';
import { UpgradePlanModal } from '@/ui/UpgradePlanModal';
import { useMutation } from '@tanstack/react-query';
import { Building, FileText, Trash2, Upload, X } from 'lucide-react';
import type React from 'react';
import { toast } from 'sonner';
import AddInvoiceItem from './AddInvoiceItem';
import AdditinalNote from './AdditinalNote';
import CompanyDetails from './CompanyDetails';
import InvoiceDetailsBox from './InvoiceDetailsBox';
import InvoiceDownloadAction from './InvoiceDownloadAction';
import InvoiceHeaderSection from './InvoiceHeaderSection';
import InvoiceSummary from './InvoiceSummary';

export default function InvoiceGeneratorV3({
  invoiceId,
  currentInvoice,
  setCurrentInvoice,
  handleInputChange,
  updateListItem,
  removeListItem,
  addListItem,
}: {
  invoiceId: string;
  handleInputChange: (e: any) => void;
  currentInvoice: IInvoiceDetails;
  setCurrentInvoice: React.Dispatch<
    React.SetStateAction<IInvoiceDetails | null>
  >;
  updateListItem: (index: number, field: string, value: string) => void;
  removeListItem: (index: number) => void;
  addListItem: () => void;
}) {
  //=====================================================
  const { isPremium } = useAuthContext();
  const { isProcessing, setProcessing, showModal, setShowModal } =
    useAppContext();

  const clearUploadedLogo = () => {
    setCurrentInvoice({
      ...currentInvoice,
      companyLogoUrl: '',
    });
  };

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const fileSize = +calculateFileSizeInMB(file?.size || 0);
    const maxFileLimit = isPremium ? MAX_FILE_SIZE_PRO : MAX_FILE_SIZE;

    if (fileSize > maxFileLimit) {
      return toast.error(`File size must be less than ${maxFileLimit} MB.`);
    }

    try {
      setProcessing(true);
      const { presignedUrl, fileUrl } = await getS3SignedUrl({
        fileName: file?.name || '',
        mimeType: file?.type || '',
        fileSize: file?.size || 0,
      });
      if (presignedUrl) {
        await uploadUsingSignedUrl(presignedUrl, file);
        return setCurrentInvoice({
          ...currentInvoice,
          companyLogoUrl: fileUrl,
        });
      }
    } catch (err) {
      toast.error('Failed to upload logo.');
    } finally {
      setProcessing(false);
    }
  };

  const generateInvoiceMutation = useMutation({
    mutationFn: (payload: any) => {
      return postRequest(
        `${API_ROUTES.INVOICES}/${invoiceId}/edit-download`,
        payload,
        {
          responseType: 'blob',
        }
      );
    },
    onError: (error: any) => {
      if (error.status === 403) {
        return setShowModal(true);
      }
      toast.error(sanitizeError(error));
    },
    onSuccess: (data: any) => {
      const mobile = isMobile();
      const blob = new Blob([data.data], { type: 'application/pdf' });
      const blobUrl = window.URL.createObjectURL(blob);

      if (mobile) {
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

  const downloadInvoice = () => {
    return generateInvoiceMutation.mutate(currentInvoice);
  };

  const { subTotal, grandTotal } = calculateInvoiceTotals({
    items: currentInvoice?.invoiceItems,
    taxPercent: currentInvoice?.tax,
    discountPercent: currentInvoice?.discount,
  });

  const currencySymbol = getCurrencySymbolByName(currentInvoice?.currency);

  return (
    <>
      <UpgradePlanModal showModal={showModal} setShowModal={setShowModal} />

      <div className="min-h-screen bg-gray-50/80 py-4 sm:py-8 lg:py-10 px-3 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden">
            {/* Header Section - Fully Responsive */}
            <InvoiceHeaderSection
              currency={currentInvoice?.currency}
              handleInputChange={handleInputChange}
            />

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
                  <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3 lg:gap-4">
                    {/* Logo Upload - Full width on mobile */}
                    <div className="flex min-w-0 flex-col gap-1.5 lg:col-span-1">
                      <label className="flex min-h-6 items-center text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                        Company Logo
                      </label>
                      <div className="flex min-h-0 flex-1 flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50/80 p-3 text-center transition-colors duration-150 hover:border-emerald-300 hover:bg-emerald-50/30 sm:p-4">
                        {currentInvoice?.companyLogoUrl ? (
                          <div className="relative inline-block">
                            <img
                              src={
                                currentInvoice.companyLogoUrl ||
                                '/placeholder.svg'
                              }
                              alt="Logo preview"
                              className="mx-auto max-h-14 rounded-md sm:max-h-16"
                            />
                            <button
                              type="button"
                              className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-white transition-colors hover:bg-gray-700"
                              onClick={clearUploadedLogo}
                            >
                              <X className="h-2.5 w-2.5" />
                            </button>
                            <p className="mt-1.5 max-w-[10rem] truncate text-[11px] text-gray-500">
                              {getFilenameFromS3Url(
                                currentInvoice?.companyLogoUrl || ''
                              )}
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-100">
                              <Upload className="h-3.5 w-3.5 text-gray-500" />
                            </div>
                            <div>
                              {isProcessing ? (
                                <MiniLoader />
                              ) : (
                                <button
                                  type="button"
                                  className="relative rounded-md border border-gray-200 bg-white px-3 py-1.5 text-[11px] font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50"
                                >
                                  <input
                                    max={getMaxFileSizeInBytes(isPremium)}
                                    type="file"
                                    onChange={handleLogoChange}
                                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                                    accept="image/png, image/jpeg, image/jpg"
                                  />
                                  Choose File
                                </button>
                              )}
                            </div>
                            <p className="text-[11px] text-gray-500">
                              PNG, JPG up to{' '}
                              {isPremium ? MAX_FILE_SIZE_PRO : MAX_FILE_SIZE} MB
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
                          (item: InvoiceItemInput, index) => (
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
                              <td
                                width={'20%'}
                                className="px-6 py-4 text-right"
                              >
                                <div className="flex justify-end gap-4 items-center">
                                  <div className="font-medium text-slate-900">
                                    <span className="text-sm text-slate-600">
                                      {currencySymbol}
                                    </span>
                                    {(item.quantity * item.unitPrice).toFixed(
                                      2
                                    )}
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
                      (item: InvoiceItemInput, index) => (
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
                                        item.quantity * item.unitPrice
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
                    tax={currentInvoice.tax}
                    discount={currentInvoice.discount}
                    subTotal={subTotal}
                    grandTotal={grandTotal}
                    currencySymbol={currencySymbol}
                    handleInputChange={handleInputChange}
                  />
                </div>
              </div>

              <AdditinalNote
                value={currentInvoice.additionalNote || ''}
                handleInputChange={handleInputChange}
              />

              <InvoiceDownloadAction
                handleDownloadClick={downloadInvoice}
                isPending={generateInvoiceMutation.isPending}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
