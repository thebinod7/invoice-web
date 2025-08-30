import { ExternalLink } from 'lucide-react';
import React from 'react';

export default function LightAdAboveGenerateBtn() {
  return (
    <div className="mt-8 mb-6">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-xl transform group-hover:scale-105 transition-transform duration-300"></div>
        <div className="relative bg-white/90 backdrop-blur-lg rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 p-6">
          <div className="absolute top-3 right-3">
            <span className="text-xs text-gray-400 font-medium tracking-wide">
              Featured
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <img
              src="/images/logo.png"
              alt="QuickBooks"
              className="w-24 h-24 rounded-xl shadow-md"
            />

            <div className="flex-grow">
              <h4 className="text-base font-semibold text-gray-900 mb-1">
                Featured Product
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Your ad will be featured here.
              </p>

              <button className="bg-gray-800 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center space-x-2">
                <span>Visit Site</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
