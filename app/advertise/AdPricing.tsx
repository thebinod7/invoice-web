import { TrendingUp } from 'lucide-react';
import React from 'react';
import { AD_PRICE } from '../constants';

export default function AdPricing() {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-emerald-200">
      <div className="p-8 text-center">
        <div className="mb-4">
          <div className="text-lg text-gray-500 line-through mb-1">
            ${AD_PRICE.SEVEN_DAYS}
          </div>
          <div className="text-4xl font-bold text-gray-900">
            ${(AD_PRICE.SEVEN_DAYS * 0.9).toFixed(2)}
          </div>
          <div className="text-gray-600">for 7 days</div>
          <div className="inline-block bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full mt-2">
            10% OFF
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 text-emerald-600 mb-6">
          <TrendingUp className="w-5 h-5" />
          <span className="font-medium">Premium placement guaranteed</span>
        </div>
      </div>
    </div>
  );
}
