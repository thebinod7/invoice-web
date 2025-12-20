'use client';

import { useAuthContext } from '@/app/context/useAuthContext';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { ChevronRight } from 'lucide-react';

export function ProfileDropdown({
  currentUser,
}: {
  currentUser?: { firstName: string; lastName: string; email: string };
}) {
  const { doLogout } = useAuthContext();
  const getNameInitials = (first: string, last: string) =>
    `${first[0]}${last[0]}`.toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-full focus:outline-none flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 -m-2">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-semibold text-gray-600">
            {currentUser
              ? getNameInitials(currentUser.firstName, currentUser.lastName)
              : '...'}
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="font-semibold text-sm text-gray-900 truncate">
              {currentUser?.firstName} {currentUser?.lastName}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {currentUser?.email || '...'}
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 transition-transform" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={doLogout}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
