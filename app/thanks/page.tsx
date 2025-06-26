import { CheckCircle, Coffee, Download, Plus } from 'lucide-react';
import Link from 'next/link';
import { SOCIAL_LINKS } from '../constants';

const API_KEY = 'C61CPV0-46R44YW-NRAHK9C-8W1PRW7';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          {/* Thank You Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h1>
          <p className="text-lg text-gray-600 mb-2">
            Your invoice has been generated successfully.
          </p>
        </div>

        {/* Invoice Saved Message */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Download className="w-5 h-5 text-green-600 mt-0.5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                Invoice Saved
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Your invoice has been automatically saved to your local device.
                You can find it in your downloads folder.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="space-y-4">
          <Link
            href="/create-invoice"
            className="w-full font-semibold py-4 px-6 duration-200 flex items-center justify-center space-x-2 shadow-sm text-lg text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <Plus className="w-5 h-5" />
            <span>Generate New Invoice</span>
          </Link>
        </div>

        {/* Donation Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8 text-center">
          <div className="flex items-center justify-center mb-3">
            <Coffee className="w-5 h-5 text-amber-600 mr-2" />
            <h3 className="text-sm font-semibold text-gray-900">
              Help Manage Server Costs
            </h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            This tool is free and always will be. If you found it useful, you
            are welcome to support. Every little bit helps keep the servers
            running!
          </p>
          <Link
            href={`https://nowpayments.io/donation?api_key=${API_KEY}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors duration-200 text-sm"
          >
            <Coffee className="w-4 h-4 mr-2" />
            Buy Me A Coffee
          </Link>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            Need help? Reach out to us at{' '}
            <Link
              target="_blank"
              href={SOCIAL_LINKS.FACEBOOK}
              className="text-green-600 hover:text-green-700 underline"
            >
              Facebook
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
