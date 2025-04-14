"use client";

import { Fragment } from "react";
import { Toaster } from "sonner";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const AppWrapper = ({ children }: { readonly children: React.ReactNode }) => {
  return (
    <Fragment>
      <Header />
      <main className="mx-20 p-5">{children}</main>
      <Footer />

      <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
    </Fragment>
  );
};

export default AppWrapper;
