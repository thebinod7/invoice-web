'use client';

import { BreadcrumbMenu } from '@/ui/Breadcrumb';
import Sidebar from '@/ui/Sidebar';
import { Bell, Sprout } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pathsInArray = pathname.split('/');

  return (
    <div className="flex h-screen md:bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} pathname={pathname} />

      <main className="flex-1 flex flex-col min-h-0">
        <header className="bg-white h-14 border-b border-gray-200 px-6 py-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-4 flex-shrink-0">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="cursor-default p-2 rounded-lg"
              >
                <Sprout className="w-6 h-6" />
              </button>
              <BreadcrumbMenu items={pathsInArray} />
            </div>
            <button
              title="No notifications!"
              className="p-2 hover:bg-gray-100 rounded-lg flex-shrink-0"
            >
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </header>

        <div className="flex-1 flex flex-col min-h-0 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
