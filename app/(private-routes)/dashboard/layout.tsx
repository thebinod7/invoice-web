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
    <div className="flex h-screen bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} pathname={pathname} />

      <main className="flex-1 flex flex-col min-h-0">
        <header className="bg-white h-14 border-b border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
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
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </header>
        <div className="overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
