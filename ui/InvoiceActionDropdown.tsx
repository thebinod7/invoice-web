'use client';

import { API_ROUTES } from '@/app/constants/api-routes';
import { isMobile, sanitizeError } from '@/app/helpers';
import { API_BASE_URL } from '@/app/helpers/config';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import axios from 'axios';
import { Archive, Download, Pencil } from 'lucide-react';
import { toast } from 'sonner';
import { ConfirmDialog } from './ConfirmDialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { delRequest } from '@/app/helpers/request';
import { QUERY_KEYS } from '@/app/constants/query-keys';

export function InvoiceActionDropdown({
  rowId,
  invoiceNumber,
}: {
  rowId: string;
  invoiceNumber: string;
}) {
  const queryClient = useQueryClient();

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}${API_ROUTES.INVOICES}/${rowId}/download`,
        {
          responseType: 'blob',
          withCredentials: true,
        }
      );

      const blob = new Blob([response.data], {
        type: 'application/pdf',
      });

      const blobUrl = window.URL.createObjectURL(blob);
      const mobile = isMobile();
      if (mobile) {
        window.open(blobUrl, '_blank');
      }
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `invoice-${invoiceNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
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
