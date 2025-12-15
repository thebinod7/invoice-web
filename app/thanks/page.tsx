'use client';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import AdBanner from '../components/AdBanner';
import { GOOGLE_AD } from '../constants';
import CTA from './CTA';
import InvoiceGenSuccess from './InvoiceGenSuccess';
import InvoiceSavedInfo from './InvoiceSavedInfo';

export default function ThankYouPage() {
  // const { data } = useGetActiveAd();

  return (
    <>
      {/* {showAdBlockAlert && <AdBlockAlert />} */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full my-10">
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
