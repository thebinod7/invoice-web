'use client';

import { AlertCircle, Check, Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { APP_PATHS } from '../constants';

const PAYMENT_STATUS = {
  FAILED: 'failed',
  SUCCESS: 'success',
  ACTIVE: 'active',
};

export default function SubscriptionSuccessPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  console.log('searchParams', status);

  const router = useRouter();

  const handleDashboard = () => {
    router.push(APP_PATHS.DASHBOARD.HOME);
  };

  const handleManageSubscription = () => {
    router.push(APP_PATHS.DASHBOARD.SUBSCRIPTION);
  };

  if (status === PAYMENT_STATUS.SUCCESS || status === PAYMENT_STATUS.ACTIVE) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-emerald-100 flex items-center justify-center p-4">
        <Link href="/" title="Go Home">
          <Home className="absolute top-10 left-10 cursor-pointer z-10 w-6 h-6 text-black" />
        </Link>{' '}
        <div className="w-full max-w-2xl">
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
                  Your yearly subscription is now active. You have full access
                  to all premium features and benefits. Thank you for your
                  support!
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

  return (
    <main className="min-h-screen bg-gradient-to-b from-red-50 to-red-100 flex items-center justify-center p-4">
      <Link href="/" title="Go Home">
        <Home className="absolute top-10 left-10 cursor-pointer z-10 w-6 h-6 text-black" />
      </Link>{' '}
      <div className="w-full max-w-2xl">
        {/* Error Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative w-24 h-24 bg-red-100 rounded-full flex items-center justify-center animate-in fade-in zoom-in duration-500">
            <div className="absolute inset-0 bg-red-200 rounded-full animate-pulse"></div>
            <AlertCircle className="w-12 h-12 text-red-500" strokeWidth={3} />
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <h1 className="text-4xl md:text-5xl font-bold text-red-950 mb-4 text-balance">
            Payment Failed
          </h1>
          <p className="text-lg md:text-xl text-red-700">
            We couldn't process your subscription payment.
          </p>
        </div>

        {/* Error Info Card */}
        <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm border border-red-200 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <div className="space-y-6">
            {/* Error Details */}
            <div>
              <h2 className="text-lg font-semibold text-red-950 mb-2">
                What Happened?
              </h2>
              <p className="text-red-700 leading-relaxed">
                Your subscription payment could not be completed. This might be
                due to insufficient funds, an expired card, or a temporary issue
                with your payment provider. Your account remains active with
                free features only.
              </p>
            </div>

            {/* Troubleshooting Steps */}
            <div>
              <h3 className="font-semibold text-red-950 mb-3">
                What you can do:
              </h3>
              <ul className="space-y-2 text-red-700">
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Check your card details and try again</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Verify your payment method has sufficient funds</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Try a different payment method if available</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Contact your bank to check for any blocks</span>
                </li>
              </ul>
            </div>

            {/* Error Note */}
            <div className="bg-red-50 rounded p-4 border border-red-200">
              <p className="text-sm text-red-700">
                If the issue persists, please contact our support team for
                assistance.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
          {/* Back to Dashboard Button */}
          <button
            onClick={handleManageSubscription}
            className="w-full bg-transparent hover:bg-red-100 text-red-600 font-medium py-3 px-6 rounded-lg border border-red-300 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <span>Go to Subscription</span>
          </button>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 text-sm text-red-600">
          <p>
            Need help?{' '}
            <Link
              href="/contact"
              className="text-red-600 hover:text-red-700 underline transition-colors"
            >
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
