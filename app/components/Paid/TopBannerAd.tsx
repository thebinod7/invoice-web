import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface TopBannerAdProps {
  name?: string;
  tagline?: string;
  websiteUrl?: string;
  image?: string;
}

export default function TopBannerAd({
  name,
  tagline,
  websiteUrl,
  image,
}: TopBannerAdProps) {
  return (
    <div className="max-w-6xl mx-auto py-2 mb-4">
      <div className="flex items-center justify-between bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-4 text-white">
        <div className="flex items-center space-x-4">
          <img
            src={image || '/images/logo.png'}
            alt="Ad"
            className="h-12 w-12 rounded"
          />
          <div>
            <h3 className="font-semibold text-lg">{name || 'Premium Spot'}</h3>
            <p className="text-green-100 text-sm text-wrap">
              {tagline || 'Your ad will be featured here.'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3 text-xs">
          <Link
            href={`${websiteUrl || '#'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-green-600 px-2 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
          </Link>
          {/* <ExternalLink className="h-4 w-4" /> */}
        </div>
      </div>
    </div>
  );
}
