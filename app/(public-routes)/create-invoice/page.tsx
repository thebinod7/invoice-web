'use client'

import AiPromptField from '@/app/components/AiPromptField'
import AddInvoiceItem from '@/app/components/Invoice/AddInvoiceItem'
import AdditinalNote from '@/app/components/Invoice/AdditinalNote'
import CompanyDetails from '@/app/components/Invoice/CompanyDetails'
import InvoiceDetailsBox from '@/app/components/Invoice/InvoiceDetailsBox'
import InvoiceDownloadAction from '@/app/components/Invoice/InvoiceDownloadAction'
import InvoiceHeaderSection from '@/app/components/Invoice/InvoiceHeaderSection'
import InvoiceSummary from '@/app/components/Invoice/InvoiceSummary'
import { DEFAULT_CURRENCY, MAX_FILE_SIZE, MAX_FILE_SIZE_PRO } from '@/app/constants'
import { API_ROUTES } from '@/app/constants/api-routes'
import { useAppContext } from '@/app/context/useAppContext'
import { useAuthContext } from '@/app/context/useAuthContext'
import {
    calculateFileSizeInMB,
    formatCurrency,
    getCurrencySymbolByName,
    isMobile,
    sanitizeError,
} from '@/app/helpers'
import {
    calculateInvoiceTotals,
    downloadFromBlobUrl,
    getFilenameFromS3Url,
    getMaxFileSizeInBytes,
} from '@/app/helpers/helper'
import { getS3SignedUrl, postRequest, uploadUsingSignedUrl } from '@/app/helpers/request'
import { IInvoiceDetails, InvoiceItemInput } from '@/app/types'
import MiniLoader from '@/ui/MiniLoader'
import { UpgradePlanModal } from '@/ui/UpgradePlanModal'
import { useMutation } from '@tanstack/react-query'
import { Building, FileText, Trash2, Upload, X } from 'lucide-react'
import type React from 'react'
import { useState } from 'react'
import { toast } from 'sonner'

const inputClass =
    'w-full h-9 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 transition-colors duration-150 hover:border-gray-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20'

