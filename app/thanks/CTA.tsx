import { Plus, Telescope } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function CTA() {
  return (
    <>
      <div className="space-y-4">
        <Link
          href="/create-invoice"
          className="w-full font-semibold py-4 px-6 duration-200 flex items-center justify-center space-x-2 shadow-sm text-lg text-white bg-emerald-500 hover:bg-emerald-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          <Plus className="w-5 h-5" />
          <span>Generate New Invoice</span>
        </Link>
      </div>

      <div className="space-y-4 mt-2">
        <Link
          href="/advertise"
          className="w-full font-semibold py-3 px-6 duration-200 flex items-center justify-center space-x-2 shadow-sm text-lg text-emerald-600 bg-white hover:bg-gray-100 rounded-lg transition-colors focus:outline-none"
        >
          <Telescope className="w-5 h-5" />
          <span>Advertise with Us</span>
        </Link>
      </div>
    </>
  );
}
