'use client';

import { API_ROUTES } from '@/app/constants/api-routes';
import { FeatureKey } from '@/app/constants/plan';
import { QUERY_KEYS } from '@/app/constants/query-keys';
import { useAppContext } from '@/app/context/useAppContext';
import { isForbidden, sanitizeError } from '@/app/helpers';
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
import { UpgradePlanModal } from './UpgradePlanModal';
import { Textarea } from '@/components/ui/textarea';
import { useAuthContext } from '@/app/context/useAuthContext';
import { LoadingButton } from './LoadingButton';

const MAX_MESSAGE_LENGTH = 150;

export default function EmailDrawer({
  invoiceId,
  allowedFeatures,
}: {
  invoiceId: string;
  allowedFeatures: Record<string, any>;
}) {
  const queryClient = useQueryClient();
  const { showModal, setShowModal } = useAppContext();
  const { isPremium } = useAuthContext();

  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    subject: '',
    message: '',
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
      console.log('ERR:', error);
      const forbidden = isForbidden(error);
      if (forbidden) {
        return setShowModal(true);
      }
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
      setFormData({
        clientName: '',
        clientEmail: '',
        subject: '',
        message: '',
      });
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
    <>
      <UpgradePlanModal showModal={showModal} setShowModal={setShowModal} />
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
                Send Invoice by Email ({' '}
                {allowedFeatures[FeatureKey.INVOICE_EMAIL_LIMIT]} / year)
              </DrawerTitle>
              <DrawerDescription>
                Your invoice will be sent as a PDF attachment.
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4 pb-0">
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="space-y-1">
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

                <div className="space-y-1">
                  <Label htmlFor="clientEmail" className="text-sm font-medium">
                    Client Email{' '}
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

                {isPremium && (
                  <>
                    <div className="space-y-1">
                      <Label htmlFor="subject" className="text-sm font-medium">
                        Email Subject{' '}
                        <span className="text-xs">(optional)</span>
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="eg: You have a new invoice"
                        className="h-10"
                        value={formData.subject}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="message" className="text-sm font-medium">
                        Personal Message{' '}
                        <span className="text-xs">(optional)</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={formData.message}
                        placeholder="Eg: Thanks for working with us! Let me know if you have any questions."
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            message: e.target.value,
                          })
                        }
                      />
                      <p className="text-xs text-muted-foreground">
                        Max character limit: {formData.message.length}/
                        {MAX_MESSAGE_LENGTH}
                      </p>
                    </div>
                  </>
                )}
                {emailInvoiceMutation.isPending ? (
                  <LoadingButton
                    clsName="w-full"
                    message="Sending invoice..."
                  />
                ) : (
                  <Button
                    disabled={emailInvoiceMutation.isPending}
                    className="w-full"
                  >
                    Send Invoice
                  </Button>
                )}
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
    </>
  );
}