export default function page() {
    //=====================================================
    const { isLoggedIn, isPremium } = useAuthContext()
    const { isProcessing, setProcessing, showModal, setShowModal } = useAppContext()
    const [fetchingInvoice, setFetchingInvoice] = useState(false)

    const [logoPreview, setLogoPreview] = useState('')
    const [fileName, setFileName] = useState('')
    const [currentInvoice, setCurrentInvoice] = useState<IInvoiceDetails>({
        companyLogoUrl: '',
        senderDetails: '',
        receiverDetails: '',
        currency: DEFAULT_CURRENCY,
        invoiceNumber: '',
        dueDate: '',
        paymentTerms: '',
        poNumber: '',
        invoiceItems: [],
        additionalNote: '',
        tax: 0,
        discount: 0,
        subTotal: 0,
        grandTotal: 0,
    })
    const [aiPrompt, setAiPrompt] = useState('')

    const clearUploadedLogo = () => {
        if (isLoggedIn) {
            setCurrentInvoice({
                ...currentInvoice,
                companyLogoUrl: '',
            })
        }
        setLogoPreview('')
        setFileName('')
    }

    const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        const fileSize = +calculateFileSizeInMB(file?.size || 0)

        // Only if user is logged in
        if (isLoggedIn) {
            console.log('=====Private Request=====')
            const maxFileLimit = isPremium ? MAX_FILE_SIZE_PRO : MAX_FILE_SIZE
            if (fileSize > maxFileLimit) {
                return toast.error(`File size must be less than ${maxFileLimit} MB.`)
            }
            try {
                setProcessing(true)
                const { presignedUrl, fileUrl } = await getS3SignedUrl({
                    fileName: file?.name || '',
                    mimeType: file?.type || '',
                    fileSize: file?.size || 0,
                })
                if (presignedUrl) {
                    await uploadUsingSignedUrl(presignedUrl, file)
                    setLogoPreview(fileUrl)
                    return setCurrentInvoice({
                        ...currentInvoice,
                        companyLogoUrl: fileUrl,
                    })
                }
            } catch (err) {
                toast.error('Failed to upload logo.')
            } finally {
                setProcessing(false)
            }
        }

        if (fileSize > MAX_FILE_SIZE) {
            return toast.error(`File size must be less than ${MAX_FILE_SIZE} MB.`)
        }

        console.log('=====Public Request=====')
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const result = reader.result as string
                setLogoPreview(result)
                setCurrentInvoice({ ...currentInvoice, companyLogoUrl: result })
            }
            reader.readAsDataURL(file)
        }
        setFileName(file?.name || '')
    }

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target
        setCurrentInvoice((prev: any) => ({ ...prev, [name]: value }))
    }

    const updateListItem = (index: number, field: string, value: string) => {
        const invoiceItems = currentInvoice.invoiceItems
        const updated = invoiceItems.map((item: InvoiceItemInput, i: number) =>
            i === index ? { ...item, [field]: value } : item,
        )
        setCurrentInvoice((prev: any) => ({ ...prev, invoiceItems: updated }))
    }

    const removeListItem = (index: number) => {
        const invoiceItems = currentInvoice.invoiceItems
        const updated = invoiceItems.filter((_, i) => i !== index)
        setCurrentInvoice((prev: any) => ({ ...prev, invoiceItems: updated }))
    }

    const addListItem = () => {
        const newRow = { description: '', quantity: '', unitPrice: '' }
        const invoiceItems = currentInvoice.invoiceItems
        const updated = [...invoiceItems, newRow]
        setCurrentInvoice((prev: any) => ({ ...prev, invoiceItems: updated }))
    }

    const downloadOnlyMutation = useMutation({
        mutationFn: (payload: any) => {
            return postRequest(`${API_ROUTES.APP}/download-invoice`, payload, {
                responseType: 'blob',
            })
        },
        onError: (error: any) => {
            toast.error(sanitizeError(error))
        },
        onSuccess: (data: any) => {
            const mobile = isMobile()
            const blob = new Blob([data.data], { type: 'application/pdf' })
            const blobUrl = window.URL.createObjectURL(blob)

            if (mobile) {
                window.open(blobUrl, '_blank')
            } else {
                downloadFromBlobUrl(blobUrl, 'invoice.pdf')
            }
            window.URL.revokeObjectURL(blobUrl)
            window.location.replace('/thanks')
        },
    })

    const downloadAndSaveMutation = useMutation({
        mutationFn: (payload: any) => {
            return postRequest(`${API_ROUTES.INVOICES}`, payload, {
                responseType: 'blob',
            })
        },
        onError: (error: any) => {
            toast.error(sanitizeError(error))
        },
        onSuccess: (data: any) => {
            const mobile = isMobile()
            const blob = new Blob([data.data], { type: 'application/pdf' })
            const blobUrl = window.URL.createObjectURL(blob)

            if (mobile) {
                window.open(blobUrl, '_blank')
            } else {
                downloadFromBlobUrl(blobUrl, 'invoice.pdf')
            }
            window.URL.revokeObjectURL(blobUrl)
            window.location.replace('/thanks')
        },
    })

    const { subTotal, grandTotal } = calculateInvoiceTotals({
        items: currentInvoice?.invoiceItems,
        taxPercent: currentInvoice?.tax,
        discountPercent: currentInvoice?.discount,
    })

    const downloadInvoice = () => {
        if (
            !currentInvoice.senderDetails ||
            !currentInvoice.receiverDetails ||
            !currentInvoice.invoiceItems.length
        ) {
            return toast.error('Please fill all the required fields')
        }
        const payload = {
            ...currentInvoice,
            subTotal,
            grandTotal,
        }
        if (!payload.dueDate) delete payload.dueDate
        if (isLoggedIn) {
            return downloadAndSaveMutation.mutate(payload)
        }
        return downloadOnlyMutation.mutate(payload)
    }

    const currencySymbol = getCurrencySymbolByName(currentInvoice?.currency)

    return (
        <>
            <UpgradePlanModal showModal={showModal} setShowModal={setShowModal} />

            <div className="min-h-screen bg-gray-50/80 py-4 sm:py-8 lg:py-10 px-3 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-5xl xl:max-w-6xl">
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm sm:rounded-2xl">
                        <InvoiceHeaderSection
                            currency={currentInvoice?.currency}
                            handleInputChange={handleInputChange}
                        />

                        <div className="space-y-5 p-4 sm:space-y-6 sm:p-6 lg:space-y-8 lg:p-8">
                            {/* Basic Information */}
                            <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                                <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50/50 px-4 py-3.5 sm:px-6">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                                        <Building className="h-4 w-4 text-emerald-600" />
                                    </div>
                                    <div className="min-w-0">
                                        <h2 className="text-sm font-semibold tracking-tight text-gray-900 sm:text-base">
                                            Basic Information
                                        </h2>
                                        <p className="mt-0.5 hidden text-xs text-gray-500 sm:block">
                                            Logo and party details for this invoice
                                        </p>
                                    </div>
                                </div>

                                <div className="p-4 sm:p-6">
                                    <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3 lg:gap-4">
                                        {/* Logo Upload */}
                                        <div className="flex min-w-0 flex-col gap-1.5 lg:col-span-1">
                                            <label className="flex min-h-6 items-center text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                                                Company Logo
                                            </label>
                                            <div className="flex min-h-0 flex-1 flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50/80 p-3 text-center transition-colors duration-150 hover:border-emerald-300 hover:bg-emerald-50/30 sm:p-4">
                                                {logoPreview ? (
                                                    <div className="relative inline-block">
                                                        <img
                                                            src={logoPreview || '/placeholder.svg'}
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
                                                            {isLoggedIn
                                                                ? getFilenameFromS3Url(
                                                                    currentInvoice?.companyLogoUrl ||
                                                                    '',
                                                                )
                                                                : fileName}
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
                                                                        max={getMaxFileSizeInBytes(
                                                                            isPremium,
                                                                        )}
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
                                                            {isPremium
                                                                ? MAX_FILE_SIZE_PRO
                                                                : MAX_FILE_SIZE}{' '}
                                                            MB
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
                            </section>

                            <InvoiceDetailsBox
                                currentInvoice={currentInvoice}
                                handleInputChange={handleInputChange}
                            />

                            {/* Line Items */}
                            <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                                <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50/50 px-4 py-3.5 sm:px-6">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                                        <FileText className="h-4 w-4 text-emerald-600" />
                                    </div>
                                    <div className="min-w-0">
                                        <h2 className="text-sm font-semibold tracking-tight text-gray-900 sm:text-base">
                                            Invoice Items
                                        </h2>
                                        <p className="mt-0.5 hidden text-xs text-gray-500 sm:block">
                                            Add products or services billed on this invoice
                                        </p>
                                    </div>
                                </div>

                                <div className="p-4 sm:p-6">
                                    {/* Desktop Table */}
                                    <div className="hidden overflow-x-auto lg:block">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-gray-100">
                                                    <th className="py-2.5 pl-1 pr-2 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                        Description
                                                    </th>
                                                    <th className="px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                        Qty
                                                    </th>
                                                    <th className="px-2 py-2.5 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                        Rate
                                                    </th>
                                                    <th className="px-6 py-2.5 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                        Amount
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {currentInvoice.invoiceItems.map(
                                                    (item: InvoiceItemInput, index) => (
                                                        <tr
                                                            key={index}
                                                            className="transition-colors duration-150 hover:bg-gray-50/80"
                                                        >
                                                            <td
                                                                width="50%"
                                                                className="py-3 pl-1 pr-2"
                                                            >
                                                                <input
                                                                    type="text"
                                                                    value={item.description}
                                                                    onChange={(e) =>
                                                                        updateListItem(
                                                                            index,
                                                                            'description',
                                                                            e.target.value,
                                                                        )
                                                                    }
                                                                    className={inputClass}
                                                                    placeholder="Item description"
                                                                />
                                                            </td>
                                                            <td width="15%" className="px-4 py-3">
                                                                <input
                                                                    type="number"
                                                                    value={item.quantity}
                                                                    onChange={(e) =>
                                                                        updateListItem(
                                                                            index,
                                                                            'quantity',
                                                                            e.target.value,
                                                                        )
                                                                    }
                                                                    className={`${inputClass} text-center`}
                                                                    placeholder="0"
                                                                    step="1"
                                                                />
                                                            </td>
                                                            <td width="15%" className="px-2 py-3">
                                                                <input
                                                                    type="number"
                                                                    value={item.unitPrice || ''}
                                                                    onChange={(e) =>
                                                                        updateListItem(
                                                                            index,
                                                                            'unitPrice',
                                                                            e.target.value,
                                                                        )
                                                                    }
                                                                    className={`${inputClass} text-center`}
                                                                    placeholder="0.00"
                                                                    min="0"
                                                                    step="1"
                                                                />
                                                            </td>
                                                            <td
                                                                width="20%"
                                                                className="py-3 pl-6 pr-1 text-right"
                                                            >
                                                                <div className="flex items-center justify-end gap-2">
                                                                    <div className="text-sm font-medium tabular-nums text-gray-900">
                                                                        <span className="mr-0.5 text-xs text-gray-400">
                                                                            {currencySymbol}
                                                                        </span>
                                                                        {(
                                                                            item.quantity *
                                                                            item.unitPrice
                                                                        ).toFixed(2)}
                                                                    </div>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            removeListItem(index)
                                                                        }
                                                                        className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                                                                        aria-label="Remove item"
                                                                    >
                                                                        <Trash2 className="h-3.5 w-3.5" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ),
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Mobile / Tablet cards */}
                                    <div className="space-y-3 lg:hidden">
                                        {currentInvoice?.invoiceItems.map(
                                            (item: InvoiceItemInput, index) => (
                                                <div
                                                    key={index}
                                                    className="overflow-hidden rounded-xl border border-gray-200 bg-white"
                                                >
                                                    <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                                                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                            Item #{index + 1}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeListItem(index)}
                                                            className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                                                            aria-label="Remove item"
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </button>
                                                    </div>

                                                    <div className="space-y-3 p-4">
                                                        <div className="flex flex-col gap-1.5">
                                                            <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                                Description
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={item.description}
                                                                onChange={(e) =>
                                                                    updateListItem(
                                                                        index,
                                                                        'description',
                                                                        e.target.value,
                                                                    )
                                                                }
                                                                className={inputClass}
                                                                placeholder="Item description"
                                                            />
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-3">
                                                            <div className="flex flex-col gap-1.5">
                                                                <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                                    Quantity
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    value={item.quantity}
                                                                    onChange={(e) =>
                                                                        updateListItem(
                                                                            index,
                                                                            'quantity',
                                                                            e.target.value,
                                                                        )
                                                                    }
                                                                    className={inputClass}
                                                                    placeholder="0"
                                                                    step="1"
                                                                />
                                                            </div>
                                                            <div className="flex flex-col gap-1.5">
                                                                <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                                    Rate
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    value={item.unitPrice || ''}
                                                                    onChange={(e) =>
                                                                        updateListItem(
                                                                            index,
                                                                            'unitPrice',
                                                                            e.target.value,
                                                                        )
                                                                    }
                                                                    className={inputClass}
                                                                    placeholder="0.00"
                                                                    min="0"
                                                                    step="1"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/50 px-4 py-3">
                                                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                            Amount
                                                        </span>
                                                        <span className="text-sm font-semibold tabular-nums tracking-tight text-gray-900">
                                                            {formatCurrency(
                                                                item.quantity * item.unitPrice,
                                                                currencySymbol,
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            ),
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
                            </section>

                            <AdditinalNote
                                value={currentInvoice.additionalNote || ''}
                                handleInputChange={handleInputChange}
                            />

                            <InvoiceDownloadAction
                                handleDownloadClick={downloadInvoice}
                                isPending={
                                    downloadAndSaveMutation.isPending ||
                                    downloadOnlyMutation.isPending
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
