'use client';

import { Fragment } from 'react';
import { Toaster } from 'sonner';
import Footer2 from './components/Footer/Footer2';
import Header2 from './components/Header/Header2';

const AppWrapper = ({ children }: { readonly children: React.ReactNode }) => {
  return (
    <Fragment>
      <Header2 />
      <main className="mx-0 sm:mx-5 md:mx-8 lg:mx-20 xl:mx-24 2xl:mx-28">
        {children}
      </main>
      <Footer2 />

      <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
    </Fragment>
  );
};

export default AppWrapper;
