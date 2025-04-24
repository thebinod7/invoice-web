import { APP_NAME, SOCIAL_LINKS } from '@/app/constants';
import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <>
      <footer className="bg-[#0a152f] text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="ml-[20%] grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Help Column */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Help</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/faq"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Support
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    href={SOCIAL_LINKS.FACEBOOK}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/free-invoice-maker"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Column */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Social</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    target="_blank"
                    href={SOCIAL_LINKS.YOUTUBE}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Youtube
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    href={SOCIAL_LINKS.FACEBOOK}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
            <p>
              © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      {/* <footer className="bg-slate-100 py-10 px-10 mt-10 text-gray-600 text-center">
      <p>
        &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
      </p>
    </footer> */}
    </>
  );
}
