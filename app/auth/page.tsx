'use client';

import { useState, type FormEvent } from 'react';
import { Mail, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function MagicLinkLogin() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus('error');
      setErrorMessage('Email address is required');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-black mb-3 tracking-tight text-balance">
            Welcome back
          </h1>
          <p className="text-neutral-600 leading-relaxed">
            Enter your email to receive a magic link
          </p>
        </div>

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
              Click the link in your email to sign in
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
                  disabled={status === 'loading'}
                />
              </div>
              {status === 'error' && (
                <div className="flex items-center gap-2 mt-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending magic link...
                </>
              ) : (
                'Send magic link'
              )}
            </button>
          </form>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-neutral-500">
            Password-less login. Secure and easy to use.
          </p>
        </div>
      </div>
    </div>
  );
}
