'use client';

import {
  Eye,
  FileCheck,
  FileText,
  ListChecks,
  Plane,
  Users,
} from 'lucide-react';
import { useState } from 'react';

export default function Dashboard() {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    visa: true,
    tour: false,
    activities: false,
    content: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const stats = [
    { title: 'Total Users', value: '184', icon: Users, link: 'View all' },
    { title: 'Visa Services', value: '1252', icon: Plane, link: 'View all' },
    {
      title: 'Total Submissions',
      value: '36',
      icon: FileText,
      link: 'View all',
    },
    { title: 'Pending Submissions', value: '0', icon: ListChecks, link: null },
    { title: 'In-Review Submissions', value: '0', icon: Eye, link: null },
    {
      title: 'Completed Submissions',
      value: '10',
      icon: FileCheck,
      link: null,
    },
  ];

  return (
    <>
      {/* Content Area */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-medium text-gray-700">{stat.title}</h3>
                  <Icon className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-3xl font-semibold text-gray-900 mb-4">
                  {stat.value}
                </p>
                {stat.link && (
                  <a
                    href="#"
                    className="text-blue-600 text-sm font-medium hover:text-blue-700"
                  >
                    {stat.link}
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
