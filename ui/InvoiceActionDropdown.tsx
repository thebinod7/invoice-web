'use client';

import { API_ROUTES } from '@/app/constants/api-routes';
import { useAuthContext } from '@/app/context/useAuthContext';
import { isMobile } from '@/app/helpers';
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
import { Archive, Download, FileUp } from 'lucide-react';
import { toast } from 'sonner';

export function InvoiceActionDropdown({
  rowId,
  invoiceNumber,
}: {
  rowId: string;
  invoiceNumber: string;
}) {
  const { doLogout } = useAuthContext();

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
            <span>Download</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <FileUp className="h-4 w-4" />
            <span>Export</span>
          </DropdownMenuItem>{' '}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex text-red-600 items-center gap-2 cursor-pointer">
          <Archive className="h-4 w-4" />
          <span>Archive</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
