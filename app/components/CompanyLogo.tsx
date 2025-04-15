import Image from 'next/image';
import React from 'react';

interface CompanyProps {
    logoPreview: string;
    handleLogoChange: any;
}

export default function CompanyLogo({
    logoPreview,
    handleLogoChange,
}: CompanyProps) {
    return (
        <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">
                Company Logo
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
                        </div>
                    ) : (
                        <div className="text-gray-400 text-sm text-center p-2">
                            No logo selected
                        </div>
                    )}
                </div>
                <div>
                    <label className="bg-blue-600 hover:bg-blue-700 rounded-md text-white px-4 py-2 text-sm cursor-pointer">
                        Upload Logo
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
