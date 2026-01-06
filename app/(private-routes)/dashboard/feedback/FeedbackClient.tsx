'use client';

import type React from 'react';

import { API_ROUTES } from '@/app/constants/api-routes';
import { useAuthContext } from '@/app/context/useAuthContext';
import { sanitizeError } from '@/app/helpers';
import { postRequest } from '@/app/helpers/request';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
    <div className="flex justify-center mt-4 md:mt-8 lg:mt-12">
      <Card className="w-full md:w-[60%]">
        <div className="p-4 md:p-6">
          <div>
            <p className="text-muted-foreground font-semibold">
              We would love to hear your feedback!
            </p>
            <p className="hidden md:block text-xs mt-4 mb-4 text-gray-700">
              It can be a feature requests, bug reports, or anything else you
              want to share with us.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid w-full gap-2">
              <Textarea
                required={true}
                rows={10}
                value={formData.message}
                placeholder="Type your message here. "
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    message: e.target.value,
                  })
                }
              />
            </div>

            <p className="text-xs text-muted-foreground">
              Max character limit: {formData.message.length}/{MSG_LIMIT}
            </p>

            {submitted ? (
              <Button
                disabled={true}
                type="button"
                variant={'secondary'}
                className="w-full h-10 mt-8"
              >
                Feedback Sent
              </Button>
            ) : (
              <Button
                disabled={sendFeedbackMutation.isPending}
                type="submit"
                className="w-full h-10 mt-8"
              >
                {sendFeedbackMutation.isPending ? 'Sending...' : 'Send Message'}
              </Button>
            )}
          </form>
        </div>
      </Card>
    </div>
  );
}
