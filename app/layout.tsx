import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { APP } from "./constants";
import "./globals.css";
import clsx from "clsx";
import Providers from "./Providers";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `Home - ${APP.NAME}`,
  description: `${APP.DESCRIPTION}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          "antialiased scroll-smooth focus:scroll-auto",
          "font-normal",
          inter.className
        )}
      >
        <Providers>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </Providers>
      </body>
    </html>
  );
}
