import clsx from 'clsx';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { Suspense } from 'react';
import { APP, GA_PUBLISHER_ID } from './constants';
import './globals.css';
import Providers from './Providers';
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${APP.TITLE}`,
  description: `${APP.DESCRIPTION}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${GA_PUBLISHER_ID}`}
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
        className={clsx(
          'antialiased scroll-smooth focus:scroll-auto',
          'font-normal',
          inter.className
        )}
      >
        <Providers>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </Providers>
        <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
      </body>
    </html>
  );
}
