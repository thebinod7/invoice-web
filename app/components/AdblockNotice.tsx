'use client';

import { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';

export default function AdBlockerNotice() {
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    const detectAdBlocker = async () => {
      // Check if device is mobile
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth <= 768;

      if (isMobile) {
        return;
      }

      // Method 1: Try to create a fake ad element
      const testAd = document.createElement('div');
      testAd.innerHTML = '&nbsp;';
      testAd.className = 'adsbox';
      testAd.style.position = 'absolute';
      testAd.style.left = '-10000px';
      testAd.style.width = '1px';
      testAd.style.height = '1px';

      document.body.appendChild(testAd);

      // Wait a bit for ad blockers to potentially block it
      await new Promise((resolve) => setTimeout(resolve, 100));

      const isBlocked =
        testAd.offsetHeight === 0 ||
        testAd.offsetWidth === 0 ||
        testAd.style.display === 'none' ||
        testAd.style.visibility === 'hidden';

      document.body.removeChild(testAd);

      // Method 2: Check for common ad blocker indicators
      try {
        // Try to fetch a common ad-related resource
        await fetch(
          'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
          {
            method: 'HEAD',
            mode: 'no-cors',
          }
        );
      } catch (error) {
        setShowNotice(true);
        return;
      }

      if (isBlocked) {
        setShowNotice(true);
      }
    };

    detectAdBlocker();
  }, []);

  if (!showNotice) {
    return null;
  }

  return (
    <div className="mb-6 border border-amber-200 bg-amber-50 text-amber-800 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <Shield className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <p className="text-sm leading-relaxed">
          We notice you're using an ad blocker. Ads help us keep this content
          free. Please consider whitelisting us!
        </p>
      </div>
    </div>
  );
}
