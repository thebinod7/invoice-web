'use client';

import type React from 'react';

import CurrencyDetailsTable from '@/app/components/CurrencyDetailsTable';
import InvoiceStatusPieChart from '@/app/components/InvoiceStatusPieChart';
import { useMyStatsQuery } from '@/app/hooks/backend/user.hook';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PageSpinner } from '@/ui/PageSpinner';
import { CheckCircle2, FileText, Send } from 'lucide-react';

// Type definitions
interface InvoiceData {
  counts: {
    totalInvoices: number;
    sentInvoices: number;
    paidInvoices: number;
    cancelledInvoices: number;
  };
  amountsByCurrency: {
    [key: string]: {
      total: number;
      unpaid: number;
      overdue: number;
    };
  };
  meta: {
    currencyCount: number;
    excludedStatuses: string[];
    generatedAt: string;
  };
}

interface StatCard {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: string;
  bgColor: string;
}

export default function DashboardClientV2() {
  const { data } = useMyStatsQuery();

  const invoiceData: InvoiceData = data?.data?.result || null;

  if (!invoiceData) return <PageSpinner />;

  const { amountsByCurrency, counts, meta } = invoiceData;
  const currencyChartData = Object.entries(amountsByCurrency).map(
    ([currency, amounts]) => ({
      currency,
      total: amounts.total,
      unpaid: amounts.unpaid,
      overdue: amounts.overdue,
    })
  );

  const statCards: StatCard[] = [
    {
      title: 'Total Invoices',
      value: counts.totalInvoices,
      description: `${counts.sentInvoices} sent this period`,
      icon: <FileText className="w-5 h-5" />,
      bgColor: 'from-blue-50 to-cyan-50',
    },
    {
      title: 'Paid Invoices',
      value: `${counts.paidInvoices}`,
      description: `${
        counts.sentInvoices > 0
          ? ((counts.paidInvoices / counts.sentInvoices) * 100).toFixed(0)
          : 0
      }% paid rate`,
      icon: <CheckCircle2 className="w-5 h-5" />,
      bgColor: 'from-green-50 to-emerald-50',
    },
    {
      title: 'Sent Invoices',
      value: `${counts.sentInvoices}`,
      description: `${
        counts.totalInvoices > 0
          ? ((counts.sentInvoices / counts.totalInvoices) * 100).toFixed(0)
          : 0
      }% of total`,
      icon: <Send className="w-5 h-5" />,
      bgColor: 'from-amber-50 to-orange-50',
    },
  ];

  const invoiceStatusData = [
    { name: 'Paid', value: counts.paidInvoices, fill: '#10b981' },
    {
      name: 'Unpaid',
      value:
        counts.totalInvoices - counts.paidInvoices - counts.cancelledInvoices,
      fill: '#f59e0b',
    },
  ];

  return (
    <div className="flex-1 overflow-auto p-6">
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statCards.map((stat, idx) => (
          <Card
            key={idx}
            className={`relative overflow-hidden border border-slate-200 bg-gradient-to-br ${stat.bgColor}`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardDescription className="text-xs font-medium tracking-wide uppercase text-slate-600">
                    {stat.title}
                  </CardDescription>
                  <CardTitle className="text-2xl md:text-3xl font-bold mt-2 text-slate-900">
                    {stat.value}
                  </CardTitle>
                </div>
                <div className="p-2 bg-slate-100 rounded-lg text-slate-700">
                  {stat.icon}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <p className="text-slate-600">{stat.description}</p>
                {stat.trend && (
                  <span className="text-green-600 font-semibold">
                    {stat.trend}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 mt-4">
        {/* Currency Details Table */}
        <CurrencyDetailsTable currencyChartData={currencyChartData} />

        {/* Invoice Status Pie */}
        <InvoiceStatusPieChart invoiceStatusData={invoiceStatusData} />
      </div>

      {/* Footer Info */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 border-t border-slate-200 pt-6">
        <p>Last updated: {new Date(meta.generatedAt).toLocaleDateString()}</p>
        <p>Excluding: {meta.excludedStatuses.join(', ')} invoices</p>
      </div>
    </div>
  );
}
