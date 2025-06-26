import { APP_NAME } from '@/app/constants';
import { FileText } from 'lucide-react';
import React from 'react';

export default function Header2() {
  return (
    <header className="border-b border-gray-100">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FileText className="h-8 w-8 text-emerald-600" />
          <span className="text-xl font-bold text-gray-900">{APP_NAME}</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a
            href="#features"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            How it Works
          </a>
          <a
            href="#contact"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
