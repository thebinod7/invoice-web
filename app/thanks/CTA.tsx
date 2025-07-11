import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function CTA() {
  return (
    <>
      <div className="space-y-4">
        <Link
          href="/create-invoice"
          className="w-full font-semibold py-4 px-6 duration-200 flex items-center justify-center space-x-2 shadow-sm text-lg text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          <Plus className="w-5 h-5" />
          <span>Generate New Invoice</span>
        </Link>
      </div>

      {/* Additional Info */}
      <div className="text-center mt-8">
        <p className="text-xs text-gray-500">
          Need help? &nbsp;
          <Link
            href="/contact"
            className="text-green-600 hover:text-green-700 underline"
          >
            Contact Us
          </Link>
        </p>
      </div>
    </>
  );
}
