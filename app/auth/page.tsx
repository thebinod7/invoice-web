'use client';

import { useMutation } from '@tanstack/react-query';
import {
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  Home,
  Loader2,
  Mail,
} from 'lucide-react';
import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { API_ROUTES } from '../constants/api-routes';
import { emailValidator } from '../helpers';
import { postRequest } from '../helpers/request';
import { APP_PATHS } from '../constants';

export default function MagicLinkLogin() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const useSendMagicLinkMutation = useMutation({
    mutationFn: (payload: any) => {
      return postRequest(`${API_ROUTES.AUTH}/magic-login`, payload);
    },
    onError: () => {
      setStatus('success');
    },
    onSuccess: () => {
      setStatus('success');
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus('error');
      return setErrorMessage('Email address is required');
    }
    if (!emailValidator(email)) {
      setStatus('error');
      return setErrorMessage('Please enter a valid email address');
    }
    setErrorMessage('');
    return useSendMagicLinkMutation.mutateAsync({ email });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      {/* Write a fixed Home button to navigate to the home page */}
      <Link href="/" title="Go Home">
        <Home className="absolute top-10 left-10 cursor-pointer z-10 w-6 h-6 text-black" />
      </Link>
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-black mb-3 tracking-tight text-balance">
            Welcome back
          </h1>
          <p className="text-neutral-600 leading-relaxed">
            Enter your email to receive a magic link
          </p>
        </div>

        {/* Go back button if status is success */}
        {status === 'success' && (
          <div className="flex justify-end items-center mb-2">
            <ChevronLeft className="cursor-pointer ml-4 z-10 w-6 h-6 text-black" />
            <button className="text-sm" onClick={() => setStatus('idle')}>
              Resend Magic Link
            </button>
          </div>
        )}

        {status === 'success' ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-black mb-2">
              Check your email
            </h2>
            <p className="text-neutral-700 leading-relaxed">
              We've sent a magic link to{' '}
              <span className="font-medium text-black">{email}</span>
            </p>
            <p className="text-sm text-neutral-600 mt-4 leading-relaxed">
              It can take few minutes to arrive.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black mb-2"
              >
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') {
                      setStatus('idle');
                      setErrorMessage('');
                    }
                  }}
                  placeholder="you@example.com"
                  className={`w-full pl-12 pr-4 py-3.5 border rounded-lg text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all ${
                    status === 'error'
                      ? 'border-red-300 bg-red-50'
                      : 'border-neutral-300 bg-white'
                  }`}
                  disabled={useSendMagicLinkMutation.isPending}
                />
              </div>
              {status === 'error' && (
                <div className="flex items-center gap-2 mt-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

            {/* <div className="mt-4 flex items-center justify-center">
              <Lock className="w-4 h-4 mr-1" />
              <p className="text-sm text-neutral-500">
                Secure and easy to use. Password-less login.
              </p>
            </div> */}

            <button
              type="submit"
              disabled={useSendMagicLinkMutation.isPending}
              className="w-full bg-emerald-500 hover:bg-emerald-500 text-white font-medium py-3.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {useSendMagicLinkMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending magic link...
                </>
              ) : (
                'Send magic link'
              )}
            </button>

            <div className="flex justify-center">
              <Link
                href={APP_PATHS.SIGNUP}
                className="text-sm text-neutral-600 hover:underline transition-colors"
              >
                Don't have an account? Register
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
