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

// Enter animation (tailwindcss-animate) — fade + 4px rise over 500ms,
// same subtle pattern as the subscription-status page.
const ENTER = 'animate-in fade-in slide-in-from-bottom-4 duration-500'

/**
 * Email-shaped skeleton shown while the invoice is still loading,
 * so the preview doesn't snap from an empty block to full content.
 */
function InvoiceEmailSkeleton() {
    return (
        <div
            className="mt-8 w-full min-w-[400px] max-w-[550px] overflow-hidden rounded-lg bg-white shadow-[0_4px_10px_rgba(0,0,0,0.05)] animate-pulse"
            role="status"
            aria-label="Loading invoice email preview"
        >
            {/* Header band */}
            <div className="bg-gray-100 px-5 py-5">
                <div className="h-6 w-32 rounded bg-gray-200" />
            </div>

            {/* Body lines */}
            <div className="px-5 py-5">
                <div className="mt-4 mb-[10px] h-3 w-3/4 rounded bg-gray-200" />
                <div className="my-[10px] h-3 w-full rounded bg-gray-200" />
                <div className="my-[10px] h-3 w-5/6 rounded bg-gray-200" />
                <div className="my-[10px] h-3 w-2/3 rounded bg-gray-200" />

                {/* Invoice details box */}
                <div className="my-[15px] rounded-[6px] border border-gray-100 bg-gray-50 p-[15px]">
                    <div className="mt-4 mb-[10px] h-4 w-32 rounded bg-gray-200" />
                    <div className="mb-2 h-3 w-1/2 rounded bg-gray-200" />
                    <div className="mb-2 h-3 w-2/3 rounded bg-gray-200" />
                    <div className="h-3 w-3/5 rounded bg-gray-200" />
                </div>

                <div className="my-[10px] h-3 w-11/12 rounded bg-gray-200" />
                <div className="my-[10px] h-3 w-4/5 rounded bg-gray-200" />
                <div className="my-[10px] h-3 w-1/2 rounded bg-gray-200" />

                <div className="mt-5 mb-4 h-3 w-2/5 rounded bg-gray-200" />
            </div>

            {/* Footer */}
            <div className="px-[15px] py-[15px]">
                <div className="mx-auto h-3 w-1/3 rounded bg-gray-200" />
            </div>
        </div>
    )
}

export default function InvoiceEmailPreview({
    invoiceId,
    clientName,
    message,
}: InvoiceEmailPreviewProps) {
    const { currentUser } = useAuthContext()
    const { data, isPending } = useGetInvoiceById(invoiceId)
    const invoice = data?.data?.result

    const senderName = [currentUser?.firstName, currentUser?.lastName]
        .filter(Boolean)
        .join(' ')

    if (isPending || !invoice) {
        return <InvoiceEmailSkeleton />
    }

    return (
        <div
            className={`mt-8 w-full max-w-[550px] overflow-hidden rounded-lg bg-white shadow-[0_4px_10px_rgba(0,0,0,0.05)] ${ENTER}`}
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

                {/* Invoice details box — fades in a beat after the rest of the card */}
                <div
                    className={`my-[15px] rounded-[6px] border border-emerald-500 bg-[#f0fdf4] p-[15px] ${ENTER} delay-200 fill-mode-both`}
                >
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