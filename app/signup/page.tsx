'use client';

import { useMutation } from '@tanstack/react-query';
import {
  AlertCircle,
  CheckCircle2,
  Home,
  Loader2,
  Mail,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { toast } from 'sonner';
import { APP_PATHS } from '../constants';
import { API_ROUTES } from '../constants/api-routes';
import { emailValidator, sanitizeError } from '../helpers';
import { isValidName, splitFullName } from '../helpers/helper';
import { postRequest } from '../helpers/request';
import GoogleLogin from '@/ui/GoogleLogin';

export default function page() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorField, setErrorField] = useState({
    name: '',
    email: '',
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const useSignupMutation = useMutation({
    mutationFn: (payload: any) => {
      return postRequest(`${API_ROUTES.AUTH}/magic-signup`, payload);
    },
    onError: (err) => {
      toast.error(sanitizeError(err));
    },
    onSuccess: () => {
      toast.success('Magic link sent!');
      setStatus('success');
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setErrorField({ ...errorField, name: '' });
    }
    if (name === 'email') {
      setErrorField({ ...errorField, email: '' });
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    let isValid = true;
    let error = {
      name: '',
      email: '',
    };
    e.preventDefault();
    if (!formData.email.trim() || !emailValidator(formData.email)) {
      isValid = false;
      error.email = 'Please enter a valid email address';
    }
    if (!formData.name.trim() || !isValidName(formData.name)) {
      isValid = false;
      error.name = 'Full name is required';
    }
    if (!isValid) return setErrorField(error);
    const { firstName, lastName } = splitFullName(formData.name);
    const payload = {
      firstName,
      lastName,
      email: formData.email,
    };
    return useSignupMutation.mutateAsync(payload);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <Link href="/" title="Go Home">
        <Home className="absolute top-10 left-10 cursor-pointer z-10 w-6 h-6 text-black" />
      </Link>{' '}
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-black mb-3 tracking-tight text-balance">
            Create an Account
          </h1>
          <p className="text-neutral-600 leading-relaxed">
            You only need account to access pro features.
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
              <span className="font-medium text-black">{formData.email}</span>
            </p>
            <p className="text-sm text-neutral-600 mt-4 leading-relaxed">
              It can take few minutes to arrive.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-black mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Jon Snow"
                  className={`w-full pl-12 pr-4 py-3.5 border rounded-lg text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all ${
                    errorField.name
                      ? 'border-red-300 bg-red-50'
                      : 'border-neutral-300 bg-white'
                  }`}
                  disabled={useSignupMutation.isPending}
                />
              </div>
              {errorField.name && (
                <div className="flex items-center gap-2 mt-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errorField.name}</span>
                </div>
              )}
            </div>

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
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className={`w-full pl-12 pr-4 py-3.5 border rounded-lg text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all ${
                    errorField.email
                      ? 'border-red-300 bg-red-50'
                      : 'border-neutral-300 bg-white'
                  }`}
                  disabled={useSignupMutation.isPending}
                />
              </div>
              {errorField.email && (
                <div className="flex items-center gap-2 mt-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errorField.email}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={useSignupMutation.isPending}
              className="w-full bg-emerald-500 hover:bg-emerald-500 text-white font-medium py-3.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {useSignupMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing up...
                </>
              ) : (
                'Sign Up'
              )}
            </button>

            <hr />

            <GoogleLogin btnText="Sign up with Google" />

            <div className="flex justify-center">
              <Link
                href={APP_PATHS.AUTH}
                className="text-sm text-neutral-600 hover:underline transition-colors"
              >
                Already have an account? Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
