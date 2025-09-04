'use client';
import AdBanner from '../components/AdBanner';
import TopBannerAd from '../components/Paid/TopBannerAd';
import { GOOGLE_AD } from '../constants';
import { useGetActiveAd } from '../hooks/backend/invoice';
import CTA from './CTA';
import InvoiceGenSuccess from './InvoiceGenSuccess';
import InvoiceSavedInfo from './InvoiceSavedInfo';

export default function ThankYouPage() {
  const { data } = useGetActiveAd();

  const activeAd = data?.data?.result || null;

  return (
    <>
      {/* {showAdBlockAlert && <AdBlockAlert />} */}
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
