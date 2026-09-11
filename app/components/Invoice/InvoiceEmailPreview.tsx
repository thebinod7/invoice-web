'use client'

import { APP_NAME } from '@/app/constants'
import { useAuthContext } from '@/app/context/useAuthContext'
import { useGetInvoiceById } from '@/app/hooks/backend/invoice.hook'

// Mirrors the email sent by the backend (invoice-backend/src/mail/templates/InvoiceEmail.tsx)
// so the preview shows exactly what the client receives.

// Backend formats dates with date-fns 'dd MMM yyyy' (e.g. 24 Jan 2026)
const formatEmailDate = (value?: string | null) =>
    value
        ? new Date(value).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })
        : ''

interface InvoiceEmailPreviewProps {
    invoiceId: string
    clientName: string
    message?: string
}

export default function InvoiceEmailPreview({
    invoiceId,
    clientName,
    message,
}: InvoiceEmailPreviewProps) {
    const { currentUser } = useAuthContext()
    const { data } = useGetInvoiceById(invoiceId)
    const invoice = data?.data?.result

    const senderName = [currentUser?.firstName, currentUser?.lastName]
        .filter(Boolean)
        .join(' ')

    if (!invoice) {
        return (
            <div className="mt-8 h-[580px] w-full max-w-[600px] animate-pulse rounded-lg bg-gray-100" />
        )
    }

    return (
        <div
            className="mt-8 w-full max-w-[550px] overflow-hidden rounded-lg bg-white shadow-[0_4px_10px_rgba(0,0,0,0.05)]"
            style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
        >
            {/* Header */}
            <div className="bg-emerald-500 px-5 py-5">
                <p className="text-2xl font-bold leading-6 text-white">{APP_NAME}</p>
            </div>

            {/* Body */}
            <div className="px-5 py-5 text-base leading-6 text-[#333]">
                <p className="my-4">Hi {clientName || '{Client Name}'},</p>

                {message && (
                    <p className="my-[10px] ml-[5px] rounded-[4px] border-l-4 border-[#e0e0e0] pl-[5px] text-sm leading-6">
                        {message}
                    </p>
                )}

                <p className="my-[10px]">
                    Please find attached Invoice <strong>#{invoice.invoiceNumber}</strong> generated
                    by <strong>{senderName}</strong>.
                </p>

                {/* Invoice details box */}
                <div className="my-[15px] rounded-[6px] border border-emerald-500 bg-[#f0fdf4] p-[15px]">
                    <p className="mt-4 mb-[10px] text-sm font-bold">Invoice Details:</p>
                    <ul className="m-0 list-disc pl-[20px]">
                        <li>
                            Amount: {invoice.currency} {invoice.grandTotal}
                        </li>
                        <li>Invoice Date: {formatEmailDate(invoice.createdAt)}</li>
                        <li>
                            Due Date:{' '}
                            {invoice.dueDate ? formatEmailDate(invoice.dueDate) : 'Not Mentioned'}
                        </li>
                    </ul>
                </div>

                <p className="my-[10px]">You can download the attached PDF for your records.</p>

                <p className="my-[10px]">
                    If you have any questions regarding this invoice, feel free to contact{' '}
                    <strong>{senderName}</strong>.
                </p>

                <p className="mt-5 mb-4">Thank you for your business!</p>
            </div>

            <hr className="m-0 border-t border-[#e5e7eb]" />

            {/* Footer */}
            <div className="px-[15px] py-[15px] text-center text-sm leading-6 text-[#6b7280]">
                <p className="m-0">
                    —<br />
                    {senderName} via {APP_NAME} {new Date().getFullYear()}
                </p>
            </div>
        </div>
    )
}
