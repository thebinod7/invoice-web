'use client';

import { INVOICE_STATUS } from '@/app/constants';
import { API_ROUTES } from '@/app/constants/api-routes';
import { QUERY_KEYS } from '@/app/constants/query-keys';
import { useAppContext } from '@/app/context/useAppContext';
import { isForbidden, sanitizeError } from '@/app/helpers';
import { API_BASE_URL } from '@/app/helpers/config';
import { delRequest, patchRequest, postRequest } from '@/app/helpers/request';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  AlarmClock,
  Archive,
  CheckCheckIcon,
  Download,
  MoreHorizontalIcon,
  Pencil,
} from 'lucide-react';
import { toast } from 'sonner';
import { ConfirmDialog } from './ConfirmDialog';
import { UpgradePlanModal } from './UpgradePlanModal';
import { GlobalModal } from './GlobalModal';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export function InvoiceActionDropdown({ rowId }: { rowId: string }) {
  const queryClient = useQueryClient();
  const { showModal, setShowModal } = useAppContext();
  const [showReminderModal, setShowReminderModal] = useState<boolean>(false);
  const [formData, setFormData] = useState({ clientName: '', clientEmail: '' });

  const handleDownload = async () => {
    try {
      window.location.href = `${API_BASE_URL}/invoices/${rowId}/download`;
    } catch (error) {
      toast.error(sanitizeError(error));
    }
  };

  const archiveInvoiceMutation = useMutation({
    mutationFn: (payload: any) => {
      return delRequest(`${API_ROUTES.INVOICES}/${payload.invoiceId}`);
    },
    onError: (error) => {
      toast.error(sanitizeError(error));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.INVOICE.MY_LIST],
      });
      toast.success('Invoice archived successfully!');
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  const handleDeleteClick = () => {
    archiveInvoiceMutation.mutate({ invoiceId: rowId });
  };

  const handleEditClick = () => {
    window.open(`/edit-invoice/${rowId}`, '_blank');
  };

  const markAsPaidMutation = useMutation({
    mutationFn: (payload: any) => {
      return patchRequest(
        `${API_ROUTES.INVOICES}/${payload.invoiceId}/status`,
        payload
      );
    },
    onError: (error) => {
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
      toast.success('Invoice marked as paid!');
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  const sendReminderMutation = useMutation({
    mutationFn: (payload: any) => {
      return postRequest(`${API_ROUTES.INVOICES}/send-reminder`, payload);
    },
    onError: (error) => {
      const forbidden = isForbidden(error);
      if (forbidden) {
        return setShowModal(true);
      }
      toast.error(sanitizeError(error));
    },
    onSuccess: () => {
      setFormData({ clientName: '', clientEmail: '' });
      setShowReminderModal(false);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.INVOICE.MY_LIST],
      });
      toast.success('Reminder email sent successfully!');
    },
  });

  const handleSendReminder = () => {
    if (!formData.clientName || !formData.clientEmail) {
      toast.error('Please enter a valid client name and email');
      return;
    }
    return sendReminderMutation.mutate({
      invoiceId: rowId,
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
    });
  };

  const handleMarkAsPaid = () => {
    toast.loading('Updating status...');
    return markAsPaidMutation.mutate({
      invoiceId: rowId,
      status: INVOICE_STATUS.PAID,
    });
  };

  return (
    <>
      <UpgradePlanModal showModal={showModal} setShowModal={setShowModal} />

      <GlobalModal
        isOpen={showReminderModal}
        onOpenChange={setShowReminderModal}
        title="Send Reminder"
        description="Send a gentle reminder to your client via email."
        size="md"
        closeOnOutsideClick={true}
        processing={sendReminderMutation.isPending}
        actions={[
          {
            label: 'Cancel',
            onClick: () => setShowReminderModal(false),
            variant: 'outline',
          },
          {
            label: 'Send Reminder',
            onClick: handleSendReminder,
            variant: 'default',
          },
        ]}
      >
        <div className="px-4 pb-0">
          <form className="space-y-2">
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
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    clientName: e.target.value,
                  })
                }
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
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    clientEmail: e.target.value,
                  })
                }
              />
            </div>
          </form>
        </div>
      </GlobalModal>

      <ButtonGroup>
        <ButtonGroup>
          <Button variant="outline" size="sm">
            Action
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" aria-label="More Options">
                <MoreHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleMarkAsPaid}
                >
                  <CheckCheckIcon />
                  Mark as Paid
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    setTimeout(() => {
                      setShowReminderModal(true);
                    }, 0);
                  }}
                >
                  <AlarmClock />
                  Send Reminder
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleDownload}
                >
                  <Download />
                  Download Now
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleEditClick}
                >
                  <Pencil />
                  Edit & Download
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <ConfirmDialog
                  message="Are you sure you want to delete this invoice?"
                  handleConfirm={handleDeleteClick}
                  triggerButton={
                    <Button
                      variant="secondary"
                      className="flex w-full text-sm bg-white text-red-600 items-center gap-2 cursor-pointer"
                    >
                      <Archive className="h-4 w-4" />
                      <span>Delete</span>
                    </Button>
                  }
                />
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
      </ButtonGroup>
    </>
  );
}
