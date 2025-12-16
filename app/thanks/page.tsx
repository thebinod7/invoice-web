'use client';
import { useRef, useState } from 'react';
import AdBanner from '../components/AdBanner';
import EarlyAdopterForm from '../components/EarlyAdopters';
import { GOOGLE_AD } from '../constants';
import CTA from './CTA';
import InvoiceGenSuccess from './InvoiceGenSuccess';
import InvoiceSavedInfo from './InvoiceSavedInfo';
import { ChevronDown } from 'lucide-react';

export default function ThankYouPage() {
  // const { data } = useGetActiveAd();
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLDivElement | null>(null);

  const handleShowComingBtn = () => {
    setShowForm((prev) => {
      const next = !prev;

      if (!prev) {
        setTimeout(() => {
          formRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }, 0);
      }

      return next;
    });
  };

  return (
    <>
      {/* {showAdBlockAlert && <AdBlockAlert />} */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full my-2">
          {/* Success Icon */}
          <InvoiceGenSuccess />

          {/* Invoice Saved Message */}
          <InvoiceSavedInfo />
          <button
            type="button"
            onClick={handleShowComingBtn}
            className="flex items-center justify-between w-full text-left mb-2 px-4 py-3 border-2 border-green-500/20 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 hover:border-green-500/40 transition-all group"
          >
            <span className="text-sm font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
              See what’s coming
            </span>
            <ChevronDown
              className={`w-5 h-5 text-green-600 transition-transform ${
                showForm ? 'rotate-180' : ''
              }`}
            />
          </button>

          {showForm && (
            <div ref={formRef} className="mt-4">
              <EarlyAdopterForm />
            </div>
          )}

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
