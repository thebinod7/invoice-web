import {
  Bike,
  BookOpen,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Home,
  LogOut,
  Plane,
  Settings,
  User,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function Sidebar({
  sidebarOpen,
  toggleSection,
  expandedSections,
  profileMenuOpen,
  setProfileMenuOpen,
}: any) {
  return (
    <>
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg" />
            <div>
              <h1 className="font-semibold text-lg text-gray-900">Invomaker</h1>
              <p className="text-sm text-gray-500">Admin</p>
              <Link href={'/'} target="_blank">
                Home
              </Link>
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
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase mb-2">
              Platform
            </p>

            {/* Visa Section */}
            <div className="mb-1">
              <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <CreditCard className="w-5 h-5" />
                <span className="flex-1 text-left">Visa</span>
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
                  <a
                    href="#"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    Approved Applications
                  </a>
                </div>
              )}
            </div>

            {/* Tour Section */}
            <div className="mb-1">
              <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <Plane className="w-5 h-5" />
                <span className="flex-1 text-left">Tour</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    expandedSections.tour ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedSections.tour && (
                <div className="ml-8 mt-1 space-y-1">
                  <a
                    href="#"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    Packages
                  </a>
                  <a
                    href="#"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    Bookings
                  </a>
                </div>
              )}
            </div>

            {/* Activities Section */}
            <div className="mb-1">
              <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <Bike className="w-5 h-5" />
                <span className="flex-1 text-left">Activities</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    expandedSections.activities ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedSections.activities && (
                <div className="ml-8 mt-1 space-y-1">
                  <a
                    href="#"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    Activities List
                  </a>
                  <a
                    href="#"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    Bookings
                  </a>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="mb-1">
              <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <BookOpen className="w-5 h-5" />
                <span className="flex-1 text-left">Content</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    expandedSections.content ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedSections.content && (
                <div className="ml-8 mt-1 space-y-1">
                  <a
                    href="#"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    Country Setup
                  </a>
                  <a
                    href="#"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    Category Setup
                  </a>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200 relative">
          {profileMenuOpen && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
              <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
              <div className="border-t border-gray-200 my-2" />
              <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
          <button
            // onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="w-full flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 -m-2"
          >
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-semibold text-gray-600">
              CN
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="font-semibold text-sm text-gray-900 truncate">
                Binod Chaudhary
              </p>
              <p className="text-xs text-gray-500 truncate">
                thebinod7@gmail.com
              </p>
            </div>
            <ChevronRight
              className={`w-4 h-4 text-gray-400 transition-transform ${
                profileMenuOpen ? 'rotate-90' : ''
              }`}
            />
          </button>
        </div>
      </aside>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" />
      )}
    </>
  );
}
