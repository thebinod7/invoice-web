'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { AppContextProvider } from './context/useAppContext';
import { AuthContextProvider } from './context/useAuthContext';
import { PostHogProvider } from './PosthogProvider';
import { TooltipProvider } from '@/components/ui/tooltip';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const Providers = ({ children }: { readonly children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <TooltipProvider delayDuration={200}>
      <AuthContextProvider>
        <AppContextProvider>
          <QueryClientProvider client={queryClient}>
            <PostHogProvider>{children}</PostHogProvider>
          </QueryClientProvider>
        </AppContextProvider>
      </AuthContextProvider>
    </TooltipProvider>
  );
};

export default Providers;
