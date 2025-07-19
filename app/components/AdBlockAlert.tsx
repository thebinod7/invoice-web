'use client';

import { useState } from 'react';

export default function AdBlockAlert() {
  const [isOpen, setIsOpen] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">
          We Noticed an Ad Blocker
        </h2>

        {/* Description */}
        <p className="text-sm text-yellow-900 text-center leading-relaxed mb-4">
          It looks like you're using an ad blocker. We respect your choice, but
          ads are how we keep our content free and accessible to everyone.
          Please consider whitelisting us; it really makes a difference. 💙
        </p>

        <button
          onClick={() => setShowInstructions(!showInstructions)}
          className="mt-4 text-sm text-yellow-700 underline hover:text-yellow-900"
        >
          {showInstructions
            ? 'Hide instructions'
            : 'How to whitelist this site'}
        </button>

        {showInstructions && (
          <div className="mt-3 text-sm text-yellow-900 space-y-2">
            <p>
              <strong>uBlock Origin:</strong> Click the uBlock icon → Click the
              power button to disable on this site → Reload the page.
            </p>
            <p>
              <strong>AdBlock / Adblock Plus:</strong> Click the AdBlock icon →
              “Click disable on this website” → Reload the page.
            </p>
          </div>
        )}

        {/* Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleRefresh}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
}
