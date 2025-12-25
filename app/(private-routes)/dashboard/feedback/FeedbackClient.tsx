'use client';

import type React from 'react';

import { API_ROUTES } from '@/app/constants/api-routes';
import { sanitizeError } from '@/app/helpers';
import { patchRequest } from '@/app/helpers/request';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

export default function FeedbackClient() {
  const [formData, setFormData] = useState({
    message: '',
  });

  const sendFeedbackMutation = useMutation({
    mutationFn: (payload: any) => {
      return patchRequest(`${API_ROUTES.USERS}/me`, payload);
    },
    onError: (error) => {
      toast.error(sanitizeError(error));
    },
    onSuccess: () => {
      toast.success(
        'Thank you for your feedback! We will get back to you soon.'
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      message: formData.message,
    };
    return sendFeedbackMutation.mutate(payload);
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-16">
      <div className="p-4 md:p-10">
        <div className="mb-">
          <p className="text-pretty font-semibold leading-relaxed">
            We would love to hear your feedback!
          </p>
          <p className="text-xs mt-4 mb-4 text-muted-foreground ">
            It can be a feature requests, bug reports, or anything else you want
            to share with us.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid w-full gap-2">
            <Textarea
              required={true}
              rows={10}
              placeholder="Type your message here. "
              onChange={(e) =>
                setFormData({
                  ...formData,
                  message: e.target.value,
                })
              }
            />
          </div>

          <Button
            disabled={sendFeedbackMutation.isPending}
            type="submit"
            className="w-full h-10 mt-8"
          >
            {sendFeedbackMutation.isPending ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </div>
    </Card>
  );
}
