'use client';

import Sidebar from '@/ui/Sidebar';
import { Bell, Menu } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { BreadcrumbMenu } from '@/ui/Breadcrumb';

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
      <Sidebar sidebarOpen={sidebarOpen} />

      <main className="flex-1 flex flex-col min-h-0">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden"
              >
                <Menu className="w-6 h-6" />
              </button>
              <Menu className="w-5 h-5 text-gray-400 hidden md:block" />
              <BreadcrumbMenu items={pathsInArray} />
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </header>
        <div className="overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
