'use client';
import { ArrowRight, Sparkles } from 'lucide-react';
import AdBanner from '../components/AdBanner';
import { GOOGLE_AD } from '../constants';
import { useGetActiveAd } from '../hooks/backend/invoice';
import CTA from './CTA';
import InvoiceGenSuccess from './InvoiceGenSuccess';
import InvoiceSavedInfo from './InvoiceSavedInfo';
import Link from 'next/link';

export default function ThankYouPage() {
  const { data } = useGetActiveAd();

  const activeAd = data?.data?.result || null;
  console.log({ activeAd });

  return (
    <>
      {/* {showAdBlockAlert && <AdBlockAlert />} */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* <TopBannerAd
            productName={activeAd?.productName || ''}
            tagline={activeAd?.tagline || ''}
            websiteUrl={activeAd?.websiteUrl || ''}
            image={activeAd?.imageUrl || ''}
          /> */}

          <div className="max-w-6xl mx-auto py-2 mb-4">
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-orange-600 to-orange-500 shadow-lg shadow-orange-500/20">
              {/* Animated background accent */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse" />
              </div>

              <div className="relative flex items-center justify-between gap-3 px-4 py-4 md:px-6 md:py-4">
                {/* Icon and message */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="flex-shrink-0 p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Sparkles
                      className="w-5 h-5 text-white animate-bounce"
                      style={{ animationDuration: '2s' }}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">
                      🚀 Just launched!
                    </p>
                    <p className="text-sm text-orange-100 hidden sm:block">
                      Tools to make your work easier.
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href="/tools"
                  className="flex-shrink-0 px-4 py-2 bg-white text-orange-600 text-sm font-semibold rounded-lg hover:bg-orange-50 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Success Icon */}
          <InvoiceGenSuccess />

          {/* Invoice Saved Message */}
          <InvoiceSavedInfo />

          {/* Paid Ad Box */}
          {/* <LightAdAboveGenerateBtn /> */}

          <CTA />

          {/* Google Ads Section */}
          <div className="mt-8">
            <AdBanner adSlotId={GOOGLE_AD.THANK_YOU_PAGE_SLOT} />
          </div>
        </div>
      </div>
    </>
  );
}
