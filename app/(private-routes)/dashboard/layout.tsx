'use client';

import { useIsMobile } from '@/app/hooks/ui/isMobile';
import { BreadcrumbMenu } from '@/ui/Breadcrumb';
import Sidebar from '@/ui/Sidebar';
import { Bell, Menu, Sprout } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();

  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  useEffect(() => {
    setIsCollapsed(isMobile);
  }, [isMobile]);

  const pathsInArray = pathname.split('/');

  return (
    <div className="flex h-screen md:bg-gray-50">
      <Sidebar collapsed={isCollapsed} pathname={pathname} />

      <main className="flex-1 flex flex-col min-h-0">
        <header className="bg-white h-14 border-b border-gray-200 px-6 py-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-4 flex-shrink-0">
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="cursor-pointer p-2 rounded-lg"
              >
                <Menu className="w-4 h-4" />
              </button>
              <BreadcrumbMenu items={pathsInArray} />
            </div>
            <button
              title="No notifications!"
              className="hidden md:block p-2 hover:bg-gray-100 rounded-lg flex-shrink-0"
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
