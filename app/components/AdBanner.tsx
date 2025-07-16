'use client';
import React, { useEffect } from 'react';
import { GA_PUBLISHER_ID } from '../constants';

export default function AdBanner(props: any) {
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
      data-ad-slot="7961627716"
      data-ad-format="auto"
      data-full-width-responsive="true"
      {...props}
    />
  );
}
