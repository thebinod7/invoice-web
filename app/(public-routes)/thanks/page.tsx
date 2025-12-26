'use client';
import { useRef } from 'react';

import AdBanner from '@/app/components/AdBanner';
import MagicLoginForm from '@/app/components/MagicSignupForm';
import { GOOGLE_AD } from '@/app/constants';
import CTA from './CTA';
import InvoiceGenSuccess from './InvoiceGenSuccess';

export default function ThankYouPage() {
  const formRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full my-2">
          {/* Success Icon */}
          <InvoiceGenSuccess />

          <div ref={formRef} className="mt-2">
            <MagicLoginForm />
          </div>

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
