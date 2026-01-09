'use client';

import AdBanner from '@/app/components/AdBanner';
import MagicLoginForm from '@/app/components/MagicSignupForm';
import { APP_PATHS, GOOGLE_AD } from '@/app/constants';
import { useAuthContext } from '@/app/context/useAuthContext';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import CTA from './CTA';
import InvoiceGenSuccess from './InvoiceGenSuccess';
import InvoiceSavedInfo from './InvoiceSavedInfo';

export default function ThankYouPage() {
  const { isLoggedIn, isPremium } = useAuthContext();

  return (
    <>
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full my-2">
          {/* Success Icon */}
          <InvoiceGenSuccess />

          <div className="mt-2">
            {isLoggedIn ? (
              <>
                <InvoiceSavedInfo />
                <div className="space-y-4 mt-2">
                  <Link
                    href={APP_PATHS.DASHBOARD.HOME}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-normal py-2 px-6 duration-200 flex items-center justify-center space-x-2 shadow-sm text-md rounded-lg transition-colors focus:outline-none"
                  >
                    <MoveRight className="w-5 h-5" />
                    <span>Go to Dashboard</span>
                  </Link>
                </div>
              </>
            ) : (
              <MagicLoginForm />
            )}
          </div>

          <CTA />

          {/* Google Ads Section */}
          <div className="mt-8">
            {!isPremium && (
              <AdBanner adSlotId={GOOGLE_AD.THANK_YOU_PAGE_SLOT} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
