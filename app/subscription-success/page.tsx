'use client';

import { Check } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { APP_PATHS } from '../constants';

export default function SubscriptionSuccessPage() {
  const router = useRouter();

  const handleDashboard = () => {
    router.push(APP_PATHS.DASHBOARD.HOME);
  };

  const handleManageSubscription = () => {
    router.push(APP_PATHS.DASHBOARD.SUBSCRIPTION);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center animate-in fade-in zoom-in duration-500">
            <div className="absolute inset-0 bg-emerald-200 rounded-full animate-pulse"></div>
            <Check className="w-12 h-12 text-emerald-500" strokeWidth={3} />
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-950 mb-4 text-balance">
            Thank You!
          </h1>
          <p className="text-lg md:text-xl text-emerald-700">
            Your yearly subscription has been activated successfully.
          </p>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm border border-emerald-200 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <div className="space-y-6">
            {/* Subscription Details */}
            <div>
              <h2 className="text-lg font-semibold text-emerald-950 mb-2">
                Subscription Activated
              </h2>
              <p className="text-emerald-700 leading-relaxed">
                Your yearly subscription is now active. You have full access to
                all premium features and benefits. Thank you for your support!
              </p>
            </div>

            {/* Benefits List */}
            <div>
              <h3 className="font-semibold text-emerald-950 mb-3">
                What you get:
              </h3>
              <ul className="space-y-2 text-emerald-700">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Send invoices directly to clients</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Edit and re-download invoices anytime</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Track payments and overdue status</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>View dashboard insigths for better visibility</span>
                </li>
              </ul>
            </div>

            {/* Confirmation Note */}
            <div className="bg-emerald-50 rounded p-4 border border-emerald-200">
              <p className="text-sm text-emerald-700">
                A confirmation email has been sent to your registered email
                address.
              </p>
            </div>

            <div className="bg-yellow-50 rounded p-4 border border-yellow-200">
              <p className="text-sm text-yellow-700">
                Your subscription features may take a few minutes to activate
                across all systems. If you don't see immediate access, please
                refresh your browser or try again shortly.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
          {/* Primary Button */}
          <button
            onClick={handleDashboard}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Go to Dashboard</span>
            <span className="text-lg">→</span>
          </button>

          {/* Secondary Button */}
          <button
            onClick={handleManageSubscription}
            className="w-full bg-transparent hover:bg-emerald-100 text-emerald-600 font-medium py-3 px-6 rounded-lg border border-emerald-300 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <span>View Subscription</span>
          </button>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 text-sm text-emerald-600">
          <p>
            Need help?{' '}
            <Link
              href="/contact"
              className="text-emerald-600 hover:text-emerald-700 underline transition-colors"
            >
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
