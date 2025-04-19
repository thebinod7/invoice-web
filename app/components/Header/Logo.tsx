import Link from 'next/link';
import React from 'react';

export default function Logo() {
  return (
    <>
      <Link href={'/'}>
        <img
          src="/images/logo.png"
          alt="logo"
          className="h-[50px] w-auto object-contain"
        />
      </Link>
    </>
  );
}
