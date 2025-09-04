import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

interface HorizontalAdBannerProps {
  productName?: string;
  tagline?: string;
  image?: string;
  websiteUrl?: string;
  className?: string;
}

export function HorizontalAdBanner({
  productName,
  tagline,
  image,
  websiteUrl,
  className,
}: HorizontalAdBannerProps) {
  return (
    <div className="w-full max-w-6xl mx-auto py-2 mb-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gradient-to-r from-slate-900 to-slate-700 rounded-lg p-4 gap-4 text-white shadow-lg">
        {/* Content Section */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
          <img
            src={image || 'https://placehold.co/600x400?text=Ad'}
            alt="Ad"
            className="h-10 w-10 sm:h-12 sm:w-12 rounded flex-shrink-0 object-cover"
          />
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-base sm:text-lg text-balance leading-tight">
              {productName || '📢 Ad Spot Available!'}
            </h3>
            <p className="text-white/90 text-xs sm:text-sm mt-1 text-pretty leading-relaxed">
              {tagline ||
                'Describe your ad here and reach your target audience.'}
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex items-center justify-end sm:justify-center flex-shrink-0">
          {websiteUrl ? (
            <Link
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-slate-800 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg font-semibold text-sm hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-slate-800"
            >
              <span className="hidden sm:inline">Visit Site</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          ) : (
            <Link
              href="/advertise"
              className="inline-flex items-center bg-white text-slate-800 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg font-semibold text-sm hover:bg-slate-50 transition-colors focus:outline-none"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
