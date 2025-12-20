'use client';

import Sidebar from '@/ui/Sidebar';
import { Bell, Menu } from 'lucide-react';
import { useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    visa: true,
    tour: false,
    activities: false,
    content: false,
  });

  const toggleSection = (key: string) => {};

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
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
              <h2 className="text-xl font-semibold text-gray-900">Dashboard</h2>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
