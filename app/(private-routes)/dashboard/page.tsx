'use client';

import { useState } from 'react';
import {
  Home,
  CreditCard,
  ChevronDown,
  Plane,
  Bike,
  BookOpen,
  Users,
  FileText,
  ListChecks,
  Eye,
  FileCheck,
  Bell,
  Menu,
  ChevronRight,
  User,
  Settings,
  LogOut,
} from 'lucide-react';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
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
      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
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
      </main>
    </>
  );
}
