"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import AppWrapper from "./AppWrapper";
import { AppContextProvider } from "./context/useAppContext";
import { AuthContextProvider } from "./context/useAuthContext";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const Providers = ({ children }: { readonly children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
 
      <AuthContextProvider>
        <AppContextProvider>
          <QueryClientProvider client={queryClient}>
            <AppWrapper>{children}</AppWrapper>
          </QueryClientProvider>
        </AppContextProvider>
      </AuthContextProvider>
  );
};

export default Providers;
