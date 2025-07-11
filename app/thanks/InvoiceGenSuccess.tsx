import { CheckCircle } from 'lucide-react';
import React from 'react';

export default function InvoiceGenSuccess() {
  return (
    <div className="text-center mb-4">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>

      {/* Thank You Message */}
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h1>
      <p className="text-lg text-gray-600 mb-1">
        Your invoice has been generated successfully.
      </p>
    </div>
  );
}
