'use client';

import { API_ROUTES } from '@/app/constants/api-routes';
import { FeatureKey } from '@/app/constants/plan';
import { QUERY_KEYS } from '@/app/constants/query-keys';
import { sanitizeError } from '@/app/helpers';
import { postRequest } from '@/app/helpers/request';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

export default function EmailDrawer({
  invoiceId,
  allowedFeatures,
}: {
  invoiceId: string;
  allowedFeatures: Record<string, any>;
}) {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
  });
  const [open, setOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const emailInvoiceMutation = useMutation({
    mutationFn: (payload: any) => {
      return postRequest(`${API_ROUTES.INVOICES}/send-to-client`, payload);
    },
    onError: (error) => {
      toast.error(sanitizeError(error));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.INVOICE.MY_LIST],
      });
      toast.success('Invoice sent successfully!');
      setOpen(false);
    },
    onSettled: () => {
      setFormData({ clientName: '', clientEmail: '' });
      toast.dismiss();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      invoiceId,
    };
    return emailInvoiceMutation.mutate(payload);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size={'sm'} variant="default" onClick={() => setOpen(true)}>
          Send
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>
              Send Invoice by Email (0/
              {allowedFeatures[FeatureKey.INVOICE_EMAIL_LIMIT]})
            </DrawerTitle>
            <DrawerDescription>
              Your invoice will be sent as a PDF attachment. Client details
              won't be saved.
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clientName" className="text-sm font-medium">
                  Client Name
                </Label>
                <Input
                  id="clientName"
                  name="clientName"
                  type="text"
                  placeholder="eg: Jon Snow"
                  className="h-10"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientEmail" className="text-sm font-medium">
                  Client Email{' '}
                  <span className="text-xs">(Recipient Email)</span>
                </Label>
                <Input
                  id="clientEmail"
                  name="clientEmail"
                  type="email"
                  placeholder="eg: jon@example.com"
                  className="h-10"
                  value={formData.clientEmail}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Button
                disabled={emailInvoiceMutation.isPending}
                className="w-full"
              >
                {emailInvoiceMutation.isPending ? 'Sending...' : 'Send Invoice'}
              </Button>
            </form>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button onClick={() => setOpen(false)} variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
