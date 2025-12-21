'use client';

import { Fragment } from 'react';
import Footer2 from './components/Footer/Footer2';
import Header2 from './components/Header/Header2';

const AppWrapper = ({ children }: { readonly children: React.ReactNode }) => {
  return (
    <Fragment>
      <Header2 />
      <main>{children}</main>
      <Footer2 />
    </Fragment>
  );
};

export default AppWrapper;
