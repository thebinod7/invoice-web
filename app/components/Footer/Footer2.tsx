import { APP_NAME, SOCIAL_LINKS } from '@/app/constants';
import { FileText } from 'lucide-react';
import Link from 'next/link';

export default function Footer2() {
  return (
    <>
      <section className="py-20 bg-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Create Your First Invoice?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who use our free invoice generator
            to get paid faster.
          </p>
          <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-emerald-600 bg-white hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600">
            Start Creating Invoices
            <FileText className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="h-8 w-8 text-emerald-400" />
                <span className="text-xl font-bold">{APP_NAME}</span>
              </div>
              <p className="text-gray-400 mb-4">
                The simplest way to create professional invoices for free. No
                sign-up required.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Social</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    target="_blank"
                    href={SOCIAL_LINKS.YOUTUBE}
                    className="hover:text-white transition-colors"
                  >
                    Youtube
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    href={SOCIAL_LINKS.FACEBOOK}
                    className="hover:text-white transition-colors"
                  >
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Help</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/support"
                    className="hover:text-white transition-colors"
                  >
                    Support
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    href={SOCIAL_LINKS.FACEBOOK}
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="hover:text-white transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/free-invoice-maker"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} {APP_NAME}. All rights reserved. Made
              with ❤️ for freelancers and small businesses.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
