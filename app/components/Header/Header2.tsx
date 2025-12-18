import { APP, APP_NAME, APP_PATHS } from '@/app/constants';
import { FileText, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import Profile from '../Profile';

const NAV_LINKS = [
  {
    label: 'Blog',
    href: APP_PATHS.BLOG,
  },
  {
    label: 'Features',
    href: '/#features',
  },
  {
    label: 'How it works',
    href: '/#how-it-works',
  },
  {
    label: 'Get Started',
    href: APP_PATHS.CREATE_INVOICE,
  },
];

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
          {NAV_LINKS.map((item, index: number) => (
            <Link
              key={index}
              href={item.href}
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Profile />
      </div>
    </header>
  );
}
