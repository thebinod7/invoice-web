import { Home } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function StickyHomeButton() {
  return (
    <Link href="/" title="Go Home">
      <Home className="absolute top-10 left-10 cursor-pointer z-10 w-6 h-6 text-black" />
    </Link>
  );
}
