'use client';

import type React from 'react';

import { API_ROUTES } from '@/app/constants/api-routes';
import { useAuthContext } from '@/app/context/useAuthContext';
import { sanitizeError } from '@/app/helpers';
import { postRequest } from '@/app/helpers/request';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

const MSG_LIMIT = 500;

export default function FeedbackClient() {
  const { currentUser } = useAuthContext();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    message: '',
  });

  const sendFeedbackMutation = useMutation({
    mutationFn: (payload: any) => {
      return postRequest(`${API_ROUTES.APP}/feedback`, payload);
    },
    onError: (error) => {
      toast.error(sanitizeError(error));
    },
    onSuccess: () => {
      setSubmitted(true);
      setFormData({ message: '' });
      toast.success(
        'Thank you for your feedback! We will get back to you soon.'
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      email: currentUser?.email,
      message: formData.message,
    };
    if (payload.message.length > MSG_LIMIT)
      return toast.error('Message too long!');
    return sendFeedbackMutation.mutate(payload);
  };

  return (
    <div className="grid min-h-full w-full flex-1 place-items-center p-4 sm:p-6">
      <Card className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl">
        <CardHeader className="space-y-2 p-4 text-center sm:p-6 sm:pb-4">
          <CardTitle className="text-lg font-semibold sm:text-xl">
            We would love to hear your feedback!
          </CardTitle>
          <CardDescription className="hidden md:block mx-auto max-w-md text-sm leading-relaxed">
            Share feature requests, bug reports, or anything else on your mind.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Textarea
              required={true}
              rows={8}
              value={formData.message}
              placeholder="Type your message here..."
              onChange={(e) =>
                setFormData({
                  ...formData,
                  message: e.target.value,
                })
              }
              className="min-h-[160px] resize-y sm:min-h-[200px] md:min-h-[240px]"
            />

            <p className="text-right text-xs tabular-nums text-muted-foreground">
              {formData.message.length}/{MSG_LIMIT}
            </p>

            {submitted ? (
              <Button
                disabled={true}
                type="button"
                variant="secondary"
                className="h-10 w-full"
              >
                Feedback Sent
              </Button>
            ) : (
              <Button
                disabled={sendFeedbackMutation.isPending}
                type="submit"
                className="h-10 w-full"
              >
                {sendFeedbackMutation.isPending ? 'Sending...' : 'Send Message'}
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
