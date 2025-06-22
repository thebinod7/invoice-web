import { X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface CompanyProps {
  fileName?: string;
  logoPreview: string;
  handleLogoChange: any;
  clearUploadedLogo: () => void;
}

export default function CompanyLogo({
  logoPreview,
  handleLogoChange,
  clearUploadedLogo,
  fileName,
}: CompanyProps) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-xs font-medium text-gray-700">
        Your Logo {fileName ? `(${fileName})` : ''}
      </label>
      <div className="flex items-center space-x-4">
        <div className="h-24 w-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center overflow-hidden">
          {logoPreview ? (
            <div className="relative h-full w-full">
              <Image
                src={logoPreview || '/placeholder.svg'}
                alt="Company logo"
                fill
                className="object-contain"
              />
              <button
                className="absolute top-0 right-1 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                onClick={clearUploadedLogo} // Replace with your own remove handler
              >
                <X size={12} color="red" className="text-red-600" />
              </button>
            </div>
          ) : (
            <div className="text-gray-400 text-sm text-center p-2">
              No logo selected
            </div>
          )}
        </div>
        <div>
          <label className="bg-stone-500 hover:bg-stone-600 rounded-md text-white px-4 py-2 text-sm cursor-pointer">
            Select
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
