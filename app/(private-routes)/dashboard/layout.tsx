'use client';

import Sidebar from '@/ui/Sidebar';
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

      <main className="flex-1 flex flex-col overflow-hidden">{children}</main>
    </div>
  );
}
