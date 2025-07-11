import { CheckCircle } from 'lucide-react';
import React from 'react';

export default function SubscribeSuccess() {
  return (
    <div className="text-center py-4">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mb-3">
        <CheckCircle className="w-6 h-6 text-emerald-600" />
      </div>
      <h4 className="text-sm font-semibold text-gray-900 mb-1">
        Thanks for joining us!
      </h4>
      <p className="text-xs text-gray-600">
        Your newsletter will be in your inbox soon.
      </p>
    </div>
  );
}
