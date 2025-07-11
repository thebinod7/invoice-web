import { FileText, Gift, LoaderIcon, Mail, TrendingUp } from 'lucide-react';
import React from 'react';
import SubscribeSuccess from './SubscribeSuccess';

export default function Newsletter() {
  const [isPending, setIsPending] = React.useState(false);
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-4">
      <div className="flex items-center space-x-3 mb-4">
        <div className="flex-shrink-0">
          <Mail className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Join Our Newsletter
          </h3>
          <p className="text-xs text-gray-500">
            5,000+ businesses rely on us to simplify invoicing
          </p>
        </div>
      </div>

      {!isPending && (
        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <FileText className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-xs text-gray-600">
              Early access to new features and tools
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-xs text-gray-600">
              Business growth tips and financial insights
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Gift className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-xs text-gray-600">
              Invoice best practices and exclusive resources
            </p>
          </div>
        </div>
      )}

      {isPending ? (
        <SubscribeSuccess />
      ) : (
        <>
          <form className="space-y-3">
            <div>
              <input
                type="email"
                value=""
                placeholder="Enter your email address"
                required
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-gray-400"
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              {isPending ? <LoaderIcon /> : <Mail className="w-4 h-4" />}
              <span>
                {isPending ? 'Please wait...' : 'Subscribe to Newsletter'}
              </span>
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-2 text-center">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </>
      )}
    </div>
  );
}
