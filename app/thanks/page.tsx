'use client';
import { AdblockDetector } from 'adblock-detector';
import { useEffect, useState } from 'react';
import AdBanner from '../components/AdBanner';
import AdBlockAlert from '../components/AdBlockAlert';
import TopBannerAd from '../components/Paid/TopBannerAd';
import { GOOGLE_AD } from '../constants';
import CTA from './CTA';
import InvoiceGenSuccess from './InvoiceGenSuccess';
import InvoiceSavedInfo from './InvoiceSavedInfo';
import { useGetActiveAd } from '../hooks/backend/invoice';

export default function ThankYouPage() {
  const adbDetector = new AdblockDetector(); // call
  const userHasAdblock = adbDetector.detect();
  const [showAdBlockAlert, setShowAdBlockAlert] = useState(false);

  const { data } = useGetActiveAd();

  const activeAd = data?.data?.result || null;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (userHasAdblock) {
        setShowAdBlockAlert(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  console.log({ userHasAdblock });

  return (
    <>
      {showAdBlockAlert && <AdBlockAlert />}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* <div className="text-blue-500 underline text-right">
            <Link href={'/'}>Advertise with us</Link>
          </div> */}
          <TopBannerAd
            productName={activeAd?.productName || ''}
            tagline={activeAd?.tagline || ''}
            websiteUrl={activeAd?.websiteUrl || ''}
            image={activeAd?.imageUrl || ''}
          />
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
