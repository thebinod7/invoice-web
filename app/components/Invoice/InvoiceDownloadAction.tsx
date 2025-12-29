import { Download, Loader2 } from 'lucide-react';
import React from 'react';
import ProgressDotIndicator from './ProgressDotIndicator';

export default function InvoiceDownloadAction({
  isPending,
  handleDownloadClick,
}: {
  isPending: boolean;
  handleDownloadClick: () => void;
}) {
  return (
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
          onClick={handleDownloadClick}
          disabled={isPending}
          className={`
         group relative w-full sm:w-auto min-w-[180px] font-semibold py-3 px-8 rounded-lg 
        transition-all duration-300 transform hover:scale-105 active:scale-95
        flex items-center justify-center gap-3 text-base
        ${
          isPending
            ? 'bg-white/90 text-emerald-600 cursor-not-allowed'
            : 'bg-white hover:bg-emerald-50 text-emerald-600 shadow-lg hover:shadow-xl'
        }
      `}
        >
          {/* Loading overlay */}
          {isPending && (
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg animate-pulse"></div>
          )}

          {/* Button content */}
          <div className="relative flex items-center gap-3">
            {isPending ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin text-emerald-500" />
                <span className="font-medium">Generating Invoice...</span>
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

      {isPending && <ProgressDotIndicator />}
    </div>
  );
}
