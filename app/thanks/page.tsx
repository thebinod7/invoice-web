import { CheckCircle, Download, Plus } from 'lucide-react';
import Link from 'next/link';
import { SOCIAL_LINKS } from '../constants';

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
            href="/"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2 shadow-sm"
          >
            <Plus className="w-5 h-5" />
            <span>Generate New Invoice</span>
          </Link>

          <Link
            href="/"
            className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center border border-gray-200"
          >
            Back to Home
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
