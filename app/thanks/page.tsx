'use client';
import { useMutation } from '@tanstack/react-query';
import {
  CheckCircle,
  Download,
  FileText,
  Gift,
  Mail,
  MessageSquare,
  Plus,
  Send,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import Script from 'next/script';
import { useState } from 'react';
import { toast } from 'sonner';
import { API_ROUTES } from '../constants/api-routes';
import { sanitizeError } from '../helpers';
import { postRequest } from '../helpers/request';
import SubscribeSuccess from './SubscribeSuccess';

export default function ThankYouPage() {
  const [showForm, setShowForm] = useState(false);
  const [msgSent, setMsgSent] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const useFeedbackMutation = useMutation({
    mutationFn: (payload: any) => {
      return postRequest(API_ROUTES.APP + '/feedback', payload);
    },
    onError: (error) => {
      toast.error(sanitizeError(error));
    },
    onSuccess: () => {
      setMsgSent(true);
      setShowForm(false);
      (document.getElementById('email') as HTMLInputElement).value = '';
      (document.getElementById('message') as HTMLTextAreaElement).value = '';
    },
  });

  const useSubscribeMutation = useMutation({
    mutationFn: (payload: any) => {
      return postRequest(API_ROUTES.APP + '/subscribe', payload);
    },
    onError: (error) => {
      toast.error(sanitizeError(error));
    },
    onSuccess: () => {
      setEmail('');
      setSubscribed(true);
    },
  });

  const handleFeedbackSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    useFeedbackMutation.mutate({
      email: formData.get('email')?.toString() || '',
      message: formData.get('message')?.toString() || '',
    });
  };

  const handleSubscribeFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    useSubscribeMutation.mutate({
      email: email,
    });
  };

  return (
    <>
      <Script
        id="adsbygoogle-init"
        strategy="afterInteractive"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Success Icon */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>

            {/* Thank You Message */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Thank You!
            </h1>
            <p className="text-lg text-gray-600 mb-1">
              Your invoice has been generated successfully.
            </p>
          </div>

          {/* Invoice Saved Message */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Download className="w-5 h-5 text-green-600 mt-0.5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  Invoice Saved
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Your invoice has been automatically saved to your local
                  device. You can find it in your downloads folder.
                </p>
              </div>
            </div>
          </div>

          {/* Email Collection Section */}
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

            {!subscribed && (
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

            {subscribed ? (
              <SubscribeSuccess />
            ) : (
              <>
                <form
                  onSubmit={handleSubscribeFormSubmit}
                  className="space-y-3"
                >
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-gray-400"
                    />
                  </div>
                  <button
                    disabled={useSubscribeMutation.isPending}
                    type="submit"
                    className="w-full inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>
                      {useSubscribeMutation.isPending
                        ? 'Please wait...'
                        : 'Subscribe to Newsletter'}
                    </span>
                  </button>
                </form>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  No spam, unsubscribe anytime. We respect your privacy.
                </p>
              </>
            )}
          </div>

          {/* Feedback Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex-shrink-0">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Quick Feedback
                </h3>
                <p className="text-xs text-gray-500">
                  Help us improve your experience
                </p>
              </div>
            </div>

            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="w-full text-sm text-emerald-600 hover:text-emerald-700 font-medium py-2 px-3 rounded-lg border border-emerald-200 hover:border-emerald-300 transition-colors duration-200 bg-emerald-50 hover:bg-emerald-100"
              >
                Share your thoughts
              </button>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium text-gray-700 mb-1"
                  >
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-gray-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-medium text-gray-700 mb-1"
                  >
                    Your feedback
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={3}
                    placeholder="Tell us about your experience or suggest improvements..."
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-gray-400 resize-none"
                  />
                </div>

                <div className="flex space-x-2">
                  <button
                    type="submit"
                    disabled={false}
                    className="flex-1 inline-flex items-center justify-center space-x-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200 focus:outline-none"
                  >
                    {useFeedbackMutation.isPending ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-3 h-3" />
                        <span>Send</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {msgSent && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-xs text-green-700 font-medium">
                  Thank you for your message! We really appreciate you taking
                  the time to reach out.
                </p>
              </div>
            )}
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

          {/* Additional Info */}
          <div className="text-center mt-8">
            <p className="text-xs text-gray-500">
              Need help? &nbsp;
              <Link
                href="/contact"
                className="text-green-600 hover:text-green-700 underline"
              >
                Contact Us
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
