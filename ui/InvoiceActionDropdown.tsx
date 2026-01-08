'use client';

import { API_ROUTES } from '@/app/constants/api-routes';
import { QUERY_KEYS } from '@/app/constants/query-keys';
import { sanitizeError } from '@/app/helpers';
import { API_BASE_URL } from '@/app/helpers/config';
import { delRequest, patchRequest } from '@/app/helpers/request';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Archive, Check, Download, Pencil } from 'lucide-react';
import { toast } from 'sonner';
import { ConfirmDialog } from './ConfirmDialog';
import { INVOICE_STATUS } from '@/app/constants';

export function InvoiceActionDropdown({
  rowId,
}: {
  rowId: string;
  invoiceNumber: string;
}) {
  const queryClient = useQueryClient();

  const handleDownload = async () => {
    try {
      window.location.href = `${API_BASE_URL}/invoices/${rowId}/download`;
    } catch (error) {
      toast.error('Failed to download invoice! Please try after some time.');
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

  const handleMarkAsPaid = () => {
    toast.loading('Updating status...');
    return markAsPaidMutation.mutate({
      invoiceId: rowId,
      status: INVOICE_STATUS.PAID,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Action
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={handleDownload}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>Download Now</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleEditClick}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Pencil className="h-4 w-4" />
            <span>Edit & Download</span>
          </DropdownMenuItem>{' '}
          <DropdownMenuItem
            onClick={handleMarkAsPaid}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Check className="h-4 w-4" />
            <span>Mark as Paid</span>
          </DropdownMenuItem>{' '}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <ConfirmDialog
          message="Are you sure you want to delete this invoice?"
          handleConfirm={handleDeleteClick}
          triggerButton={
            <Button
              variant="secondary"
              className="flex bg-white text-red-600 items-center gap-2 cursor-pointer"
            >
              <Archive className="h-4 w-4" />
              <span>Delete</span>
            </Button>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
