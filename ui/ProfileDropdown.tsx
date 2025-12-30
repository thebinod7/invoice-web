'use client';

import { APP_PATHS } from '@/app/constants';
import { useAuthContext } from '@/app/context/useAuthContext';
import { truncateString } from '@/app/helpers';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export function ProfileDropdown({
  isCollapsed,
  currentUser,
}: {
  currentUser?: { firstName: string; lastName: string; email: string };
  isCollapsed: boolean;
}) {
  const { doLogout } = useAuthContext();

  const getNameInitials = (first: string, last: string) =>
    `${first?.[0] ?? ''}${last?.[0] ?? ''}`.toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`
            w-full focus:outline-none rounded-lg
            hover:bg-gray-50 transition
            ${
              isCollapsed
                ? 'flex justify-center p-2'
                : 'flex items-center gap-3 p-2'
            }
          `}
          title={isCollapsed ? 'Account' : undefined}
        >
          {/* Avatar */}
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-semibold text-gray-600 shrink-0">
            {currentUser
              ? getNameInitials(currentUser.firstName, currentUser.lastName)
              : 'CN'}
          </div>

          {/* User info (hidden when collapsed) */}
          {!isCollapsed && (
            <>
              <div className="flex-1 min-w-0 text-left">
                <p className="font-semibold text-sm text-gray-900 truncate">
                  {currentUser
                    ? truncateString(
                        `${currentUser.firstName} ${currentUser.lastName}`
                      )
                    : 'Fetching profile..'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {(currentUser?.email && truncateString(currentUser.email)) ||
                    '...'}
                </p>
              </div>

              <ChevronRight className="w-4 h-4 text-gray-400 transition-transform" />
            </>
          )}
        </button>
      </DropdownMenuTrigger>

      {/* Dropdown */}
      <DropdownMenuContent
        className="w-56"
        align="start"
        side="right"
        sideOffset={8}
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>

        <DropdownMenuGroup>
          <Link href={APP_PATHS.DASHBOARD.PROFILE}>
            <DropdownMenuItem className="cursor-pointer">
              My Profile
            </DropdownMenuItem>
          </Link>

          <Link href={APP_PATHS.DASHBOARD.SUBSCRIPTION}>
            <DropdownMenuItem className="cursor-pointer">
              Subscription
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:text-red-600"
          onClick={doLogout}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
