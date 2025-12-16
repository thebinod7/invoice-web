import Sidebar from '@/ui/Sidebar';
import React from 'react';

export default function DashboardWrapper({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        sidebarOpen={true}
        expandedSections={{}}
        toggleSection={() => {}}
      />
      {children}
    </div>
  );
}
