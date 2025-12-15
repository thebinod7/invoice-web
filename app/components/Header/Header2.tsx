import { APP_NAME } from '@/app/constants';
import { FileText } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function Header2() {
  return (
    <header className="border-b border-gray-100">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href={'/'}>
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-emerald-600" />
            <span className="text-xl font-bold text-gray-900">{APP_NAME}</span>
          </div>
        </Link>
        <nav className="hidden sm:flex space-x-6">
          <Link
            href="/tools"
            className="relative group flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 font-semibold text-sm hover:from-emerald-100 hover:to-teal-100 transition-all duration-200 shadow-sm hover:shadow-md border border-emerald-200"
          >
            More Tools
          </Link>
          <Link
            href="/blog"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/#features"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Features
          </Link>
          {/* <a
            href="/#how-it-works"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            How it Works
          </a> */}
          <Link
            href="/create-invoice"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}
