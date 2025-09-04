import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface TopBannerAdProps {
  productName?: string;
  tagline?: string;
  websiteUrl?: string;
  image?: string;
}

export default function TopBannerAd({
  productName,
  tagline,
  websiteUrl,
  image,
}: TopBannerAdProps) {
  return (
    <div className="max-w-6xl mx-auto py-2 mb-4">
      <div className="flex items-center justify-between bg-gradient-to-r from-slate-900 to-slate-700 rounded-lg p-4 text-white">
        <div className="flex items-center space-x-4">
          <img
            src={image || 'https://placehold.co/600x400?text=Ad'}
            alt="Ad"
            className="h-10 w-10 sm:h-12 sm:w-12 rounded flex-shrink-0 object-cover"
          />
          <div>
            <h3 className="font-semibold text-lg">
              {productName || '📢 Ad Spot Available!'}
            </h3>
            <p className="text-white text-sm text-wrap">
              {tagline || 'Your ad, seen by the right crowd'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-xs">
          {websiteUrl ? (
            <Link
              href={`${websiteUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-800 px-2 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
          ) : (
            <Link
              href={'/advertise'}
              className="bg-white text-center text-gray-800 px-2.5 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Advertise
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
