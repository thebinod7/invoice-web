// app/providers.tsx
'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect } from 'react';
import SuspendedPostHogPageView from './components/PosthogPageview';

const POSTHOG_API_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_API_HOST = process.env.NEXT_PUBLIC_POSTHOG_API_HOST;

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_NODE_ENV === 'production') {
      posthog.init(POSTHOG_API_KEY!, {
        api_host: POSTHOG_API_HOST,
        capture_pageview: false,
      });
    }
  }, []);

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  );
}
