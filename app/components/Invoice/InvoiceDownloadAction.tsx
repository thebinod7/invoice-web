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
        <div className="bg-white border border-stone-100 rounded-xl p-5">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center sm:justify-between">
                <div>
                    <p className="text-xs font-medium text-stone-900">
                        Ready to generate your invoice?
                    </p>
                    <p className="text-[11px] text-stone-500 mt-1 tracking-wide">
                        Review all information before generating
                    </p>
                </div>

                <button
                    onClick={handleDownloadClick}
                    disabled={isPending}
                    className={`
            w-full sm:w-auto flex items-center justify-center gap-2
            px-5 py-2.5 rounded-md
            text-xs font-medium tracking-wide
            transition-opacity duration-150
            ${
                isPending
                    ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                    : 'bg-stone-900 hover:opacity-80 active:opacity-70 text-white'
            }
          `}
                >
                    {isPending ? (
                        <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            <span>Generating...</span>
                        </>
                    ) : (
                        <>
                            <Download className="h-3.5 w-3.5" />
                            <span>Generate Invoice</span>
                        </>
                    )}
                </button>
            </div>

            {isPending && (
                <div className="mt-4 pt-4 border-t border-stone-100">
                    <ProgressDotIndicator />
                </div>
            )}
        </div>
    )
}
