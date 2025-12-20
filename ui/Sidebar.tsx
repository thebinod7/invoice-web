import { APP_NAME } from '@/app/constants';
import { useAuthContext } from '@/app/context/useAuthContext';
import { ICurrentUser } from '@/app/types';
import {
  ChevronDown,
  CreditCard,
  ExternalLink,
  Home,
  Mail,
} from 'lucide-react';
import Link from 'next/link';
import { ProfileDropdown } from './ProfileDropdown';

export default function Sidebar({
  sidebarOpen,
  toggleSection,
  expandedSections,
}: any) {
  const { currentUser } = useAuthContext();

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:static inset-y-0 left-0 z-50 w-64 shrink-0 bg-white border-r border-gray-200 transition-transform flex flex-col`}
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
        <nav className="flex-1 overflow-y-auto p-4">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg mb-1"
          >
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </a>

          <div className="mt-6">
            {/* Visa Section */}
            <div className="mb-1">
              <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <CreditCard className="w-5 h-5" />
                <span className="flex-1 text-left">Invoices</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    expandedSections.visa ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedSections.visa && (
                <div className="ml-8 mt-1 space-y-1">
                  <a
                    href="#"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    Setup
                  </a>
                  <a
                    href="#"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    Applications
                  </a>
                </div>
              )}
            </div>

            {/* Tour Section */}
            <div className="mb-1">
              <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <Mail className="w-5 h-5" />
                <span className="flex-1 text-left">Email</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    expandedSections.tour ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedSections.email && (
                <div className="ml-8 mt-1 space-y-1">
                  <a
                    href="#"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    Inbox
                  </a>
                  <a
                    href="#"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    Outbox
                  </a>
                </div>
              )}
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
