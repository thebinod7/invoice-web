import { ExternalLink } from 'lucide-react';
import React from 'react';

export default function TopBannerAd() {
  return (
    <div className="shadow-sm mb-4">
      <div className="max-w-6xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-4 text-white">
          <div className="flex items-center space-x-4">
            <img
              src="/images/logo.png"
              alt="Ad"
              className="h-12 w-12 rounded"
            />
            <div>
              <h3 className="font-semibold text-lg">Premium Spot</h3>
              <p className="text-green-100 text-sm">
                Your ad will be displayed here.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="bg-white text-green-600 px-2 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              <ExternalLink className="h-4 w-4" />
            </button>
            {/* <ExternalLink className="h-4 w-4" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
