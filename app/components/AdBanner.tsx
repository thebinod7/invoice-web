'use client';
import React, { useEffect } from 'react';
import { GA_PUBLISHER_ID, GOOGLE_AD } from '../constants';

export default function AdBanner({ adSlotId }: { adSlotId?: string }) {
  useEffect(() => {
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <ins
      className="adsbygoogle adbanner-customize"
      style={{
        display: 'block',
        overflow: 'hidden',
      }}
      data-ad-client={GA_PUBLISHER_ID}
      data-ad-slot={adSlotId || GOOGLE_AD.THANK_YOU_PAGE_AD_SLOT}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
