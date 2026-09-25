import { Download, Loader2 } from 'lucide-react'
import React from 'react'
import ProgressDotIndicator from './ProgressDotIndicator'

export default function InvoiceDownloadAction({
    isPending,
    handleDownloadClick,
}: {
    isPending: boolean
    handleDownloadClick: () => void
}) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
            <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900">
                        Ready to generate your invoice?
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                        Review all information before generating
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleDownloadClick}
                    disabled={isPending}
                    className={`inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors duration-150 sm:w-auto ${
                        isPending
                            ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                            : 'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 active:bg-emerald-800'
                    }`}
                >
                    {isPending ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Generating...</span>
                        </>
                    ) : (
                        <>
                            <Download className="h-4 w-4" />
                            <span>Generate Invoice</span>
                        </>
                    )}
                </button>
            </div>

            {isPending && (
                <div className="mt-4 border-t border-gray-100 pt-4">
                    <ProgressDotIndicator />
                </div>
            )}
        </div>
    )
}
