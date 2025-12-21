import { APP_NAME, APP_PATHS } from '@/app/constants';
import { useAuthContext } from '@/app/context/useAuthContext';
import { ICurrentUser } from '@/app/types';
import {
  ChartNoAxesColumn,
  CreditCard,
  ExternalLink,
  FileStack,
  Mail,
} from 'lucide-react';
import Link from 'next/link';
import { ProfileDropdown } from './ProfileDropdown';

export default function Sidebar({ sidebarOpen, pathname }: any) {
  const { currentUser } = useAuthContext();

  const pathEndParts = pathname.split('/');
  const activePath = pathEndParts[pathEndParts.length - 1];

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } inset-y-0 left-0 z-50 w-50 shrink-0 bg-white border-r border-gray-200 transition-all flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 mt-1 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="w-8 h-8 rounded-full"
            />
            <div className="flex items-center gap-1">
              <h1 className="font-semibold text-lg text-gray-900">
                {APP_NAME}
              </h1>
              <Link href={'/'} target="_blank" title="Go to website">
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>{' '}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 text-sm">
          <Link
            href={APP_PATHS.DASHBOARD.HOME}
            className={`${
              activePath === 'dashboard' && 'bg-gray-100'
            } flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg mb-1`}
          >
            <ChartNoAxesColumn className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>

          <div className="mt-6">
            {/* Invoice Section */}
            <div className="mb-1">
              <Link
                href={APP_PATHS.DASHBOARD.INVOICES}
                className={`
                  ${activePath === 'invoices' && 'bg-gray-100'}
                  w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg`}
              >
                <FileStack className="w-5 h-5" />
                <span className="flex-1 text-left">Invoice History</span>
              </Link>
            </div>

            {/* Billing Section */}
            <div className="mb-1">
              <Link
                href={APP_PATHS.DASHBOARD.BILING}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <CreditCard className="w-5 h-5" />
                <span className="flex-1 text-left">Billing</span>
              </Link>
            </div>

            {/* Billing Section */}
            <div className="mb-1">
              <Link
                href={APP_PATHS.DASHBOARD.HOME}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <Mail className="w-5 h-5" />
                <span className="flex-1 text-left">Email</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200 relative">
          <ProfileDropdown
            currentUser={currentUser as ICurrentUser | undefined}
          />{' '}
        </div>
      </aside>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" />
      )}
    </>
  );
}
