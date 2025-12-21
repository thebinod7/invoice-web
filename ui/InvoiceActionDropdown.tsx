'use client';

import { APP_PATHS } from '@/app/constants';
import { useAuthContext } from '@/app/context/useAuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

export function InvoiceActionDropdown({}: {}) {
  const { doLogout } = useAuthContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Action
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
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
