'use client';

import { Inbox, ReceiptText, Send } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Invoices',
      value: '184',
      icon: ReceiptText,
      link: 'View all',
    },
    { title: 'Created Invoices', value: '1252', icon: Inbox, link: 'View all' },
    {
      title: 'Sent Invoices',
      value: '36',
      icon: Send,
      link: 'View all',
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
