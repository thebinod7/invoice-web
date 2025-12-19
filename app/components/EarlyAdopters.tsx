'use client';

import type React from 'react';
import { Check, Mail } from 'lucide-react';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { postRequest } from '../helpers/request';
import { sanitizeError } from '../helpers';
import { toast } from 'sonner';
import { API_ROUTES } from '../constants/api-routes';

const FEATURES_LIST = [
  'Invoice history',
  'Paid & overdue status',
  'Email invoices directly',
  'Overdue reminders',
];

export default function EarlyAdopterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const earlyAdopterMutation = useMutation({
    mutationFn: (payload: any) => {
      return postRequest(`${API_ROUTES.USERS}`, payload);
    },
    onError: (error: any) => {
      setIsSubmitting(false);
      const err: any = error?.response?.data;
      // Check is message has keyword duplicate
      if (err.message.includes('duplicate')) {
        return toast.error('You are already on the list!');
      }
      toast.error(sanitizeError(error));
    },
    onSuccess: (data) => {
      toast.success('Submission successful!');
      setSubmitted(true);
    },
    onSettled: () => {
      setIsSubmitting(false);
      setEmail('');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = {
      firstName: 'Early',
      lastName: 'Adopter',
      email,
    };
    earlyAdopterMutation.mutate(payload);
  };

  if (submitted) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 max-w-lg mx-auto">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            You're on the list!
          </h3>
          <p className="text-gray-600">
            We'll reach out when Pro features are ready. Thank you for being an
            early supporter.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 max-w-lg mx-auto">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        See what's coming.
      </h3>
      {/* Sub-text */}
      <p className="text-gray-600 mb-2 leading-relaxed text-sm">
        We're adding few <span className="font-bold">optional features</span> to
        help you get paid faster and easier.{' '}
      </p>
      <p className="italic text-sm mb-1">
        Early adopters may get special pricing when Pro launches.
      </p>

      {/* Feature bullets */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 mb-6">
        <ul className="space-y-3">
          {FEATURES_LIST.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="text-gray-700 leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email input */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email address{' '}
            <span className="text-xs">(For early access only)</span>
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
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Reassurance */}
        {/* <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <p className="text-sm text-gray-600 text-center leading-relaxed">
            No payment, No spam. Optional feedback only.
          </p>
        </div> */}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Joining...' : 'Join early access'}
        </button>
      </form>
    </div>
  );
}
