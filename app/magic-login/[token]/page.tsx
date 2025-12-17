'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, Mail, CheckCircle2, XCircle } from 'lucide-react';
import { API_BASE_URL } from '@/app/helpers/config';
import axios from 'axios';

type VerificationState = 'verifying' | 'success' | 'error';

const ERROR_MSG =
  'Unable to verify your link. This link is invalid or has expired.';

export default function VerifyMagicLinkPage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;

  const [state, setState] = useState<VerificationState>('verifying');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const verifyMagicLink = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/auth/verify-magic-login/${token}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );

        console.log('DATA: ', response.data);

        setState('success');
        // Redirect to dashboard after 2 seconds
        // setTimeout(() => {
        //   router.push('/dashboard');
        // }, 2000);
      } catch (error) {
        console.error('[v0] Verification error:', error);
        setState('error');
        setErrorMessage(ERROR_MSG);
      }
    };

    if (token) {
      verifyMagicLink();
    }
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center gap-8">
          {/* Icon Container */}
          <div className="relative">
            {state === 'verifying' && (
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
              </div>
            )}

            {state === 'success' && (
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center animate-scale-in">
                <CheckCircle2 className="w-10 h-10 text-success" />
              </div>
            )}

            {state === 'error' && (
              <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center animate-scale-in">
                <XCircle className="w-10 h-10 text-destructive" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="text-center space-y-3">
            {state === 'verifying' && (
              <>
                <h1 className="text-2xl font-semibold text-foreground tracking-tight">
                  Verifying your link
                </h1>
                <p className="text-muted-foreground text-balance leading-relaxed">
                  Please wait while we verify your magic link. This will only
                  take a moment.
                </p>
              </>
            )}

            {state === 'success' && (
              <>
                <h1 className="text-2xl font-semibold text-foreground tracking-tight">
                  Verification successful
                </h1>
                <p className="text-muted-foreground text-balance leading-relaxed">
                  Your email has been verified. Redirecting you to your
                  dashboard...
                </p>
              </>
            )}

            {state === 'error' && (
              <>
                <h1 className="text-2xl font-semibold text-foreground tracking-tight">
                  Verification failed
                </h1>
                <p className="text-muted-foreground text-balance leading-relaxed">
                  {errorMessage}
                </p>
              </>
            )}
          </div>

          {/* Email Icon (decorative) */}
          {state === 'verifying' && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-5">
              <Mail className="w-64 h-64 text-foreground" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
