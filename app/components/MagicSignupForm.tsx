'use client';

import { useMutation } from '@tanstack/react-query';
import { Mail } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { toast } from 'sonner';
import { API_ROUTES } from '../constants/api-routes';
import { sanitizeError } from '../helpers';
import { postRequest } from '../helpers/request';
import { DEF_FIRST_NAME, DEF_LAST_NAME } from '../constants';
import GoogleLogin from '@/ui/GoogleLogin';

export default function MagicLoginForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const magicLinkMutation = useMutation({
    mutationFn: (payload: any) => {
      return postRequest(`${API_ROUTES.AUTH}/magic-onboarding`, payload);
    },
    onError: (error: any) => {
      setIsSubmitting(false);
      toast.error(sanitizeError(error));
    },
    onSuccess: () => {
      toast.success('Magic link sent!');
      setSubmitted(true);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = {
      firstName: DEF_FIRST_NAME,
      lastName: DEF_LAST_NAME,
      email,
    };
    magicLinkMutation.mutate(payload);
  };

  if (submitted) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 max-w-lg mx-auto">
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center">
          {/* <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-4" /> */}
          <h2 className="text-xl font-semibold text-black mb-2">
            Check your email
          </h2>
          <p className="text-neutral-700 leading-relaxed">
            We've sent a magic link to {}
            <span className="font-medium text-black">{email}</span>
          </p>
          <p className="text-sm text-neutral-600 mt-4 leading-relaxed">
            It can take few minutes to arrive.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 max-w-lg mx-auto">
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">
        Save and manage invoices
      </h3>
      {/* Sub-text */}
      <p className="text-gray-600 mb-2 leading-relaxed text-sm">
        Get a magic link to access more features like saving invoices, track
        payment status, and re-download anytime.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email input */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Get a magic link'}
        </button>

        <hr />

        <GoogleLogin btnText="Continue with Google" />

        <p className="text-muted-foreground text-xs">
          Invoice saving and tracking are part of Pro and will be paid when Pro
          launches. Early users get special pricing.{' '}
          <span className="font-semibold">It's completely optional</span>.
        </p>
      </form>
    </div>
  );
}
