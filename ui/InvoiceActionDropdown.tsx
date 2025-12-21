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
import { toast } from 'sonner';

export function InvoiceActionDropdown({ rowId }: { rowId: string }) {
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
      link.download = `invoice-${rowId}.pdf`;
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
          <DropdownMenuItem onClick={handleDownload} className="cursor-pointer">
            Download
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">Export</DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">Clone</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={doLogout}>
          Mark as Sent
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
