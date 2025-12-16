import React from 'react';

export default function WiseAffiliate() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-4">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 text-sm">💡</span>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            Save on International Payments
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            Need to pay suppliers or receive payments internationally?
            <span className="font-medium text-gray-700"> Wise</span> offers
            rates up to 3x cheaper than traditional banks with transparent fees.
          </p>
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              ✓ Real exchange rates • ✓ Low transparent fees • ✓ Fast transfers
            </div>
          </div>
          <a
            href="https://wise.prf.hn/l/AJbb5zg/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span>Try Wise</span>
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
          <p className="text-xs text-gray-400 mt-2">
            Affiliate link - we may earn a small commission at no cost to you.
          </p>
        </div>
      </div>
    </div>
  );
}
